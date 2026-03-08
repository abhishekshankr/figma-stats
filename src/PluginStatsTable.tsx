import * as React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import type { Plugin } from './useFetchPlugins'
import PluginRowChart from './PluginRowChart'

interface PluginStatsTableProps {
  pluginsData: Plugin[]
  loading: boolean
}

export default function PluginStatsTable({ pluginsData, loading }: PluginStatsTableProps) {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(0)

  const toggle = (i: number) => setExpandedIndex(prev => (prev === i ? null : i))

  return (
    <Table aria-label="plugin stats table">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%] pl-8">Plugin Name</TableHead>
          <TableHead className="text-center">Users</TableHead>
          <TableHead className="text-center">Saves</TableHead>
          <TableHead className="text-center">Likes</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="pl-8 py-4"><Skeleton className="h-4 w-40" /></TableCell>
                <TableCell className="text-center py-4"><Skeleton className="h-4 w-10 mx-auto" /></TableCell>
                <TableCell className="text-center py-4"><Skeleton className="h-4 w-10 mx-auto" /></TableCell>
                <TableCell className="text-center py-4"><Skeleton className="h-4 w-10 mx-auto" /></TableCell>
                <TableCell />
              </TableRow>
            ))
          : pluginsData.map((plugin, index) => (
              <React.Fragment key={index}>
                <TableRow
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => toggle(index)}
                >
                  <TableCell className="pl-8 py-4">{plugin.name}</TableCell>
                  <TableCell className="text-center py-4">{plugin.unique_run_count}</TableCell>
                  <TableCell className="text-center py-4">{plugin.install_count}</TableCell>
                  <TableCell className="text-center py-4">{plugin.like_count}</TableCell>
                  <TableCell className="pr-4 text-muted-foreground">
                    {expandedIndex === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </TableCell>
                </TableRow>
                {expandedIndex === index && (
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableCell colSpan={5} className="px-8 pb-4">
                      <PluginRowChart pluginId={plugin.id} pluginName={plugin.name ?? ''} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
      </TableBody>
    </Table>
  )
}
