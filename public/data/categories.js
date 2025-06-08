import dictionary from './localDictionary_sorted.json';
// import wordLevels from './word_levels.json';
import psychometricWords from './psychometric_dict.json';

// Build alphabetical categories dynamically
const alphabeticalMap = {};
Object.keys(dictionary).forEach(word => {
  const letter = word[0].toLowerCase();
  if (!alphabeticalMap[letter]) alphabeticalMap[letter] = [];
  alphabeticalMap[letter].push(word);
});
const alphabeticalCategories = Object.keys(alphabeticalMap)
  .sort()
  .map(letter => ({
    id: `letter_${letter}`,
    level: 'all',
    name: {
      en: `Letter ${letter.toUpperCase()}`,
      he: letter.toUpperCase(),
      es: letter.toUpperCase(),
      ar: letter.toUpperCase(),
      ru: letter.toUpperCase()
    },
    emoji: letter.toUpperCase(),
    words: alphabeticalMap[letter]
  }));

export default [
  // --- Theme-based categories (Easy) ---
  {
    id: 'numbers',
    level: 'easy',
    name: { en: 'Numbers', he: 'מספרים', es: 'Números', ar: 'أرقام', ru: 'Числа' },
    emoji: '🔢',
    words: ['zero','one','two','three','four','five','six','seven','eight','nine','ten','hundred','thousand','million']
  },
  {
    id: 'colors',
    level: 'easy',
    name: { en: 'Colors', he: 'צבעים', es: 'Colores', ar: 'ألوان', ru: 'Цвета' },
    emoji: '🌈',
    words: ['red','orange','yellow','green','blue','purple','pink','brown','black','white','grey']
  },
  {
    id: 'food_drink',
    level: 'easy',
    name: { en: 'Food & Drink', he: 'אוכל ושתייה', es: 'Comida y bebida', ar: 'طعام وشراب', ru: 'Еда и напитки' },
    emoji: '🍽️',
    words: ['bread','cheese','milk','apple','banana','rice','egg','butter','coffee','tea','sugar','salt','pepper','meat','fish','vegetable','fruit','water','juice','beer','wine']
  },
  {
    id: 'travel',
    level: 'easy',
    name: { en: 'Travel', he: 'טיולים', es: 'Viajar', ar: 'سفر', ru: 'Путешествия' },
    emoji: '✈️',
    words: ['airport','ticket','passport','luggage','hotel','map','train','bus','taxi','flight','station','tour','booking','tourist']
  },
  {
    id: 'transport',
    level: 'easy',
    name: { en: 'Transportation', he: 'תחבורה', es: 'Transporte', ar: 'النقل', ru: 'Транспорт' },
    emoji: '🚗',
    words: ['car','bus','train','plane','ship','bike','metro','tram','subway','taxi','uber','lyft']
  },
  {
    id: 'household',
    level: 'easy',
    name: { en: 'Household', he: 'בית', es: 'Hogar', ar: 'منزل', ru: 'Дом' },
    emoji: '🏠',
    words: ['door','window','bed','chair','table','couch','lamp','sink','mirror','curtain','floor','roof','wall','ceiling','cupboard','drawer','dish','plate','mop','broom']
  },
  {
    id: 'clothing',
    level: 'easy',
    name: { en: 'Clothing', he: 'ביגוד', es: 'Ropa', ar: 'ملابس', ru: 'Одежда' },
    emoji: '👗',
    words: ['shirt','pants','dress','skirt','shoe','sock','hat','coat','jacket','tie','belt','glove','scarf','shorts','sweater','boot','bag']
  },
  {
    id: 'family',
    level: 'easy',
    name: { en: 'Family', he: 'משפחה', es: 'Familia', ar: 'عائلة', ru: 'Семья' },
    emoji: '👪',
    words: ['mother','father','brother','sister','son','daughter','grandmother','grandfather','uncle','aunt','cousin','husband','wife']
  },
  {
    id: 'nature',
    level: 'easy',
    name: { en: 'Nature', he: 'טבע', es: 'Naturaleza', ar: 'طبيعة', ru: 'Природа' },
    emoji: '🌳',
    words: ['tree','flower','grass','river','mountain','sky','cloud','rain','snow','sun','moon','star','ocean','beach','rock','forest','desert','valley','lake']
  },
  {
    id: 'weather',
    level: 'easy',
    name: { en: 'Weather', he: 'מזג אוויר', es: 'Clima', ar: 'الطقس', ru: 'Погода' },
    emoji: '☀️',
    words: ['sunny','rainy','cloudy','windy','stormy','snowy','foggy','hot','cold','warm','cool','temperature','humidity','thunder','lightning']
  },
  {
    id: 'time',
    level: 'easy',
    name: { en: 'Time', he: 'זמן', es: 'Tiempo', ar: 'الوقت', ru: 'Время' },
    emoji: '⏰',
    words: ['day','night','morning','afternoon','evening','hour','minute','second','week','month','year','today','tomorrow','yesterday']
  },

  // --- Additional theme categories (Medium) ---
  {
    id: 'sports',
    level: 'medium',
    name: { en: 'Sports', he: 'ספורט', es: 'Deportes', ar: 'رياضة', ru: 'Спорт' },
    emoji: '🏅',
    words: ['football','basketball','tennis','soccer','baseball','cricket','hockey','golf','swimming','running','yoga','gym','skiing','boxing','surfing']
  },
  {
    id: 'education',
    level: 'medium',
    name: { en: 'Education', he: 'חינוך', es: 'Educación', ar: 'تعليم', ru: 'Образование' },
    emoji: '🎓',
    words: ['school','university','student','teacher','lesson','exam','study','classroom','homework','degree','lecture']
  },
  {
    id: 'entertainment',
    level: 'medium',
    name: { en: 'Entertainment', he: 'בידור', es: 'Entretenimiento', ar: 'ترفيه', ru: 'Развлечения' },
    emoji: '🎭',
    words: ['movie','music','dance','theater','game','show','concert','festival','series','book','art','museum']
  },
  {
    id: 'shopping',
    level: 'medium',
    name: { en: 'Shopping', he: 'קניות', es: 'Compras', ar: 'تسوق', ru: 'Покупки' },
    emoji: '🛍️',
    words: ['shop','buy','sell','store','market','price','sale','discount','cart','cashier','checkout','refund']
  },
  {
    id: 'animals',
    level: 'medium',
    name: { en: 'Animals', he: 'חיות', es: 'Animales', ar: 'حيوانات', ru: 'Животные' },
    emoji: '🐾',
    words: ['dog','cat','bird','fish','cow','horse','pig','sheep','lion','tiger','bear','mouse','rabbit','snake','frog']
  },
  {
    id: 'geography',
    level: 'medium',
    name: { en: 'Geography', he: 'גאוגרפיה', es: 'Geografía', ar: 'جغرافيا', ru: 'География' },
    emoji: '🗺️',
    words: ['continent','country','city','village','region','capital','state','river','mountain','ocean','desert','forest','valley','island','peninsula']
  },
  {
    id: 'body_parts',
    level: 'medium',
    name: { en: 'Body Parts', he: 'גוף האדם', es: 'Partes del cuerpo', ar: 'أجزاء الجسم', ru: 'Части тела' },
    emoji: '🦴',
    words: ['head','hair','eye','ear','nose','mouth','neck','shoulder','arm','elbow','hand','finger','chest','stomach','back','leg','knee','foot','toe','heart','brain']
  },
  {
    id: 'cooking',
    level: 'medium',
    name: { en: 'Cooking', he: 'בישול', es: 'Cocina', ar: 'طبخ', ru: 'Кулинария' },
    emoji: '🍳',
    words: ['cook','bake','boil','fry','grill','roast','steam','chop','slice','mix','stir','season','recipe','ingredient']
  },
  {
    id: 'tools',
    level: 'medium',
    name: { en: 'Tools', he: 'כלים', es: 'Herramientas', ar: 'أدوات', ru: 'Инструменты' },
    emoji: '🛠️',
    words: ['hammer','screwdriver','wrench','drill','saw','knife','pliers','tape','glue','nail','bolt','screw','ax','shovel']
  },
  {
    id: 'materials',
    level: 'medium',
    name: { en: 'Materials', he: 'חומרים', es: 'Materiales', ar: 'مواد', ru: 'Материалы' },
    emoji: '🧱',
    words: ['wood','metal','plastic','glass','fabric','stone','paper','steel','concrete','brick']
  },
  {
    id: 'school_subjects',
    level: 'medium',
    name: { en: 'School Subjects', he: 'מקצועות', es: 'Asignaturas', ar: 'المواد الدراسية', ru: 'Школьные предметы' },
    emoji: '📚',
    words: ['math','history','geography','science','literature','art','music','physics','chemistry','biology']
  },
  {
    id: 'units',
    level: 'medium',
    name: { en: 'Units', he: 'יחידות', es: 'Unidades', ar: 'وحدات', ru: 'Единицы' },
    emoji: '📏',
    words: ['meter','kilogram','liter','second','degree','percent','mile','pound','inch']
  },
  {
    id: 'prepositions',
    level: 'medium',
    name: { en: 'Prepositions', he: 'מילות יחס', es: 'Preposiciones', ar: 'حروف الجر', ru: 'Предлоги' },
    emoji: '📍',
    words: ['in','on','at','under','above','between','among','through','over','behind','beside','near','across','along','toward']
  },
  {
    id: 'conjunctions',
    level: 'medium',
    name: { en: 'Conjunctions', he: 'מילות קישור', es: 'Conjunciones', ar: 'حروف العطف', ru: 'Союзы' },
    emoji: '🔗',
    words: ['and','or','but','because','so','yet','for','nor']
  },
  {
    id: 'interjections',
    level: 'medium',
    name: { en: 'Interjections', he: 'התפרצויות', es: 'Interjecciones', ar: 'تعجبات', ru: 'Междометия' },
    emoji: '❗',
    words: ['oh','wow','ah','hey','oops','hmm','yay','ouch','uh']
  },
  {
    id: 'daily_routines',
    level: 'medium',
    name: { en: 'Daily Routines', he: 'שגרה יומית', es: 'Rutinas diarias', ar: 'روتين يومي', ru: 'Ежедневные задачи' },
    emoji: '📅',
    words: ['wake','sleep','eat','drink','work','study','exercise','rest','shower','brush','dress','clean']
  },

  // --- Additional thematic categories (Hard) ---
  {
    id: 'art_design',
    level: 'hard',
    name: { en: 'Art & Design', he: 'אמנות ועיצוב', es: 'Arte y diseño', ar: 'الفن والتصميم', ru: 'Искусство и дизайн' },
    emoji: '🎨',
    words: ['painting','sculpture','architecture','design','color','canvas','drawing','gallery','museum','artist']
  },
  {
    id: 'photography',
    level: 'hard',
    name: { en: 'Photography', he: 'צילום', es: 'Fotografía', ar: 'التصوير', ru: 'Фотография' },
    emoji: '📷',
    words: ['camera','lens','photo','flash','exposure','portrait','landscape','film','shoot','focus']
  },
  {
    id: 'automotive',
    level: 'hard',
    name: { en: 'Automotive', he: 'רכב', es: 'Automoción', ar: 'السيارات', ru: 'Автомобили' },
    emoji: '🚗',
    words: ['car','engine','wheel','brake','tire','fuel','transmission','road','garage','driver']
  },
  {
    id: 'psychology',
    level: 'hard',
    name: { en: 'Psychology', he: 'פסיכולוגיה', es: 'Psicología', ar: 'علم النفس', ru: 'Психология' },
    emoji: '🧠',
    words: ['mind','behavior','cognition','emotion','memory','therapy','perception','motivation','personality','stress']
  },
  {
    id: 'philosophy',
    level: 'hard',
    name: { en: 'Philosophy', he: 'פילוסופיה', es: 'Filosofía', ar: 'فلسفة', ru: 'Философия' },
    emoji: '💭',
    words: ['ethics','logic','metaphysics','existence','reason','truth','knowledge','aesthetics','meaning','value']
  },
  {
    id: 'sociology',
    level: 'hard',
    name: { en: 'Sociology', he: 'סוציולוגיה', es: 'Sociología', ar: 'علم الاجتماع', ru: 'Социология' },
    emoji: '👥',
    words: ['society','culture','group','norm','conflict','stratification','interaction','deviance','socialization','institution']
  },
  {
    id: 'astronomy',
    level: 'hard',
    name: { en: 'Astronomy', he: 'אסטרונומיה', es: 'Astronomía', ar: 'علم الفلك', ru: 'Астрономия' },
    emoji: '🌟',
    words: ['star','planet','galaxy','comet','telescope','orbit','cosmos','universe','eclipse','asteroid']
  },
  {
    id: 'geology',
    level: 'hard',
    name: { en: 'Geology', he: 'גאולוגיה', es: 'Geología', ar: 'علم الأرض', ru: 'Геология' },
    emoji: '🪨',
    words: ['rock','mineral','fossil','earthquake','volcano','crust','magma','soil','erosion','geode']
  },
  {
    id: 'climate_science',
    level: 'hard',
    name: { en: 'Climate Science', he: 'מדעי האקלים', es: 'Ciencia del clima', ar: 'علوم المناخ', ru: 'Климатология' },
    emoji: '🌡️',
    words: ['climate','temperature','rainfall','greenhouse','carbon','dioxide','emissions','weather','global','warming']
  },
  {
    id: 'marine_biology',
    level: 'hard',
    name: { en: 'Marine Biology', he: 'ביולוגיה ימית', es: 'Biología marina', ar: 'علم الأحياء البحرية', ru: 'Морская биология' },
    emoji: '🐠',
    words: ['ocean','coral','fish','algae','plankton','mollusk','shark','dolphin','reef','salinity']
  },
  {
    id: 'zoology',
    level: 'hard',
    name: { en: 'Zoology', he: 'זואולוגיה', es: 'Zoología', ar: 'علم الحيوان', ru: 'Зоология' },
    emoji: '🦘',
    words: ['animal','species','mammal','reptile','bird','amphibian','habitat','behavior','ecology','taxonomy']
  },
  {
    id: 'botany',
    level: 'hard',
    name: { en: 'Botany', he: 'בוטניקה', es: 'Botánica', ar: 'علم النبات', ru: 'Ботаника' },
    emoji: '🌿',
    words: ['plant','leaf','flower','stem','root','photosynthesis','pollination','seed','orchid','fern']
  },
  {
    id: 'computer_science',
    level: 'hard',
    name: { en: 'Computer Science', he: 'מדעי המחשב', es: 'Informática', ar: 'علوم الحاسب', ru: 'Информатика' },
    emoji: '💾',
    words: ['algorithm','data','program','software','hardware','network','database','binary','compiler','encryption']
  },
  {
    id: 'machine_learning',
    level: 'hard',
    name: { en: 'Machine Learning', he: 'למידת מכונה', es: 'Aprendizaje automático', ar: 'تعلم الآلة', ru: 'Машинное обучение' },
    emoji: '🤖',
    words: ['model','training','algorithm','data','regression','classification','neural','network','prediction','feature']
  },
  {
    id: 'cybersecurity',
    level: 'hard',
    name: { en: 'Cybersecurity', he: 'סייבר אבטחה', es: 'Ciberseguridad', ar: 'الأمن السيبراني', ru: 'Кибербезопасность' },
    emoji: '🔒',
    words: ['encryption','firewall','virus','malware','hacking','authentication','password','phishing','threat','breach']
  },
  {
    id: 'robotics',
    level: 'hard',
    name: { en: 'Robotics', he: 'רובוטיקה', es: 'Robótica', ar: 'الروبوتات', ru: 'Робототехника' },
    emoji: '🤖',
    words: ['robot','automation','sensor','actuator','ai','control','drone','android','assembly','programming']
  },
  {
    id: 'engineering',
    level: 'hard',
    name: { en: 'Engineering', he: 'הנדסה', es: 'Ingeniería', ar: 'الهندسة', ru: 'Инженерия' },
    emoji: '🏗️',
    words: ['design','structure','material','stress','mechanics','electric','circuit','manufacture','analysis','prototype']
  },
  {
    id: 'media_journalism',
    level: 'hard',
    name: { en: 'Media & Journalism', he: 'מדיה ועיתונות', es: 'Medios y periodismo', ar: 'الإعلام والصحافة', ru: 'СМИ и журналистика' },
    emoji: '📰',
    words: ['news','report','journalist','editor','broadcast','press','article','interview','headline','coverage']
  },
  {
    id: 'marketing',
    level: 'hard',
    name: { en: 'Marketing', he: 'שיווק', es: 'Marketing', ar: 'التسويق', ru: 'Маркетинг' },
    emoji: '📈',
    words: ['brand','advertising','campaign','market','consumer','strategy','promotion','sales','research','digital']
  },
  {
    id: 'entrepreneurship',
    level: 'hard',
    name: { en: 'Entrepreneurship', he: 'יזמות', es: 'Emprendimiento', ar: 'ريادة الأعمال', ru: 'Предпринимательство' },
    emoji: '🚀',
    words: ['startup','investment','pitch','innovation','venture','funding','business','growth','leadership','scalability']
  },
  {
    id: 'real_estate',
    level: 'hard',
    name: { en: 'Real Estate', he: 'נדל"ן', es: 'Bienes raíces', ar: 'العقارات', ru: 'Недвижимость' },
    emoji: '🏘️',
    words: ['property','house','rent','mortgage','apartment','land','agent','buyer','seller','market']
  },
  {
    id: 'hospitality',
    level: 'hard',
    name: { en: 'Hospitality', he: 'אירוח', es: 'Hospitalidad', ar: 'ضيافة', ru: 'Гостеприимство' },
    emoji: '🏨',
    words: ['hotel','restaurant','tourism','service','guest','reservation','reception','staff','amenity','check-in']
  },
  {
    id: 'fitness',
    level: 'hard',
    name: { en: 'Fitness', he: 'כושר', es: 'Aptitud física', ar: 'لياقة بدنية', ru: 'Фитнес' },
    emoji: '💪',
    words: ['gym','exercise','workout','strength','cardio','stretch','nutrition','trainer','routine','endurance']
  },
  {
    id: 'wellness',
    level: 'hard',
    name: { en: 'Wellness', he: 'בריאות כללית', es: 'Bienestar', ar: 'العافية', ru: 'Благополучие' },
    emoji: '🧘',
    words: ['meditation','mindfulness','yoga','relaxation','stress','sleep','therapy','balance','health','lifestyle']
  },
  {
    id: 'parenting',
    level: 'hard',
    name: { en: 'Parenting', he: 'הורות', es: 'Paternidad', ar: 'الأبوة والأمومة', ru: 'Воспитание' },
    emoji: '👶',
    words: ['child','parent','family','care','education','discipline','nurture','birth','toddler','adolescent']
  },
  {
    id: 'relationships',
    level: 'hard',
    name: { en: 'Relationships', he: 'מערכות יחסים', es: 'Relaciones', ar: 'العلاقات', ru: 'Отношения' },
    emoji: '💕',
    words: ['friendship','love','marriage','communication','trust','conflict','support','team','bond','affection']
  },
  {
    id: 'gaming_esports',
    level: 'hard',
    name: { en: 'Gaming & eSports', he: 'גיימינג וספורט אלקטרוני', es: 'Gaming y eSports', ar: 'الألعاب والرياضات الإلكترونية', ru: 'Игры и киберспорт' },
    emoji: '🎮',
    words: ['game','player','tournament','console','pc','controller','strategy','multiplayer','stream','esports']
  },
  {
    id: 'social_media',
    level: 'hard',
    name: { en: 'Social Media', he: 'רשתות חברתיות', es: 'Redes sociales', ar: 'وسائل التواصل الاجتماعي', ru: 'Социальные сети' },
    emoji: '📱',
    words: ['post','like','share','comment','follow','hashtag','profile','feed','story','upload']
  },
  {
    id: 'online_learning',
    level: 'hard',
    name: { en: 'Online Learning', he: 'למידה מקוונת', es: 'Aprendizaje en línea', ar: 'التعلم عبر الإنترنت', ru: 'Онлайн обучение' },
    emoji: '💻',
    words: ['course','module','lesson','video','quiz','certificate','platform','student','instructor','assignment']
  },
  {
    id: 'tourism',
    level: 'hard',
    name: { en: 'Tourism', he: 'תיירות', es: 'Turismo', ar: 'السياحة', ru: 'Туризм' },
    emoji: '🗺️',
    words: ['tour','guide','itinerary','landmark','sightseeing','culture','explore','journey','backpack','souvenir']
  },
  {
    id: 'logistics',
    level: 'hard',
    name: { en: 'Logistics', he: 'לוגיסטיקה', es: 'Logística', ar: 'اللوجستيات', ru: 'Логистика' },
    emoji: '📦',
    words: ['shipment','warehouse','distribution','supply','chain','transport','inventory','delivery','tracking','cargo']
  },
  {
    id: 'retail',
    level: 'hard',
    name: { en: 'Retail', he: 'קמעונאות', es: 'Venta al por menor', ar: 'تجزئة', ru: 'Розничная торговля' },
    emoji: '🏬',
    words: ['store','sale','inventory','customer','checkout','aisle','product','display','merchandise','cashier']
  },
  {
    id: 'construction',
    level: 'hard',
    name: { en: 'Construction', he: 'בנייה', es: 'Construcción', ar: 'البناء', ru: 'Строительство' },
    emoji: '🏗️',
    words: ['building','site','contractor','cement','beam','scaffold','permit','architecture','engineer','blueprint']
  },
  {
    id: 'manufacturing',
    level: 'hard',
    name: { en: 'Manufacturing', he: 'ייצור', es: 'Manufactura', ar: 'تصنيع', ru: 'Производство' },
    emoji: '🏭',
    words: ['factory','assembly','production','machine','automation','quality','control','process','output','plant']
  },
  {
    id: 'supply_chain',
    level: 'hard',
    name: { en: 'Supply Chain', he: 'שרשרת אספקה', es: 'Cadena de suministro', ar: 'سلسلة التوريد', ru: 'Цепочка поставок' },
    emoji: '🔗',
    words: ['supplier','demand','logistics','inventory','transport','warehouse','distribution','order','forecast','procurement']
  },
  {
    id: 'nutrition',
    level: 'hard',
    name: { en: 'Nutrition', he: 'תזונה', es: 'Nutrición', ar: 'تغذية', ru: 'Питание' },
    emoji: '🥗',
    words: ['vitamin','protein','carbohydrate','fat','mineral','fiber','calorie','diet','meal','nutrition']
  },
  {
    id: 'mental_health',
    level: 'hard',
    name: { en: 'Mental Health', he: 'בריאות נפש', es: 'Salud mental', ar: 'الصحة النفسية', ru: 'Психическое здоровье' },
    emoji: '🧠',
    words: ['anxiety','depression','therapy','stress','mindfulness','psychiatry','support','resilience','emotion','wellbeing']
  },

  // --- Psychometric repository (Hard) ---
  {
    id: 'psychometric',
    level: 'hard',
    name: { en: 'Psychometric', he: 'פסיכומטרי', es: 'Psicométrico', ar: 'اختبار القدرات', ru: 'Психометрический' },
    emoji: '📊',
    words: psychometricWords
  },

  // --- Difficulty-based categories ---
  // --- Categories by Difficulty Level ---

/*
{
  id: 'level_easy',
  level: 'easy',
  name: {
    en: 'Easy Words',
    he: 'מילים קלות',
    es: 'Palabras fáciles',
    ar: 'كلمات سهلة',
    ru: 'Легкие слова'
  },
  emoji: '🟢',
  words: Object.keys(wordLevels).filter(w => wordLevels[w] === 'easy')
},

{
  id: 'level_medium',
  level: 'medium',
  name: {
    en: 'Medium Words',
    he: 'מילים בינוניות',
    es: 'Palabras medias',
    ar: 'كلمات متوسطة',
    ru: 'Средние слова'
  },
  emoji: '🟡',
  words: Object.keys(wordLevels).filter(w => wordLevels[w] === 'medium')
},

{
  id: 'level_hard',
  level: 'hard',
  name: {
    en: 'Hard Words',
    he: 'מילים קשות',
    es: 'Palabras difíciles',
    ar: 'كلمات صعبة',
    ru: 'Сложные слова'
  },
  emoji: '🔴',
  words: Object.keys(wordLevels).filter(w => wordLevels[w] === 'hard')
},

// --- Alphabetical Categories (generated dynamically based on first letter of words) ---
...alphabeticalCategories
*/
];
