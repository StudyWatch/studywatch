// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // נרצה לגלות מאיזה עמוד הגענו (redirect efter login)
  const fromPath = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      // כאן תשלחו קריאה אמיתית ל־API שלכם כדי לוודא תקינות המייל והסיסמה
      const userData = await fakeApiLogin(email, password);

      // אם קיבלנו בחזרה userData תקין, נפעיל את login() מה־AuthContext
      login(userData);

      // נחזיר את המשתמש לעמוד הקודם (או ל־'/')
      navigate(fromPath, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'שגיאה בהתחברות. נסה שוב.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
          התחברות
        </h2>

        {errorMsg && (
          <div className="mb-4 text-red-600 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="הקלד את כתובת המייל שלך"
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
              placeholder="הקלד את הסיסמה שלך"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* כפתור התחברות */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white font-semibold rounded-lg transition"
          >
            התחבר
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700 dark:text-gray-200">
          אין לך חשבון?{' '}
          <Link
            to="/register"
            className="text-blue-600 dark:text-yellow-300 font-medium hover:underline"
          >
            הרשמה
          </Link>
        </p>
      </div>
    </div>
  );
}

// לדוגמה בלבד: קריאה מזויפת ל־API
async function fakeApiLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // אם המייל מכיל "error", החזיר שגיאה
      if (email.includes('error')) {
        reject(new Error('אימייל או סיסמה לא תקינים'));
      } else {
        resolve({
          id: 'user_123',
          email,
          name: 'משתמש חדש',
          isPremium: false,
        });
      }
    }, 1000);
  });
}
