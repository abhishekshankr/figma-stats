import * as React from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import type { Plugin } from './useFetchPlugins'

interface PluginStatsTableProps {
  pluginsData: Plugin[]
}

export default function PluginStatsTable({ pluginsData }: PluginStatsTableProps) {
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
        {pluginsData.map((plugin, index) => (
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
