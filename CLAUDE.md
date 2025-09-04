# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个全栈应用模板，使用 FastAPI + Next.js + Tailwind CSS + shadcn/ui + SQLite 构建。

## 常用命令



### 后端开发
```bash
cd backend
python -m venv venv  # 创建虚拟环境（如果不存在）
venv\Scripts\activate  # Windows 激活虚拟环境
pip install -r requirements.txt  # 安装依赖
uvicorn app.main:app --reload  # 启动开发服务器
```

### 前端开发
```bash
cd frontend
npm install  # 安装依赖
npm run dev  # 启动开发服务器
npm run build  # 构建生产版本
npm run lint  # 运行 ESLint
```

## 架构说明

### 后端架构 (FastAPI)
- **主应用**: `backend/app/main.py` - FastAPI 应用入口，配置 CORS 和路由
- **数据模型**: `backend/app/models.py` - SQLAlchemy 数据库模型
- **路由**: `backend/app/routers/` - API 路由模块（users, posts）
- **认证**: `backend/app/auth.py` - JWT 认证相关逻辑
- **数据库**: `backend/app/database.py` - SQLAlchemy 数据库连接配置
- **数据验证**: `backend/app/schemas.py` - Pydantic 数据模式定义

### 前端架构 (Next.js)
- **应用路由**: `frontend/src/app/` - Next.js 13+ App Router 结构
- **组件**: `frontend/src/components/` - React 组件，使用 shadcn/ui
- **工具库**: `frontend/src/lib/` - 通用工具函数和配置

### 技术栈
- **后端**: FastAPI, SQLAlchemy, Pydantic, JWT 认证, SQLite
- **前端**: Next.js 15, React 18, TypeScript, Tailwind CSS, shadcn/ui
- **表单**: react-hook-form + zod 验证
- **HTTP 客户端**: axios

### 数据库
- 使用 SQLite 作为开发数据库
- 数据库文件：`backend/app.db`
- 使用 Alembic 进行数据库迁移

### API 端点
- 后端运行在 `http://localhost:8000`
- API 文档：`http://localhost:8000/docs`
- 前端运行在 `http://localhost:3000`

### 开发注意事项
- 后端配置了 CORS，只允许来自 `http://localhost:3000` 的请求
- 使用虚拟环境管理 Python 依赖
- 前端使用 ESLint 进行代码规范检查