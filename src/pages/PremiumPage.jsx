// src/pages/PremiumPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { useTranslation } from '../context/I18nContext';
import { useSettings } from '../context/SettingsContext';

export default function PremiumPage() {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const isRtl = ['he', 'ar'].includes(settings.uiLang);
  const direction = isRtl ? 'rtl' : 'ltr';

  const [openSection, setOpenSection] = useState(null);

  // פיצ'רים ייחודיים לאתר StudyWatch
  const features = [
    {
      key: 'cloudSave',
      title: t('premium.cloudSave.title') || '☁️ שמירת כל המילים והסדרות בענן',
      summary:
        t('premium.cloudSave.summary') ||
        'כל מה שתשמור זמין לך תמיד מכל מכשיר, ללא הגבלת כמות.',
      details:
        t('premium.cloudSave.details') ||
        'כל מילה, סדרה או הערה שתשמור מסונכרנת לענן, כך שאם תיכנס מכל מכשיר – הכל יופיע כמו שהשארת. לא תאבד אף מילה לעולם.'
    },
    {
      key: 'unlimitedFavorites',
      title: t('premium.unlimitedFavorites.title') || '💎 שמירת מילים וסדרות – ללא הגבלה',
      summary:
        t('premium.unlimitedFavorites.summary') ||
        'שמור כמה מילים וסדרות שתרצה, בלי מגבלות.',
      details:
        t('premium.unlimitedFavorites.details') ||
        'בניגוד לגרסה החינמית שבה יש מגבלה של 6 מילים ו־2 סדרות, בפרימיום אתה יכול לשמור כמה מילים וסדרות שתרצה וליצור לעצמך אוצר מילים אישי.'
    },
    {
      key: 'games',
      title: t('premium.games.title') || '🎮 גישה מלאה לכל משחקי הלמידה',
      summary:
        t('premium.games.summary') ||
        'שחק ותתרגל בכל המשחקים הייחודיים – כולל מבחן שבועי וחודשי.',
      details:
        t('premium.games.details') ||
        'גישה למשחקי לימוד מתקדמים – בוחן שבועי, בוחן חודשי, ושחק מתי שבא לך עם כל המילים ששמרת – בלי הגבלה. כך תוכל לבדוק את עצמך ולהשתפר כל הזמן!'
    },
    {
      key: 'adFree',
      title: t('premium.adFree.title') || '🌟 נטול פרסומות',
      summary:
        t('premium.adFree.summary') ||
        'לימוד רציף וחווייתי, בלי אף פרסומת שמפריעה.',
      details:
        t('premium.adFree.details') ||
        'אין פרסומות בכלל – כל הלמידה והמשחקים זורמים בלי הסחות דעת.'
    },
    {
      key: 'exclusiveContent',
      title: t('premium.exclusiveContent.title') || '🔒 תוכן בלעדי למנויים',
      summary:
        t('premium.exclusiveContent.summary') ||
        'סרטוני וידאו, תרגולים, ועוד המון תכנים בלעדיים.',
      details:
        t('premium.exclusiveContent.details') ||
        'סרטוני הסבר מיוחדים, המלצות מתקדמות, תרגול תחביר ומבנה משפטים, חוברות עבודה, ועוד... הכל פתוח רק למנויי פרימיום.'
    },
    {
      key: 'prioritySupport',
      title: t('premium.prioritySupport.title') || '📞 תמיכה ועדכונים לפני כולם',
      summary:
        t('premium.prioritySupport.summary') ||
        'תמיכה מועדפת 24/7 ועדכונים ראשונים.',
      details:
        t('premium.prioritySupport.details') ||
        'שירות לקוחות מהיר ועדיפות לפניות מנויים – ואפשרות לקבל עדכונים על פיצ’רים חדשים לפני כולם.'
    },
    {
      key: 'first1000',
      title: t('premium.first1000.title') || '🎁 1000 הראשונים מקבלים 3 חודשים חינם!',
      summary:
        t('premium.first1000.summary') ||
        'הצטרפו עכשיו ותהנו מכל פיצ’רי הפרימיום לגמרי בחינם.',
      details:
        t('premium.first1000.details') ||
        'לרגל השקת האתר – 1000 הראשונים שיירשמו נהנים ממנוי פרימיום מלא ל־3 חודשים – חינם לגמרי, ללא התחייבות!'
    },
    // אופציונלי: פיצ’רים עתידיים
    {
      key: 'future',
      title: t('premium.future.title') || '🤩 בקרוב: תוספות בלעדיות לפרימיום',
      summary:
        t('premium.future.summary') ||
        'קבוצות לימוד, המלצות AI מותאמות אישית ועוד...',
      details:
        t('premium.future.details') ||
        'בעתיד נוסיף פיצ’רים כמו קבוצות תרגול, AI שממליץ סדרות עבורך, אפשרות לתרגל דיבור עם מנוי פרימיום, וסטטיסטיקות מתקדמות במיוחד.'
    }
  ];

  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  return (
    <BackgroundWrapper pageName="premium" extension=".png">
      <main
        className={`min-h-screen w-full px-4 py-16 font-sans ${
          isRtl ? 'text-right' : 'text-left'
        } transition-colors duration-500`}
        dir={direction}
      >
        {/* Hero Section */}
        <section className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-yellow-400 dark:text-yellow-300 mb-4 drop-shadow-lg">
            {t('premium.heroTitle') || '🎩 StudyWatch Premium – מהיום לומדים ברמה אחרת'}
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 dark:text-gray-300 leading-relaxed mb-8">
            {t('premium.heroSubtitle') ||
              'הצטרף עכשיו למנוי פרימיום וקבל 3 חודשים חינם אם אתה בין ה־1000 הראשונים! כל הכלים, כל המשחקים, והכי הרבה תרגול – הכל בשבילך.'}
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 dark:text-gray-900 font-semibold rounded-full shadow-xl transition-transform transform hover:scale-105"
          >
            {t('premium.subscribeNow') || '🛡️ הצטרפו עכשיו בחינם'}
          </button>
        </section>

        {/* Features Accordion */}
        <section className="max-w-4xl mx-auto space-y-6">
          {features.map((feat) => (
            <div
              key={feat.key}
              className="bg-gray-800 dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            >
             <button
  onClick={() => toggleSection(feat.key)}
  className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
>
  <div className={`flex-1 ${isRtl ? 'text-right' : 'text-left'}`}>
    <h2 className="text-2xl font-bold text-yellow-300 dark:text-yellow-400">
      {feat.title}
    </h2>
    <p className="mt-1 text-gray-200 dark:text-gray-400">
      {feat.summary}
    </p>
  </div>
  <span className={`text-2xl text-yellow-300 ${isRtl ? 'mr-4' : 'ml-4'}`}>
    {openSection === feat.key ? '–' : '+'}
  </span>
</button>

              {openSection === feat.key && (
                <div className="px-6 py-4 border-t border-gray-700 dark:border-gray-800">
                  <p className="text-gray-100 dark:text-gray-300 leading-relaxed">
                    {feat.details}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Comparison Table */}
      <section className="max-w-5xl mx-auto mt-16 mb-20">
  <h2 className="text-3xl font-extrabold text-yellow-300 dark:text-yellow-400 text-center mb-8">
    {t('premium.pricingTitle') || '💎 מה ההבדל בין גרסה חינמית לפרימיום?'}
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Free Tier */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {t('premium.freeTier.title') || 'חינם'}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {t('premium.freeTier.subtitle') || 'גישה חינמית – אך מוגבלת במספר מילים, סדרות, תרגולים וגישה למשחקים.'}
      </p>
      <ul className="space-y-2 text-gray-700 dark:text-gray-400">
        <li>• {t('premium.freeTier.bullet1') || 'שמירה של עד 6 מילים בלבד'}</li>
        <li>• {t('premium.freeTier.bullet2') || 'שמירת עד 2 סדרות בלבד'}</li>
        <li>• {t('premium.freeTier.bullet3') || 'גישה מוגבלת למשחקים'}</li>
        <li>• {t('premium.freeTier.bullet4') || 'אין בוחן שבועי/חודשי'}</li>
        <li>• {t('premium.freeTier.bullet5') || 'אין שמירה בענן'}</li>
        <li>• {t('premium.freeTier.bullet6') || 'פרסומות באתר'}</li>
      </ul>
      <button
        disabled
        className="mt-4 w-full px-4 py-2 bg-gray-400 text-white rounded-full cursor-not-allowed"
      >
        {t('premium.freeTier.current') || 'זו החבילה הנוכחית שלך'}
      </button>
    </div>

    {/* Premium Tier */}
    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-2xl p-6 space-y-4 text-gray-900">
      <h3 className="text-2xl font-bold">
        {t('premium.premiumTier.title') || 'פרימיום'}
      </h3>
      <p className="text-gray-900">
        {t('premium.premiumTier.subtitle') || 'החוויה המושלמת – כל הכלים, כל המשחקים, בלי מגבלות.'}
      </p>
      <ul className="space-y-2 text-gray-800">
        <li>• {t('premium.premiumTier.bullet1') || 'שמירת מילים וסדרות ללא הגבלה'}</li>
        <li>• {t('premium.premiumTier.bullet2') || 'גישה מלאה לכל המשחקים כולל מבחן שבועי/חודשי'}</li>
        <li>• {t('premium.premiumTier.bullet3') || 'שמירה בענן ואפשרות להמשיך מכל מכשיר'}</li>
        <li>• {t('premium.premiumTier.bullet4') || 'גישה לתכנים בלעדיים'}</li>
        <li>• {t('premium.premiumTier.bullet5') || 'אין פרסומות בכלל'}</li>
        <li>• {t('premium.premiumTier.bullet6') || 'תמיכה מועדפת וזמינות לכל פיצ’ר חדש'}</li>
      </ul>
      <p className="mt-4 text-4xl font-extrabold">
        {t('premium.premiumTier.price') || '$2 / month'}
      </p>
      <button
        onClick={() => navigate('/register')}
        className="mt-2 w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 text-yellow-300 font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105"
      >
        {t('premium.premiumTier.subscribe') || '🚀 אני רוצה פרימיום'}
      </button>
    </div>
  </div>
</section>


        {/* FAQ */}
        <section className="max-w-4xl mx-auto mb-16 space-y-6">
          <h2 className="text-3xl font-extrabold text-yellow-300 dark:text-yellow-400 text-center mb-6">
            {t('premium.faqTitle') || '❓ שאלות נפוצות'}
          </h2>
          {[
            {
              question: t('premium.faq.q1') || 'האם ניתן לבטל בכל עת?',
              answer: t('premium.faq.a1') || 'כן, ניתן לבטל בכל רגע ללא התחייבות. פשוט מהפרופיל האישי.'
            },
            {
              question: t('premium.faq.q2') || 'האם יש תקופת ניסיון?',
              answer: t('premium.faq.a2') || 'כן! ל־1000 הראשונים יש 3 חודשים חינם ללא עלות או התחייבות.'
            },
            {
              question: t('premium.faq.q3') || 'האם אפשר לשחק עם כל המילים ששמרתי?',
              answer: t('premium.faq.a3') || 'בפרימיום – כן! תוכל לתרגל ולשחק עם כל אוצר המילים ששמרת, בכל זמן.'
            },
            {
              question: t('premium.faq.q4') || 'מה יתווסף בעתיד למנויי פרימיום?',
              answer: t('premium.faq.a4') || 'קבוצות לימוד, המלצות חכמות, ואתגרים מיוחדים – בקרוב!'
            }
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-gray-800 dark:bg-gray-900 rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-200 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </section>

        {/* Footer CTA */}
        <section className="max-w-3xl mx-auto text-center">
          <p className="text-gray-100 dark:text-gray-300 text-lg mb-4">
            {t('premium.footerText') ||
              'אל תפספסו – הצטרפו עכשיו והבטיחו 3 חודשים בחינם עם כל הכלים המתקדמים של StudyWatch!'}
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 dark:text-gray-900 font-semibold rounded-full shadow-xl transition-transform transform hover:scale-105"
          >
            {t('premium.finalSubscribe') || '🎁 אני רוצה להיות פרימיום'}
          </button>
        </section>
      </main>
    </BackgroundWrapper>
  );
}
