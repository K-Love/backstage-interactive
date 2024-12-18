import { useEffect, useState } from 'react'
import {
  LineChart,
  BarChart,
  Card,
  Title,
  Text
} from '@tremor/react'

interface ImageMetrics {
  src: string
  loadTime: number
  size: number
  timestamp: string
  error: boolean
  isZoomed: boolean
}

export default function ImageAnalytics() {
  const [metrics, setMetrics] = useState<ImageMetrics[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/metrics/images')
      .then(res => res.json())
      .then(data => {
        setMetrics(data)
        setLoading(false)
      })
  }, [])

  const avgLoadTime = metrics.reduce((acc, m) => acc + m.loadTime, 0) / metrics.length

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Image Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Title>Average Load Time</Title>
          <Text>{avgLoadTime.toFixed(2)}ms</Text>
        </Card>

        <Card>
          <Title>Error Rate</Title>
          <Text>
            {((metrics.filter(m => m.error).length / metrics.length) * 100).toFixed(2)}%
          </Text>
        </Card>

        <Card className="col-span-2">
          <Title>Load Times Over Time</Title>
          <LineChart
            data={metrics}
            index="timestamp"
            categories={["loadTime"]}
            colors={["blue"]}
          />
        </Card>

        <Card className="col-span-2">
          <Title>Most Loaded Images</Title>
          <BarChart
            data={Object.entries(
              metrics.reduce((acc, m) => {
                acc[m.src] = (acc[m.src] || 0) + 1
                return acc
              }, {} as Record<string, number>)
            ).map(([src, count]) => ({
              src: src.split('/').pop(),
              count
            }))}
            index="src"
            categories={["count"]}
          />
        </Card>
      </div>
    </div>
  )
}