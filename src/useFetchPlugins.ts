import { useEffect, useState } from 'react'

export interface Plugin {
  id: string
  name: string
  unique_run_count: number
  install_count: number
  like_count: number
  versions: Record<string, { name: string }>
}

export interface Totals {
  totalRuns: number
  totalInstalls: number
  totalLikes: number
}

const useFetchPlugins = () => {
  const [pluginsData, setPluginsData] = useState<Plugin[]>([])
  const [totals, setTotals] = useState<Totals>({ totalRuns: 0, totalInstalls: 0, totalLikes: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/figmaData')
      .then(response => response.json())
      .then(data => {
        const plugins: Plugin[] = data.meta.map((plugin: Plugin) => {
          const firstVersionKey = Object.keys(plugin.versions)[0]
          const name = firstVersionKey ? plugin.versions[firstVersionKey].name : plugin.id
          return { ...plugin, name }
        }).sort((a: Plugin, b: Plugin) => b.unique_run_count - a.unique_run_count)

        setPluginsData(plugins)

        const totalRuns = plugins.reduce((acc, p) => acc + p.unique_run_count, 0)
        const totalInstalls = plugins.reduce((acc, p) => acc + p.install_count, 0)
        const totalLikes = plugins.reduce((acc, p) => acc + p.like_count, 0)

        setTotals({ totalRuns, totalInstalls, totalLikes })
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching plugin data:', error)
        setLoading(false)
      })
  }, [])

  return { pluginsData, totals, loading }
}

export default useFetchPlugins
