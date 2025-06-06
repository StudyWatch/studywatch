// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');               // שם מלא
  const [email, setEmail] = useState('');             // אימייל
  const [password, setPassword] = useState('');       // סיסמה
  const [confirmPassword, setConfirmPassword] = useState(''); // אימות סיסמה
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth(); // נניח שיש לך פונקציית register ב־AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // בדיקת תאימות סיסמה ואימות סיסמה
    if (password !== confirmPassword) {
      setErrorMsg('הסיסמאות לא תואמות');
      return;
    }

    try {
      // כאן תשלחו קריאה אמיתית ל־API שלכם כדי לרשום משתמש חדש
      // לדוגמא: const newUser = await api.register({ name, email, password });
      const newUser = await fakeApiRegister(name, email, password);

      // לאחר רישום מוצלח, נשמור את ה־user ב־AuthContext (אם יש)
      register(newUser);

      // נחזיר את המשתמש לעמוד הבית (או לדף אחר – למשל “ברוך הבא”)
      navigate('/', { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'שגיאה בהרשמה. נסה שוב.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      {/* באנר עליון חגיגי */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 dark:text-yellow-300 mb-4">
          🎉 ברוכים הבאים להשקה הגדולה של StudyWatch! 🎉
        </h1>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          אנחנו מתרגשים להשיק את פלטפורמת הלימוד החדשנית שלנו – StudyWatch! 
          נרשמים עכשיו ומקבלים 3 חודשים ראשונים של מנוי פרימיום בחינם!  
          תהנו מגישה מלאה לכל הכלים המתקדמים: רכישת מילים אוטומטית, יצירת רשימות, 
          תרגום וכתוביות משולבות, משחקי למידה אינטראקטיביים ועוד המון פיצ’רים שלא ניתנים להגבלה. 
          אל תחכו – היו מבין ה־1,000 הראשונים כדי להשיג את המנוי בחינם למשך שלושה חודשים מלאים!
        </p>
      </div>

      {/* טופס הרשמה */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          יצירת חשבון חדש
        </h2>

        {errorMsg && (
          <div className="mb-4 text-red-600 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* שדה שם מלא */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 dark:text-gray-200 mb-1"
            >
              שם מלא
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="הקלד את שמך המלא"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* שדה אימייל */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-200 mb-1"
            >
              אימייל
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="הקלד את אימייל שלך"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* שדה סיסמה */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-200 mb-1"
            >
              סיסמה
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="בחר סיסמה חזקה"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* שדה אימות סיסמה */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 dark:text-gray-200 mb-1"
            >
              אימות סיסמה
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="הזן שוב את הסיסמה"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* כפתור הרשמה */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white font-semibold rounded-lg transition"
          >
            הרשמה
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700 dark:text-gray-200">
          כבר רשומים?{' '}
          <Link
            to="/login"
            className="text-blue-600 dark:text-yellow-300 font-medium hover:underline"
          >
            התחבר כאן
          </Link>
        </p>
      </div>
    </div>
  );
}

// Mock API Registration
async function fakeApiRegister(name, email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.includes('error')) {
        reject(new Error('כתובת המייל כבר בשימוש או שגויה'));
      } else {
        resolve({
          id: 'new_user_456',
          email,
          name,
          isPremium: true, // ברירת מחדל
        });
      }
    }, 1200);
  });
}
