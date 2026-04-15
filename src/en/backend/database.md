# Switching the database

FastSoyAdmin's ORM is [Tortoise ORM](https://tortoise.github.io), with native support for **SQLite / PostgreSQL / MySQL (MariaDB) / SQL Server**. **Switching DB only requires changing `DB_URL` in `.env`; no code changes**.

## Quick switch (single DB)

Edit `.env`:

```dotenv
# SQLite (default, dev)
DB_URL="sqlite://app_system.sqlite3?busy_timeout=5000"

# PostgreSQL (default driver: asyncpg)
DB_URL="postgres://user:password@localhost:5432/fastsoyadmin"

# MySQL / MariaDB
DB_URL="mysql://root:password@localhost:3306/fastsoyadmin"

# SQL Server
DB_URL="mssql://sa:Password123@localhost:1433/fastsoyadmin?driver=ODBC%20Driver%2018%20for%20SQL%20Server&encrypt=no&trust_server_certificate=yes"
```

Then init once:

```bash
make initdb         # = tortoise init-db + first-time seeds
```

Subsequent model changes:

```bash
make mm             # makemigrations + migrate
```

## URL syntax cheat sheet

| Engine | URL example | Notes |
|---|---|---|
| SQLite (relative) | `sqlite://app_system.sqlite3?busy_timeout=5000` | **two** slashes, relative to project root |
| SQLite (absolute) | `sqlite:///var/data/db.sqlite3?journal_mode=WAL` | **three** slashes, then absolute path |
| PostgreSQL | `postgres://user:pwd@host:5432/db` | default asyncpg; `asyncpg://...` / `psycopg://...` to specify |
| MySQL | `mysql://user:pwd@host:3306/db` | requires `aiomysql` or `asyncmy` |
| SQL Server | `mssql://sa:pwd@host:1433/db?driver=ODBC...` | requires ODBC driver; tweak `encrypt` / `trust_server_certificate` as needed |

Full URL syntax: [Tortoise ORM docs](https://tortoise.github.io/setup.html#db-url).

## Driver install

Only SQLite is bundled by default. For other engines:

::: code-group
```bash [PostgreSQL]
uv add asyncpg              # or psycopg (sync fallback)
```

```bash [MySQL / MariaDB]
uv add asyncmy              # recommended; aiomysql also works
```

```bash [SQL Server]
uv add asyncodbc            # also needs OS-level ODBC Driver 18
```
:::

## Container deployment

`.env.docker` example (Postgres):

```dotenv
DB_URL="postgres://postgres:postgres@db:5432/fastsoyadmin"
```

Add a Postgres container under `db` in `docker-compose.yml`; sample in `deploy/`.

## Business module standalone database (advanced)

A business module may need a **separate database** (e.g. an OLAP DB for billing). Autodiscover supports this.

### Declaration

In the module's `config.py`:

```python
# app/business/billing/config.py
from pydantic_settings import BaseSettings


class BillingSettings(BaseSettings):
    DB_URL: str = "postgres://user:pwd@billing-host:5432/billing"

    model_config = {"env_file": ".env", "extra": "ignore", "env_prefix": "BILLING_"}


BIZ_SETTINGS = BillingSettings()
```

`.env` can override with `BILLING_DB_URL=...`.

### What happens

`app/core/autodiscover.py`'s `discover_business_db_configs()` at startup:

1. Scans `app/business/*/config.py`
2. Extracts any object with a `DB_URL` attribute
3. If the value **differs** from the main `DB_URL`, registers a new connection `conn_billing` and mounts the module's models under `app_billing`
4. If the value **equals** the main one, merges into the default connection (no side effect)

### Use the right connection in transactions

```python
from tortoise.transactions import in_transaction
from app.utils import get_db_conn
from app.business.billing.models import Invoice

async with in_transaction(get_db_conn(Invoice)):
    await Invoice.create(...)
```

`get_db_conn(Model)` returns the correct connection name (`conn_system` or `conn_billing`); never hard-code.

### Standalone DB needs its own migrations

Each connection has its own migration folder:

```
migrations/
├── app_system/          # main (system + business sharing main)
└── billing/             # standalone billing DB
```

`make makemigrations` generates per-app folders.

## Common pitfalls

### 1. Connection pool size

Production high-concurrency: tune in URL:

```
postgres://user:pwd@host:5432/db?maxsize=50&minsize=5
```

### 2. SQLite concurrent writes

SQLite is single-writer by default; enable WAL:

```
sqlite:///data/app.sqlite3?journal_mode=WAL&busy_timeout=5000
```

### 3. MySQL timestamp precision

Need millisecond precision on MySQL 5.7+? Use `DATETIME(3)`. Tortoise's default is plain `DATETIME` without fractional seconds; if needed, set `auto_now=True` and let app-level handle it.

### 4. Timezone

Tortoise's `use_tz` and `timezone` are in `TORTOISE_ORM`. Defaults: `use_tz=false, timezone=Asia/Shanghai`. For PostgreSQL, prefer `use_tz=true` storing UTC to avoid DST issues.

## See also

- [Configuration](/en/backend/config) — all `.env`
- [Development guide](/en/backend/development) — adding business modules
- [Startup init](/en/backend/init-data) — relation to migration & first-time seeds
