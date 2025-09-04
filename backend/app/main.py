from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import users, posts
from .database import engine
from . import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="全栈应用 API",
    description="使用 FastAPI 构建的后端 API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/api", tags=["users"])
app.include_router(posts.router, prefix="/api", tags=["posts"])

@app.get("/")
def read_root():
    return {"message": "欢迎使用全栈应用 API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}