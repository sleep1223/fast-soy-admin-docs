# 前端开发

## 项目配置
> 只有原始的SoybeanAdmin才需要修改
修改 `.env.test`
```
VITE_SERVICE_BASE_URL=http://127.0.0.1:9999/api/v1
```


## 新增一个页面

### 新建顶级菜单

src/views/ 下新建一个文件夹, 文件夹名是顶级路由名

### 定义数据结构

#### 枚举类
src/constants/business.ts

``` ts
export const enableStatusRecord: Record<Api.Common.EnableStatus, App.I18n.I18nKey> = {
  '1': 'page.manage.common.status.enable',
  '2': 'page.manage.common.status.disable'
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);

```
#### 定义菜单
src/typings/app.d.ts 的 App.I18n.Schema.page 定义你的数据结构
例如, 顶级菜单系统管理下的API管理
``` ts
api: {
  title: string;
  path: string;
  method: string;
  summary: string;
  tags: string;
  status: string;
  form: {
    path: string;
    method: string;
    summary: string;
    tags: string;
    status: string;
  };
  addApi: string;
  editApi: string;
  methods: {
    GET: string;
    POST: string;
    PUT: string;
    PATCH: string;
    DELETE: string;
  };
};
```


#### 定义API数据结构

src/typings/api.d.ts
``` ts
/**
 * api method
 *
 * - "1": "GET"
 * - "2": "POST"
 * - "3": "PUT"
 * - "4": "PATCH"
 * - "5": "DELETE"
 */
type methods = 'get' | 'post' | 'put' | 'patch' | 'delete';

/** api */
type Api = Common.CommonRecord<{
  /** api path */
  path: string;
  /** api method */
  method: methods;
  /** api summary */
  summary: string;
  /** api tags name */
  tags: string;
}>;

/** api add params */
type ApiAddParams = Pick<Api.SystemManage.Api, 'path' | 'method' | 'summary' | 'tags' | 'status'>;

/** api update params */
type ApiUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.Api, 'id'>> & ApiAddParams;

/** api search params */
type ApiSearchParams = CommonType.RecordNullable<
  Pick<Api.SystemManage.Api, 'path' | 'method' | 'summary' | 'tags' | 'status'> & CommonSearchParams
>;

/** api list */
type ApiList = Common.PaginatingQueryRecord<Api>;
```

### 定义API
src/service/api/system-manage.ts
一个增删改查的例子
``` ts
/** get api list */
export function fetchGetApiList(params?: Api.SystemManage.ApiSearchParams) {
  return request<Api.SystemManage.ApiList>({
    url: '/system-manage/apis',
    method: 'get',
    params
  });
}

/** add api */
export function fetchAddApi(data?: Api.SystemManage.ApiAddParams) {
  return request<Api.SystemManage.ApiList, 'json'>({
    url: '/system-manage/apis',
    method: 'post',
    data
  });
}

/** delete api */
export function fetchDeleteApi(data?: Api.SystemManage.CommonDeleteParams) {
  return request<Api.SystemManage.ApiList>({
    url: `/system-manage/apis/${data?.id}`,
    method: 'delete'
  });
}

export function fetchBatchDeleteApi(data?: Api.SystemManage.CommonBatchDeleteParams) {
  return request<Api.SystemManage.ApiList>({
    url: '/system-manage/apis',
    method: 'delete',
    params: { ids: data?.ids.join(',') }
  });
}
/** update api */
export function fetchUpdateApi(data?: Api.SystemManage.ApiUpdateParams) {
  return request<Api.SystemManage.ApiList, 'json'>({
    url: `/system-manage/apis/${data?.id}`,
    method: 'patch',
    data
  });
}
```

### 添加页面逻辑
复制 src/views/manage/user 文件夹覆盖当前新建的文件夹

修改 index.vue
修改 apiFn: fetchGetApiList, 为获取数据列表的API
修改 columns, 从path开始, 枚举结构需要重写render
``` ts
columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'path',
      title: $t('page.manage.api.path'),
      align: 'center',
      minWidth: 50
    },
    {
      key: 'status',
      title: $t('page.manage.api.status'),
      align: 'center',
      width: 100,
      render: row => {
        if (row.status === null) {
          return null;
        }
        const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
          1: 'success',
          2: 'warning'
        };
        const label = $t(enableStatusRecord[row.status]);
        return <NTag type={tagMap[row.status]}>{label}</NTag>;
      }
    }
]
```

搜索框在 ./modules/api-search.vue

rules 是验证规则, 如需新增与编辑规则动态变化可以参考 src\views\manage\user\modules\user-operate-drawer.vue

新增和编辑的抽屉在 ./modules/user-operate-drawer.vue
