// api/fetchAndStore.js
import { createClient } from '@supabase/supabase-js'

const figmaApiUrl = 'https://www.figma.com/api/plugins/profile/2392090?'

const figmaHeaders = {
  "Accept": "application/json",
  "Accept-Language": "en-US,en;q=0.9",
  "Content-Type": "application/json",
  "tsid": "IcCc7EQuUAOq2aR8",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
  "X-Csrf-Bypass": "yes"
}

export default async function handler(req, res) {
  const authHeader = req.headers['authorization']
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    const figmaResponse = await fetch(figmaApiUrl, { method: 'GET', headers: figmaHeaders })
    const data = await figmaResponse.json()

    const rows = data.meta.map((plugin) => {
      const firstVersionKey = Object.keys(plugin.versions)[0]
      const name = firstVersionKey ? plugin.versions[firstVersionKey].name : plugin.id
      return {
        plugin_id: plugin.id,
        plugin_name: name,
        unique_run_count: plugin.unique_run_count,
        install_count: plugin.install_count,
        like_count: plugin.like_count,
      }
    })

    const { error } = await supabase
      .from('plugin_stats_history')
      .upsert(rows, { onConflict: 'plugin_id,recorded_at' })

    if (error) throw error

    res.status(200).json({ ok: true, inserted: rows.length })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
