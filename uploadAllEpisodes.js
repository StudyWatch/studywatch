import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://dzhihhwpilgcweiacyql.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6aGloaHdwaWxnY3dlaWFjeXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NjQzMTgsImV4cCI6MjA2MzQ0MDMxOH0.OZ12uCx9nb1pjYbWsQt6qWLAj816-waDe25F6Vm5HkY';

const supabase = createClient(supabaseUrl, supabaseKey);

// 🔄 הפוך רק את קבצי .json מתיקיית data כולל תתי תיקיות
function getAllJsonFiles(dir) {
  const files = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllJsonFiles(fullPath));
    } else if (entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  });
  return files;
}

async function uploadAllEpisodes() {
  const jsonFiles = getAllJsonFiles('./data');

  for (const filePath of jsonFiles) {
    const seriesId = path.basename(filePath, '.json');
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    console.log(`📂 Loading: ${seriesId}`);

    for (const seasonKey of Object.keys(raw)) {
      if (!seasonKey.startsWith('season-')) continue;
      const season = parseInt(seasonKey.replace('season-', ''), 10);
      const episodes = raw[seasonKey];

      for (const episodeKey of Object.keys(episodes)) {
        if (!episodeKey.startsWith('episode-')) continue;
        const episode = parseInt(episodeKey.replace('episode-', ''), 10);
        const title = `S${season}E${episode}`;
        const link = '';

        const { error } = await supabase.from('episodes').insert([
          { series_id: seriesId, season, episode, title, link }
        ]);

        if (error) {
          console.error(`❌ ${seriesId} ${title}`, error.message);
        } else {
          console.log(`✅ Inserted ${seriesId} ${title}`);
        }
      }
    }
  }

  console.log('🎉 All done!');
}

uploadAllEpisodes();
