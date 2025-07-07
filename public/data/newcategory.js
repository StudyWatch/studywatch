// categories.js

// -------------------- ANIMALS CATEGORY --------------------
const animals = [
  { word: 'ant',        filters: ['land'], level: 'easy' },
  { word: 'anteater',   filters: ['land'], level: 'medium' },
  { word: 'ape',        filters: ['land'], level: 'medium' },
  { word: 'bear',       filters: ['land'], level: 'hard' },
  { word: 'cow',        filters: ['land'], level: 'easy' },
  { word: 'deer',       filters: ['land'], level: 'medium' },
  { word: 'dog',        filters: ['land'], level: 'easy' },
  { word: 'elephant',   filters: ['land'], level: 'hard' },
  { word: 'fox',        filters: ['land'], level: 'medium' },
  { word: 'giraffe',    filters: ['land'], level: 'medium' },
  { word: 'hamster',    filters: ['land'], level: 'easy' },
  { word: 'hedgehog',   filters: ['land'], level: 'medium' },
  { word: 'horse',      filters: ['land'], level: 'medium' },
  { word: 'kangaroo',   filters: ['land'], level: 'medium' },
  { word: 'lion',       filters: ['land'], level: 'hard' },
  { word: 'mouse',      filters: ['land'], level: 'easy' },
  { word: 'pig',        filters: ['land'], level: 'easy' },
  { word: 'rabbit',     filters: ['land'], level: 'easy' },
  { word: 'sheep',      filters: ['land'], level: 'easy' },
  { word: 'tiger',      filters: ['land'], level: 'hard' },
  { word: 'wolf',       filters: ['land'], level: 'hard' },
  { word: 'zebra',      filters: ['land'], level: 'medium' },
  { word: 'fish',       filters: ['sea'],  level: 'easy' },
  { word: 'shark',      filters: ['sea'],  level: 'hard' },
  { word: 'dolphin',    filters: ['sea'],  level: 'medium' },
  { word: 'whale',      filters: ['sea'],  level: 'medium' },
  { word: 'octopus',    filters: ['sea'],  level: 'hard' },
  { word: 'crab',       filters: ['sea'],  level: 'easy' },
  { word: 'lobster',    filters: ['sea'],  level: 'hard' },
  { word: 'jellyfish',  filters: ['sea'],  level: 'hard' },
  { word: 'seahorse',   filters: ['sea'],  level: 'medium' },
  { word: 'starfish',   filters: ['sea'],  level: 'medium' },
  { word: 'seal',       filters: ['sea'],  level: 'medium' },
  { word: 'otter',      filters: ['sea'],  level: 'medium' },
  { word: 'penguin',    filters: ['sea'],  level: 'medium' },
  { word: 'squid',      filters: ['sea'],  level: 'medium' },
  { word: 'coral',      filters: ['sea'],  level: 'easy' },
  { word: 'bird',       filters: ['air'],  level: 'easy' },
  { word: 'eagle',      filters: ['air'],  level: 'hard' },
  { word: 'owl',        filters: ['air'],  level: 'medium' },
  { word: 'sparrow',    filters: ['air'],  level: 'easy' },
  { word: 'parrot',     filters: ['air'],  level: 'medium' },
  { word: 'crow',       filters: ['air'],  level: 'medium' },
  { word: 'butterfly',  filters: ['air'],  level: 'easy' },
  { word: 'bat',        filters: ['air'],  level: 'medium' },
  { word: 'bee',        filters: ['air'],  level: 'easy' },
  { word: 'fly',        filters: ['air'],  level: 'easy' },
  { word: 'dragonfly',  filters: ['air'],  level: 'medium' },
  { word: 'pigeon',     filters: ['air'],  level: 'easy' },
  { word: 'swallow',    filters: ['air'],  level: 'medium' },
  { word: 'hawk',       filters: ['air'],  level: 'hard' },
  { word: 'hummingbird',filters: ['air'],  level: 'hard' }
];

const animalFilterMeta = {
  all:    { name: { en: 'All',    he: 'הכל',    es: 'Todo',     ar: 'الكل',    ru: 'Все' },    emoji: '🐾' },
  land:   { name: { en: 'Land',   he: 'יבשה',   es: 'Tierra',   ar: 'يابسة',   ru: 'Суша' },  emoji: '🦁' },
  sea:    { name: { en: 'Sea',    he: 'ים',     es: 'Mar',      ar: 'بحر',     ru: 'Море' },  emoji: '🐠' },
  air:    { name: { en: 'Air',    he: 'מעוף',   es: 'Aire',     ar: 'טיסה',    ru: 'Воздух'}, emoji: '🦅' },
  easy:   { name: { en: 'Easy',   he: 'קל',     es: 'Fácil',    ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio',    ar: 'متوسط',   ru: 'Средне'}, emoji: '💛' },
  hard:   { name: { en: 'Hard',   he: 'קשה',    es: 'Difícil',  ar: 'صعب',     ru: 'Трудно'}, emoji: '🔴' }
};

export const animalsCategory = {
  id: 'animals',
  level: 'medium',
  name: { en: 'Animals', he: 'חיות', es: 'Animales', ar: 'حيوانات', ru: 'Животные' },
  emoji: '🐾',
  filters: Object.entries(animalFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? animals.map(a => a.word)
      : animals
          .filter(a => a.filters.includes(id) || a.level === id)
          .map(a => a.word)
  }))
};

// -------------------- NUMBERS CATEGORY --------------------
const numbers = [
  { word: 'zero',     filters: ['units'], level: 'easy' },
  { word: 'one',      filters: ['units'], level: 'easy' },
  { word: 'two',      filters: ['units'], level: 'easy' },
  { word: 'three',    filters: ['units'], level: 'easy' },
  { word: 'four',     filters: ['units'], level: 'easy' },
  { word: 'five',     filters: ['units'], level: 'easy' },
  { word: 'six',      filters: ['units'], level: 'easy' },
  { word: 'seven',    filters: ['units'], level: 'easy' },
  { word: 'eight',    filters: ['units'], level: 'easy' },
  { word: 'nine',     filters: ['units'], level: 'easy' },
  { word: 'ten',      filters: ['tens'],  level: 'easy' },
  { word: 'twenty',   filters: ['tens'],  level: 'easy' },
  { word: 'thirty',   filters: ['tens'],  level: 'easy' },
  { word: 'forty',    filters: ['tens'],  level: 'easy' },
  { word: 'fifty',    filters: ['tens'],  level: 'easy' },
  { word: 'sixty',    filters: ['tens'],  level: 'easy' },
  { word: 'seventy',  filters: ['tens'],  level: 'easy' },
  { word: 'eighty',   filters: ['tens'],  level: 'easy' },
  { word: 'ninety',   filters: ['tens'],  level: 'easy' },
  { word: 'hundred',  filters: ['large'], level: 'medium' },
  { word: 'thousand', filters: ['large'], level: 'medium' },
  { word: 'million',  filters: ['large'], level: 'medium' }
];

const numberFilterMeta = {
  all:    { name: { en: 'All',    he: 'הכל',    es: 'Todo',     ar: 'الكل',    ru: 'Все' },     emoji: '🔢' },
  units:  { name: { en: 'Units',  he: 'יחידות', es: 'Unidades', ar: 'آحاد',    ru: 'Единицы'}, emoji: '1️⃣' },
  tens:   { name: { en: 'Tens',   he: 'עשרות',  es: 'Decenas',  ar: 'عشرات',  ru: 'Десятки'}, emoji: '🔟' },
  large:  { name: { en: 'Large',  he: 'גדולים', es: 'Grandes',  ar: 'الكبار',  ru: 'Большие'}, emoji: '💯' }
};

export const numbersCategory = {
  id: 'numbers',
  level: 'easy',
  name: { en: 'Numbers', he: 'מספרים', es: 'Números', ar: 'أرقام', ru: 'Числа' },
  emoji: '🔢',
  filters: Object.entries(numberFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? numbers.map(n => n.word)
      : numbers.filter(n => n.filters.includes(id)).map(n => n.word)
  }))
};

// -------------------- COLORS CATEGORY --------------------
const colors = [
  { word: 'red',    level: 'easy' },
  { word: 'orange', level: 'easy' },
  { word: 'yellow', level: 'easy' },
  { word: 'green',  level: 'easy' },
  { word: 'blue',   level: 'easy' },
  { word: 'purple', level: 'medium' },
  { word: 'pink',   level: 'medium' },
  { word: 'brown',  level: 'medium' },
  { word: 'black',  level: 'easy' },
  { word: 'white',  level: 'easy' },
  { word: 'grey',   level: 'medium' }
];

const colorFilterMeta = {
  all:    { name: { en: 'All',    he: 'הכל',    es: 'Todo',     ar: 'الكل',    ru: 'Все' },    emoji: '🌈' },
  easy:   { name: { en: 'Easy',   he: 'קל',     es: 'Fácil',    ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio',    ar: 'متوسط',   ru: 'Средне'}, emoji: '💛' },
  hard:   { name: { en: 'Hard',   he: 'קשה',    es: 'Difícil',  ar: 'صعب',     ru: 'Трудно'}, emoji: '🔴' }
};

export const colorsCategory = {
  id: 'colors',
  level: 'easy',
  name: { en: 'Colors', he: 'צבעים', es: 'Colores', ar: 'ألوان', ru: 'Цвета' },
  emoji: '🌈',
  filters: Object.entries(colorFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? colors.map(c => c.word)
      : colors.filter(c => c.level === id).map(c => c.word)
  }))
};

// Default export: combine all categories
// Updated FOOD & DRINK CATEGORY (additions based on dictionary lookup)

// -------------------- FOOD & DRINK CATEGORY --------------------
const foodDrink = [
  { word: 'bread',     filters: ['food'],  level: 'easy' },
  { word: 'cheese',    filters: ['food'],  level: 'easy' },
  { word: 'milk',      filters: ['drink'], level: 'easy' },
  { word: 'apple',     filters: ['food'],  level: 'easy' },
  { word: 'banana',    filters: ['food'],  level: 'easy' },
  { word: 'rice',      filters: ['food'],  level: 'easy' },
  { word: 'egg',       filters: ['food'],  level: 'easy' },
  { word: 'butter',    filters: ['food'],  level: 'easy' },
  { word: 'coffee',    filters: ['drink'], level: 'easy' },
  { word: 'tea',       filters: ['drink'], level: 'easy' },
  { word: 'sugar',     filters: ['food'],  level: 'easy' },
  { word: 'salt',      filters: ['food'],  level: 'easy' },
  { word: 'pepper',    filters: ['food'],  level: 'easy' },
  { word: 'meat',      filters: ['food'],  level: 'medium' },
  { word: 'fish',      filters: ['food'],  level: 'medium' },
  { word: 'vegetable', filters: ['food'],  level: 'medium' },
  { word: 'fruit',     filters: ['food'],  level: 'medium' },
  { word: 'water',     filters: ['drink'], level: 'easy' },
  { word: 'juice',     filters: ['drink'], level: 'easy' },
  { word: 'beer',      filters: ['drink'], level: 'medium' },
  { word: 'wine',      filters: ['drink'], level: 'medium' },

  // ← Added from localDictionary_sorted.json:
  { word: 'pasta',     filters: ['food'],  level: 'easy' },     // :contentReference[oaicite:0]{index=0}
  { word: 'pastry',    filters: ['food'],  level: 'medium' },   // :contentReference[oaicite:1]{index=1}
  { word: 'pizza',     filters: ['food'],  level: 'easy' },     // :contentReference[oaicite:2]{index=2}
  { word: 'yogurt',    filters: ['food'],  level: 'medium' },   // :contentReference[oaicite:3]{index=3}
  { word: 'burger',    filters: ['food'],  level: 'medium' },   // :contentReference[oaicite:4]{index=4}
  { word: 'chicken',   filters: ['food'],  level: 'easy' },     // :contentReference[oaicite:5]{index=5}
  { word: 'bun',       filters: ['food'],  level: 'easy' }      // :contentReference[oaicite:6]{index=6}
];

const foodDrinkFilterMeta = {
  all:   { name: { en: 'All',    he: 'הכל',    es: 'Todo',     ar: 'الكل',    ru: 'Все' },    emoji: '🍽️' },
  food:  { name: { en: 'Food',   he: 'אוכל',   es: 'Comida',   ar: 'الطعام',   ru: 'Еда' },    emoji: '🍲' },
  drink: { name: { en: 'Drink',  he: 'שתייה',  es: 'Bebida',   ar: 'مشروب',    ru: 'Напитки' }, emoji: '🥤' },
  easy:   { name: { en: 'Easy',   he: 'קל',     es: 'Fácil',    ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio',    ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',   he: 'קשה',    es: 'Difícil',  ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const foodDrinkCategory = {
  id: 'food_drink',
  level: 'easy',
  name: {
    en: 'Food & Drink',
    he: 'אוכל ושתייה',
    es: 'Comida y bebida',
    ar: 'طعام وشراب',
    ru: 'Еда и напитки'
  },
  emoji: '🍽️',
  filters: Object.entries(foodDrinkFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? foodDrink.map(item => item.word)
      : (id === 'easy' || id === 'medium' || id === 'hard')
        ? foodDrink.filter(item => item.level === id).map(item => item.word)
        : foodDrink.filter(item => item.filters.includes(id)).map(item => item.word)
  }))
};
// -------------------- TRAVEL CATEGORY --------------------
const travel = [
  // original entries
  { word: 'airport',      filters: ['transport'],     level: 'easy' },
  { word: 'ticket',       filters: ['document'],      level: 'easy' },
  { word: 'passport',     filters: ['document'],      level: 'medium' },
  { word: 'luggage',      filters: ['luggage'],       level: 'easy' },
  { word: 'hotel',        filters: ['accommodation'], level: 'easy' },
  { word: 'map',          filters: ['navigation'],    level: 'easy' },
  { word: 'train',        filters: ['transport'],     level: 'easy' },
  { word: 'bus',          filters: ['transport'],     level: 'easy' },
  { word: 'taxi',         filters: ['transport'],     level: 'easy' },
  { word: 'flight',       filters: ['transport'],     level: 'medium' },
  { word: 'station',      filters: ['infrastructure'],level: 'medium' },
  { word: 'tour',         filters: ['activity'],      level: 'easy' },
  { word: 'booking',      filters: ['document'],      level: 'medium' },
  { word: 'tourist',      filters: ['activity'],      level: 'medium' },

  // added from dictionary
  { word: 'aircraft',     filters: ['transport'],     level: 'hard' },
  { word: 'airline',      filters: ['transport'],     level: 'hard' },
  { word: 'airplane',     filters: ['transport'],     level: 'hard' },
  { word: 'arrival',      filters: ['navigation'],    level: 'medium' },
  { word: 'attendant',    filters: ['transport'],     level: 'medium' },
  { word: 'backpack',     filters: ['luggage'],       level: 'medium' },
  { word: 'backpacker',   filters: ['activity'],      level: 'medium' },
  { word: 'baggage',      filters: ['luggage'],       level: 'medium' },
  { word: 'beach',        filters: ['activity'],      level: 'easy' },
  { word: 'boarding',     filters: ['document'],      level: 'medium' },
  { word: 'border',       filters: ['navigation'],    level: 'medium' },
  { word: 'cabin',        filters: ['accommodation'], level: 'medium' },
  { word: 'camping',      filters: ['activity'],      level: 'medium' },
  { word: 'car',          filters: ['transport'],     level: 'easy' },
  { word: 'cruise',       filters: ['transport'],     level: 'medium' },
  { word: 'ferry',        filters: ['transport'],     level: 'medium' },
  { word: 'hostel',       filters: ['accommodation'], level: 'medium' },
  { word: 'reservation',  filters: ['document'],      level: 'medium' },
  { word: 'visa',         filters: ['document'],      level: 'medium' },
  { word: 'sightseeing',  filters: ['activity'],      level: 'medium' },
  { word: 'souvenir',     filters: ['activity'],      level: 'medium' },
  { word: 'terminal',     filters: ['infrastructure'],level: 'medium' },
  { word: 'tower',        filters: ['infrastructure'],level: 'medium' },
  { word: 'runway',       filters: ['infrastructure'],level: 'medium' },
  { word: 'route',        filters: ['navigation'],    level: 'medium' },
  { word: 'road',         filters: ['navigation'],    level: 'medium' },
  { word: 'seat',         filters: ['infrastructure'],level: 'easy' },
  { word: 'guide',        filters: ['activity'],      level: 'medium' },
  { word: 'immigration',  filters: ['document'],      level: 'hard' },
  { word: 'customs',      filters: ['document'],      level: 'hard' }
];

const travelFilterMeta = {
  all:           { name: { en: 'All',           he: 'הכל',        es: 'Todo',      ar: 'الكل',       ru: 'Все' },         emoji: '✈️' },
  transport:     { name: { en: 'Transport',     he: 'הסעה',       es: 'Transporte', ar: 'المواصلات',  ru: 'Транспорт' }, emoji: '🚗' },
  accommodation: { name: { en: 'Stay',          he: 'לינה',       es: 'Alojamiento',ar: 'الإقامة',    ru: 'Проживание' },emoji: '🏨' },
  document:      { name: { en: 'Document',      he: 'מסמך',       es: 'Documento',  ar: 'وثيقة',      ru: 'Документ' },   emoji: '📄' },
  luggage:       { name: { en: 'Luggage',       he: 'מטען',       es: 'Equipaje',   ar: 'أمتعة',      ru: 'Багаж' },     emoji: '🧳' },
  activity:      { name: { en: 'Activity',      he: 'פעילות',     es: 'Actividad',  ar: 'نشاط',       ru: 'Активность' }, emoji: '🎒' },
  navigation:    { name: { en: 'Navigation',    he: 'ניווט',      es: 'Navegación', ar: 'الملاحة',    ru: 'Навигация' }, emoji: '🗺️' },
  infrastructure:{ name: { en: 'Infrastructure',he: 'תשתית',      es: 'Infraestructura', ar: 'البنية التحتية', ru: 'Инфраструктура' }, emoji: '🏗️' },
  easy:          { name: { en: 'Easy',          he: 'קל',         es: 'Fácil',     ar: 'سهل',        ru: 'Легко' },     emoji: '💚' },
  medium:        { name: { en: 'Medium',        he: 'בינוני',     es: 'Medio',     ar: 'متوسط',      ru: 'Средне' },    emoji: '💛' },
  hard:          { name: { en: 'Hard',          he: 'קשה',        es: 'Difícil',   ar: 'صعب',        ru: 'Трудно' },    emoji: '🔴' }
};

export const travelCategory = {
  id: 'travel',
  level: 'easy',
  name: {
    en: 'Travel',
    he: 'טיולים',
    es: 'Viajar',
    ar: 'سفر',
    ru: 'Путешествия'
  },
  emoji: '✈️',
  filters: Object.entries(travelFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? travel.map(item => item.word)
      : ['easy','medium','hard'].includes(id)
        ? travel.filter(item => item.level === id).map(item => item.word)
        : travel.filter(item => item.filters.includes(id)).map(item => item.word)
  }))
};
// -------------------- HOUSEHOLD CATEGORY --------------------
const household = [
  // initial list
  { word: 'door',      level: 'easy' },
  { word: 'window',    level: 'easy' },
  { word: 'bed',       level: 'easy' },
  { word: 'chair',     level: 'easy' },
  { word: 'table',     level: 'easy' },
  { word: 'couch',     level: 'easy' },
  { word: 'lamp',      level: 'easy' },
  { word: 'sink',      level: 'easy' },
  { word: 'mirror',    level: 'medium' },
  { word: 'curtain',   level: 'medium' },
  { word: 'floor',     level: 'easy' },
  { word: 'roof',      level: 'medium' },
  { word: 'wall',      level: 'easy' },
  { word: 'ceiling',   level: 'medium' },
  { word: 'cupboard',  level: 'medium' },
  { word: 'drawer',    level: 'medium' },
  { word: 'dish',      level: 'easy' },
  { word: 'plate',     level: 'easy' },
  { word: 'mop',       level: 'easy' },
  { word: 'broom',     level: 'easy' },

  // added from dictionary
  { word: 'armchair',      level: 'medium' },
  { word: 'bathtub',       level: 'medium' },
  { word: 'blanket',       level: 'easy' },
  { word: 'bookcase',      level: 'medium' },
  { word: 'bookshelf',     level: 'medium' },
  { word: 'carpet',        level: 'medium' },
  { word: 'clock',         level: 'medium' },
  { word: 'computer',      level: 'hard' },
  { word: 'desk',          level: 'easy' },
  { word: 'dishwasher',    level: 'medium' },
  { word: 'oven',          level: 'medium' },
  { word: 'refrigerator',  level: 'medium' },
  { word: 'rug',           level: 'medium' },
  { word: 'shower',        level: 'medium' },
  { word: 'trash',         level: 'easy' },
  { word: 'vacuum',        level: 'medium' },
  { word: 'stool',         level: 'easy' },
  { word: 'sofa',          level: 'medium' },
  { word: 'bathtub',       level: 'medium' }  
];

const householdFilterMeta = {
  all:    { name: { en: 'All',    he: 'הכל',    es: 'Todo',     ar: 'الكل',    ru: 'Все' },    emoji: '🏠' },
  easy:   { name: { en: 'Easy',   he: 'קל',     es: 'Fácil',    ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio',    ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',   he: 'קשה',    es: 'Difícil',  ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const householdCategory = {
  id: 'household',
  level: 'easy',
  name: {
    en: 'Household',
    he: 'בית',
    es: 'Hogar',
    ar: 'منزل',
    ru: 'Дом'
  },
  emoji: '🏠',
  filters: Object.entries(householdFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? household.map(item => item.word)
      : household.filter(item => item.level === id).map(item => item.word)
  }))
};

// -------------------- CLOTHING CATEGORY --------------------
const clothing = [
  { word: 'shirt',     level: 'easy' },
  { word: 'pants',     level: 'easy' },
  { word: 'dress',     level: 'easy' },
  { word: 'skirt',     level: 'easy' },
  { word: 'shoe',      level: 'easy' },
  { word: 'sock',      level: 'easy' },
  { word: 'hat',       level: 'easy' },
  { word: 'coat',      level: 'medium' },
  { word: 'jacket',    level: 'medium' },
  { word: 'tie',       level: 'medium' },
  { word: 'belt',      level: 'medium' },
  { word: 'glove',     level: 'medium' },
  { word: 'scarf',     level: 'medium' },
  { word: 'shorts',    level: 'easy' },
  { word: 'sweater',   level: 'medium' },
  { word: 'boot',      level: 'medium' },
  { word: 'bag',       level: 'easy' },
  // Added from dictionary:
  { word: 'backpack',  level: 'medium' },
  { word: 'blouse',    level: 'medium' },
  { word: 'bra',       level: 'easy' },
  { word: 'cap',       level: 'easy' },
  { word: 'cardigan',  level: 'medium' },
  { word: 'glasses',   level: 'medium' },
  { word: 'hood',      level: 'medium' },
  { word: 'hoodie',    level: 'easy' },
  { word: 'jeans',     level: 'easy' },
  { word: 'pajamas',   level: 'medium' },
  { word: 'pyjamas',   level: 'medium' },
  { word: 'panties',   level: 'medium' },
  { word: 'raincoat',  level: 'medium' },
  { word: 'sandal',    level: 'easy' },
  { word: 'sneaker',   level: 'easy' },
  { word: 'suit',      level: 'medium' },
  { word: 'tracksuit', level: 'medium' },
  { word: 'trousers',  level: 'medium' },
  { word: 'underwear', level: 'medium' },
  { word: 'vest',      level: 'easy' },
  { word: 'watch',     level: 'easy' }
];

const clothingFilterMeta = {
  all:    { name: { en: 'All',    he: 'הכל',    es: 'Todo',     ar: 'الكل',   ru: 'Все' },    emoji: '👗' },
  easy:   { name: { en: 'Easy',   he: 'קל',     es: 'Fácil',    ar: 'سهل',     ru: 'Легко'}, emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio',    ar: 'متوسط',   ru: 'Средне'}, emoji: '💛' },
  hard:   { name: { en: 'Hard',   he: 'קשה',    es: 'Difícil',  ar: 'صعب',     ru: 'Трудно'}, emoji: '🔴' }
};

export const clothingCategory = {
  id: 'clothing',
  level: 'easy',
  name: {
    en: 'Clothing',
    he: 'ביגוד',
    es: 'Ropa',
    ar: 'ملابس',
    ru: 'Одежда'
  },
  emoji: '👗',
  filters: Object.entries(clothingFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? clothing.map(item => item.word)
      : clothing.filter(item => item.level === id).map(item => item.word)
  }))
};
// -------------------- FAMILY CATEGORY --------------------
const family = [
  { word: 'mother',           level: 'easy' },
  { word: 'father',           level: 'easy' },
  { word: 'brother',          level: 'easy' },
  { word: 'sister',           level: 'easy' },
  { word: 'son',              level: 'easy' },
  { word: 'daughter',         level: 'easy' },
  { word: 'grandmother',      level: 'medium' },
  { word: 'grandfather',      level: 'medium' },
  { word: 'uncle',            level: 'easy' },
  { word: 'aunt',             level: 'easy' },
  { word: 'cousin',           level: 'easy' },
  { word: 'husband',          level: 'medium' },
  { word: 'wife',             level: 'medium' },
  // added from dictionary:
  { word: 'parent',           level: 'easy' },       // 
  { word: 'child',            level: 'easy' },       // 
  { word: 'grandchild',       level: 'medium' },     // 
  { word: 'sibling',          level: 'easy' },       // 
  { word: 'stepmother',       level: 'medium' },     // 
  { word: 'stepfather',       level: 'medium' },     // 
  { word: 'stepson',          level: 'medium' },     // 
  { word: 'stepdaughter',     level: 'medium' },     // 
  { word: 'grandson',         level: 'medium' },     // 
  { word: 'granddaughter',    level: 'medium' },     // 
  { word: 'nephew',           level: 'easy' },       // 
  { word: 'niece',            level: 'easy' },       // 
  { word: 'mother-in-law',    level: 'hard' },       // 
  { word: 'father-in-law',    level: 'hard' },       // 
  { word: 'brother-in-law',   level: 'hard' },       // 
  { word: 'sister-in-law',    level: 'hard' },       // 
  { word: 'daughter-in-law',  level: 'hard' },       // 
  { word: 'son-in-law',       level: 'hard' },       // 
  { word: 'widow',            level: 'medium' },     // 
  { word: 'widower',          level: 'medium' }      // 
];

const familyFilterMeta = {
  all:    { name: { en: 'All',    he: 'הכל',    es: 'Todo',   ar: 'الكل',    ru: 'Все' },    emoji: '👪' },
  easy:   { name: { en: 'Easy',   he: 'קל',     es: 'Fácil',  ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio',  ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',   he: 'קשה',    es: 'Difícil',ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const familyCategory = {
  id: 'family',
  level: 'easy',
  name: {
    en: 'Family',
    he: 'משפחה',
    es: 'Familia',
    ar: 'عائلة',
    ru: 'Семья'
  },
  emoji: '👪',
  filters: Object.entries(familyFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? family.map(item => item.word)
      : family.filter(item => item.level === id).map(item => item.word)
  }))
};

// -------------------- NATURE CATEGORY --------------------
const nature = [
  { word: 'tree',       level: 'easy' },
  { word: 'flower',     level: 'easy' },
  { word: 'grass',      level: 'easy' },
  { word: 'river',      level: 'medium' },
  { word: 'mountain',   level: 'medium' },
  { word: 'sky',        level: 'easy' },
  { word: 'cloud',      level: 'easy' },
  { word: 'rain',       level: 'easy' },
  { word: 'snow',       level: 'easy' },
  { word: 'sun',        level: 'easy' },
  { word: 'moon',       level: 'easy' },
  { word: 'star',       level: 'easy' },
  { word: 'ocean',      level: 'medium' },
  { word: 'beach',      level: 'easy' },
  { word: 'rock',       level: 'easy' },
  { word: 'forest',     level: 'medium' },
  { word: 'desert',     level: 'medium' },
  { word: 'valley',     level: 'medium' },
  { word: 'lake',       level: 'easy' },
  // added from dictionary:
  { word: 'waterfall',  level: 'medium' },   // :contentReference[oaicite:0]{index=0}
  { word: 'volcano',    level: 'hard' },     // :contentReference[oaicite:1]{index=1}
  { word: 'hill',       level: 'easy' },     // :contentReference[oaicite:2]{index=2}
  { word: 'bush',       level: 'easy' },     // :contentReference[oaicite:3]{index=3}
  { word: 'leaf',       level: 'easy' },     // :contentReference[oaicite:4]{index=4}
  { word: 'seed',       level: 'easy' },     // :contentReference[oaicite:5]{index=5}
  { word: 'soil',       level: 'medium' },   // :contentReference[oaicite:6]{index=6}
  { word: 'sand',       level: 'easy' },     // :contentReference[oaicite:7]{index=7}
  { word: 'mud',        level: 'medium' },   // :contentReference[oaicite:8]{index=8}
  { word: 'field',      level: 'easy' },     // :contentReference[oaicite:9]{index=9}
  { word: 'garden',     level: 'easy' },     // :contentReference[oaicite:10]{index=10}
  { word: 'pond',       level: 'easy' },     // :contentReference[oaicite:11]{index=11}
  { word: 'stream',     level: 'medium' },   // :contentReference[oaicite:12]{index=12}
  { word: 'cave',       level: 'medium' },   // :contentReference[oaicite:13]{index=13}
  { word: 'cliff',      level: 'medium' },   // :contentReference[oaicite:14]{index=14}
  { word: 'wave',       level: 'easy' },     // :contentReference[oaicite:15]{index=15}
  { word: 'reef',       level: 'medium' },   // :contentReference[oaicite:16]{index=16}
  { word: 'canyon',     level: 'hard' },     // :contentReference[oaicite:17]{index=17}
  { word: 'marsh',      level: 'medium' },   // :contentReference[oaicite:18]{index=18}
  { word: 'wetland',    level: 'hard' },     // :contentReference[oaicite:19]{index=19}
  { word: 'lagoon',     level: 'medium' },   // :contentReference[oaicite:20]{index=20}
  { word: 'glacier',    level: 'hard' },     // :contentReference[oaicite:21]{index=21}
  { word: 'ice',        level: 'easy' },     // :contentReference[oaicite:22]{index=22}
  { word: 'fog',        level: 'medium' },   // :contentReference[oaicite:23]{index=23}
  { word: 'storm',      level: 'medium' },   // :contentReference[oaicite:24]{index=24}
  { word: 'hurricane',  level: 'hard' },     // :contentReference[oaicite:25]{index=25}
  { word: 'lightning',  level: 'hard' },     // :contentReference[oaicite:26]{index=26}
  { word: 'wind',       level: 'easy' },     // :contentReference[oaicite:27]{index=27}
  { word: 'thunder',    level: 'hard' },     // :contentReference[oaicite:28]{index=28}
  { word: 'weather',    level: 'hard' },     // :contentReference[oaicite:29]{index=29}
  { word: 'sunrise',    level: 'medium' },   // :contentReference[oaicite:30]{index=30}
  { word: 'sunset',     level: 'medium' }    // :contentReference[oaicite:31]{index=31}
];

const natureFilterMeta = {
  all:    { name: { en: 'All',  he: 'הכל',  es: 'Todo',    ar: 'الكل',  ru: 'Все' },    emoji: '🌳' },
  easy:   { name: { en: 'Easy', he: 'קל',    es: 'Fácil',   ar: 'سهل',    ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',he:'בינוני',es:'Medio',   ar:'متوسط',   ru:'Средне'}, emoji: '💛' },
  hard:   { name: { en: 'Hard', he: 'קשה',   es: 'Difícil', ar: 'صعب',    ru: 'Трудно' }, emoji: '🔴' }
};

export const natureCategory = {
  id: 'nature',
  level: 'easy',
  name: {
    en: 'Nature',
    he: 'טבע',
    es: 'Naturaleza',
    ar: 'طبيعة',
    ru: 'Природа'
  },
  emoji: '🌳',
  filters: Object.entries(natureFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? nature.map(item => item.word)
      : nature.filter(item => item.level === id).map(item => item.word)
  }))
};
// -------------------- WEATHER CATEGORY --------------------
const weather = [
  { word: 'sunny',       level: 'easy' },
  { word: 'rainy',       level: 'easy' },
  { word: 'cloudy',      level: 'easy' },
  { word: 'windy',       level: 'easy' },
  { word: 'stormy',      level: 'medium' },
  { word: 'snowy',       level: 'easy' },
  { word: 'foggy',       level: 'easy' },
  { word: 'hot',         level: 'easy' },
  { word: 'cold',        level: 'easy' },
  { word: 'warm',        level: 'easy' },
  { word: 'cool',        level: 'easy' },
  { word: 'temperature', level: 'medium' },
  { word: 'humidity',    level: 'medium' },
  { word: 'thunder',     level: 'medium' },
  { word: 'lightning',   level: 'hard' },

  // added from dictionary:
  { word: 'barometer',    level: 'medium' },
  { word: 'climate',      level: 'medium' },
  { word: 'drought',      level: 'medium' },
  { word: 'forecast',     level: 'medium' },
  { word: 'freeze',       level: 'easy' },
  { word: 'frost',        level: 'easy' },
  { word: 'gale',         level: 'medium' },
  { word: 'hail',         level: 'easy' },
  { word: 'haze',         level: 'medium' },
  { word: 'heatwave',     level: 'medium' },
  { word: 'hurricane',    level: 'hard' },
  { word: 'ice',          level: 'easy' },
  { word: 'mist',         level: 'easy' },
  { word: 'monsoon',      level: 'hard' },
  { word: 'rainbow',      level: 'easy' },
  { word: 'rainstorm',    level: 'medium' },
  { word: 'thermometer',  level: 'medium' },
  { word: 'thunderstorm', level: 'medium' },
  { word: 'tornado',      level: 'hard' },
  { word: 'visibility',   level: 'medium' }
];

const weatherFilterMeta = {
  all:    { name: { en: 'All',    he: 'הכל',    es: 'Todo',     ar: 'الكل',    ru: 'Все' },    emoji: '☀️' },
  easy:   { name: { en: 'Easy',   he: 'קל',     es: 'Fácil',    ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio',    ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',   he: 'קשה',    es: 'Difícil',  ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const weatherCategory = {
  id: 'weather',
  level: 'easy',
  name: {
    en: 'Weather',
    he: 'מזג אוויר',
    es: 'Clima',
    ar: 'الطقس',
    ru: 'Погода'
  },
  emoji: '☀️',
  filters: Object.entries(weatherFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? weather.map(item => item.word)
      : weather.filter(item => item.level === id).map(item => item.word)
  }))
};
// -------------------- TIME CATEGORY --------------------
const time = [
  { word: 'day',        level: 'easy' },
  { word: 'night',      level: 'easy' },
  { word: 'morning',    level: 'easy' },
  { word: 'afternoon',  level: 'easy' },
  { word: 'evening',    level: 'easy' },
  { word: 'hour',       level: 'easy' },
  { word: 'minute',     level: 'easy' },
  { word: 'second',     level: 'easy' },
  { word: 'week',       level: 'easy' },
  { word: 'month',      level: 'easy' },
  { word: 'year',       level: 'easy' },
  { word: 'today',      level: 'easy' },
  { word: 'tomorrow',   level: 'easy' },
  { word: 'yesterday',  level: 'easy' },

  // added from dictionary:
  { word: 'decade',     level: 'medium' },
  { word: 'century',    level: 'medium' },
  { word: 'millennium', level: 'hard' },      // :contentReference[oaicite:3]{index=3}
  { word: 'era',        level: 'hard' },      // :contentReference[oaicite:4]{index=4}
  { word: 'quarter',    level: 'medium' },    // :contentReference[oaicite:5]{index=5}
  { word: 'midnight',   level: 'medium' },
  { word: 'noon',       level: 'medium' },
  { word: 'dawn',       level: 'easy' },
  { word: 'dusk',       level: 'easy' },
  { word: 'sunrise',    level: 'easy' },
  { word: 'sunset',     level: 'easy' },
  { word: 'clock',      level: 'medium' },
  { word: 'deadline',   level: 'hard' },
  { word: 'schedule',   level: 'medium' },
  { word: 'calendar',   level: 'medium' },
  { word: 'appointment',level: 'medium' },
  { word: 'period',     level: 'medium' },
  { word: 'alarm',      level: 'easy' },
  { word: 'season',     level: 'easy' },
  { word: 'spring',     level: 'easy' },
  { word: 'summer',     level: 'easy' },
  { word: 'autumn',     level: 'medium' },
  { word: 'winter',     level: 'medium' },
  { word: 'fortnight',  level: 'hard' },
  { word: 'stopwatch',  level: 'medium' },
  { word: 'tick',       level: 'easy' }
];

const timeFilterMeta = {
  all:     { name: { en: 'All',    he: 'הכל',    es: 'Todo',     ar: 'الكل',    ru: 'Все' },     emoji: '⏰' },
  easy:    { name: { en: 'Easy',   he: 'קל',     es: 'Fácil',    ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium:  { name: { en: 'Medium', he: 'בינוני', es: 'Medio',    ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:    { name: { en: 'Hard',   he: 'קשה',    es: 'Difícil',  ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const timeCategory = {
  id: 'time',
  level: 'easy',
  name: {
    en: 'Time',
    he: 'זמן',
    es: 'Tiempo',
    ar: 'الوقت',
    ru: 'Время'
  },
  emoji: '⏰',
  filters: Object.entries(timeFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? time.map(item => item.word)
      : time.filter(item => item.level === id).map(item => item.word)
  }))
};
// -------------------- SPORTS CATEGORY --------------------
const sports = [
  // original list
  { word: 'football',    level: 'medium' },
  { word: 'basketball',  level: 'medium' },
  { word: 'tennis',      level: 'easy'   },
  { word: 'soccer',      level: 'medium' },
  { word: 'baseball',    level: 'medium' },
  { word: 'cricket',     level: 'medium' },
  { word: 'hockey',      level: 'medium' },
  { word: 'golf',        level: 'easy'   },
  { word: 'swimming',    level: 'medium' },
  { word: 'running',     level: 'easy'   },
  { word: 'yoga',        level: 'easy'   },
  { word: 'gym',         level: 'easy'   },
  { word: 'skiing',      level: 'medium' },
  { word: 'boxing',      level: 'hard'   },
  { word: 'surfing',     level: 'hard'   },

  // added from dictionary:
  { word: 'volleyball',   level: 'medium' }, // :contentReference[oaicite:0]{index=0}
  { word: 'rugby',        level: 'medium' }, // :contentReference[oaicite:1]{index=1}
  { word: 'badminton',    level: 'medium' },
  { word: 'cycling',      level: 'medium' },
  { word: 'gymnastics',   level: 'hard'   },
  { word: 'marathon',     level: 'hard'   },
  { word: 'skateboarding',level: 'medium' },
  { word: 'skating',      level: 'medium' },
  { word: 'snooker',      level: 'easy'   },
  { word: 'pool',         level: 'easy'   },
  { word: 'polo',         level: 'medium' },
  { word: 'rowing',       level: 'medium' },
  { word: 'diving',       level: 'medium' },
  { word: 'fencing',      level: 'hard'   },
  { word: 'judo',         level: 'hard'   },
  { word: 'wrestling',    level: 'hard'   },
  { word: 'fishing',      level: 'easy'   },
  { word: 'hunting',      level: 'medium' }
];

const sportsFilterMeta = {
  all:    { name: { en: 'All',    he: 'הכל',    es: 'Todo',     ar: 'الكل',    ru: 'Все' },    emoji: '🏅' },
  easy:   { name: { en: 'Easy',   he: 'קל',      es: 'Fácil',    ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני',  es: 'Medio',    ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',   he: 'קשה',     es: 'Difícil',  ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const sportsCategory = {
  id: 'sports',
  level: 'medium',
  name: {
    en: 'Sports',
    he: 'ספורט',
    es: 'Deportes',
    ar: 'رياضة',
    ru: 'Спорт'
  },
  emoji: '🏅',
  filters: Object.entries(sportsFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? sports.map(item => item.word)
      : sports.filter(item => item.level === id).map(item => item.word)
  }))
};

// -------------------- EDUCATION CATEGORY --------------------
const education = [
  { word: 'school',       level: 'easy' },
  { word: 'university',   level: 'medium' },
  { word: 'student',      level: 'easy' },
  { word: 'teacher',      level: 'medium' },
  { word: 'lesson',       level: 'easy' },
  { word: 'exam',         level: 'hard' },
  { word: 'study',        level: 'medium' },
  { word: 'classroom',    level: 'easy' },
  { word: 'homework',     level: 'medium' },
  { word: 'degree',       level: 'medium' },
  { word: 'lecture',      level: 'medium' },
  // added from localDictionary_sorted.json:
  { word: 'campus',       level: 'medium' },   // :contentReference[oaicite:0]{index=0}
  { word: 'professor',    level: 'hard' },     // :contentReference[oaicite:1]{index=1}
  { word: 'library',      level: 'medium' },
  { word: 'curriculum',   level: 'medium' },
  { word: 'textbook',     level: 'medium' },
  { word: 'syllabus',     level: 'medium' },
  { word: 'assignment',   level: 'medium' },
  { word: 'seminar',      level: 'medium' },
  { word: 'diploma',      level: 'medium' },
  { word: 'research',     level: 'hard' },
  { word: 'scholarship',  level: 'medium' },
  { word: 'tuition',      level: 'hard' },
  { word: 'principal',    level: 'hard' },
  { word: 'academy',      level: 'medium' },
  { word: 'kindergarten', level: 'easy' },
  { word: 'graduation',   level: 'medium' },
  { word: 'counselor',    level: 'medium' },
  { word: 'class',        level: 'easy' },
  { word: 'pupil',        level: 'easy' },
  { word: 'academic',     level: 'medium' }
];

const educationFilterMeta = {
  all:      { name: { en: 'All',    he: 'הכל',    es: 'Todo',     ar: 'الكل',    ru: 'Все' }, emoji: '🎓' },
  easy:     { name: { en: 'Easy',   he: 'קל',     es: 'Fácil',    ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium:   { name: { en: 'Medium', he: 'בינוני', es: 'Medio',    ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:     { name: { en: 'Hard',   he: 'קשה',    es: 'Difícil',  ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const educationCategory = {
  id: 'education',
  level: 'medium',
  name: {
    en: 'Education',
    he: 'חינוך',
    es: 'Educación',
    ar: 'تعليم',
    ru: 'Образование'
  },
  emoji: '🎓',
  filters: Object.entries(educationFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? education.map(item => item.word)
      : education.filter(item => item.level === id).map(item => item.word)
  }))
};
// -------------------- ENTERTAINMENT CATEGORY --------------------
const entertainment = [
  // original list
  { word: 'movie',     level: 'easy' },
  { word: 'music',     level: 'easy' },
  { word: 'dance',     level: 'easy' },
  { word: 'theater',   level: 'medium' },
  { word: 'game',      level: 'easy' },
  { word: 'show',      level: 'easy' },
  { word: 'concert',   level: 'medium' },
  { word: 'festival',  level: 'medium' },
  { word: 'series',    level: 'medium' },
  { word: 'book',      level: 'easy' },
  { word: 'art',       level: 'medium' },
  { word: 'museum',    level: 'medium' },

  // added from localDictionary_sorted.json:
  { word: 'film',        level: 'easy' },      // :contentReference[oaicite:0]{index=0}
  { word: 'cinema',      level: 'medium' },    // :contentReference[oaicite:1]{index=1}
  { word: 'radio',       level: 'easy' },      // :contentReference[oaicite:2]{index=2}
  { word: 'podcast',     level: 'medium' },    // :contentReference[oaicite:3]{index=3}
  { word: 'animation',   level: 'medium' },    // :contentReference[oaicite:4]{index=4}
  { word: 'television',  level: 'easy' },      // :contentReference[oaicite:5]{index=5}
  { word: 'tv',          level: 'easy' },      // :contentReference[oaicite:6]{index=6}
  { word: 'cartoon',     level: 'easy' },      // :contentReference[oaicite:7]{index=7}
  { word: 'opera',       level: 'hard' },      // :contentReference[oaicite:8]{index=8}
  { word: 'gallery',     level: 'medium' },    // :contentReference[oaicite:9]{index=9}
  { word: 'circus',      level: 'medium' },    // :contentReference[oaicite:10]{index=10}
  { word: 'magic',       level: 'medium' },    // :contentReference[oaicite:11]{index=11}
  { word: 'comedy',      level: 'easy' },      // :contentReference[oaicite:12]{index=12}
  { word: 'drama',       level: 'medium' },    // :contentReference[oaicite:13]{index=13}
  { word: 'exhibition',  level: 'medium' },    // :contentReference[oaicite:14]{index=14}
  { word: 'puzzle',      level: 'easy' },      // :contentReference[oaicite:15]{index=15}
  { word: 'video',       level: 'easy' },      // :contentReference[oaicite:16]{index=16}
  { word: 'photography', level: 'medium' },    // :contentReference[oaicite:17]{index=17}
  { word: 'album',       level: 'medium' },    // :contentReference[oaicite:18]{index=18}
  { word: 'theatre',     level: 'medium' }     // :contentReference[oaicite:19]{index=19}
];

const entertainmentFilterMeta = {
  all:    { name: { en: 'All',     he: 'הכל',    es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '🎭' },
  easy:   { name: { en: 'Easy',    he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',  he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',    he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const entertainmentCategory = {
  id: 'entertainment',
  level: 'medium',
  name: {
    en: 'Entertainment',
    he: 'בידור',
    es: 'Entretenimiento',
    ar: 'ترفيه',
    ru: 'Развлечения'
  },
  emoji: '🎭',
  filters: Object.entries(entertainmentFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? entertainment.map(item => item.word)
      : entertainment.filter(item => item.level === id).map(item => item.word)
  }))
};

// -------------------- SHOPPING CATEGORY --------------------
const shopping = [
  // original list
  { word: 'shop',      level: 'easy' },
  { word: 'buy',       level: 'easy' },
  { word: 'sell',      level: 'easy' },
  { word: 'store',     level: 'easy' },
  { word: 'market',    level: 'easy' },
  { word: 'price',     level: 'easy' },
  { word: 'sale',      level: 'easy' },
  { word: 'discount',  level: 'medium' },
  { word: 'cart',      level: 'easy' },
  { word: 'cashier',   level: 'medium' },
  { word: 'checkout',  level: 'medium' },
  { word: 'refund',    level: 'medium' },

  // added from dictionary
  { word: 'order',     level: 'easy' },
  { word: 'purchase',  level: 'easy' },
  { word: 'receipt',   level: 'medium' },
  { word: 'cost',      level: 'easy' },
  { word: 'coupon',    level: 'medium' },
  { word: 'credit',    level: 'medium' },
  { word: 'debit',     level: 'medium' },
  { word: 'payment',   level: 'medium' },
  { word: 'delivery',  level: 'medium' },
  { word: 'shipping',  level: 'medium' },
  { word: 'package',   level: 'medium' },
  { word: 'stores',    level: 'easy' },
  { word: 'shops',     level: 'easy' },
  { word: 'sales',     level: 'easy' },
  { word: 'discounts', level: 'medium' }
];

const shoppingFilterMeta = {
  all:       { name: { en: 'All',       he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },    emoji: '🛍️' },
  easy:      { name: { en: 'Easy',      he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium:    { name: { en: 'Medium',    he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:      { name: { en: 'Hard',      he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const shoppingCategory = {
  id: 'shopping',
  level: 'medium',
  name: {
    en: 'Shopping',
    he: 'קניות',
    es: 'Compras',
    ar: 'تسوق',
    ru: 'Покупки'
  },
  emoji: '🛍️',
  filters: Object.entries(shoppingFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? shopping.map(item => item.word)
      : shopping.filter(item => item.level === id).map(item => item.word)
  }))
};

// -------------------- GEOGRAPHY CATEGORY --------------------
const geography = [
  { word: 'continent',  level: 'medium' },
  { word: 'country',    level: 'easy' },
  { word: 'city',       level: 'easy' },
  { word: 'village',    level: 'easy' },
  { word: 'region',     level: 'medium' },
  { word: 'capital',    level: 'medium' },
  { word: 'state',      level: 'medium' },
  { word: 'river',      level: 'easy' },
  { word: 'mountain',   level: 'medium' },
  { word: 'ocean',      level: 'medium' },
  { word: 'desert',     level: 'medium' },
  { word: 'forest',     level: 'medium' },
  { word: 'valley',     level: 'medium' },
  { word: 'island',     level: 'easy' },
  { word: 'peninsula',  level: 'medium' },
  // added from dictionary:
  { word: 'bay',        level: 'easy' },
  { word: 'canyon',     level: 'medium' },
  { word: 'cape',       level: 'easy' },
  { word: 'channel',    level: 'medium' },
  { word: 'canal',      level: 'medium' },
  { word: 'plain',      level: 'easy' },
  { word: 'plateau',    level: 'medium' },
  { word: 'hill',       level: 'easy' },
  { word: 'cave',       level: 'medium' },
  { word: 'reef',       level: 'easy' },
  { word: 'marsh',      level: 'medium' },
  { word: 'swamp',      level: 'medium' },
  { word: 'oasis',      level: 'easy' },
  { word: 'rainforest', level: 'medium' },
  { word: 'volcano',    level: 'hard' },
  { word: 'lake',       level: 'easy' }
];

const geographyFilterMeta = {
  all:    { name: { en: 'All',    he: 'הכל',    es: 'Todo',    ar: 'الكل',  ru: 'Все'  }, emoji: '🗺️' },
  easy:   { name: { en: 'Easy',   he: 'קל',     es: 'Fácil',   ar: 'سهل',   ru: 'Легко' }, emoji: '💚'  },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio',   ar: 'متوسط', ru: 'Средне'}, emoji: '💛' },
  hard:   { name: { en: 'Hard',   he: 'קשה',    es: 'Difícil', ar: 'صعب',   ru: 'Трудно'}, emoji: '🔴' }
};

export const geographyCategory = {
  id: 'geography',
  level: 'medium',
  name: {
    en: 'Geography',
    he: 'גאוגרפיה',
    es: 'Geografía',
    ar: 'جغرافيا',
    ru: 'География'
  },
  emoji: '🗺️',
  filters: Object.entries(geographyFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? geography.map(item => item.word)
      : geography.filter(item => item.level === id).map(item => item.word)
  }))
};
// -------------------- BODY PARTS CATEGORY --------------------
const bodyParts = [
  // original list
  { word: 'head',      level: 'easy' },
  { word: 'hair',      level: 'easy' },
  { word: 'eye',       level: 'easy' },
  { word: 'ear',       level: 'easy' },
  { word: 'nose',      level: 'easy' },
  { word: 'mouth',     level: 'easy' },
  { word: 'neck',      level: 'easy' },
  { word: 'shoulder',  level: 'medium' },
  { word: 'arm',       level: 'easy' },
  { word: 'elbow',     level: 'medium' },
  { word: 'hand',      level: 'easy' },
  { word: 'finger',    level: 'easy' },
  { word: 'chest',     level: 'medium' },   // :contentReference[oaicite:0]{index=0}
  { word: 'stomach',   level: 'medium' },
  { word: 'back',      level: 'medium' },
  { word: 'leg',       level: 'easy' },
  { word: 'knee',      level: 'medium' },
  { word: 'foot',      level: 'easy' },
  { word: 'toe',       level: 'easy' },
  { word: 'heart',     level: 'hard' },
  { word: 'brain',     level: 'hard' },

  // added from dictionary lookup:
  { word: 'face',      level: 'easy' },     // :contentReference[oaicite:1]{index=1}
  { word: 'lip',       level: 'easy' },     // :contentReference[oaicite:2]{index=2}
  { word: 'lips',      level: 'easy' },     // :contentReference[oaicite:3]{index=3}
  { word: 'tooth',     level: 'medium' }    // :contentReference[oaicite:4]{index=4}
];

const bodyPartsFilterMeta = {
  all:    { name: { en: 'All',    he: 'הכל',    es: 'Todo',     ar: 'الكل',    ru: 'Все' },    emoji: '🦴' },
  easy:   { name: { en: 'Easy',   he: 'קל',     es: 'Fácil',    ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio',    ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',   he: 'קשה',    es: 'Difícil',  ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const bodyPartsCategory = {
  id: 'body_parts',
  level: 'medium',
  name: {
    en: 'Body Parts',
    he: 'גוף האדם',
    es: 'Partes del cuerpo',
    ar: 'أجزاء الجسم',
    ru: 'Части тела'
  },
  emoji: '🦴',
  filters: Object.entries(bodyPartsFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? bodyParts.map(item => item.word)
      : bodyParts.filter(item => item.level === id).map(item => item.word)
  }))
};
// -------------------- COOKING CATEGORY --------------------
const cooking = [
  { word: 'cook',       level: 'easy' },
  { word: 'bake',       level: 'medium' },
  { word: 'boil',       level: 'medium' },
  { word: 'fry',        level: 'medium' },
  { word: 'grill',      level: 'medium' },
  { word: 'roast',      level: 'medium' },
  { word: 'steam',      level: 'medium' },
  { word: 'chop',       level: 'easy' },
  { word: 'slice',      level: 'easy' },
  { word: 'mix',        level: 'easy' },
  { word: 'stir',       level: 'easy' },
  { word: 'season',     level: 'medium' },
  { word: 'recipe',     level: 'medium' },
  { word: 'ingredient', level: 'medium' },

  // added from dictionary:
  { word: 'barbecue',   level: 'medium' },  // 
  { word: 'blend',      level: 'medium' },  // 
  { word: 'dice',       level: 'medium' },  // 
  { word: 'melt',       level: 'easy'   },  // 
  { word: 'peel',       level: 'easy'   },  // 
  { word: 'simmer',     level: 'medium' },  // 
  { word: 'stew',       level: 'medium' },  // 
  { word: 'whisk',      level: 'medium' }   // 
];

const cookingFilterMeta = {
  all:    { name: { en: 'All',    he: 'הכל',    es: 'Todo',     ar: 'الكل',    ru: 'Все' },    emoji: '🍳' },
  easy:   { name: { en: 'Easy',   he: 'קל',     es: 'Fácil',    ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio',    ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',   he: 'קשה',    es: 'Difícil',  ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const cookingCategory = {
  id: 'cooking',
  level: 'medium',
  name: {
    en: 'Cooking',
    he: 'בישול',
    es: 'Cocina',
    ar: 'طبخ',
    ru: 'Кулинария'
  },
  emoji: '🍳',
  filters: Object.entries(cookingFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? cooking.map(item => item.word)
      : cooking.filter(item => item.level === id).map(item => item.word)
  }))
};

// -------------------- TOOLS CATEGORY --------------------
const toolsFilterMeta = [
  { id: 'all',    name: { en: 'All',    he: 'הכל',    es: 'Todo',    ar: 'الكل',    ru: 'Все' },     emoji: '🛠️' },
  { id: 'easy',   name: { en: 'Easy',   he: 'קל',     es: 'Fácil',   ar: 'سهل',    ru: 'Легко' },   emoji: '🛠️' },
  { id: 'medium', name: { en: 'Medium', he: 'בינוני', es: 'Medio',   ar: 'متوسط',  ru: 'Средний' }, emoji: '🛠️' },
  { id: 'hard',   name: { en: 'Hard',   he: 'קשה',    es: 'Difícil', ar: 'صعب',    ru: 'Сложно' }, emoji: '🛠️' }
];

const tools = [
  // original words
  { word: 'hammer',      level: 'medium' },
  { word: 'screwdriver', level: 'medium' },
  { word: 'wrench',      level: 'medium' },
  { word: 'drill',       level: 'medium' },
  { word: 'saw',         level: 'medium' },
  { word: 'knife',       level: 'medium' },
  { word: 'pliers',      level: 'medium' },
  { word: 'tape',        level: 'easy'   },
  { word: 'glue',        level: 'easy'   },
  { word: 'nail',        level: 'easy'   },
  { word: 'bolt',        level: 'easy'   },
  { word: 'screw',       level: 'easy'   },
  { word: 'ax',          level: 'easy'   },
  { word: 'shovel',      level: 'easy'   },

  // added from localDictionary_sorted.json:
  { word: 'level',    level: 'easy'   }, // :contentReference[oaicite:0]{index=0}
  { word: 'crowbar',  level: 'medium' }, // :contentReference[oaicite:1]{index=1}
  { word: 'paintbrush', level: 'medium' }, // :contentReference[oaicite:2]{index=2}
  { word: 'ruler',    level: 'easy'   }, // :contentReference[oaicite:3]{index=3}
  { word: 'ladder',   level: 'easy'   }, // :contentReference[oaicite:4]{index=4}
  { word: 'scissors', level: 'medium' }, // :contentReference[oaicite:5]{index=5}
  { word: 'pickaxe',  level: 'hard'   }  // :contentReference[oaicite:6]{index=6}
];

export const toolsCategory = {
  id: 'tools',
  filters: toolsFilterMeta,
  words: tools
};
// -------------------- MATERIALS CATEGORY --------------------
const materials = [
  // original words
  { word: 'wood',      level: 'easy' },
  { word: 'metal',     level: 'easy' },
  { word: 'plastic',   level: 'easy' },
  { word: 'glass',     level: 'easy' },
  { word: 'fabric',    level: 'medium' },
  { word: 'stone',     level: 'medium' },
  { word: 'paper',     level: 'easy' },
  { word: 'steel',     level: 'medium' },
  { word: 'concrete',  level: 'medium' },
  { word: 'brick',     level: 'easy' },

  // added from dictionary
  { word: 'leather',   level: 'medium' },
  { word: 'cotton',    level: 'easy' },
  { word: 'rubber',    level: 'medium' },
  { word: 'wool',      level: 'medium' },
  { word: 'silk',      level: 'hard' },
  { word: 'cement',    level: 'medium' },
  { word: 'ceramic',   level: 'hard' },
  { word: 'clay',      level: 'easy' },
  { word: 'nylon',     level: 'medium' },
  { word: 'aluminum',  level: 'medium' },
  { word: 'aluminium', level: 'medium' },
  { word: 'copper',    level: 'medium' },
  { word: 'iron',      level: 'easy' },
  { word: 'gold',      level: 'hard' },
  { word: 'silver',    level: 'hard' },
  { word: 'marble',    level: 'hard' },
  { word: 'granite',   level: 'hard' },
  { word: 'sand',      level: 'easy' },
  { word: 'oil',       level: 'easy' },
  { word: 'water',     level: 'easy' }
];

const materialsFilterMeta = {
  all:      { name: { en: 'All',      he: 'הכל',    es: 'Todo',     ar: 'الكل',    ru: 'Все' },    emoji: '🧱' },
  easy:     { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',    ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium:   { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',    ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:     { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',  ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const materialsCategory = {
  id: 'materials',
  level: 'medium',
  name: {
    en: 'Materials',
    he: 'חומרים',
    es: 'Materiales',
    ar: 'مواد',
    ru: 'Материалы'
  },
  emoji: '🧱',
  filters: Object.entries(materialsFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? materials.map(item => item.word)
      : materials.filter(item => item.level === id).map(item => item.word)
  }))
};

// -------------------- SCHOOL SUBJECTS CATEGORY --------------------
const schoolSubjects = [
  // original list
  { word: 'math',        level: 'easy'   },
  { word: 'history',     level: 'medium' },
  { word: 'geography',   level: 'medium' },
  { word: 'science',     level: 'medium' },
  { word: 'literature',  level: 'medium' },
  { word: 'art',         level: 'easy'   },
  { word: 'music',       level: 'easy'   },
  { word: 'physics',     level: 'hard'   },
  { word: 'chemistry',   level: 'hard'   },
  { word: 'biology',     level: 'medium' },

  // added from dictionary
  { word: 'economics',   level: 'hard'   },   // 
  { word: 'grammar',     level: 'easy'   },   // 
  { word: 'geometry',    level: 'medium' },  
  { word: 'algebra',     level: 'medium' },
  { word: 'reading',     level: 'easy'   },
  { word: 'writing',     level: 'easy'   },
  { word: 'statistics',  level: 'hard'   },
  { word: 'philosophy',  level: 'hard'   },
  { word: 'politics',    level: 'medium' }
];

const schoolSubjectsFilterMeta = {
  all:     { name: { en: 'All',    he: 'הכל',    es: 'Todo',     ar: 'الكل',    ru: 'Все' },    emoji: '📚' },
  easy:    { name: { en: 'Easy',   he: 'קל',     es: 'Fácil',    ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium:  { name: { en: 'Medium', he: 'בינוני', es: 'Medio',    ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:    { name: { en: 'Hard',   he: 'קשה',    es: 'Difícil',  ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const schoolSubjectsCategory = {
  id: 'school_subjects',
  level: 'medium',
  name: {
    en: 'School Subjects',
    he: 'מקצועות',
    es: 'Asignaturas',
    ar: 'المواد الدراسية',
    ru: 'Школьные предметы'
  },
  emoji: '📚',
  filters: Object.entries(schoolSubjectsFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? schoolSubjects.map(s => s.word)
      : schoolSubjects.filter(s => s.level === id).map(s => s.word)
  }))
};


// -------------------- DAILY ROUTINES CATEGORY --------------------
const dailyRoutines = [
  { word: 'wake',       level: 'easy' },
  { word: 'sleep',      level: 'easy' },
  { word: 'eat',        level: 'easy' },
  { word: 'drink',      level: 'easy' },
  { word: 'work',       level: 'easy' },
  { word: 'study',      level: 'medium' },
  { word: 'exercise',   level: 'medium' },
  { word: 'rest',       level: 'easy' },
  { word: 'shower',     level: 'easy' },
  { word: 'brush',      level: 'easy' },
  { word: 'dress',      level: 'easy' },
  { word: 'clean',      level: 'easy' },

  // added from dictionary lookup:
  { word: 'commute',    level: 'medium' },
  { word: 'travel',     level: 'medium' },
  { word: 'walk',       level: 'easy'   },
  { word: 'run',        level: 'easy'   },
  { word: 'read',       level: 'easy'   },
  { word: 'write',      level: 'easy'   },
  { word: 'talk',       level: 'easy'   },
  { word: 'drive',      level: 'medium' },
  { word: 'meditate',   level: 'hard'   },
  { word: 'relax',      level: 'medium' },
  { word: 'wash',       level: 'easy'   }
];

const dailyRoutinesFilterMeta = {
  all:    { name: { en: 'All',    he: 'הכל',    es: 'Todo',   ar: 'الكل',    ru: 'Все' },    emoji: '📅' },
  easy:   { name: { en: 'Easy',   he: 'קל',     es: 'Fácil',  ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio',  ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',   he: 'קשה',    es: 'Difícil',ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const dailyRoutinesCategory = {
  id: 'daily_routines',
  level: 'medium',
  name: {
    en: 'Daily Routines',
    he: 'שגרה יומית',
    es: 'Rutinas diarias',
    ar: 'روتين يومי',
    ru: 'Ежедневные задачи'
  },
  emoji: '📅',
  filters: Object.entries(dailyRoutinesFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? dailyRoutines.map(item => item.word)
      : dailyRoutines.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- PREPOSITIONS CATEGORY --------------------
const prepositions = [
  // original list
  { word: 'in',       level: 'easy' },
  { word: 'on',       level: 'easy' },
  { word: 'at',       level: 'easy' },
  { word: 'under',    level: 'easy' },
  { word: 'above',    level: 'easy' },
  { word: 'between',  level: 'medium' },
  { word: 'among',    level: 'medium' },
  { word: 'through',  level: 'medium' },
  { word: 'over',     level: 'easy' },
  { word: 'behind',   level: 'medium' },
  { word: 'beside',   level: 'medium' },
  { word: 'near',     level: 'easy' },
  { word: 'across',   level: 'medium' },
  { word: 'along',    level: 'medium' },
  { word: 'toward',   level: 'medium' },

  // added from dictionary:
  { word: 'after',     level: 'easy' },      // :contentReference[oaicite:0]{index=0}
  { word: 'before',    level: 'easy' },      // :contentReference[oaicite:1]{index=1}
  { word: 'against',   level: 'medium' },    // :contentReference[oaicite:2]{index=2}
  { word: 'by',        level: 'easy' },      // :contentReference[oaicite:3]{index=3}
  { word: 'for',       level: 'easy' },
  { word: 'from',      level: 'easy' },
  { word: 'of',        level: 'easy' },
  { word: 'off',       level: 'easy' },
  { word: 'into',      level: 'medium' },
  { word: 'onto',      level: 'medium' },
  { word: 'upon',      level: 'medium' },
  { word: 'via',       level: 'medium' },
  { word: 'during',    level: 'medium' },    // :contentReference[oaicite:4]{index=4}
  { word: 'within',    level: 'medium' },
  { word: 'without',   level: 'hard' },      // :contentReference[oaicite:5]{index=5}
  { word: 'beneath',   level: 'hard' },      // :contentReference[oaicite:6]{index=6}
  { word: 'beyond',    level: 'hard' }       // :contentReference[oaicite:7]{index=7}
];

const prepositionsFilterMeta = {
  all:    { name: { en: 'All',    he: 'הכל',        es: 'Todo',      ar: 'الكل',      ru: 'Все' },    emoji: '📍' },
  easy:   { name: { en: 'Easy',   he: 'קל',         es: 'Fácil',     ar: 'سهل',       ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני',     es: 'Medio',     ar: 'متوسط',     ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',   he: 'קשה',        es: 'Difícil',   ar: 'صعب',       ru: 'Трудно' }, emoji: '🔴' }
};

export const prepositionsCategory = {
  id: 'prepositions',
  level: 'medium',
  name: {
    en: 'Prepositions',
    he: 'מילות יחס',
    es: 'Preposiciones',
    ar: 'حروف الجر',
    ru: 'Предлоги'
  },
  emoji: '📍',
  filters: Object.entries(prepositionsFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? prepositions.map(p => p.word)
      : prepositions.filter(p => p.level === id).map(p => p.word)
  }))
};
// -------------------- ART & DESIGN CATEGORY --------------------
const artDesign = [
  // original words
  { word: 'painting',     level: 'medium' },
  { word: 'sculpture',    level: 'hard'   },
  { word: 'architecture', level: 'hard'   },
  { word: 'design',       level: 'medium' },
  { word: 'color',        level: 'easy'   },
  { word: 'canvas',       level: 'medium' },
  { word: 'drawing',      level: 'medium' },
  { word: 'gallery',      level: 'medium' },
  { word: 'museum',       level: 'medium' },
  { word: 'artist',       level: 'hard'   },

  // added from dictionary:
  { word: 'portrait',     level: 'medium' }, // :contentReference[oaicite:0]{index=0}
  { word: 'sketch',       level: 'easy'   }, // :contentReference[oaicite:1]{index=1}
  { word: 'picture',      level: 'easy'   }, // :contentReference[oaicite:2]{index=2}
  { word: 'photograph',   level: 'medium' }, // :contentReference[oaicite:3]{index=3}
  { word: 'photography',  level: 'medium' }, // :contentReference[oaicite:4]{index=4}
  { word: 'illustration', level: 'medium' }, // :contentReference[oaicite:5]{index=5}
  { word: 'animation',    level: 'hard'   }  // :contentReference[oaicite:6]{index=6}
];

const artDesignFilterMeta = {
  all:    { name: { en: 'All',    he: 'הכל',       es: 'Todo',      ar: 'الكل',      ru: 'Все'   }, emoji: '🎨' },
  easy:   { name: { en: 'Easy',   he: 'קל',        es: 'Fácil',     ar: 'سهل',       ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני',    es: 'Medio',     ar: 'متوسط',     ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',   he: 'קשה',       es: 'Difícil',   ar: 'صعب',       ru: 'Трудно' }, emoji: '🔴' }
};

export const artDesignCategory = {
  id: 'art_design',
  level: 'hard',
  name: {
    en: 'Art & Design',
    he: 'אמנות ועיצוב',
    es: 'Arte y diseño',
    ar: 'الفن والتصميم',
    ru: 'Искусство и дизайн'
  },
  emoji: '🎨',
  filters: Object.entries(artDesignFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? artDesign.map(item => item.word)
      : artDesign.filter(item => item.level === id).map(item => item.word)
  }))
};
// -------------------- AUTOMOTIVE CATEGORY --------------------
const automotive = [
  // original words
  { word: 'car',           level: 'easy' },
  { word: 'engine',        level: 'medium' },
  { word: 'wheel',         level: 'easy' },
  { word: 'brake',         level: 'easy' },
  { word: 'tire',          level: 'easy' },
  { word: 'fuel',          level: 'easy' },
  { word: 'transmission',  level: 'hard' },
  { word: 'road',          level: 'easy' },
  { word: 'garage',        level: 'medium' },
  { word: 'driver',        level: 'medium' },

  // added from dictionary
  { word: 'steering',      level: 'hard'   }, // 
  { word: 'accelerator',   level: 'hard'   }, // 
  { word: 'gas',           level: 'easy'   }, // 
  { word: 'petrol',        level: 'easy'   }, // 
  { word: 'clutch',        level: 'medium' }, // 
  { word: 'gearbox',       level: 'medium' }, // 
  { word: 'exhaust',       level: 'medium' }, // 
  { word: 'bumper',        level: 'medium' }, // 
  { word: 'hood',          level: 'easy'   }, // 
  { word: 'trunk',         level: 'medium' }, // 
  { word: 'boot',          level: 'easy'   }, // 
  { word: 'windshield',    level: 'medium' }, // 
  { word: 'windscreen',    level: 'medium' }, // 
  { word: 'headlight',     level: 'medium' }, // 
  { word: 'seatbelt',      level: 'medium' }, // 
  { word: 'mirror',        level: 'easy'   }, // 
  { word: 'radiator',      level: 'medium' }, // 
  { word: 'ignition',      level: 'medium' }, // 
  { word: 'oil',           level: 'easy'   }, // 
  { word: 'chassis',       level: 'hard'   }  // 
];

const automotiveFilterMeta = {
  all:          { name: { en: 'All',        he: 'הכל',    es: 'Todo',     ar: 'الكل',    ru: 'Все' },    emoji: '🚗' },
  easy:         { name: { en: 'Easy',       he: 'קל',     es: 'Fácil',    ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium:       { name: { en: 'Medium',     he: 'בינוני', es: 'Medio',    ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:         { name: { en: 'Hard',       he: 'קשה',    es: 'Difícil',  ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const automotiveCategory = {
  id: 'automotive',
  level: 'hard',
  name: {
    en: 'Automotive',
    he: 'רכב',
    es: 'Automoción',
    ar: 'السيارات',
    ru: 'Автомобили'
  },
  emoji: '🚗',
  filters: Object.entries(automotiveFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? automotive.map(item => item.word)
      : automotive.filter(item => item.level === id).map(item => item.word)
  }))
};
// -------------------- PSYCHOLOGY CATEGORY --------------------
const psychology = [
  { word: 'mind',           level: 'easy'   },
  { word: 'behavior',       level: 'medium' },
  { word: 'cognition',      level: 'hard'   },
  { word: 'emotion',        level: 'easy'   },
  { word: 'memory',         level: 'easy'   },
  { word: 'therapy',        level: 'medium' },
  { word: 'perception',     level: 'medium' },
  { word: 'motivation',     level: 'hard'   },
  { word: 'personality',    level: 'hard'   },
  { word: 'stress',         level: 'medium' },
  // added from dictionary:
  { word: 'psychology',     level: 'hard'   },
  { word: 'psychiatry',     level: 'hard'   },
  { word: 'psychiatrist',   level: 'hard'   },
  { word: 'psychoanalysis', level: 'hard'   },
  { word: 'anxiety',        level: 'medium' },
  { word: 'depression',     level: 'medium' },
  { word: 'neurosis',       level: 'hard'   },
  { word: 'unconscious',    level: 'medium' },
  { word: 'conscious',      level: 'medium' },
  { word: 'empathy',        level: 'easy'   },
  { word: 'counseling',     level: 'medium' },
  { word: 'counselor',      level: 'medium' },
  { word: 'conditioning',   level: 'medium' },
  { word: 'subconscious',   level: 'medium' },
  { word: 'conscience',     level: 'medium' },
  { word: 'intelligence',   level: 'hard'   }
];

const psychologyFilterMeta = {
  all:      { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },    emoji: '🧠' },
  easy:     { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium:   { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:     { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const psychologyCategory = {
  id: 'psychology',
  level: 'hard',
  name: {
    en: 'Psychology',
    he: 'פסיכולוגיה',
    es: 'Psicología',
    ar: 'علم النفس',
    ru: 'Психология'
  },
  emoji: '🧠',
  filters: Object.entries(psychologyFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? psychology.map(item => item.word)
      : psychology.filter(item => item.level === id).map(item => item.word)
  }))
};
// -------------------- PHILOSOPHY CATEGORY --------------------
const philosophy = [
  // המונחים הראשוניים
  { word: 'ethics',        level: 'medium' },
  { word: 'logic',         level: 'medium' },
  { word: 'metaphysics',   level: 'hard'   },
  { word: 'existence',     level: 'medium' },
  { word: 'reason',        level: 'easy'   },
  { word: 'truth',         level: 'medium' },
  { word: 'knowledge',     level: 'medium' },
  { word: 'aesthetics',    level: 'hard'   },
  { word: 'meaning',       level: 'medium' },
  { word: 'value',         level: 'medium' },

  // תוספות מתוך המילון
  { word: 'philosophy',        level: 'hard'   },
  { word: 'philosopher',       level: 'medium' },
  { word: 'philosophical',     level: 'medium' },
  { word: 'philosophically',   level: 'hard'   },
  { word: 'essence',           level: 'medium' },
  { word: 'rational',          level: 'medium' },
  { word: 'rationale',         level: 'medium' },
  { word: 'rationality',       level: 'hard'   },
  { word: 'agnostic',          level: 'medium' }
];

const philosophyFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '💭' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' },  emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const philosophyCategory = {
  id: 'philosophy',
  level: 'hard',
  name: {
    en: 'Philosophy',
    he: 'פילוסופיה',
    es: 'Filosofía',
    ar: 'فلسفة',
    ru: 'Философия'
  },
  emoji: '💭',
  filters: Object.entries(philosophyFilterMeta).map(
    ([id, { name, emoji }]) => ({
      id,
      name,
      emoji,
      words: id === 'all'
        ? philosophy.map(item => item.word)
        : philosophy.filter(item => item.level === id).map(item => item.word)
    })
  )
};
// -------------------- SOCIOLOGY CATEGORY --------------------
const sociology = [
  // מונחים ראשוניים
  { word: 'society',          level: 'easy'   },
  { word: 'culture',          level: 'easy'   },
  { word: 'group',            level: 'easy'   },
  { word: 'norm',             level: 'easy'   },
  { word: 'conflict',         level: 'medium' },
  { word: 'stratification',   level: 'hard'   },
  { word: 'interaction',      level: 'medium' },
  { word: 'deviance',         level: 'hard'   },
  { word: 'socialization',    level: 'medium' },
  { word: 'institution',      level: 'medium' },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'sociology',        level: 'hard'   },
  { word: 'sociological',     level: 'hard'   },
  { word: 'sociologist',      level: 'medium' },
  { word: 'bureaucracy',      level: 'hard'   },
  { word: 'bureaucrat',       level: 'medium' },
  { word: 'bureaucratic',     level: 'medium' },
  { word: 'urbanization',     level: 'medium' },
  { word: 'demographic',      level: 'medium' },
  { word: 'demographics',     level: 'medium' },
  { word: 'inequality',       level: 'medium' },
  { word: 'social',           level: 'easy'   },
  { word: 'socialism',        level: 'medium' },
  { word: 'socialist',        level: 'medium' }
];

const sociologyFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '👥' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const sociologyCategory = {
  id: 'sociology',
  level: 'hard',
  name: {
    en: 'Sociology',
    he: 'סוציולוגיה',
    es: 'Sociología',
    ar: 'علم الاجتماع',
    ru: 'Социология'
  },
  emoji: '👥',
  filters: Object.entries(sociologyFilterMeta).map(
    ([id, { name, emoji }]) => ({
      id,
      name,
      emoji,
      words: id === 'all'
        ? sociology.map(item => item.word)
        : sociology.filter(item => item.level === id).map(item => item.word)
    })
  )
};
// -------------------- ASTRONOMY CATEGORY --------------------
const astronomy = [
  // מונחים ראשוניים
  { word: 'star',       level: 'easy'   },
  { word: 'planet',     level: 'easy'   },
  { word: 'galaxy',     level: 'medium' },
  { word: 'comet',      level: 'medium' },
  { word: 'telescope',  level: 'medium' },
  { word: 'orbit',      level: 'easy'   },
  { word: 'cosmos',     level: 'hard'   },
  { word: 'universe',   level: 'hard'   },
  { word: 'eclipse',    level: 'medium' },
  { word: 'asteroid',   level: 'medium' },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'astronomy',      level: 'hard'   },
  { word: 'astronomical',   level: 'hard'   },
  { word: 'astronomer',     level: 'medium' },
  { word: 'astronaut',      level: 'medium' },
  { word: 'aurora',         level: 'medium' },
  { word: 'nova',           level: 'medium' }
];

const astronomyFilterMeta = {
  all:      { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '🌟' },
  easy:     { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium:   { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:     { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const astronomyCategory = {
  id: 'astronomy',
  level: 'hard',
  name: {
    en: 'Astronomy',
    he: 'אסטרונומיה',
    es: 'Astronomía',
    ar: 'علم الفلك',
    ru: 'Астрономия'
  },
  emoji: '🌟',
  filters: Object.entries(astronomyFilterMeta).map(
    ([id, { name, emoji }]) => ({
      id,
      name,
      emoji,
      words: id === 'all'
        ? astronomy.map(item => item.word)
        : astronomy.filter(item => item.level === id).map(item => item.word)
    })
  )
};
// -------------------- GEOLOGY CATEGORY --------------------
const geology = [
  // מונחים ראשוניים
  { word: 'rock',        level: 'easy'   },
  { word: 'mineral',     level: 'medium' },
  { word: 'fossil',      level: 'medium' },
  { word: 'earthquake',  level: 'medium' },
  { word: 'volcano',     level: 'medium' },
  { word: 'crust',       level: 'medium' },
  { word: 'magma',       level: 'medium' },
  { word: 'soil',        level: 'easy'   },
  { word: 'erosion',     level: 'medium' },
  { word: 'geode',       level: 'hard'   },

  // תוספות מתוך המילון
  { word: 'geology',     level: 'hard'   },
  { word: 'geological',  level: 'hard'   },
  { word: 'geologist',   level: 'medium' },
  { word: 'sediment',    level: 'medium' },
  { word: 'sedimentary', level: 'medium' },
  { word: 'lava',        level: 'medium' },
  { word: 'eruption',    level: 'medium' },
  { word: 'tremor',      level: 'medium' },
  { word: 'weathering',  level: 'medium' },
  { word: 'plate',       level: 'medium' }
];

const geologyFilterMeta = {
  all:      { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '🪨' },
  easy:     { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' },  emoji: '💚' },
  medium:   { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:     { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const geologyCategory = {
  id: 'geology',
  level: 'hard',
  name: {
    en: 'Geology',
    he: 'גאולוגיה',
    es: 'Geología',
    ar: 'علم الأرض',
    ru: 'Геология'
  },
  emoji: '🪨',
  filters: Object.entries(geologyFilterMeta).map(
    ([id, { name, emoji }]) => ({
      id,
      name,
      emoji,
      words: id === 'all'
        ? geology.map(item => item.word)
        : geology.filter(item => item.level === id).map(item => item.word)
    })
  )
};
// -------------------- CLIMATE SCIENCE CATEGORY --------------------
const climate_science = [
  // מונחים ראשוניים
  { word: 'climate',         level: 'medium' },
  { word: 'temperature',     level: 'easy'   },
  { word: 'rainfall',        level: 'medium' },
  { word: 'greenhouse',      level: 'medium' },
  { word: 'carbon',          level: 'easy'   },
  { word: 'dioxide',         level: 'medium' },
  { word: 'emissions',       level: 'medium' },
  { word: 'weather',         level: 'easy'   },
  { word: 'global',          level: 'easy'   },
  { word: 'warming',         level: 'medium' },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'climatology',     level: 'hard'   },
  { word: 'climatic',        level: 'medium' },
  { word: 'atmosphere',      level: 'easy'   },
  { word: 'atmospheric',     level: 'medium' },
  { word: 'precipitation',   level: 'medium' },
  { word: 'humidity',        level: 'medium' },
  { word: 'ozone',           level: 'medium' },
  { word: 'greenhouse-gas',  level: 'hard'   },
  { word: 'fossil-fuel',     level: 'medium' },
  { word: 'carbon footprint',level: 'medium' },
  { word: 'carbon-neutral',  level: 'medium' }
];

const climate_scienceFilterMeta = {
  all:      { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '🌡️' },
  easy:     { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium:   { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:     { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const climate_scienceCategory = {
  id: 'climate_science',
  level: 'hard',
  name: {
    en: 'Climate Science',
    he: 'מדעי האקלים',
    es: 'Ciencia del clima',
    ar: 'علوم المناخ',
    ru: 'Климатология'
  },
  emoji: '🌡️',
  filters: Object.entries(climate_scienceFilterMeta).map(
    ([id, { name, emoji }]) => ({
      id,
      name,
      emoji,
      words: id === 'all'
        ? climate_science.map(item => item.word)
        : climate_science.filter(item => item.level === id).map(item => item.word)
    })
  )
};
// -------------------- ZOOLOGY CATEGORY --------------------
const zoology = [
  { word: 'animal',     level: 'easy'   },
  { word: 'species',    level: 'medium' },
  { word: 'mammal',     level: 'medium' },
  { word: 'reptile',    level: 'medium' },
  { word: 'bird',       level: 'easy'   },
  { word: 'amphibian',  level: 'medium' },
  { word: 'habitat',    level: 'easy'   },
  { word: 'behavior',   level: 'medium' },
  { word: 'ecology',    level: 'medium' },
  { word: 'taxonomy',   level: 'hard'   },
  { word: 'zoo',        level: 'easy'   },
  { word: 'zookeeper',  level: 'medium' },
  { word: 'predator',   level: 'medium' },
  { word: 'prey',       level: 'easy'   },
  { word: 'ecosystem',  level: 'medium' },
  { word: 'population', level: 'medium' },
  { word: 'zoology',    level: 'hard'   }
];

const zoologyFilterMeta = {
  all:    { name: { en: 'All', he: 'הכל', es: 'Todo', ar: 'الكل', ru: 'Все' }, emoji: '🦘' },
  easy:   { name: { en: 'Easy', he: 'קל', es: 'Fácil', ar: 'سهل', ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio', ar: 'متوسط', ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard', he: 'קשה', es: 'Difícil', ar: 'صعب', ru: 'Трудно' }, emoji: '🔴' }
};

export const zoologyCategory = {
  id: 'zoology',
  level: 'hard',
  name: { en: 'Zoology', he: 'זואולוגיה', es: 'Zoología', ar: 'علم الحيوان', ru: 'Зоология' },
  emoji: '🦘',
  filters: Object.entries(zoologyFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? zoology.map(item => item.word)
      : zoology.filter(item => item.level === id).map(item => item.word)
  }))
};
// -------------------- BOTANY CATEGORY --------------------
const botany = [
  // מונחים ראשוניים
  { word: 'plant',           level: 'easy'   },
  { word: 'leaf',            level: 'easy'   },
  { word: 'flower',          level: 'easy'   },
  { word: 'stem',            level: 'easy'   },
  { word: 'root',            level: 'easy'   },
  { word: 'photosynthesis',  level: 'hard'   },
  { word: 'pollination',     level: 'hard'   },
  { word: 'seed',            level: 'medium' },
  { word: 'orchid',          level: 'hard'   },
  { word: 'fern',            level: 'medium' },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'botanical',       level: 'medium' },  // :contentReference[oaicite:0]{index=0}  
  { word: 'botanist',        level: 'medium' },  // :contentReference[oaicite:1]{index=1}  
  { word: 'flora',           level: 'easy'   },  // :contentReference[oaicite:2]{index=2}  
  { word: 'floral',          level: 'medium' },  // :contentReference[oaicite:3]{index=3}  
  { word: 'florist',         level: 'medium' },  // :contentReference[oaicite:4]{index=4}  
  { word: 'flowerbed',       level: 'medium' },  // :contentReference[oaicite:5]{index=5}  
  { word: 'vegetation',      level: 'medium' }   // :contentReference[oaicite:6]{index=6}  
];

const botanyFilterMeta = {
  all:      { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '🌿' },
  easy:     { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium:   { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:     { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const botanyCategory = {
  id: 'botany',
  level: 'hard',
  name: {
    en: 'Botany',
    he: 'בוטניקה',
    es: 'Botánica',
    ar: 'علم النبات',
    ru: 'Ботаника'
  },
  emoji: '🌿',
  filters: Object.entries(botanyFilterMeta).map(
    ([id, { name, emoji }]) => ({
      id,
      name,
      emoji,
      words: id === 'all'
        ? botany.map(item => item.word)
        : botany.filter(item => item.level === id).map(item => item.word)
    })
  )
};

// -------------------- COMPUTER SCIENCE CATEGORY --------------------
const computer_science = [
  // מונחים ראשוניים
  { word: 'algorithm',    level: 'hard'   },
  { word: 'data',         level: 'easy'   },
  { word: 'program',      level: 'medium' },
  { word: 'software',     level: 'medium' },
  { word: 'hardware',     level: 'medium' },
  { word: 'network',      level: 'medium' },
  { word: 'database',     level: 'medium' },
  { word: 'binary',       level: 'hard'   },
  { word: 'compiler',     level: 'hard'   },
  { word: 'encryption',   level: 'hard'   },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'computer',         level: 'easy'   },  // :contentReference[oaicite:7]{index=7}  
  { word: 'computers',        level: 'easy'   },  // :contentReference[oaicite:8]{index=8}  
  { word: 'computational',    level: 'medium' },  // :contentReference[oaicite:9]{index=9}  
  { word: 'computation',      level: 'medium' },  // :contentReference[oaicite:10]{index=10}  
  { word: 'computing',        level: 'medium' },  // :contentReference[oaicite:11]{index=11}  
  { word: 'programmer',       level: 'medium' },  // :contentReference[oaicite:12]{index=12}  
  { word: 'programming',      level: 'medium' },  // :contentReference[oaicite:13]{index=13}  
  { word: 'processor',        level: 'medium' },  // :contentReference[oaicite:14]{index=14}  
  { word: 'cache',            level: 'medium' }   // :contentReference[oaicite:15]{index=15}  
];

const computer_scienceFilterMeta = {
  all:      { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '💾' },
  easy:     { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium:   { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:     { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const computer_scienceCategory = {
  id: 'computer_science',
  level: 'hard',
  name: {
    en: 'Computer Science',
    he: 'מדעי המחשב',
    es: 'Informática',
    ar: 'علوم الحاسب',
    ru: 'Информатика'
  },
  emoji: '💾',
  filters: Object.entries(computer_scienceFilterMeta).map(
    ([id, { name, emoji }]) => ({
      id,
      name,
      emoji,
      words: id === 'all'
        ? computer_science.map(item => item.word)
        : computer_science.filter(item => item.level === id).map(item => item.word)
    })
  )
};

// -------------------- MACHINE LEARNING CATEGORY --------------------
const machine_learning = [
  // מונחים ראשוניים
  { word: 'model',          level: 'medium' },
  { word: 'training',       level: 'hard'   },
  { word: 'algorithm',      level: 'hard'   },
  { word: 'data',           level: 'easy'   },
  { word: 'regression',     level: 'hard'   },
  { word: 'classification', level: 'hard'   },
  { word: 'neural',         level: 'medium' },
  { word: 'network',        level: 'medium' },
  { word: 'prediction',     level: 'medium' },
  { word: 'feature',        level: 'medium' },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'probabilistic',  level: 'medium' },  // :contentReference[oaicite:16]{index=16}  
  { word: 'probability',    level: 'medium' }   // :contentReference[oaicite:17]{index=17}  
];

const machine_learningFilterMeta = {
  all:      { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '🤖' },
  easy:     { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium:   { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:     { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const machine_learningCategory = {
  id: 'machine_learning',
  level: 'hard',
  name: {
    en: 'Machine Learning',
    he: 'למידת מכונה',
    es: 'Aprendizaje automático',
    ar: 'تعلم الآلة',
    ru: 'Машинное обучение'
  },
  emoji: '🤖',
  filters: Object.entries(machine_learningFilterMeta).map(
    ([id, { name, emoji }]) => ({
      id,
      name,
      emoji,
      words: id === 'all'
        ? machine_learning.map(item => item.word)
        : machine_learning.filter(item => item.level === id).map(item => item.word)
    })
  )
};
// -------------------- CYBERSECURITY CATEGORY --------------------
const cybersecurity = [
  { word: 'encryption',      level: 'hard'   },
  { word: 'firewall',        level: 'medium' },
  { word: 'virus',           level: 'easy'   },
  { word: 'malware',         level: 'medium' },
  { word: 'hacking',         level: 'hard'   },
  { word: 'authentication',  level: 'hard'   },
  { word: 'password',        level: 'easy'   },
  { word: 'phishing',        level: 'medium' },
  { word: 'threat',          level: 'medium' },
  { word: 'breach',          level: 'hard'   },

  // additions from the dictionary:
  { word: 'cybercrime',      level: 'hard'   },   // :contentReference[oaicite:0]{index=0}
  { word: 'cyberspace',      level: 'medium' },   // :contentReference[oaicite:1]{index=1}
  { word: 'spyware',         level: 'medium' },   // :contentReference[oaicite:2]{index=2}
  { word: 'intrusion',       level: 'medium' },   // :contentReference[oaicite:3]{index=3}
  { word: 'vulnerability',   level: 'hard'   }    // :contentReference[oaicite:4]{index=4}
];

const cybersecurityFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '🔒' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const cybersecurityCategory = {
  id: 'cybersecurity',
  level: 'hard',
  name: {
    en: 'Cybersecurity',
    he: 'סייבר אבטחה',
    es: 'Ciberseguridad',
    ar: 'الأمن السيبراني',
    ru: 'Кибербезопасность'
  },
  emoji: '🔒',
  filters: Object.entries(cybersecurityFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? cybersecurity.map(item => item.word)
      : cybersecurity.filter(item => item.level === id).map(item => item.word)
  }))
};



// -------------------- ROBOTICS CATEGORY --------------------
const robotics = [
  { word: 'robot',        level: 'easy'   },
  { word: 'automation',   level: 'medium' },
  { word: 'sensor',       level: 'medium' },
  { word: 'actuator',     level: 'medium' },
  { word: 'ai',           level: 'hard'   },
  { word: 'control',      level: 'medium' },
  { word: 'drone',        level: 'medium' },
  { word: 'android',      level: 'medium' },
  { word: 'assembly',     level: 'medium' },
  { word: 'programming',  level: 'hard'   },

  // additions from the dictionary:
  { word: 'artificial',   level: 'medium' },  // :contentReference[oaicite:5]{index=5}
  { word: 'actuate',      level: 'medium' },  // :contentReference[oaicite:6]{index=6}
  { word: 'robotic',      level: 'hard'   },  // :contentReference[oaicite:7]{index=7}
  { word: 'robotics',     level: 'hard'   },  // :contentReference[oaicite:8]{index=8}
  { word: 'sensory',      level: 'medium' }   // :contentReference[oaicite:9]{index=9}
];

const roboticsFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '🤖' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const roboticsCategory = {
  id: 'robotics',
  level: 'hard',
  name: {
    en: 'Robotics',
    he: 'רובוטיקה',
    es: 'Robótica',
    ar: 'الروبوتات',
    ru: 'Робототехника'
  },
  emoji: '🤖',
  filters: Object.entries(roboticsFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? robotics.map(item => item.word)
      : robotics.filter(item => item.level === id).map(item => item.word)
  }))
};



// -------------------- ENGINEERING CATEGORY --------------------
const engineering = [
  { word: 'design',       level: 'medium' },
  { word: 'structure',    level: 'medium' },
  { word: 'material',     level: 'medium' },
  { word: 'stress',       level: 'medium' },
  { word: 'mechanics',    level: 'hard'   },
  { word: 'electric',     level: 'medium' },
  { word: 'circuit',      level: 'medium' },
  { word: 'manufacture',  level: 'hard'   },
  { word: 'analysis',     level: 'hard'   },
  { word: 'prototype',    level: 'hard'   },

  // additions from the dictionary:
  { word: 'engineer',     level: 'medium' },  // :contentReference[oaicite:10]{index=10}
  { word: 'engineered',   level: 'medium' },  // :contentReference[oaicite:11]{index=11}
  { word: 'mechanical',   level: 'medium' },  // :contentReference[oaicite:12]{index=12}
  { word: 'circuitry',    level: 'medium' },  // :contentReference[oaicite:13]{index=13}
  { word: 'analytical',   level: 'hard'   },  // :contentReference[oaicite:14]{index=14}
  { word: 'structural',   level: 'hard'   }   // :contentReference[oaicite:15]{index=15}
];

const engineeringFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '🏗️' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const engineeringCategory = {
  id: 'engineering',
  level: 'hard',
  name: {
    en: 'Engineering',
    he: 'הנדסה',
    es: 'Ingeniería',
    ar: 'الهندسة',
    ru: 'Инженерия'
  },
  emoji: '🏗️',
  filters: Object.entries(engineeringFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? engineering.map(item => item.word)
      : engineering.filter(item => item.level === id).map(item => item.word)
  }))
};



// -------------------- MEDIA & JOURNALISM CATEGORY --------------------
const media_journalism = [
  { word: 'news',         level: 'easy'   },
  { word: 'report',       level: 'medium' },
  { word: 'journalist',   level: 'hard'   },
  { word: 'editor',       level: 'medium' },
  { word: 'broadcast',    level: 'medium' },
  { word: 'press',        level: 'medium' },
  { word: 'article',      level: 'medium' },
  { word: 'interview',    level: 'medium' },
  { word: 'headline',     level: 'easy'   },
  { word: 'coverage',     level: 'hard'   },

  // additions:
  { word: 'journalism',   level: 'hard'   },
  { word: 'newspaper',    level: 'medium' },
  { word: 'publisher',    level: 'medium' },
  { word: 'media',        level: 'easy'   },    // :contentReference[oaicite:16]{index=16}
  { word: 'broadcasting', level: 'medium' },
  { word: 'interviewer',  level: 'medium' }
];

const media_journalismFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '📰' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const media_journalismCategory = {
  id: 'media_journalism',
  level: 'hard',
  name: {
    en: 'Media & Journalism',
    he: 'מדיה ועיתונות',
    es: 'Medios y periodismo',
    ar: 'الإعلام والصحافة',
    ru: 'СМИ и журналистика'
  },
  emoji: '📰',
  filters: Object.entries(media_journalismFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? media_journalism.map(item => item.word)
      : media_journalism.filter(item => item.level === id).map(item => item.word)
  }))
};
// -------------------- MARKETING CATEGORY --------------------
const marketing = [
  // מונחים ראשוניים
  { word: 'brand',        level: 'easy'   },
  { word: 'advertising',  level: 'medium' },
  { word: 'campaign',     level: 'medium' },
  { word: 'market',       level: 'easy'   },
  { word: 'consumer',     level: 'medium' },
  { word: 'strategy',     level: 'hard'   },
  { word: 'promotion',    level: 'medium' },
  { word: 'sales',        level: 'easy'   },
  { word: 'research',     level: 'hard'   },
  { word: 'digital',      level: 'easy'   },

  // תוספות מתוך המילון
  { word: 'marketing',    level: 'hard'   },   // :contentReference[oaicite:0]{index=0}
  { word: 'marketplace',  level: 'medium' }    // :contentReference[oaicite:1]{index=1}
];

const marketingFilterMeta = {
  all:    { name: { en: 'All', he: 'הכל', es: 'Todo', ar: 'الكل', ru: 'Все' },     emoji: '📈' },
  easy:   { name: { en: 'Easy', he: 'קל', es: 'Fácil', ar: 'سهل', ru: 'Легко' },   emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio', ar: 'متوسط', ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard', he: 'קשה', es: 'Difícil', ar: 'صعب', ru: 'Трудно' }, emoji: '🔴' }
};

export const marketingCategory = {
  id: 'marketing',
  level: 'hard',
  name: {
    en: 'Marketing',
    he: 'שיווק',
    es: 'Marketing',
    ar: 'التسويق',
    ru: 'Маркетинг'
  },
  emoji: '📈',
  filters: Object.entries(marketingFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? marketing.map(item => item.word)
      : marketing.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- ENTREPRENEURSHIP CATEGORY --------------------
const entrepreneurship = [
  // מונחים ראשוניים
  { word: 'startup',        level: 'hard'   },
  { word: 'investment',     level: 'hard'   },
  { word: 'pitch',          level: 'medium' },
  { word: 'innovation',     level: 'hard'   },
  { word: 'venture',        level: 'medium' },
  { word: 'funding',        level: 'medium' },
  { word: 'business',       level: 'easy'   },
  { word: 'growth',         level: 'medium' },
  { word: 'leadership',     level: 'hard'   },
  { word: 'scalability',    level: 'hard'   },

  // תוספות מתוך המילון
  { word: 'entrepreneur',   level: 'medium' },  // :contentReference[oaicite:2]{index=2}
  { word: 'entrepreneurial',level: 'medium' }   // :contentReference[oaicite:3]{index=3}
];

const entrepreneurshipFilterMeta = {
  all:    { name: { en: 'All', he: 'הכל', es: 'Todo', ar: 'الكل', ru: 'Все' },     emoji: '🚀' },
  easy:   { name: { en: 'Easy', he: 'קל', es: 'Fácil', ar: 'سهل', ru: 'Легко' },   emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio', ar: 'متوسط', ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard', he: 'קשה', es: 'Difícil', ar: 'صعب', ru: 'Трудно' }, emoji: '🔴' }
};

export const entrepreneurshipCategory = {
  id: 'entrepreneurship',
  level: 'hard',
  name: {
    en: 'Entrepreneurship',
    he: 'יזמות',
    es: 'Emprendimiento',
    ar: 'ريادة الأعمال',
    ru: 'Предпринимательство'
  },
  emoji: '🚀',
  filters: Object.entries(entrepreneurshipFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? entrepreneurship.map(item => item.word)
      : entrepreneurship.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- REAL ESTATE CATEGORY --------------------
const real_estate = [
  // מונחים ראשוניים
  { word: 'property',    level: 'easy'   },
  { word: 'house',       level: 'easy'   },
  { word: 'rent',        level: 'medium' },
  { word: 'mortgage',    level: 'hard'   },
  { word: 'apartment',   level: 'medium' },
  { word: 'land',        level: 'easy'   },
  { word: 'agent',       level: 'medium' },
  { word: 'buyer',       level: 'easy'   },
  { word: 'seller',      level: 'easy'   },
  { word: 'market',      level: 'easy'   },

  // תוספות מתוך המילון
  { word: 'real estate', level: 'hard'   },   // :contentReference[oaicite:4]{index=4}
  { word: 'estate',      level: 'easy'   },   // :contentReference[oaicite:5]{index=5}
  { word: 'estates',     level: 'medium' }    // :contentReference[oaicite:6]{index=6}
];

const real_estateFilterMeta = {
  all:    { name: { en: 'All', he: 'הכל', es: 'Todo', ar: 'الكل', ru: 'Все' },     emoji: '🏘️' },
  easy:   { name: { en: 'Easy', he: 'קל', es: 'Fácil', ar: 'سهل', ru: 'Легко' },   emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio', ar: 'متوسط', ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard', he: 'קשה', es: 'Difícil', ar: 'صعب', ru: 'Трудно' }, emoji: '🔴' }
};

export const real_estateCategory = {
  id: 'real_estate',
  level: 'hard',
  name: {
    en: 'Real Estate',
    he: 'נדל"ן',
    es: 'Bienes raíces',
    ar: 'العقارات',
    ru: 'Недвижимость'
  },
  emoji: '🏘️',
  filters: Object.entries(real_estateFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? real_estate.map(item => item.word)
      : real_estate.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- HOSPITALITY CATEGORY --------------------
const hospitality = [
  // מונחים ראשוניים
  { word: 'hotel',        level: 'easy'   },
  { word: 'restaurant',   level: 'medium' },
  { word: 'tourism',      level: 'medium' },
  { word: 'service',      level: 'easy'   },
  { word: 'guest',        level: 'easy'   },
  { word: 'reservation',  level: 'medium' },
  { word: 'reception',    level: 'medium' },
  { word: 'staff',        level: 'easy'   },
  { word: 'amenity',      level: 'medium' },
  { word: 'check-in',     level: 'medium' },

  // תוספות מתוך המילון
  { word: 'hospitality',  level: 'hard'   },  // :contentReference[oaicite:7]{index=7}
  { word: 'hospitable',   level: 'medium' },  // :contentReference[oaicite:8]{index=8}
  { word: 'hostel',       level: 'easy'   }   // :contentReference[oaicite:9]{index=9}
];

const hospitalityFilterMeta = {
  all:    { name: { en: 'All', he: 'הכל', es: 'Todo', ar: 'الكل', ru: 'Все' },     emoji: '🏨' },
  easy:   { name: { en: 'Easy', he: 'קל', es: 'Fácil', ar: 'سهل', ru: 'Легко' },   emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio', ar: 'متوسط', ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard', he: 'קשה', es: 'Difícil', ar: 'صعب', ru: 'Трудно' }, emoji: '🔴' }
};

export const hospitalityCategory = {
  id: 'hospitality',
  level: 'hard',
  name: {
    en: 'Hospitality',
    he: 'אירוח',
    es: 'Hospitalidad',
    ar: 'ضيافة',
    ru: 'Гостеприимство'
  },
  emoji: '🏨',
  filters: Object.entries(hospitalityFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? hospitality.map(item => item.word)
      : hospitality.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- FITNESS CATEGORY --------------------
const fitness = [
  // מונחים ראשוניים
  { word: 'gym',         level: 'easy'   },
  { word: 'exercise',    level: 'medium' },
  { word: 'workout',     level: 'medium' },
  { word: 'strength',    level: 'medium' },
  { word: 'cardio',      level: 'medium' },
  { word: 'stretch',     level: 'medium' },
  { word: 'nutrition',   level: 'easy'   },
  { word: 'trainer',     level: 'medium' },
  { word: 'routine',     level: 'medium' },
  { word: 'endurance',   level: 'hard'   },

  // תוספות מתוך המילון
  { word: 'fitness',     level: 'medium' }   // :contentReference[oaicite:10]{index=10}
];

const fitnessFilterMeta = {
  all:    { name: { en: 'All', he: 'הכל', es: 'Todo', ar: 'الكل', ru: 'Все' },     emoji: '💪' },
  easy:   { name: { en: 'Easy', he: 'קל', es: 'Fácil', ar: 'سهل', ru: 'Легко' },   emoji: '💚' },
  medium: { name: { en: 'Medium', he: 'בינוני', es: 'Medio', ar: 'متوسط', ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard', he: 'קשה', es: 'Difícil', ar: 'صعب', ru: 'Трудно' }, emoji: '🔴' }
};

export const fitnessCategory = {
  id: 'fitness',
  level: 'hard',
  name: {
    en: 'Fitness',
    he: 'כושר',
    es: 'Aptitud física',
    ar: 'لياقة بدنية',
    ru: 'Фитнес'
  },
  emoji: '💪',
  filters: Object.entries(fitnessFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? fitness.map(item => item.word)
      : fitness.filter(item => item.level === id).map(item => item.word)
  }))
};
// -------------------- WELLNESS CATEGORY --------------------
const wellness = [
  // מונחים ראשוניים
  { word: 'meditation',    level: 'hard'   },
  { word: 'mindfulness',   level: 'hard'   },
  { word: 'yoga',          level: 'medium' },
  { word: 'relaxation',    level: 'medium' },
  { word: 'stress',        level: 'medium' },
  { word: 'sleep',         level: 'easy'   },
  { word: 'therapy',       level: 'medium' },
  { word: 'balance',       level: 'medium' },
  { word: 'health',        level: 'easy'   },
  { word: 'lifestyle',     level: 'medium' },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'healthy',       level: 'easy'   },  // from dictionary
  { word: 'healthcare',    level: 'medium' },  // from dictionary
  { word: 'health care',   level: 'medium' },  // from dictionary
  { word: 'well-balanced', level: 'medium' },  // from dictionary
  { word: 'well-being',    level: 'medium' },  // manual addition
  { word: 'wellness',      level: 'hard'   }   // manual addition
];

const wellnessFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '🧘' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const wellnessCategory = {
  id: 'wellness',
  level: 'hard',
  name: {
    en: 'Wellness',
    he: 'בריאות כללית',
    es: 'Bienestar',
    ar: 'العافية',
    ru: 'Благополучие'
  },
  emoji: '🧘',
  filters: Object.entries(wellnessFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? wellness.map(item => item.word)
      : wellness.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- PARENTING CATEGORY --------------------
const parenting = [
  { word: 'child',        level: 'easy'   },
  { word: 'parent',       level: 'easy'   },
  { word: 'family',       level: 'easy'   },
  { word: 'care',         level: 'easy'   },
  { word: 'education',    level: 'medium' },
  { word: 'discipline',   level: 'medium' },
  { word: 'nurture',      level: 'medium' },
  { word: 'birth',        level: 'easy'   },
  { word: 'toddler',      level: 'medium' },
  { word: 'adolescent',   level: 'hard'   },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'parental',     level: 'medium' },
  { word: 'parenthood',   level: 'medium' },
  { word: 'parentage',    level: 'medium' },
  { word: 'grandparent',  level: 'medium' },
  { word: 'parenting',    level: 'hard'   }
];

const parentingFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '👶' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const parentingCategory = {
  id: 'parenting',
  level: 'hard',
  name: {
    en: 'Parenting',
    he: 'הורות',
    es: 'Paternidad',
    ar: 'الأبوة والأمومة',
    ru: 'Воспитание'
  },
  emoji: '👶',
  filters: Object.entries(parentingFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? parenting.map(item => item.word)
      : parenting.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- RELATIONSHIPS CATEGORY --------------------
const relationships = [
  { word: 'friendship',   level: 'easy'   },
  { word: 'love',         level: 'easy'   },
  { word: 'marriage',     level: 'medium' },
  { word: 'communication',level: 'hard'   },
  { word: 'trust',        level: 'medium' },
  { word: 'conflict',     level: 'medium' },
  { word: 'support',      level: 'medium' },
  { word: 'team',         level: 'easy'   },
  { word: 'bond',         level: 'medium' },
  { word: 'affection',    level: 'medium' },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'relationship', level: 'hard'   },
  { word: 'relationships',level: 'hard'   },
  { word: 'relation',     level: 'medium' },
  { word: 'relations',    level: 'medium' },
  { word: 'correlation',  level: 'hard'   }
];

const relationshipsFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '💕' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const relationshipsCategory = {
  id: 'relationships',
  level: 'hard',
  name: {
    en: 'Relationships',
    he: 'מערכות יחסים',
    es: 'Relaciones',
    ar: 'العلاقات',
    ru: 'Отношения'
  },
  emoji: '💕',
  filters: Object.entries(relationshipsFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? relationships.map(item => item.word)
      : relationships.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- GAMING & ESPORTS CATEGORY --------------------
const gaming_esports = [
  { word: 'game',         level: 'easy'   },
  { word: 'player',       level: 'easy'   },
  { word: 'tournament',   level: 'medium' },
  { word: 'console',      level: 'medium' },
  { word: 'pc',           level: 'easy'   },
  { word: 'controller',   level: 'medium' },
  { word: 'strategy',     level: 'hard'   },
  { word: 'multiplayer',  level: 'hard'   },
  { word: 'stream',       level: 'medium' },
  { word: 'esports',      level: 'hard'   },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'games',        level: 'easy'   },
  { word: 'video game',   level: 'medium' },
  { word: 'board game',   level: 'medium' },
  { word: 'streaming',    level: 'medium' },
  { word: 'drone',        level: 'medium' }  // קשור לטכנולוגיה
];

const gaming_esportsFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '🎮' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const gaming_esportsCategory = {
  id: 'gaming_esports',
  level: 'hard',
  name: {
    en: 'Gaming & eSports',
    he: 'גיימינג וספורט אלקטרוני',
    es: 'Gaming y eSports',
    ar: 'الألعاب والرياضات الإلكترونية',
    ru: 'Игры и кибרспорт'
  },
  emoji: '🎮',
  filters: Object.entries(gaming_esportsFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? gaming_esports.map(item => item.word)
      : gaming_esports.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- SOCIAL MEDIA CATEGORY --------------------
const social_media = [
  { word: 'post',         level: 'easy'   },
  { word: 'like',         level: 'easy'   },
  { word: 'share',        level: 'easy'   },
  { word: 'comment',      level: 'easy'   },
  { word: 'follow',       level: 'easy'   },
  { word: 'hashtag',      level: 'medium' },
  { word: 'profile',      level: 'easy'   },
  { word: 'feed',         level: 'easy'   },
  { word: 'story',        level: 'medium' },
  { word: 'upload',       level: 'medium' },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'social',            level: 'easy'   },
  { word: 'social networking', level: 'medium' },
  { word: 'socialize',         level: 'medium' },
  { word: 'socialite',         level: 'hard'   }
];

const social_mediaFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '📱' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const social_mediaCategory = {
  id: 'social_media',
  level: 'hard',
  name: {
    en: 'Social Media',
    he: 'רשתות חברתיות',
    es: 'Redes sociales',
    ar: 'وسائل التواصل الاجتماعي',
    ru: 'Социальные сети'
  },
  emoji: '📱',
  filters: Object.entries(social_mediaFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? social_media.map(item => item.word)
      : social_media.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- ONLINE LEARNING CATEGORY --------------------
const online_learning = [
  { word: 'course',      level: 'medium' },
  { word: 'module',      level: 'medium' },
  { word: 'lesson',      level: 'medium' },
  { word: 'video',       level: 'easy'   },
  { word: 'quiz',        level: 'medium' },
  { word: 'certificate', level: 'hard'   },
  { word: 'platform',    level: 'medium' },
  { word: 'student',     level: 'easy'   },
  { word: 'instructor',  level: 'medium' },
  { word: 'assignment',  level: 'medium' },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'courses',     level: 'medium' },
  { word: 'modules',     level: 'medium' },
  { word: 'lessons',     level: 'medium' }
];

const online_learningFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },     emoji: '💻' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' }, emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно' }, emoji: '🔴' }
};

export const online_learningCategory = {
  id: 'online_learning',
  level: 'hard',
  name: {
    en: 'Online Learning',
    he: 'למידה מקוונת',
    es: 'Aprendizaje en línea',
    ar: 'التعلم عبر الإنترنت',
    ru: 'Онлайн обучение'
  },
  emoji: '💻',
  filters: Object.entries(online_learningFilterMeta).map(([id, { name, emoji }]) => ({
    id,
    name,
    emoji,
    words: id === 'all'
      ? online_learning.map(item => item.word)
      : online_learning.filter(item => item.level === id).map(item => item.word)
  }))
};
// -------------------- TOURISM CATEGORY --------------------
const tourism = [
  // מונחים ראשוניים
  { word: 'tour',           level: 'easy'   },
  { word: 'guide',          level: 'easy'   },
  { word: 'itinerary',      level: 'hard'   },
  { word: 'landmark',       level: 'medium' },
  { word: 'sightseeing',    level: 'medium' },
  { word: 'culture',        level: 'easy'   },
  { word: 'explore',        level: 'medium' },
  { word: 'journey',        level: 'medium' },
  { word: 'backpack',       level: 'medium' },
  { word: 'souvenir',       level: 'easy'   },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'tourism',        level: 'hard'   },
  { word: 'tourist',        level: 'medium' },
  { word: 'excursion',      level: 'medium' },
  { word: 'passport',       level: 'easy'   },
  { word: 'booking',        level: 'medium' },
  { word: 'travel',         level: 'easy'   },
  { word: 'travel agent',   level: 'hard'   },
  { word: 'traveler',       level: 'medium' },
  { word: 'tour guide',     level: 'medium' },
  { word: 'hotelier',       level: 'medium' }
];

const tourismFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },   emoji: '🗺️' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' },emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно'}, emoji: '🔴' }
};

export const tourismCategory = {
  id: 'tourism',
  level: 'hard',
  name: {
    en: 'Tourism',
    he: 'תיירות',
    es: 'Turismo',
    ar: 'السياحة',
    ru: 'Туризм'
  },
  emoji: '🗺️',
  filters: Object.entries(tourismFilterMeta).map(([id, { name, emoji }]) => ({
    id, name, emoji,
    words: id === 'all'
      ? tourism.map(item => item.word)
      : tourism.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- LOGISTICS CATEGORY --------------------
const logistics = [
  { word: 'shipment',      level: 'medium' },
  { word: 'warehouse',     level: 'medium' },
  { word: 'distribution',  level: 'medium' },
  { word: 'supply',        level: 'easy'   },
  { word: 'chain',         level: 'easy'   },
  { word: 'transport',     level: 'medium' },
  { word: 'inventory',     level: 'medium' },
  { word: 'delivery',      level: 'easy'   },
  { word: 'tracking',      level: 'medium' },
  { word: 'cargo',         level: 'medium' },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'transportation',level: 'medium' },
  { word: 'redistribution',level: 'hard'   },
  { word: 'public transport', level: 'medium' }
];

const logisticsFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },   emoji: '📦' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' },emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно'}, emoji: '🔴' }
};

export const logisticsCategory = {
  id: 'logistics',
  level: 'hard',
  name: {
    en: 'Logistics',
    he: 'לוגיסטיקה',
    es: 'Logística',
    ar: 'اللوجستيات',
    ru: 'Логистика'
  },
  emoji: '📦',
  filters: Object.entries(logisticsFilterMeta).map(([id, { name, emoji }]) => ({
    id, name, emoji,
    words: id === 'all'
      ? logistics.map(item => item.word)
      : logistics.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- RETAIL CATEGORY --------------------
const retail = [
  { word: 'store',        level: 'easy'   },
  { word: 'sale',         level: 'easy'   },
  { word: 'inventory',    level: 'medium' },
  { word: 'customer',     level: 'easy'   },
  { word: 'checkout',     level: 'medium' },
  { word: 'aisle',        level: 'medium' },
  { word: 'product',      level: 'easy'   },
  { word: 'display',      level: 'medium' },
  { word: 'merchandise',  level: 'medium' },
  { word: 'cashier',      level: 'medium' },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'retail',       level: 'hard'   },
  { word: 'retailer',     level: 'medium' },
  { word: 'retailers',    level: 'medium' }
];

const retailFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },   emoji: '🏬' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' },emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно'}, emoji: '🔴' }
};

export const retailCategory = {
  id: 'retail',
  level: 'hard',
  name: {
    en: 'Retail',
    he: 'קמעונאות',
    es: 'Venta al por menor',
    ar: 'تجزئة',
    ru: 'Розничная торговля'
  },
  emoji: '🏬',
  filters: Object.entries(retailFilterMeta).map(([id, { name, emoji }]) => ({
    id, name, emoji,
    words: id === 'all'
      ? retail.map(item => item.word)
      : retail.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- CONSTRUCTION CATEGORY --------------------
const construction = [
  { word: 'building',    level: 'easy'   },
  { word: 'site',        level: 'easy'   },
  { word: 'contractor',  level: 'medium' },
  { word: 'cement',      level: 'medium' },
  { word: 'beam',        level: 'medium' },
  { word: 'scaffold',    level: 'hard'   },
  { word: 'permit',      level: 'medium' },
  { word: 'architecture',level: 'hard'   },
  { word: 'engineer',    level: 'medium' },
  { word: 'blueprint',   level: 'hard'   },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'construct',       level: 'hard'   },
  { word: 'constructive',    level: 'medium' },
  { word: 'reconstruction',  level: 'hard'   },
  { word: 'architect',       level: 'medium' },
  { word: 'architectural',   level: 'medium' }
];

const constructionFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },   emoji: '🏗️' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' },emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно'}, emoji: '🔴' }
};

export const constructionCategory = {
  id: 'construction',
  level: 'hard',
  name: {
    en: 'Construction',
    he: 'בנייה',
    es: 'Construcción',
    ar: 'البناء',
    ru: 'Строительство'
  },
  emoji: '🏗️',
  filters: Object.entries(constructionFilterMeta).map(([id, { name, emoji }]) => ({
    id, name, emoji,
    words: id === 'all'
      ? construction.map(item => item.word)
      : construction.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- MANUFACTURING CATEGORY --------------------
const manufacturing = [
  { word: 'factory',       level: 'easy'   },
  { word: 'assembly',      level: 'medium' },
  { word: 'production',    level: 'hard'   },
  { word: 'machine',       level: 'medium' },
  { word: 'automation',    level: 'medium' },
  { word: 'quality',       level: 'hard'   },
  { word: 'control',       level: 'hard'   },
  { word: 'process',       level: 'hard'   },
  { word: 'output',        level: 'medium' },
  { word: 'plant',         level: 'easy'   },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'manufacture',   level: 'hard'   },
  { word: 'manufactured',  level: 'medium' },
  { word: 'manufacturer',  level: 'medium' },
  { word: 'manufacturing', level: 'hard'   }
];

const manufacturingFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },   emoji: '🏭' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' },emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно'}, emoji: '🔴' }
};

export const manufacturingCategory = {
  id: 'manufacturing',
  level: 'hard',
  name: {
    en: 'Manufacturing',
    he: 'ייצור',
    es: 'Manufactura',
    ar: 'تصنيع',
    ru: 'Производство'
  },
  emoji: '🏭',
  filters: Object.entries(manufacturingFilterMeta).map(([id, { name, emoji }]) => ({
    id, name, emoji,
    words: id === 'all'
      ? manufacturing.map(item => item.word)
      : manufacturing.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- SUPPLY CHAIN CATEGORY --------------------
const supply_chain = [
  { word: 'supplier',      level: 'medium' },
  { word: 'demand',        level: 'easy'   },
  { word: 'logistics',     level: 'hard'   },
  { word: 'inventory',     level: 'medium' },
  { word: 'transport',     level: 'medium' },
  { word: 'warehouse',     level: 'medium' },
  { word: 'distribution',  level: 'medium' },
  { word: 'order',         level: 'easy'   },
  { word: 'forecast',      level: 'medium' },
  { word: 'procurement',   level: 'hard'   },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'suppliers',     level: 'medium' },
  { word: 'demands',       level: 'medium' },
  { word: 'demanding',     level: 'hard'   }
];

const supply_chainFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },   emoji: '🔗' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' },emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно'}, emoji: '🔴' }
};

export const supply_chainCategory = {
  id: 'supply_chain',
  level: 'hard',
  name: {
    en: 'Supply Chain',
    he: 'שרשרת אספקה',
    es: 'Cadena de suministro',
    ar: 'سلسلة التوريد',
    ru: 'Цепочка поставок'
  },
  emoji: '🔗',
  filters: Object.entries(supply_chainFilterMeta).map(([id, { name, emoji }]) => ({
    id, name, emoji,
    words: id === 'all'
      ? supply_chain.map(item => item.word)
      : supply_chain.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- NUTRITION CATEGORY --------------------
const nutrition = [
  { word: 'vitamin',       level: 'easy'   },
  { word: 'protein',       level: 'easy'   },
  { word: 'carbohydrate',  level: 'medium' },
  { word: 'fat',           level: 'easy'   },
  { word: 'mineral',       level: 'medium' },
  { word: 'fiber',         level: 'medium' },
  { word: 'calorie',       level: 'medium' },
  { word: 'diet',          level: 'easy'   },
  { word: 'meal',          level: 'easy'   },
  { word: 'nutrition',     level: 'hard'   },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'nutrient',      level: 'medium' },
  { word: 'nutritional',   level: 'medium' },
  { word: 'nutritionist',  level: 'hard'   },
  { word: 'nutritious',    level: 'medium' },
  { word: 'malnutrition',  level: 'hard'   }
];

const nutritionFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },   emoji: '🥗' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' },emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно'}, emoji: '🔴' }
};

export const nutritionCategory = {
  id: 'nutrition',
  level: 'hard',
  name: {
    en: 'Nutrition',
    he: 'תזונה',
    es: 'Nutrición',
    ar: 'تغذية',
    ru: 'Питание'
  },
  emoji: '🥗',
  filters: Object.entries(nutritionFilterMeta).map(([id, { name,emoji }]) => ({
    id, name, emoji,
    words: id === 'all'
      ? nutrition.map(item => item.word)
      : nutrition.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- MENTAL HEALTH CATEGORY --------------------
const mental_health = [
  { word: 'anxiety',       level: 'hard'   },
  { word: 'depression',    level: 'hard'   },
  { word: 'therapy',       level: 'medium' },
  { word: 'stress',        level: 'medium' },
  { word: 'mindfulness',   level: 'hard'   },
  { word: 'psychiatry',    level: 'hard'   },
  { word: 'support',       level: 'medium' },
  { word: 'resilience',    level: 'hard'   },
  { word: 'emotion',       level: 'medium' },
  { word: 'wellbeing',     level: 'medium' },

  // תוספות מתוך localDictionary_sorted.json
  { word: 'psychiatrist',  level: 'hard'   },
  { word: 'psychological', level: 'hard'   },
  { word: 'psychologist',  level: 'hard'   },
  { word: 'psychology',    level: 'hard'   }
];

const mental_healthFilterMeta = {
  all:    { name: { en: 'All',      he: 'הכל',     es: 'Todo',      ar: 'الكل',    ru: 'Все' },   emoji: '🧠' },
  easy:   { name: { en: 'Easy',     he: 'קל',      es: 'Fácil',     ar: 'سهل',     ru: 'Легко' }, emoji: '💚' },
  medium: { name: { en: 'Medium',   he: 'בינוני',  es: 'Medio',     ar: 'متوسط',   ru: 'Средне' },emoji: '💛' },
  hard:   { name: { en: 'Hard',     he: 'קשה',     es: 'Difícil',   ar: 'صعب',     ru: 'Трудно'}, emoji: '🔴' }
};

export const mental_healthCategory = {
  id: 'mental_health',
  level: 'hard',
  name: {
    en: 'Mental Health',
    he: 'בריאות נפש',
    es: 'Salud mental',
    ar: 'الصحة النفسية',
    ru: 'Психическое здоровье'
  },
  emoji: '🧠',
  filters: Object.entries(mental_healthFilterMeta).map(([id, { name, emoji }]) => ({
    id, name, emoji,
    words: id === 'all'
      ? mental_health.map(item => item.word)
      : mental_health.filter(item => item.level === id).map(item => item.word)
  }))
};


// -------------------- PSYCHOMETRIC CATEGORY --------------------
export const psychometricCategory = {
  id: 'psychometric',
  level: 'hard',
  name: {
    en: 'Psychometric',
    he: 'פסיכומטרי',
    es: 'Psicométrico',
    ar: 'اختبار القدرات',
    ru: 'Психометрический'
  },
  emoji: '📊',
  filters: [
    { id: 'all',    name: { en:'All', he:'הכל', es:'Todo', ar:'الكل', ru:'Все' }, emoji: '📊' }
  ]
};


// -------------------- CONJUNCTIONS CATEGORY --------------------
const conjunctions = [
  'and','or','but','because','so','yet','for','nor',
  // תוספות
  'although','unless','since','though','until'
];

export const conjunctionsCategory = {
  id: 'conjunctions',
  level: 'medium',
  name: {
    en: 'Conjunctions',
    he: 'מילות קישור',
    es: 'Conjunciones',
    ar: 'حروف العطف',
    ru: 'Союзы'
  },
  emoji: '🔗',
  filters: [
    { id: 'all', name: { en:'All', he:'הכל', es:'Todo', ar:'الكل', ru:'Все' }, emoji:'🔗', words: conjunctions }
  ]
};


// -------------------- INTERJECTIONS CATEGORY --------------------
const interjections = [
  'oh','wow','ah','hey','oops','hmm','yay','ouch','uh'
];

export const interjectionsCategory = {
  id: 'interjections',
  level: 'medium',
  name: {
    en: 'Interjections',
    he: 'התפרצויות',
    es: 'Interjecciones',
    ar: 'تعجبات',
    ru: 'Междометия'
  },
  emoji: '❗',
  filters: [
    { id: 'all', name: { en:'All', he:'הכל', es:'Todo', ar:'الكل', ru:'Все' }, emoji:'❗', words: interjections }
  ]
};


// -------------------- UNITS CATEGORY --------------------
const units = [
  'meter','kilogram','liter','second','degree','percent','mile','pound','inch',
  // תוספות
  'metre','kilometre','litre','gram'
];

export const unitsCategory = {
  id: 'units',
  level: 'medium',
  name: {
    en: 'Units',
    he: 'יחידות',
    es: 'Unidades',
    ar: 'وحدات',
    ru: 'Единицы'
  },
  emoji: '📏',
  filters: [
    { id: 'all', name: { en:'All', he:'הכל', es:'Todo', ar:'الكل', ru:'Все' }, emoji:'📏', words: units }
  ]
};

// Default export: combine all categories
export default [
  animalsCategory,
  numbersCategory,
  colorsCategory,
  foodDrinkCategory,
  travelCategory,
  householdCategory,
  clothingCategory,
  familyCategory,
  natureCategory,
  weatherCategory,
  timeCategory,
  sportsCategory,
  educationCategory,
  entertainmentCategory,
  shoppingCategory,
  geographyCategory,
  bodyPartsCategory,
  cookingCategory,
  toolsCategory,
  materialsCategory,
  schoolSubjectsCategory,
  dailyRoutinesCategory,
  prepositionsCategory,
  artDesignCategory,
  automotiveCategory,
  psychologyCategory,
  philosophyCategory,
  sociologyCategory,
  astronomyCategory,
  geologyCategory,
  climate_scienceCategory,
  zoologyCategory,
  botanyCategory,
  computer_scienceCategory,
  machine_learningCategory,
  cybersecurityCategory,
  roboticsCategory,
  engineeringCategory,
  media_journalismCategory,
  marketingCategory,
  entrepreneurshipCategory,
  real_estateCategory,
  hospitalityCategory,
  fitnessCategory,
  wellnessCategory,
  parentingCategory,
  relationshipsCategory,
  gaming_esportsCategory,
  social_mediaCategory,
  online_learningCategory,
  tourismCategory,
  logisticsCategory,
  retailCategory,
  constructionCategory,
  manufacturingCategory,
  supply_chainCategory,
  nutritionCategory,
  mental_healthCategory,
  psychometricCategory,
  conjunctionsCategory,
  interjectionsCategory,
  unitsCategory,
];
