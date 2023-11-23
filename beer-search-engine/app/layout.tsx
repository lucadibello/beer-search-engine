import { Providers } from './providers'
import { Inter } from 'next/font/google'

// FIXME: We need to find a better description...
export const metadata = {
  title: 'Beer Search Engine',
  description: 'As the name suggests, this is a beer search engine.',
}

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
