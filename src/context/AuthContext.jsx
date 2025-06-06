import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. צור Context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 2. התחלה: טען מה־localStorage אם המשתמש כבר מחובר
  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  // 3. פונקציה ל־login (רישום / התחברות)
  const login = async (email, password, isRegister = false) => {
    // כאן תבצעו קריאה ל־API שלכם: /api/login או /api/register
    // הדוגמה הבאה היא מדומה:
    try {
      const response = await fakeApiAuth(email, password, isRegister);
      // response יכיל userData = { id, email, name, isPremium, premiumExpires }
      setUser(response);
      localStorage.setItem('authUser', JSON.stringify(response));
      return response;
    } catch (err) {
      throw err;
    }
  };

  // 4. פונקציה ל־logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    navigate('/'); // הפנה לדף הבית
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook נוח לצרוך את ה־AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// ----------
// דוגמה מדומה ל־API
async function fakeApiAuth(email, password, isRegister) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email.includes('@') || password.length < 4) {
        return reject(new Error('אימייל או סיסמה לא תקינים'));
      }
      // בדיקה האם המשתמש זכאי ל־1000 הראשונים:
      // אם זה register, ה־backend יכול לבדוק במסד מספר רשומים ולתת isPremium חינם ל־1000 הראשונים.
      const randomId = Math.random().toString(36).substr(2, 9);
      const isPremium = isRegister // הדוגמה הבאה מניחה שלכל רשום חדש נותנים פרימיום
        ? true
        : false;
      const premiumExpires = isPremium
        ? Date.now() + 1000 * 60 * 60 * 24 * 90 // 3 חודשים מהיום
        : null;
      resolve({ id: randomId, email, name: 'משתמש', isPremium, premiumExpires });
    }, 800);
  });
}
