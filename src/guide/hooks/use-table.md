# useTable

`useTable` is a UI-agnostic hook for managing table data with pagination, column visibility, and data transformation.

## Basic Usage

```typescript
import { useTable } from '@/hooks/common/table';

const { data, loading, columns, pagination, getData } = useTable({
  apiFn: fetchUserList,
  apiParams: {
    current: 1,
    size: 10
  },
  columns: () => [
    { key: 'userName', title: 'Username' },
    { key: 'email', title: 'Email' },
    { key: 'status', title: 'Status' }
  ],
  transformer: (res) => ({
    data: res.data.records,
    pageNum: res.data.current,
    pageSize: res.data.size,
    total: res.data.total
  })
});
```

## Naive UI Extensions

### useNaiveTable

Adds Naive UI column definitions with scroll width calculation:

```typescript
import { useNaiveTable } from '@/hooks/common/table';

const { columns, scrollX } = useNaiveTable({
  columns: () => [
    { key: 'userName', title: 'Username', width: 150 },
    { key: 'email', title: 'Email', minWidth: 200 },
    { key: 'actions', title: 'Actions', width: 120, fixed: 'right' }
  ]
});
```

### useTableOperate

Manages CRUD UI states:

```typescript
import { useTableOperate } from '@/hooks/common/table';

const {
  drawerVisible,
  operateType,      // 'add' | 'edit'
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
} = useTableOperate(data, getData);

// Open add drawer
handleAdd();

// Open edit drawer with data
handleEdit(rowData);
```

## Data Transformer

The `transformer` function converts backend pagination response to the standard format:

```typescript
transformer: (response) => ({
  data: response.data.records,   // Table data array
  pageNum: response.current,     // Current page number
  pageSize: response.size,       // Items per page
  total: response.total          // Total items
})
```

## Column Visibility

Columns can be shown/hidden at runtime. The `columns` reactive array tracks visibility state.

## Refresh

Call `getData()` to refresh the table data. It uses the current pagination and filter parameters.
