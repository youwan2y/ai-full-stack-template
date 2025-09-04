'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { postAPI, Post } from '@/lib/api'

const postSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  content: z.string().min(1, '内容不能为空'),
})

type PostFormData = z.infer<typeof postSchema>

interface PostListProps {
  token: string
}

export function PostList({ token }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await postAPI.getPosts()
      setPosts(response.data)
    } catch (error) {
      console.error('获取文章失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: PostFormData) => {
    try {
      if (editingPost) {
        await postAPI.updatePost(editingPost.id, data)
      } else {
        await postAPI.createPost(data)
      }
      fetchPosts()
      reset()
      setIsCreating(false)
      setEditingPost(null)
    } catch (error) {
      console.error('保存文章失败:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除这篇文章吗？')) {
      try {
        await postAPI.deletePost(id)
        fetchPosts()
      } catch (error) {
        console.error('删除文章失败:', error)
      }
    }
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    reset(post)
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingPost(null)
    reset()
  }

  if (isLoading) {
    return <div className="text-center">加载中...</div>
  }

  return (
    <div className="space-y-6">
      {!isCreating && !editingPost && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">文章列表</h2>
          <Button onClick={() => setIsCreating(true)}>
            创建新文章
          </Button>
        </div>
      )}

      {(isCreating || editingPost) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPost ? '编辑文章' : '创建文章'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">标题</Label>
                <Input
                  id="title"
                  placeholder="请输入标题"
                  {...register('title')}
                />
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">内容</Label>
                <textarea
                  id="content"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="请输入内容"
                  {...register('content')}
                />
                {errors.content && (
                  <p className="text-sm text-red-600">{errors.content.message}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingPost ? '更新' : '创建'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  取消
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                创建时间: {new Date(post.created_at).toLocaleString('zh-CN')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {post.content}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(post)}
                >
                  编辑
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(post.id)}
                >
                  删除
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {posts.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">暂无文章</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}