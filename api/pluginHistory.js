// api/pluginHistory.js
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const days = parseInt(req.query.days ?? '30', 10)
  const since = new Date()
  since.setDate(since.getDate() - days)
  const sinceStr = since.toISOString().slice(0, 10)

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { data, error } = await supabase
    .from('plugin_stats_history')
    .select('plugin_id, plugin_name, unique_run_count, install_count, like_count, recorded_at')
    .gte('recorded_at', sinceStr)
    .order('recorded_at', { ascending: true })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json(data)
}
