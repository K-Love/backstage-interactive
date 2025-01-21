import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard'

export const metadata = {
  title: 'Email Analytics | Backstage Interactive',
  description: 'Email analytics dashboard',
}

export default function AnalyticsPage() {
  return (
    <div className="py-8">
      <AnalyticsDashboard />
    </div>
  )
}