import type { Metadata } from 'next'
import './globals.css'
import ChatWidget from '@/components/chat/ChatWidget'

export const metadata: Metadata = {
  title: 'SALAMAN - B2B Marketplace UMKM',
  description: 'Solusi Aman Layanan Antar Mitra UMKM Atas Niaga',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
