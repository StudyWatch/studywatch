// src/utils/highlightWord.js

export function highlightWord(sentence, word) {
  if (!sentence || !word) return sentence;
  const wordLower = word.toLowerCase();
  const regex = new RegExp(`\\b(\\w*${wordLower.slice(0, 4)}\\w*)\\b`, 'gi');
  return sentence.replace(regex, (match) => {
    const matchClean = match.toLowerCase();
    let score = 0;
    for (let i = 0; i < wordLower.length; i++) {
      if (matchClean.includes(wordLower[i])) score++;
    }
    // אם יש התאמה מספקת, עטוף במרקר <mark> כך ש־CSS יתפוס
    return score >= Math.floor(wordLower.length / 2)
      ? `<mark>${match}</mark>`
      : match;
  });
}
