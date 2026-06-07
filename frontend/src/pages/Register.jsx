import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/register', { name, email, password });
      // Redirect to login after successful registration
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Pendaftaran gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Buat akun baru</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
            </div>

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
              {loading ? 'Mendaftar...' : 'Daftar'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm">
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">Sudah punya akun? Masuk</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
