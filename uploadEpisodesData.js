import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://dzhihhwpilgcweiacyql.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6aGloaHdwaWxnY3dlaWFjeXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NjQzMTgsImV4cCI6MjA2MzQ0MDMxOH0.OZ12uCx9nb1pjYbWsQt6qWLAj816-waDe25F6Vm5HkY';

const supabase = createClient(supabaseUrl, supabaseKey);

const data = JSON.parse(fs.readFileSync('./data/friends.json', 'utf-8'));
const seriesId = 'friends';

console.log('🔍 All seasons:', Object.keys(data));

async function uploadEpisodes() {
  for (const seasonKey of Object.keys(data)) {
    if (!seasonKey.startsWith('season-')) {
      console.log(`⏭ Skipping key: ${seasonKey}`);
      continue;
    }

    const season = parseInt(seasonKey.replace('season-', ''), 10);
    const seasonData = data[seasonKey];

    for (const episodeKey of Object.keys(seasonData)) {
      if (!episodeKey.startsWith('episode-')) continue;

      const episode = parseInt(episodeKey.replace('episode-', ''), 10);
      const title = `S${season}E${episode}`;
      const link = '';

      const { error } = await supabase.from('episodes').insert([
        { series_id: seriesId, season, episode, title, link }
      ]);

      if (error) {
        console.error(`❌ ${title}`, error.message);
      } else {
        console.log(`✅ Inserted ${title}`);
      }
    }
  }
}

uploadEpisodes();
