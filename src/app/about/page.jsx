// src/app/about/page.jsx
export default function AboutPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-950 to-purple-700 px-6 py-16">
        <div className="w-full max-w-3xl bg-gray-900 bg-opacity-95 backdrop-blur-md rounded-2xl p-10 shadow-2xl text-white">
          <h1 className="text-4xl font-bold mb-4 border-b pb-2 border-purple-500 text-center">About me</h1>
          
          {/* Profile */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">Tentang Saya</h2>
            <p className="text-lg leading-relaxed">
              Halo! Saya <strong>elin</strong>, mahasiswa Teknik Informatika yang masih aktif berkulia 
            </p>
          </section>
  
          {/* Skills */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">Keahlian</h2>
            <ul className="list-disc list-inside space-y-1 text-lg">
            <li>HTML, CSS <span className="text-[10px] text-purple-300 italic">(masih belajar)</span>
            </li>

              
             
            </ul>
          </section>
  
          {/* Education */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">Pendidikan</h2>
            <p className="text-lg">
              <strong>Universitas Dr. Soetomo</strong><br />
              S1 Teknik Informatika,Tahun Masuk-2023
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">kepanitiaan</h2>
            <ul className="list-disc list-inside space-y-1 text-lg">
              <li><strong>pengalaman kepanitiaan: </strong>kesehatan osfak dan orling</li>
            
            </ul>
          </section>
  
          {/* Projects */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">Proyek</h2>
            <ul className="list-disc list-inside space-y-1 text-lg">
              <li><strong>Website Camellia Beauty MUA</strong></li>
            </ul>
          </section>
  
          {/* Contact */}
<section>
  <h2 className="text-2xl font-semibold text-purple-300 mb-2">Kontak</h2>
  <p className="text-lg space-y-1">
    <a 
      href="mailto:elinagustinaarifinia@gmail.com"
      className="text-purple-400 hover:underline block"
    >
      Email: elinagustinaarifinia@gmail.com
    </a>
    <a 
      href="https://instagram.com/elnaachan_" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-purple-400 hover:underline block"
    >
      Instagram: @elnaachan_
    </a>
  </p>
</section>

        </div>
      </div>
    );
  }
  