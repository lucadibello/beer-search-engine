import Nav from "@/components/Nav"
import { Providers } from "@/providers/providers"
import { Inter } from "next/font/google"

// FIXME: We need to find a better description...
export const metadata = {
  title: "Beer Search Engine",
  description: "As the name suggests, this is a beer search engine.",
}

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          {/* Sticky navbar */}
          <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <Nav />
          </div>

          {/* Main content */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
