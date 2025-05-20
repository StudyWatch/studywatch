export async function fetchEpisodes(seriesId) {
  try {
    const response = await fetch(`/series_json/${seriesId}.json`);
    if (!response.ok) {
      throw new Error('בעיה בטעינת קובץ הפרקים.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('שגיאה בעת טעינת הנתונים:', error);
    throw error;
  }
}
