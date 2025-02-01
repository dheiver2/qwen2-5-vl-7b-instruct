import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Qwen Chat',
  description: 'Your AI assistant powered by Qwen2.5-VL-7B-Instruct',
  authors: [{ name: 'Qwen Team' }],
  keywords: ['AI', 'Chat', 'Assistant', 'Qwen', 'Image Generation', 'Code'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        {children}
      </body>
    </html>
  )
}