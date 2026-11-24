const onReady=(fn)=>document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fn):fn();
onReady(()=>{
  const toggleBtn=document.querySelector(".nav-toggle");
  const primaryNav=document.getElementById("primary-nav");
  if(toggleBtn&&primaryNav){
    const setMenuState=(open)=>{
      toggleBtn.setAttribute("aria-expanded",String(open));
      toggleBtn.setAttribute("aria-label",open?"Tutup menu navigasi":"Buka menu navigasi");
      primaryNav.classList.toggle("is-open",open);
      document.body.style.overflow=open?"hidden":"";
    };
    toggleBtn.addEventListener("click",()=>{setMenuState(toggleBtn.getAttribute("aria-expanded")!=="true")});
    primaryNav.querySelectorAll(".nav-list a, .dropdown-content a").forEach((link)=>{link.addEventListener("click",()=>setMenuState(false))});
    document.addEventListener("keydown",(e)=>{
      if(e.key==="Escape"&&primaryNav.classList.contains("is-open")){setMenuState(false);toggleBtn.focus()}
    });
  }
  const navBtn=document.getElementById("about-menu-btn");
  const dropdownContainer=document.querySelector(".dropdown");
  const backBtn=document.querySelector(".d-content-back");
  if(navBtn&&dropdownContainer){
    const isTouchDevice="ontouchstart" in window||navigator.maxTouchPoints>0||window.matchMedia("(pointer: coarse)").matches;
    const closeDropdown=()=>{
      navBtn.classList.remove("active");
      navBtn.setAttribute("aria-expanded","false");
      if(document.activeElement&&dropdownContainer.contains(document.activeElement))document.activeElement.blur();
    };
    if(isTouchDevice){
      navBtn.addEventListener("click",(e)=>{e.preventDefault();const open=navBtn.classList.toggle("active");navBtn.setAttribute("aria-expanded",String(open))});
      document.addEventListener("click",(e)=>{if(!dropdownContainer.contains(e.target))closeDropdown()});
    }else{
      dropdownContainer.addEventListener("mouseenter",()=>{navBtn.classList.add("active");navBtn.setAttribute("aria-expanded","true")});
      dropdownContainer.addEventListener("mouseleave",closeDropdown);
      navBtn.addEventListener("click",(e)=>{e.preventDefault();const open=navBtn.classList.toggle("active");navBtn.setAttribute("aria-expanded",String(open))});
    }
    if(backBtn)backBtn.addEventListener("click",(e)=>{e.preventDefault();closeDropdown()});
    document.addEventListener("keydown",(e)=>{if(e.key==="Escape")closeDropdown()});
  }
});
(()=>{
  "use strict";
  const THEME_KEY="radova-theme";
  const SUN_SVG='<svg width="16" height="16" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="128" cy="128" r="56"/><line x1="128" y1="36" x2="128" y2="16"/><line x1="128" y1="240" x2="128" y2="220"/><line x1="36" y1="128" x2="16" y2="128"/><line x1="240" y1="128" x2="220" y2="128"/><line x1="63" y1="63" x2="49" y2="49"/><line x1="207" y1="207" x2="193" y2="193"/><line x1="193" y1="63" x2="207" y2="49"/><line x1="49" y1="207" x2="63" y2="193"/></svg>';
  const MOON_SVG='<svg width="16" height="16" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M216.7 152.6A91.9 91.9 0 0 1 103.4 39.3a92 92 0 1 0 113.3 113.3Z"/></svg>';
  const getSavedTheme=()=>{try{const s=localStorage.getItem(THEME_KEY);if(s==="dark"||s==="light")return s}catch(_){}return"light"};
  const applyTheme=(theme)=>{
    const isDark=theme==="dark";
    document.documentElement.setAttribute("data-theme",isDark?"dark":"light");
    try{localStorage.setItem(THEME_KEY,isDark?"dark":"light")}catch(_){}
    const btn=document.getElementById("theme-toggle");
    if(!btn)return;
    btn.setAttribute("aria-pressed",String(isDark));
    btn.setAttribute("aria-label",isDark?"Switch to light mode":"Switch to dark mode");
    btn.setAttribute("title",isDark?"Switch to light mode":"Switch to dark mode");
    btn.innerHTML=isDark?SUN_SVG:MOON_SVG;
  };
  onReady(()=>{const s=getSavedTheme();if(s!==document.documentElement.getAttribute("data-theme"))applyTheme(s)});
  document.addEventListener("click",(e)=>{if(!e.target.closest("#theme-toggle"))return;applyTheme(document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark")});
  document.addEventListener("htmx:afterSwap",()=>{applyTheme(getSavedTheme())});
})();
window.RADOVA_I18N={
  "hero.chip":"Siap Digunakan",
  "hero.title1":"Di mana ada shell,",
  "hero.title2":"di situ ada jalan",
  "hero.lead":"Radova Linux memberi Anda kecepatan penuh tanpa konfigurasi berhari-hari. Ringan, bebas bloatware, dan langsung optimal — tinggal boot, masuk, dan mulai bekerja.",
  "hero.download":"Unduh",
  "manifesto.title1":"Simpel saja,",
  "manifesto.title2":"jangan dipersulit",
  "manifesto.lead":"Kelola aset Anda tanpa kendala",
  "manifesto.deep":"Radova Linux adalah sistem operasi mandiri yang dirancang khusus untuk pengelolaan arsip lembaga, perpustakaan, dan kedaulatan aset digital.",
  "manifesto.p1.title":"Performa Tinggi",
  "manifesto.p1.desc":"Memangkas proses latar belakang yang tidak perlu agar perangkat Anda dapat memproses katalog besar dan berkas media dengan cepat.",
  "manifesto.p2.title":"Keamanan Berlapis",
  "manifesto.p2.desc":"Melindungi basis data lembaga dan arsip lokal lewat pengamanan kernel Linux serta kontrol akses yang ketat.",
  "manifesto.p3.title":"Kontrol Aset Terpusat",
  "manifesto.p3.desc":"Unggah, beri tag, dan temukan kembali aset lembaga Anda melalui satu aplikasi terpusat.",
  "manifesto.p4.title":"Kedaulatan Data",
  "manifesto.p4.desc":"Kendali penuh ada di tangan lembaga Anda atas seluruh katalog, arsip, dan berkas digital di atas Linux.",
  "manifesto.quote":"\"Hari ini harus lebih baik dari hari esok\"",
  "fitur.title1":"Empat Pilar utama dalam",
  "fitur.title2":"satu sistem Linux.",
  "fitur.meta":"4 PILAR // ARSITEKTUR SISTEM",
  "fitur.memora.desc":"Jalankan aplikasi Memora yang sudah terpasang langsung dari desktop untuk mengelola operasional perpustakaan.",
  "fitur.memora.dt":"MANAJEMEN PERPUSTAKAAN",
  "fitur.evrocks.desc":"Akses aplikasi Evrocks bawaan secara instan tanpa perlu memasang atau mengatur software kearsipan tambahan.",
  "fitur.evrocks.dt":"MANAJEMEN ARSIP",
  "fitur.coretez.desc":"Buka platform Coretez bawaan untuk mengelola aset digital begitu sistem selesai booting.",
  "fitur.coretez.dt":"MANAJEMEN ASET DIGITAL",
  "fitur.linkers.desc":"Kelola repositori lembaga dan karya ilmiah dengan cepat melalui platform Linkers yang sudah siap pakai.",
  "fitur.linkers.dt":"MANAJEMEN REPOSITORI",
  "fitur.dev":"Tahap Pengembangan",
  "specs.title":"Tak perlu perangkat mahal.",
  "specs.lead":"Radova Linux berjalan ringan baik di komputer perpustakaan yang sudah ada maupun workstation arsip modern.",
  "specs.cpu.title":"Prosesor (CPU)",
  "specs.cpu.val":"x86_64 Dual-Core 1,5 GHz",
  "specs.cpu.desc":"Mendukung prosesor Intel dan AMD 64-bit standar untuk menjalankan Memora, Evrocks, dan Coretez dengan lancar.",
  "specs.cpu.min":"2 Core",
  "specs.cpu.rec":"4 Core+",
  "specs.ram.title":"Memori (RAM)",
  "specs.ram.val":"2 GB RAM",
  "specs.ram.desc":"Menyisakan ruang memori yang lega untuk mengindeks katalog perpustakaan sambil membuka arsip digital.",
  "specs.disk.title":"Penyimpanan",
  "specs.disk.val":"Ruang Kosong 20 GB",
  "specs.disk.desc":"Ukuran instalasi ringkas dengan enkripsi disk penuh untuk menjaga keamanan data lembaga dan aset digital lokal.",
  "specs.disp.title":"Layar & Grafis",
  "specs.disp.val":"Resolusi 1024×768",
  "specs.disp.desc":"Berjalan baik di grafis bawaan Intel/AMD maupun layar virtual agar dokumen tetap terbaca jelas.",
  "specs.min":"Minimal",
  "specs.rec":"Disarankan"
};
onReady(()=>{
  const langBtn=document.getElementById("lang-toggle");
  if(!langBtn)return;
  const LANG_KEY="radova-lang";
  const GLOBAL_ID={
    "skip":"Langsung ke konten",
    "nav.packages":"Paket",
    "nav.wiki":"Wiki",
    "nav.learning":"Belajar",
    "nav.events":"Acara",
    "nav.latest":"Terbaru",
    "nav.about":"Tentang",
    "nav.history":"Sejarah",
    "nav.contact":"Kontak",
    "nav.back":"Kembali",
    "footer.col1":"Tentang Radova",
    "footer.col2":"Sumber Daya",
    "footer.col3":"Pilar Utama",
    "footer.col4":"Bantuan & Spesifikasi",
    "footer.download":"Unduh ISO",
    "footer.specs":"Kebutuhan Sistem",
    "footer.security":"Info Keamanan",
    "footer.copy":"© 2026 yuros.org · Dirilis di bawah Lisensi MIT",
    "footer.top":"Ke atas ↑",
    "err.home":"Beranda",
    "err.chip":"Dalam Pengerjaan",
    "err.title1":"Sedang dalam",
    "err.title2":"pengembangan.",
    "err.lead":"Bagian ini sedang kami bangun dan sempurnakan agar memenuhi standar kualitas Radova.",
    "err.cta":"Kembali ke Beranda"
  };
  const ID_TEXT=Object.assign({},GLOBAL_ID,window.RADOVA_I18N||{});
  let nodes,enList;
  const applyLang=(lang)=>{
    if(!nodes){
      nodes=document.querySelectorAll("[data-i18n], [data-i18n-prefix]");
      enList=Array.from(nodes,(n)=>n.hasAttribute("data-i18n")?n.textContent:(n.firstChild?n.firstChild.nodeValue:""));
    }
    nodes.forEach((el,i)=>{
      if(el.hasAttribute("data-i18n")){
        const k=el.getAttribute("data-i18n");
        el.textContent=lang==="id"&&ID_TEXT[k]!=null?ID_TEXT[k]:enList[i];
      }else if(el.firstChild){
        const pk=el.getAttribute("data-i18n-prefix");
        el.firstChild.nodeValue=lang==="id"&&ID_TEXT[pk]!=null?ID_TEXT[pk]+" ":enList[i];
      }
    });
    document.documentElement.lang=lang;
    langBtn.textContent=lang.toUpperCase();
    langBtn.setAttribute("aria-label",lang==="id"?"Switch language to English":"Switch language to Indonesian");
  };
  let currentLang="en";
  try{const s=localStorage.getItem(LANG_KEY);if(s==="id"||s==="en")currentLang=s}catch(_){}
  if(currentLang!=="en")applyLang(currentLang);
  langBtn.addEventListener("click",()=>{
    currentLang=currentLang==="en"?"id":"en";
    applyLang(currentLang);
    try{localStorage.setItem(LANG_KEY,currentLang)}catch(_){}
  });
});

