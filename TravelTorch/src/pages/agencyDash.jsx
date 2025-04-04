import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAgency, loginAgency } from '../api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

function AgencyDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        // Login logic
        const { token, user } = await loginAgency({
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
      } else {
        // Registration logic
        await registerAgency(formData);
        // Auto-login after registration
        const { token, user } = await loginAgency({
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
      }
      setShowAuthForm(false);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed');
      console.error('Auth error:', err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 min-h-screen">
        <h2 className="text-xl font-bold mb-8">
          {isLoggedIn ? "My Agency" : "Travel Agency"}
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto mt-12">
            {!showAuthForm ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">Travel Agency Portal</h1>
                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        setShowAuthForm(true);
                        setIsLogin(true);
                      }}
                    >
                      Agency Login
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setShowAuthForm(true);
                        setIsLogin(false);
                      }}
                    >
                      Register Your Agency
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    {isLogin ? "Agency Login" : "Register Your Agency"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                    {!isLogin && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Agency Name</label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                        minLength="6"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {isLogin ? "Login" : "Register"}
                    </Button>
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-blue-600 hover:underline w-full text-center"
                    >
                      {isLogin 
                        ? "Need an account? Register" 
                        : "Already have an account? Login"}
                    </button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          /* Authenticated dashboard content */
          <div>Welcome to your agency dashboard!</div>
        )}
      </div>
    </div>
  );
}

export default AgencyDashboard;