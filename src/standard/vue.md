# Vue 书写风格

## SFC Script 顺序

1. Import 语句
2. defineOptions
3. Props + defineProps
4. Emits + defineEmits
5. Hook 函数
6. 组件逻辑
7. init 函数
8. watch / watchEffect
9. 生命周期钩子
10. defineExpose

## 模板规则

- `template` 中只能有一个根元素
- 使用简写：`:prop`、`@click`
- 无子元素的组件自闭合：`<MyComponent />`
