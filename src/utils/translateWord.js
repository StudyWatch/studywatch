export async function translateWord(word, fromLang, toLang) {
  try {
    const res = await fetch('/data/friends.json');
    const episodes = await res.json();

    // חיפוש התרגום הראשון הרלוונטי
    for (const ep of episodes) {
      for (const entry of ep.words) {
        if (entry.word.toLowerCase() === word.toLowerCase()) {
          const translated = entry.translations?.[toLang];
          if (translated) return translated;
        }
      }
    }
    return word; // אם לא נמצא תרגום, מחזיר את המילה עצמה
  } catch (err) {
    console.error("Translation error:", err);
    return word;
  }
}
