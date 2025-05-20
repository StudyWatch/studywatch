import React, { useMemo } from 'react';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function TipsPage() {
  const tips = [
    "📘 <strong>רשימת מילים:</strong> לפני כל פרק, עבור על רשימת המילים שאתה עתיד ללמוד כדי להבין אותן טוב יותר בזמן הצפייה.",
    "👀 <strong>צפייה פעילה:</strong> כשאתה צופה בסדרה, שים לב במיוחד למילים וביטויים שלמדת, ונסה לזהות אותם במהלך הדיאלוגים.",
    "🧠 <strong>חזרה מידית:</strong> לאחר הצפייה, חזור לרשימת המילים ונסה לזכור את ההקשר שבו הן נאמרו.",
    "🎮 <strong>שחק משחקים:</strong> השתמש במשחקי חזרה באתר כדי לחזק את הזיכרון שלך למילים ולשפר הבנה.",
    "🗣️ <strong>תרגל דיבור:</strong> בחר משפט שנאמר בפרק ונסה לחזור עליו בקול רם כדי לשפר את ההגייה והביטחון שלך.",
    "📓 <strong>תיעוד אישי:</strong> כתוב במחברת משפט או מילה חדשה שלמדת – עם פירוש ודוגמה אישית.",
    "🔁 <strong>צפייה חוזרת:</strong> חזור לסצנות שבהן היו מילים מאתגרות ונסה להבין אותן בהקשר טוב יותר.",
    "🎧 <strong>האזנה בלבד:</strong> נסה להאזין רק לאודיו של פרק מוכר כדי לחזק הבנה שמיעתית.",
    "💬 <strong>צפייה עם כתוביות באנגלית:</strong> עוזרת להבין איך נכתבת כל מילה ולזהות מבנים תחביריים.",
    "👫 <strong>לימוד בזוג:</strong> לימוד עם חבר או בן משפחה הופך את הלמידה לחווייתית ומשתפת.",
    "🔤 <strong>שימוש חוזר במילים:</strong> נסה לכתוב משפטים חדשים עם מילים שלמדת מהפרק.",
    "🧩 <strong>שילוב שפה ביום יום:</strong> שלב מילה חדשה שלמדת בשיחה יומית – גם אם זו רק מחשבה לעצמך.",
    "⏱️ <strong>לימוד יומי קצר:</strong> 10 דקות ביום עדיפות על שעתיים פעם בשבוע.",
    "🌟 <strong>התמדה:</strong> הלימוד האמיתי קורה כשחוזרים ומתרגלים שוב ושוב."
  ];

  const dailyTip = useMemo(() => {
    const dayIndex = new Date().getDate() % tips.length;
    return tips[dayIndex];
  }, []);

  return (
    <BackgroundWrapper pageName="tips" extension=".png">
      <div className="w-full px-4 py-16 max-w-screen-xl mx-auto font-sans" dir="rtl">
        <div className="max-w-3xl mx-auto mb-12 animate-fade-in">
          <div className="bg-yellow-100 dark:bg-yellow-700 border-l-4 border-yellow-400 p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-2xl font-bold text-yellow-800 dark:text-white mb-3">💡 טיפ היום</h2>
            <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: dailyTip }} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-gray-800 dark:text-gray-100 text-lg leading-relaxed transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              dangerouslySetInnerHTML={{ __html: tip }}
            />
          ))}
        </div>
      </div>
    </BackgroundWrapper>
  );
}
