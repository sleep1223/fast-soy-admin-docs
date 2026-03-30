# Data Models

All ORM models are defined with Tortoise ORM in `app/models/system/admin.py`.

## User

```python
class User(BaseModel):
    user_name: str              # Username (unique)
    password: str               # Password (Argon2 hash)
    nick_name: str              # Display name
    gender: GenderType          # Gender enum
    email: str                  # Email address
    phone: str                  # Phone number
    last_login: datetime        # Last login timestamp
    status_type: StatusType     # Enabled / Disabled

    # Relations
    by_user_roles: M2M[Role]    # User ↔ Role (many-to-many)
```

## Role

```python
class Role(BaseModel):
    role_name: str              # Role display name
    role_code: str              # Role code (unique, e.g., R_SUPER, R_ADMIN)
    description: str            # Description
    status_type: StatusType     # Enabled / Disabled

    # Relations
    by_role_menus: M2M[Menu]    # Role ↔ Menu (many-to-many)
    by_role_apis: M2M[Api]      # Role ↔ API (many-to-many)
    by_role_buttons: M2M[Button] # Role ↔ Button (many-to-many)
    by_role_home: FK[Menu]      # Default home page (foreign key)
```

## Menu

```python
class Menu(BaseModel):
    menu_name: str              # Menu display name
    route_path: str             # Frontend route path
    component: str              # Frontend component path
    parent_id: int              # Parent menu ID (0 = root)
    icon: str                   # Iconify icon name
    i18n_key: str               # Internationalization key
    redirect: str               # Redirect path
    props: bool                 # Pass route params as props
    constant: bool              # Constant route (no auth required)
    hide_in_menu: bool          # Hide in sidebar menu
    multi_tab: bool             # Allow multiple tabs
    keep_alive: bool            # Cache with keep-alive
    status_type: StatusType     # Enabled / Disabled

    # Relations
    by_menu_buttons: M2M[Button]  # Menu ↔ Button
    active_menu: FK[Menu]         # Active menu for hidden routes
```

## Api

```python
class Api(BaseModel):
    api_path: str               # API endpoint path
    api_method: str             # HTTP method (GET, POST, etc.)
    summary: str                # API description
    tags: str                   # API tags
    status_type: StatusType     # Enabled / Disabled

    # Reverse relation
    by_api_roles: M2M[Role]     # API ↔ Role
```

APIs are auto-registered on application startup by scanning FastAPI router endpoints.

## Button

```python
class Button(BaseModel):
    button_code: str            # Button code (e.g., B_USER_ADD)
    button_desc: str            # Button description
    status_type: StatusType     # Enabled / Disabled

    # Relations
    by_button_menus: M2M[Menu]  # Button ↔ Menu
    by_button_roles: M2M[Role]  # Button ↔ Role
```

## Enums

```python
class GenderType(IntEnum):
    MALE = 1
    FEMALE = 2

class StatusType(IntEnum):
    ENABLED = 1
    DISABLED = 2

class MenuType(IntEnum):
    DIRECTORY = 1
    MENU = 2
```

## Database

| Setting | Default |
|---------|---------|
| Engine | SQLite (`app_system.sqlite3`) |
| ORM | Tortoise ORM |
| Migrations | Aerich |
| Cache | Redis via fastapi-cache2 |

### Migration Commands

```bash
aerich init-db                # Initialize database
aerich migrate                # Generate migration
aerich upgrade                # Apply migration
```
