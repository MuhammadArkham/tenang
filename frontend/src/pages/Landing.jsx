import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F8FAF9] font-sans selection:bg-[#95D5B2] scroll-smooth text-[#1F2937]">
      
      {/* Navbar */}
      <nav className="border-b border-gray-100 px-8 py-5 flex justify-between items-center sticky top-0 bg-[#F8FAF9]/80 backdrop-blur-lg z-50 transition-all">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
          <span className="text-[#2D6A4F] text-2xl group-hover:scale-110 transition-transform duration-300">🌿</span>
          <span className="text-xl font-extrabold tracking-tight text-[#1F2937]">Tenang</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-sm font-semibold text-gray-500">
          <a href="#fitur" className="hover:text-[#2D6A4F] transition-colors">Fitur</a>
          <a href="#riset" className="hover:text-[#2D6A4F] transition-colors">Riset</a>
          <a href="#testimoni" className="hover:text-[#2D6A4F] transition-colors">Testimoni</a>
        </div>

        <div className="flex gap-4 items-center">
          <Link to="/login" className="text-gray-600 px-6 py-2.5 rounded-full font-semibold hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all">
            Masuk
          </Link>
          <Link to="/register" className="bg-[#2D6A4F] text-white px-7 py-2.5 rounded-full font-semibold hover:bg-[#1B4332] transition-all shadow-md shadow-[#2D6A4F]/20 hover:shadow-lg hover:-translate-y-0.5">
            Mulai Gratis
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-[1200px] mx-auto px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="z-10 relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#95D5B2] rounded-full blur-[60px] opacity-30"></div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#95D5B2]/40 text-[#2D6A4F] font-bold text-[11px] uppercase tracking-wider rounded-full mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse"></span>
            Mental Health & Digital Well-being
          </div>
          
          <h1 className="text-5xl lg:text-[4rem] font-extrabold text-[#1F2937] leading-[1.1] mb-6 tracking-tight">
            Kenali dirimu,<br/>
            jaga mentalmu,<br/>
            hidup lebih <span className="text-[#2D6A4F] italic font-serif font-light">tenang.</span>
          </h1>
          
          <p className="text-gray-500 text-lg lg:text-xl mb-10 max-w-md leading-relaxed font-medium">
            Tenang membantumu memahami kondisi mental, mengelola stres, dan membangun kebiasaan sehat setiap hari.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link to="/register" className="bg-[#2D6A4F] text-white px-8 py-4 rounded-2xl font-bold text-center hover:bg-[#1B4332] transition-all shadow-xl shadow-[#2D6A4F]/25 hover:-translate-y-1 flex items-center justify-center gap-2">
              Mulai Gratis Sekarang <span className="text-xl font-normal">→</span>
            </Link>
            <a href="#fitur" className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold text-center hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm flex items-center justify-center gap-2">
              Lihat Demo <span className="text-gray-400">▷</span>
            </a>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-gray-500 font-bold">
            <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#52B788]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> Gratis selamanya</span>
            <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#52B788]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> Privat & Aman</span>
            <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#52B788]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> Tanpa Kartu Kredit</span>
          </div>
        </div>

        {/* Hero Illustration & Floating Cards */}
        <div className="relative h-[400px] lg:h-[550px] w-full flex items-center justify-center mt-10 lg:mt-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#95D5B2]/30 to-[#F8FAF9] rounded-full blur-[80px] z-0"></div>
          
          {/* Main illustration */}
          <div className="relative z-10 w-4/5 h-4/5 bg-white rounded-[3rem] shadow-2xl border border-white/50 flex items-center justify-center overflow-hidden">
            <img src="/hero.png" alt="Ilustrasi mahasiswa rileks" className="w-full h-full object-cover opacity-90 mix-blend-multiply" />
          </div>

          {/* Glassmorphism Floating Cards */}
          <div className="absolute top-10 -left-6 bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl shadow-gray-200/50 border border-white/60 z-20 animate-[bounce_4s_infinite]">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Rata-rata Mood</p>
             <div className="flex items-end gap-2">
               <p className="text-3xl font-extrabold text-[#2D6A4F]">4.2</p>
               <p className="text-sm font-bold text-gray-400 mb-1">/ 5</p>
             </div>
          </div>

          <div className="absolute bottom-20 -left-10 bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl shadow-gray-200/50 border border-white/60 z-20 animate-[bounce_5s_infinite_1s]">
             <p className="text-[10px] font-bold text-[#e63946] uppercase tracking-widest mb-1 flex items-center gap-1">✨ Aktivitas</p>
             <p className="text-xl font-extrabold text-gray-800">12 <span className="text-xs font-bold text-gray-400">Jurnal</span></p>
          </div>

          <div className="absolute top-24 -right-12 bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl shadow-gray-200/50 border border-white/60 z-20 max-w-[220px] animate-[bounce_6s_infinite_0.5s]">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">✨ Insight Hari Ini</p>
             <p className="text-sm text-gray-600 font-medium leading-snug">"Kamu cenderung merasa lebih baik saat screen time di bawah 5 jam."</p>
          </div>

          <div className="absolute bottom-32 -right-8 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-white/60 z-20 animate-[bounce_4s_infinite_2s]">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Jurnal Terakhir</p>
             <div className="flex items-center gap-3">
               <p className="text-sm font-bold text-gray-800">Positif</p>
               <div className="w-8 h-8 bg-[#E6F4EA] rounded-full flex items-center justify-center text-lg">🙂</div>
             </div>
          </div>
        </div>
      </main>

      {/* Feature Section */}
      <section id="fitur" className="py-24 bg-gradient-to-b from-[#F8FAF9] to-white relative scroll-mt-10 border-t border-gray-100/50">
        <div className="max-w-[1200px] mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1F2937] mb-6 tracking-tight">Fitur Lengkap untuk Kesehatan Mentalmu</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">Semua yang kamu butuhkan dalam satu tempat, dirancang khusus untuk mahasiswa agar praktis dan tidak membebani.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cards */}
            {[
              { icon: '🙂', title: 'Mood Check-in', desc: 'Check-in mood harian kurang dari 2 menit dan lihat pola perubahanmu.' },
              { icon: '✏️', title: 'Jurnal AI', desc: 'Tulis bebas. AI akan membantu memahami perasaanmu lebih dalam.' },
              { icon: '📊', title: 'Laporan Mingguan', desc: 'Dapatkan insight mingguan dan kenali pola yang mempengaruhi moodmu.' },
              { icon: '🕒', title: 'Habit Log', desc: 'Catat aktivitas harian untuk mencapai hidup yang lebih seimbang.' },
              { icon: '🤝', title: 'Komunitas Anonim', desc: 'Berbagi cerita di ruang komunitas yang aman, suportif, dan bebas penghakiman.' },
              { icon: '📚', title: 'Resources Edukasi', desc: 'Artikel, teknik relaksasi, dan kontak bantuan profesional terpercaya.' }
            ].map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl border border-gray-100 hover:border-[#95D5B2]/30 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#F8FAF9] group-hover:bg-[#E6F4EA] rounded-2xl flex items-center justify-center text-2xl mb-8 transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="font-extrabold text-xl text-gray-900 mb-4">{f.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Testimonial Split Section */}
      <section id="riset" className="py-24 bg-white scroll-mt-10">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Research */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1F2937] mb-6 tracking-tight leading-tight">
              Dirancang berdasarkan<br/>riset psikologi
            </h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">
              Tenang dikembangkan dengan pendekatan berbasis ilmiah untuk membantumu lebih memahami diri dan meningkatkan kesehatan mental.
            </p>
            
            <div className="space-y-6">
              {[
                'Menggunakan pendekatan Cognitive Behavioral Therapy (CBT)',
                'Berdasarkan riset psikologi terbaru',
                'Membantu membangun kebiasaan positif',
                'Mendukung mahasiswa Indonesia'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-[#F8FAF9] p-4 rounded-2xl border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-[#E6F4EA] text-[#2D6A4F] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="font-bold text-gray-700 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats & Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E6F4EA] to-white opacity-40 rounded-[3rem] -z-10 blur-xl"></div>
            
            {/* Stats Column */}
            <div className="space-y-8 flex flex-col justify-center">
              <div>
                <h3 className="text-5xl font-extrabold text-[#2D6A4F] tracking-tight mb-2">10K+</h3>
                <p className="text-gray-500 font-semibold text-sm">Mahasiswa<br/>menggunakan Tenang</p>
              </div>
              <div>
                <h3 className="text-5xl font-extrabold text-[#2D6A4F] tracking-tight mb-2">95%</h3>
                <p className="text-gray-500 font-semibold text-sm">Pengguna merasa<br/>lebih terbantu</p>
              </div>
              <div>
                <h3 className="text-5xl font-extrabold text-[#2D6A4F] tracking-tight mb-2 flex items-end gap-2">4.9 <span className="text-lg mb-2">⭐⭐⭐⭐⭐</span></h3>
                <p className="text-gray-500 font-semibold text-sm">Rating pengguna</p>
              </div>
            </div>

            {/* Testimonials Column */}
            <div className="space-y-6" id="testimoni">
              <div className="mb-4">
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">Apa kata mereka?</h3>
                <div className="w-12 h-1 bg-[#52B788] rounded-full"></div>
              </div>
              
              {[
                { name: 'Dinda A.', univ: 'Mahasiswa Semester 7', text: 'Tenang bantu aku memahami mood yang naik turun saat skripsi. AI journaling-nya beneran berasa ngerti.' },
                { name: 'Rizky P.', univ: 'Mahasiswa Semester 5', text: 'Aplikasi ini simpel tapi dalem banget. Insight mingguannya selalu tepat dan bikin aku lebih sadar diri.' },
                { name: 'Salsa N.', univ: 'Mahasiswa Semester 3', text: 'Akhirnya ada aplikasi mental health yang cocok buat mahasiswa Indonesia. Design-nya juga calming!' }
              ].map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl text-gray-200 mb-2 font-serif">"</div>
                  <p className="text-gray-600 text-sm font-medium mb-6 leading-relaxed">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E6F4EA] rounded-full flex items-center justify-center text-[#2D6A4F] font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{t.name}</p>
                      <p className="text-[10px] font-bold text-gray-400">{t.univ}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Dark CTA & Footer */}
      <footer className="bg-[#1B4332] text-white pt-24 pb-12 mt-10 rounded-t-[3rem] md:rounded-t-[4rem] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D6A4F] rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#52B788] rounded-full blur-[100px] opacity-20"></div>

        <div className="max-w-[1200px] mx-auto px-8 relative z-10">
          
          {/* CTA Block */}
          <div className="bg-[#2D6A4F]/40 backdrop-blur-md border border-white/10 rounded-[3rem] p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10 mb-20 shadow-2xl">
            <div className="text-center md:text-left">
              <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight">Mulai perjalananmu menuju mental yang lebih sehat</h2>
              <p className="text-[#95D5B2] font-medium text-lg">Kamu tidak sendiri. Tenang siap mendampingimu setiap hari.</p>
            </div>
            <div className="flex flex-col items-center gap-3 shrink-0">
              <Link to="/register" className="bg-white text-[#1B4332] px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl hover:-translate-y-1 flex items-center gap-2">
                Mulai Gratis Sekarang <span>→</span>
              </Link>
              <p className="text-xs font-semibold text-white/60">Gratis • Privat • Tanpa Kartu Kredit</p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16 border-t border-white/10 pt-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[#95D5B2] text-2xl">🌿</span>
                <span className="text-2xl font-extrabold tracking-tight text-white">Tenang</span>
              </div>
              <p className="text-white/60 font-medium text-sm leading-relaxed max-w-xs mb-8">
                Teman refleksi harian untuk kesehatan mental mahasiswa Indonesia.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholders */}
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition cursor-pointer">
                  <span className="text-white">📷</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition cursor-pointer">
                  <span className="text-white">🐦</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition cursor-pointer">
                  <span className="text-white">✉️</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Produk</h4>
              <ul className="space-y-4 text-sm text-white/60 font-medium">
                <li><a href="#fitur" className="hover:text-[#95D5B2] transition">Fitur Utama</a></li>
                <li><Link to="/register" className="hover:text-[#95D5B2] transition">Mood Check-in</Link></li>
                <li><Link to="/register" className="hover:text-[#95D5B2] transition">Jurnal AI</Link></li>
                <li><Link to="/register" className="hover:text-[#95D5B2] transition">Komunitas</Link></li>
                <li><Link to="/register" className="hover:text-[#95D5B2] transition">Habit Log</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Perusahaan</h4>
              <ul className="space-y-4 text-sm text-white/60 font-medium">
                <li><a href="#tentang" className="hover:text-[#95D5B2] transition">Tentang Kami</a></li>
                <li><a href="#blog" className="hover:text-[#95D5B2] transition">Blog</a></li>
                <li><a href="#" className="hover:text-[#95D5B2] transition">Karier</a></li>
                <li><a href="#" className="hover:text-[#95D5B2] transition">Kontak</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Bantuan</h4>
              <ul className="space-y-4 text-sm text-white/60 font-medium">
                <li><a href="#" className="hover:text-[#95D5B2] transition">FAQ</a></li>
                <li><a href="#" className="hover:text-[#95D5B2] transition">Pusat Bantuan</a></li>
                <li><a href="#keamanan" className="hover:text-[#95D5B2] transition">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-[#95D5B2] transition">Syarat & Ketentuan</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs font-semibold text-white/40">
            <p>© 2026 Tenang. All rights reserved.</p>
            <p className="mt-4 md:mt-0 flex items-center gap-1">Dibuat dengan <span className="text-red-500">❤️</span> di Indonesia untuk mahasiswa Indonesia.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
