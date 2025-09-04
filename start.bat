@echo off
echo 🚀 启动全栈应用...

REM 检查是否安装了 Python 和 Node.js
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python 未安装，请先安装 Python
    pause
    exit /b 1
)

node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装，请先安装 Node.js
    pause
    exit /b 1
)

REM 安装后端依赖
echo 📦 安装后端依赖...
cd backend
if not exist "venv" (
    python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt

REM 启动后端服务
echo 🔧 启动后端服务...
start "Backend Server" uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

REM 安装前端依赖
echo 📦 安装前端依赖...
cd ..\frontend
npm install

REM 启动前端服务
echo 🎨 启动前端服务...
start "Frontend Server" npm run dev

echo ✅ 应用启动成功！
echo 📱 前端地址: http://localhost:3000
echo 🔧 后端地址: http://localhost:8000
echo 📚 API 文档: http://localhost:8000/docs
echo.
echo 按任意键关闭此窗口...
pause >nul