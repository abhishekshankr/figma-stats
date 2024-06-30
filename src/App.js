import React from 'react';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Link from '@mui/joy/Link';
import PeopleIcon from '@mui/icons-material/People';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import useFetchPlugins from './useFetchPlugins';
import PluginStatsTable from './PluginStatsTable';
import { SpeedInsights } from '@vercel/speed-insights/react';

const App = () => {
  const { pluginsData, totals } = useFetchPlugins();

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ m: 'auto', p: 2}}
    >
      <Stack spacing={{xs: 2, sm: 2, md: 2}}
      sx={{ m: 'auto'}}
      direction={{ xs: 'column', sm: 'column', md: 'row' }}>
        {/* Plugin Stats Card 
        <Card variant="soft" color="neutral" invertedColors={true} sx={{ flex: 1, p: 4, borderRadius: "xl", alignSelf: "flex-start" }}>

          <Chip
            size="md"
            variant="soft"
            sx={{ alignSelf: 'flex-start', borderRadius: 'xl' }}
          >
            Watchlist
          </Chip>


          <Typography level="title-lg">Animated Emoji</Typography>

          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Stack direction="column" alignItems="center">
              <Typography level="h1">{animatedEmojisStats.unique_run_count}</Typography>
              <Typography level="body-xs">Uses</Typography>
            </Stack>

            <Stack direction="column" alignItems="center">
              <Typography level="h1">{animatedEmojisStats.install_count}</Typography>
              <Typography level="body-xs">Saves</Typography></Stack>

            <Stack direction="column" alignItems="center">
              <Typography level="h1">{animatedEmojisStats.like_count}</Typography>
              <Typography level="body-xs">Likes</Typography>
            </Stack>
          </Stack>

        </Card>*/}

        <Card invertedColors={true} sx={{ flex: 1, p: 4, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', borderRadius: "xl" }}>

          <Typography level="h2">Abhishek's Figma Plugin Stats</Typography>
          <Link href="https://www.figma.com/@abhishekshankar" variant='neutral' level='body-sm'>@abhishekshankar</Link>

        </Card>

        
        {/* Total Users Card */}
        <Card variant="soft" color="success" invertedColors={true} sx={{ flex: 1, p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: "xl" }}>
          <PeopleIcon fontSize='xl4' />

          <Typography level="h1">{totals.totalRuns}</Typography>
          <Chip
            size="lg"
            variant="soft"
            sx={{ alignSelf: 'center', borderRadius: 'xl' }}
          >
            Total Users
          </Chip>

        </Card>



        {/* Total Saves Card */}
        <Card variant="soft" color="danger" invertedColors={true} sx={{ flex: 1, p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: "xl" }}>
          <BookmarksIcon fontSize='xl4' />
          <Typography level="h1">{totals.totalInstalls}</Typography>
          <Chip
            size="lg"
            variant="soft"
            sx={{ alignSelf: 'center', borderRadius: 'xl' }}
          >
            Total Saves
          </Chip>
        </Card>

        {/* Total Likes Card */}
        <Card variant="soft" color="primary" invertedColors={true} sx={{ flex: 1, p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: "xl" }}>
          <ThumbUpIcon fontSize='xl4' />

          <Typography level="h1">{totals.totalLikes}</Typography>
          <Chip
            size="lg"
            variant="soft"
            sx={{ alignSelf: 'center', borderRadius: 'xl' }}
          >
            Total Likes
          </Chip>
        </Card>
        </Stack>

      {/* Plugin Stats Table */}
      <Card variant="outlined" sx={{ p: 0, borderRadius: "xl" }}>
        <PluginStatsTable pluginsData={pluginsData} totals={totals} />
      </Card>
      <SpeedInsights />
    </Stack>
  );
};

export default App;
