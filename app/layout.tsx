import '../styles/global.css'

export const metadata = {
  title: "US-2 super awesome ad-free planning poker",
  description: 'Generated by Next.js',
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