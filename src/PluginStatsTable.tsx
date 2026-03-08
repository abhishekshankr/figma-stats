import * as React from 'react'
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

interface PluginStatsTableProps {
  pluginsData: Plugin[]
  loading: boolean
}

export default function PluginStatsTable({ pluginsData, loading }: PluginStatsTableProps) {
  return (
    <Table aria-label="plugin stats table">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%] pl-8">Plugin Name</TableHead>
          <TableHead className="text-center">Users</TableHead>
          <TableHead className="text-center">Saves</TableHead>
          <TableHead className="text-center">Likes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="pl-8 py-4"><Skeleton className="h-4 w-40" /></TableCell>
                <TableCell className="text-center py-4"><Skeleton className="h-4 w-10 mx-auto" /></TableCell>
                <TableCell className="text-center py-4"><Skeleton className="h-4 w-10 mx-auto" /></TableCell>
                <TableCell className="text-center py-4"><Skeleton className="h-4 w-10 mx-auto" /></TableCell>
              </TableRow>
            ))
          : pluginsData.map((plugin, index) => (
              <TableRow key={index}>
                <TableCell className="pl-8 py-4">{plugin.name}</TableCell>
                <TableCell className="text-center py-4">{plugin.unique_run_count}</TableCell>
                <TableCell className="text-center py-4">{plugin.install_count}</TableCell>
                <TableCell className="text-center py-4">{plugin.like_count}</TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  )
}
