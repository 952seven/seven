# 图书管理系统

这是一个基于 React + TypeScript + Redux Toolkit 的单页应用

## 核心亮点

- 模块化目录：core / store / features / shared 分层清晰，便于团队协作与未来扩展
- 自研日志系统：策略模式 + 传输层抽象（Transport）+ 格式化抽象（Formatter）
- Redux 最佳实践：Redux Toolkit + 强类型 hooks + 中间件（持久化、日志）
- 可维护性：业务逻辑通过自定义 hooks 聚合，UI 组件职责单一

## 技术栈

- React 18 + TypeScript
- Redux Toolkit + React Redux
- Vite 构建
- SCSS Modules（样式隔离）
- LocalStorage 持久化（中间件实现）

## 运行方式

```bash
npm install
npm run dev
```

## 目录结构（概览）

```text
src/
  core/                 基础设施层（日志系统等）
  store/                全局状态管理（Redux Store / Slices / Middleware）
  features/             业务领域模块（图书）
  shared/               跨业务共享的基础组件（按钮、输入框、弹窗）
  App.tsx               应用组合根（页面组合、弹窗协调）
  main.tsx              React 渲染入口（挂载 Provider）
```

## 日志系统说明（简述）

- Logger 仅负责组装 LogEntry 并分发给多个 Transport
- Transport 负责“把日志送到哪里”，当前为控制台输出；未来可扩展文件写入、API 上传、ES/MongoDB 等
- Formatter 负责“日志长什么样”，解耦输出结构与输出渠道

