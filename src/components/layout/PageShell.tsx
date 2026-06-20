import Navbar from './Navbar'
import Footer from './Footer'

interface PageShellProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen pt-14">
        {/* Header sobre */}
        <div className="border-b border-black/6 bg-[#fafaf8]">
          <div className="max-w-4xl mx-auto px-5 py-10">
            <p className="text-[10px] font-medium uppercase tracking-widest text-[#c9993a] mb-2">Dot The Talents</p>
            <h1 className="text-lg font-bold text-[#0f0f0f] tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-[#6b6b6b] mt-1">{subtitle}</p>}
          </div>
        </div>
        {/* Contenu */}
        <div className="max-w-4xl mx-auto px-5 py-12">
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
