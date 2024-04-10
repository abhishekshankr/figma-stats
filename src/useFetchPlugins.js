import { useEffect, useState } from 'react';

const useFetchPlugins = () => {
  const [pluginsData, setPluginsData] = useState([]);
  const [totals, setTotals] = useState({ totalRuns: 0, totalInstalls: 0, totalLikes: 0 });

  useEffect(() => {
    fetch('https://www.figma.com/api/plugins/profile/2392090?')
      .then(response => response.json())
      .then(data => {
        const plugins = data.meta.map(plugin => {
          const firstVersionKey = Object.keys(plugin.versions)[0];
          const firstVersion = plugin.versions[firstVersionKey];
          return {
            ...plugin,
            name: firstVersion.name
          };
        }).sort((a, b) => b.like_count - a.like_count);
        
        setPluginsData(plugins);
        
        const totalRuns = plugins.reduce((acc, plugin) => acc + plugin.unique_run_count, 0);
        const totalInstalls = plugins.reduce((acc, plugin) => acc + plugin.install_count, 0);
        const totalLikes = plugins.reduce((acc, plugin) => acc + plugin.like_count, 0);
        
        setTotals({ totalRuns, totalInstalls, totalLikes });
      })
      .catch(error => console.error('Error fetching plugin data:', error));
  }, []);

  return { pluginsData, totals };
};

export default useFetchPlugins;
