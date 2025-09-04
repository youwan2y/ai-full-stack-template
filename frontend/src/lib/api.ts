import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export interface User {
  id: number
  email: string
  username: string
  is_active: boolean
  created_at: string
}

export interface Post {
  id: number
  title: string
  content: string
  author_id: number
  created_at: string
  updated_at: string
}

export interface UserCreate {
  email: string
  username: string
  password: string
}

export interface PostCreate {
  title: string
  content: string
}

export const authAPI = {
  register: (userData: UserCreate) => api.post('/api/register', userData),
  login: (userData: UserCreate) => api.post('/api/login', userData),
}

export const userAPI = {
  getUsers: () => api.get<User[]>('/api/users'),
  getUser: (id: number) => api.get<User>(`/api/users/${id}`),
}

export const postAPI = {
  getPosts: () => api.get<Post[]>('/api/posts'),
  getPost: (id: number) => api.get<Post>(`/api/posts/${id}`),
  createPost: (postData: PostCreate) => api.post<Post>('/api/posts', postData),
  updatePost: (id: number, postData: PostCreate) => api.put<Post>(`/api/posts/${id}`, postData),
  deletePost: (id: number) => api.delete(`/api/posts/${id}`),
}

export default api