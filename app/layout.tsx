import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Convenience Store ERP',
  description: 'Complete ERP system for convenience store management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
