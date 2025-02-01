import dynamic from 'next/dynamic'

const ChatInterface = dynamic(() => import('@/components/ChatInterface'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
    </div>
  ),
})

export default function Home() {
  return (
    <main className="h-full">
      <ChatInterface />
    </main>
  )
}