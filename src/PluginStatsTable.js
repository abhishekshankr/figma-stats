import * as React from 'react';
import Table from '@mui/joy/Table';

export default function PluginStatsTable({ pluginsData}) {
  return (
    <Table aria-label="plugin stats table" sx={{ '& tr > *:not(:first-child)': { textAlign: 'center' }, '& tr > th:first-of-type, & tr > td:first-of-type': { paddingLeft: '32px' } }}>
      <thead >
        <tr>
          <th style={{ width: '40%'}}>Plugin Name</th>
          <th>Users</th>
          <th>Saves</th>
          <th>Likes</th>
        </tr>
      </thead>
      <tbody>
        {pluginsData.map((plugin, index) => (
          <tr key={index}>
            <td>{plugin.name}</td>
            <td>{plugin.unique_run_count}</td>
            <td>{plugin.install_count}</td>
            <td>{plugin.like_count}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
