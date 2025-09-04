import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          全栈应用模板
        </p>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:translate-y-1/3 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-4xl font-bold text-center">
          FastAPI + Next.js
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        <Card>
          <CardHeader>
            <CardTitle>后端技术栈</CardTitle>
            <CardDescription>FastAPI + SQLAlchemy + SQLite</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              现代化的 Python Web 框架，提供自动 API 文档和类型检查
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>前端技术栈</CardTitle>
            <CardDescription>Next.js + React + TypeScript</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              全栈 React 框架，支持 SSR、SSG 和 API 路由
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>UI 组件库</CardTitle>
            <CardDescription>Tailwind CSS + shadcn/ui</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              现代化的 CSS 框架和可重用的 UI 组件库
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button size="lg">
            开始使用
          </Button>
        </Link>
        <Link href="http://localhost:8001/docs" target="_blank">
          <Button variant="outline" size="lg">
            查看 API 文档
          </Button>
        </Link>
      </div>
    </main>
  )
}