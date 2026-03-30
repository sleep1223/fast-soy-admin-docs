# 系统主题

主题实现分为两部分：组件库主题配置（Naive UI）和 UnoCSS 主题配置。

## 原理

1. 定义主题配置变量（颜色、布局参数等）
2. 生成符合组件库规范的主题变量
3. 生成 CSS 变量传递给 UnoCSS

## 主题色

五种语义颜色，每种 10 级色阶：primary、info、success、warning、error

## 暗黑模式

通过 `<html>` 添加 `class="dark"` 激活。

## 布局模式

垂直布局、水平布局、混合布局。
