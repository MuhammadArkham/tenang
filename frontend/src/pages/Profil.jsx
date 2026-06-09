import { useAuthStore } from '../store/authStore';

export default function Profil() {
  const { user } = useAuthStore();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profil Saya</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-3xl">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
              Akun Gratis
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Informasi Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Nama Lengkap</label>
              <p className="font-medium text-gray-900">{user?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <p className="font-medium text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Bergabung Sejak</label>
              <p className="font-medium text-gray-900">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
