import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.access_token;
      
      // Get user profile after login
      const profileRes = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setAuth(profileRes.data, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Gagal login. Cek kembali email dan password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Masuk ke Tenang</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50">
              {loading ? 'Memuat...' : 'Masuk'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm">
            <Link to="/register" className="font-medium text-teal-600 hover:text-teal-500">Belum punya akun? Daftar</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
