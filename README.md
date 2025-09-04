# 全栈应用模板

使用 FastAPI + Next.js + Tailwind CSS + shadcn/ui + SQLite 构建

## 项目结构

```
├── backend/          # FastAPI 后端
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   ├── routers/
│   │   └── database.py
│   ├── requirements.txt
│   └── .env
├── frontend/         # Next.js 前端
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 快速开始

### 后端启动
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 前端启动
```bash
cd frontend
npm install
npm run dev
```# ai-full-stack-template
