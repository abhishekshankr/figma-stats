import { useEffect, useMemo, useState } from 'react'

export type Metric = 'unique_run_count' | 'install_count' | 'like_count'

type RawRow = {
  plugin_id: string
  plugin_name: string
  unique_run_count: number
  install_count: number
  like_count: number
  recorded_at: string
}

export type ChartDataPoint = { date: string; [pluginId: string]: number | string }

const usePluginHistory = (metric: Metric) => {
  const [rawRows, setRawRows] = useState<RawRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/pluginHistory')
      .then(r => r.json())
      .then(data => {
        setRawRows(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const pluginNames = useMemo<Record<string, string>>(() => {
    const map: Record<string, string> = {}
    for (const row of rawRows) {
      map[row.plugin_id] = row.plugin_name
    }
    return map
  }, [rawRows])

  const chartData = useMemo<ChartDataPoint[]>(() => {
    const byDate: Record<string, ChartDataPoint> = {}
    for (const row of rawRows) {
      if (!byDate[row.recorded_at]) {
        byDate[row.recorded_at] = { date: row.recorded_at }
      }
      byDate[row.recorded_at][row.plugin_id] = row[metric]
    }
    return Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date))
  }, [rawRows, metric])

  return { chartData, pluginNames, loading, error }
}

export default usePluginHistory
