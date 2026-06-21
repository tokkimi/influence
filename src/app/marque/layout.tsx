import DashboardLayout from '@/components/layout/DashboardLayout'

export default function MarqueLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`body { background: #0c0c0c !important; }`}</style>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  )
}
