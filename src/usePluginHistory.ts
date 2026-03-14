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
    // Group rows by plugin, sorted by date
    const byPlugin: Record<string, RawRow[]> = {}
    for (const row of rawRows) {
      if (!byPlugin[row.plugin_id]) byPlugin[row.plugin_id] = []
      byPlugin[row.plugin_id].push(row)
    }
    for (const rows of Object.values(byPlugin)) {
      rows.sort((a, b) => a.recorded_at.localeCompare(b.recorded_at))
    }

    // Collect all dates
    const allDates = [...new Set(rawRows.map(r => r.recorded_at))].sort()

    // Build chart data as daily deltas (today's value - yesterday's value)
    const byDate: Record<string, ChartDataPoint> = {}
    for (const date of allDates) {
      byDate[date] = { date }
    }

    for (const [pluginId, rows] of Object.entries(byPlugin)) {
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const prev = rows[i - 1]
        const delta = prev ? Math.max(0, row[metric] - prev[metric]) : 0
        byDate[row.recorded_at][pluginId] = delta
      }
    }

    // Drop the first data point (no previous to diff against, always 0)
    return Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date)).slice(1)
  }, [rawRows, metric])

  return { chartData, pluginNames, loading, error }
}

export default usePluginHistory
