import React, { useState } from 'react'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import usePluginHistory, { type Metric } from './usePluginHistory'

const METRICS: { key: Metric; label: string; color: string }[] = [
  { key: 'unique_run_count', label: 'Users', color: '#6366f1' },
  { key: 'install_count', label: 'Saves', color: '#f59e0b' },
  { key: 'like_count', label: 'Likes', color: '#f43f5e' },
]

interface PluginRowChartProps {
  pluginId: string
  pluginName: string
}

const PluginRowChart = ({ pluginId, pluginName }: PluginRowChartProps) => {
  const [metric, setMetric] = useState<Metric>('unique_run_count')
  const { chartData, loading } = usePluginHistory(metric)

  const activeMetric = METRICS.find(m => m.key === metric)!

  const chartConfig: ChartConfig = {
    value: { label: activeMetric.label, color: activeMetric.color },
  }

  const pluginChartData = chartData
    .map(point => ({ date: point.date, value: point[pluginId] as number | undefined }))
    .filter(point => point.value !== undefined)

  if (loading) {
    return <Skeleton className="w-full h-40" />
  }

  if (pluginChartData.length === 0) {
    return <p className="text-xs text-muted-foreground py-4 text-center">No history data</p>
  }

  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex items-center justify-between px-2">
        <span className="text-xs text-muted-foreground">{pluginName} daily usage</span>
        <div className="flex gap-1">
          {METRICS.map(m => (
            <button
              key={m.key}
              onClick={() => setMetric(m.key)}
              className={`px-2 py-0.5 text-xs rounded-md transition-colors ${
                metric === m.key
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-36 w-full">
        <BarChart data={pluginChartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: string) => v.slice(5)}
            tick={{ fontSize: 10 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={36}
            tick={{ fontSize: 10 }}
            allowDecimals={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="value"
            name={activeMetric.label}
            fill={activeMetric.color}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default PluginRowChart
