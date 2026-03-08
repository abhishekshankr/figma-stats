import React, { useState } from 'react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'
import usePluginHistory, { type Metric } from './usePluginHistory'

const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

const METRICS: { key: Metric; label: string }[] = [
  { key: 'unique_run_count', label: 'Users' },
  { key: 'install_count', label: 'Saves' },
  { key: 'like_count', label: 'Likes' },
]

const PluginTrendsChart = () => {
  const [metric, setMetric] = useState<Metric>('unique_run_count')
  const { chartData, pluginNames, loading } = usePluginHistory(metric)

  const pluginIds = Object.keys(pluginNames)

  const chartConfig: ChartConfig = Object.fromEntries(
    pluginIds.map((id, i) => [
      id,
      { label: pluginNames[id], color: CHART_COLORS[i % CHART_COLORS.length] },
    ])
  )

  if (loading) {
    return <Skeleton className="w-full h-64" />
  }

  if (chartData.length === 0) {
    return null
  }

  return (
    <Card className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">Trends</h2>
        <div className="flex gap-1">
          {METRICS.map(m => (
            <button
              key={m.key}
              onClick={() => setMetric(m.key)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
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
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="h-56 w-full">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: string) => v.slice(5)}
            />
            <YAxis tickLine={false} axisLine={false} width={40} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {pluginIds.map((id) => (
              <Line
                key={id}
                type="monotone"
                dataKey={id}
                name={pluginNames[id]}
                stroke={`var(--color-${id})`}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default PluginTrendsChart
