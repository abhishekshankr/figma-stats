import React from 'react'
import { Users, Bookmark, ThumbsUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { SpeedInsights } from '@vercel/speed-insights/react'
import useFetchPlugins from './useFetchPlugins'
import PluginStatsTable from './PluginStatsTable'
import PluginTrendsChart from './PluginTrendsChart'

const App = () => {
  const { pluginsData, totals, loading } = useFetchPlugins()

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Header Card */}
        <Card className="flex-1 p-8 flex flex-col justify-center">
          <h1 className="text-2xl">Abhishek's Figma Plugin Stats</h1>
          <a
            href="https://www.figma.com/@abhishekshankar"
            className="text-sm text-muted-foreground hover:underline mt-1"
          >
            @abhishekshankar
          </a>
        </Card>

        {/* Total Users Card */}
        <Card className="flex-1 p-8 flex flex-col items-center justify-center gap-2">
          <Users className="w-8 h-8 text-muted-foreground" />
          {loading ? <Skeleton className="h-10 w-20" /> : <span className="text-4xl">{totals.totalRuns}</span>}
          <Badge variant="secondary">Total Users</Badge>
        </Card>

        {/* Total Saves Card */}
        <Card className="flex-1 p-8 flex flex-col items-center justify-center gap-2">
          <Bookmark className="w-8 h-8 text-muted-foreground" />
          {loading ? <Skeleton className="h-10 w-20" /> : <span className="text-4xl">{totals.totalInstalls}</span>}
          <Badge variant="secondary">Total Saves</Badge>
        </Card>

        {/* Total Likes Card */}
        <Card className="flex-1 p-8 flex flex-col items-center justify-center gap-2">
          <ThumbsUp className="w-8 h-8 text-muted-foreground" />
          {loading ? <Skeleton className="h-10 w-20" /> : <span className="text-4xl">{totals.totalLikes}</span>}
          <Badge variant="secondary">Total Likes</Badge>
        </Card>
      </div>

      {/* Plugin Trends Chart */}
      <PluginTrendsChart />

      {/* Plugin Stats Table */}
      <Card className="p-0">
        <CardContent className="p-0">
          <PluginStatsTable pluginsData={pluginsData} loading={loading} />
        </CardContent>
      </Card>

      <SpeedInsights />
    </div>
  )
}

export default App
