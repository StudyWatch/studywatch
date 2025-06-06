// ✅ components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('🛑 ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-red-800 p-6">
          <h1 className="text-3xl font-bold mb-4">משהו השתבש 🛠️</h1>
          <p className="mb-4">נסה לרענן את הדף או לחזור למסך הבית.</p>
          <pre className="bg-red-100 p-4 rounded text-sm w-full max-w-xl overflow-auto">
            {this.state.error && this.state.error.toString()}
            {'\n'}
            {this.state.errorInfo?.componentStack}
          </pre>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            חזור לדף הבית
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
