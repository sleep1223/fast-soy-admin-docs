# useTable

UI 无关的表格数据管理 Hook，支持分页、列可见性和数据转换。

```typescript
const { data, loading, columns, pagination, getData } = useTable({
  apiFn: fetchUserList,
  apiParams: { current: 1, size: 10 },
  columns: () => [...],
  transformer: (res) => ({
    data: res.data.records,
    pageNum: res.data.current,
    pageSize: res.data.size,
    total: res.data.total,
  }),
});
```

## Naive UI 扩展

- `useNaiveTable` — 列定义 + 滚动宽度
- `useNaivePaginatedTable` — 完整分页
- `useTableOperate` — CRUD 操作状态（新增、编辑、删除）
