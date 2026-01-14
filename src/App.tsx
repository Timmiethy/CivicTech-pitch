import { useState, useEffect } from 'react';
import {
  ChevronDown,
  Shield,
  Zap,
  Users,
  ArrowRight,
    Smartphone, 
    LayoutDashboard, 
    Globe, 
    Lock,
    Activity,  Sun,
  Moon,
  Languages,
  Menu,
  X,
  Mail,
  Phone
} from 'lucide-react';
import indianCityScene from './assets/indian-city-scene-optimized.jpg';

// --- Types ---
type Lang = 'vi' | 'en';

interface AppProps {
  isDark: boolean;
  lang: Lang;
  toggleTheme?: () => void;
  toggleLang?: () => void;
}

// --- Content Dictionary ---
const content = {
  vi: {
    nav: {
      problem: "Vấn đề",
      solution: "Giải pháp",
      tech: "Công nghệ",
      impact: "Tác động",
      demo: "Báo cáo ngay"
    },
    hero: {
      tag: "Dự án Thành Phố Thông Minh 2025",
      title1: "Đánh thức tiềm năng",
      title2: "Đô Thị Số Hóa",
      desc: "Một nền tảng tiện lợi biến tiếng nói người dân thành hành động cụ thể. Minh bạch. Tức thời. Hiệu quả.",
      btn1: "Khám phá dự án"
    },
    problem: {
      title1: "Khoảng cách vô hình giữa",
      title2: "Vấn đề",
      title3: "và",
      title4: "Giải pháp",
      desc: "Hạ tầng xuống cấp, rác thải ùn ứ, và những mối nguy hiểm tiềm tàng. Người dân muốn báo cáo, nhưng quy trình hiện tại quá phức tạp, chậm chạp và thiếu phản hồi.",
      stat1: "Thời gian tiếp nhận thông tin cũ",
      stat2: "Vấn đề nhỏ bị bỏ qua",
      tag1: "Hư hại hạ tầng",
      tag2: "Ô nhiễm",
      quote: "\"Chúng tôi thấy vấn đề hàng ngày, nhưng không biết gửi đi đâu để được lắng nghe.\""
    },
    solution: {
      tag: "Giải pháp CivicTech",
      title: "Một Hệ Sinh Thái Đồng Bộ",
      desc: "Không chỉ là một ứng dụng. Chúng tôi xây dựng một cầu nối số hóa khép kín giữa Người dân và Chính quyền.",
      card1_title: "Snap & Send",
      card1_desc: "Ứng dụng phía người dân. Tự động định vị GPS, chụp ảnh nhanh và gửi báo cáo chỉ trong 30 giây. Giao diện tối giản.",
      card2_title: "Live Command",
      card2_desc: "Bảng điều khiển dành cho chính quyền. Bản đồ nhiệt thời gian thực, AI phân loại mức độ ưu tiên."
    },
    tech: {
      title: "Công nghệ Lõi",
      items: [
        { title: 'Geo-Spatial Indexing', desc: 'Truy vấn và gom nhóm các sự cố theo vị trí địa lý với độ trễ thấp.' },
        { title: 'Gemini AI Analysis', desc: 'AI tự động phân tích hình ảnh, đánh giá mức độ nghiêm trọng và gợi ý xử lý.' },
        { title: 'Secure Reporting', desc: 'Bảo vệ danh tính người báo cáo bằng mã hóa đầu cuối.' }
      ],
      status: "Trạng thái hệ thống: Hoạt động",
      log1: "Kết nối vệ tinh...",
      log2: "Tải bản đồ vector...",
      log3: "Mô hình Gemini AI...",
      ready: "Sẵn sàng",
      cached: "Đã lưu",
      ok: "OK",
      analyzing: "Đang phân tích hình ảnh...",
      found: "Phát hiện: Ổ gà (Độ tin cậy: 98%)",
      loc: "Vị trí: 10.762, 106.660",
      prio: "Ưu tiên: Cao"
    },
    impact: {
      title: "Cam Kết Của Chúng Tôi",
      items: [
        { title: 'Minh Bạch', desc: 'Mọi quy trình xử lý đều được công khai trạng thái.' },
        { title: 'Cộng Đồng', desc: 'Trao quyền cho người dân trở thành "cảm biến" thông minh.' },
        { title: 'Hiệu Quả', desc: 'Giảm 70% thời gian từ lúc phát hiện đến khi được giải quyết.' }
      ],
      quote: "\"Công nghệ không chỉ là công cụ. Nó là ngôn ngữ mới của sự tin tưởng giữa các tổ chức và người dân.\"",
      team: "Đội Ngũ CivicTech",
      role: "Nhóm Sáng Lập"
    },
    footer: {
      title: "CivicTech Presentation",
      contact: "Liên hệ",
      copyright: "© 2025 Dự án CivicTech. Được xây dựng cho Thử thách Thành phố Thông minh."
    }
  },
  en: {
    nav: {
      problem: "Problem",
      solution: "Solution",
      tech: "Tech",
      impact: "Impact",
      demo: "Report Now"
    },
    hero: {
      tag: "Smart City Project 2025",
      title1: "Unlocking the",
      title2: "Digital City",
      desc: "A platform connecting citizens and government. Fast. Clear. Effective.",
      btn1: "Explore Project"
    },
    problem: {
      title1: "The gap between",
      title2: "Problems",
      title3: "and",
      title4: "Solutions",
      desc: "Damaged roads, trash piles, and hidden dangers. Citizens want to report them, but the current process is too hard, too slow, and has no feedback.",
      stat1: "Average time to receive reports",
      stat2: "Small issues ignored",
      tag1: "Damaged Roads",
      tag2: "Pollution",
      quote: "\"We see problems every day, but don't know where to send them to be heard.\""
    },
    solution: {
      tag: "CivicTech Solution",
      title: "A Unified Ecosystem",
      desc: "Not just an app. We build a digital bridge between Citizens and Government.",
      card1_title: "Snap & Send",
      card1_desc: "For Citizens. Auto GPS, quick photo, and send report in 30 seconds. Simple interface.",
      card2_title: "Live Command",
      card2_desc: "For Government. Real-time heatmaps, AI priority sorting."
    },
    tech: {
      title: "Core Tech",
      items: [
        { title: 'Geo-Spatial Indexing', desc: 'Fast grouping of issues by location.' },
        { title: 'Gemini AI Analysis', desc: 'AI analyzes photos to rate severity and suggest fixes.' },
        { title: 'Secure Reporting', desc: 'Protects user identity with encryption.' }
      ],
      status: "System Status: Operational",
      log1: "Connecting to Satellite...",
      log2: "Loading Vector Map...",
      log3: "Gemini AI Model...",
      ready: "Ready",
      cached: "Cached",
      ok: "OK",
      analyzing: "Analysing image data...",
      found: "Found: Pothole (Confidence: 98%)",
      loc: "Location: 10.762, 106.660",
      prio: "Priority: High"
    },
    impact: {
      title: "Our Promise",
      items: [
        { title: 'Transparency', desc: 'All processes are public and trackable.' },
        { title: 'Community', desc: 'Empowering citizens to be smart city sensors.' },
        { title: 'Efficiency', desc: 'Reduces resolution time by 70%.' }
      ],
      quote: "\"Technology is not just a tool. It is the new language of trust between people and government.\"",
      team: "CivicTech Team",
      role: "Founding Team"
    },
    footer: {
      title: "CivicTech Presentation",
      contact: "Contact",
      copyright: "© 2025 CivicTech Project. Built for the Smart City Challenge."
    }
  }
};

// --- Components ---

const Navbar = ({ isDark, lang, toggleTheme, toggleLang }: AppProps) => {
  const t = content[lang].nav;
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when clicking a link
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${ 
      isDark 
        ? 'bg-slate-900/80 border-white/10' 
        : 'bg-white/80 border-slate-200'
  }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/icon.svg" alt="CivicTech Logo" className="w-8 h-8" />
          <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Civic<span className={isDark ? 'text-blue-500' : 'text-blue-600'}>Tech</span>
          </span>
        </div>
        
        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          <a href="#problem" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.problem}</a>
          <a href="#solution" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.solution}</a>
          <a href="#technology" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.tech}</a>
          <a href="#impact" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.impact}</a>
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={toggleLang}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-colors border ${ 
                isDark 
                  ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10' 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Languages size={14} />
              {lang.toUpperCase()}
            </button>

            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${ 
                isDark 
                  ? 'bg-white/10 text-yellow-300 hover:bg-white/20' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <a 
            href="https://civictech-hsh8.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all shadow-md active:scale-95 ${ 
            isDark 
              ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
          }`}> 
            {t.demo}
          </a>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg transition-colors active:bg-slate-100 dark:active:bg-slate-800"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} className={isDark ? 'text-white' : 'text-slate-800'} /> : <Menu size={24} className={isDark ? 'text-white' : 'text-slate-800'} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className={`md:hidden absolute top-16 left-0 right-0 border-b p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-2 ${
          isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-col gap-4">
            <a href="#problem" onClick={handleLinkClick} className={`text-lg font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{t.problem}</a>
            <a href="#solution" onClick={handleLinkClick} className={`text-lg font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{t.solution}</a>
            <a href="#technology" onClick={handleLinkClick} className={`text-lg font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{t.tech}</a>
            <a href="#impact" onClick={handleLinkClick} className={`text-lg font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{t.impact}</a>
          </div>
          
          <hr className={isDark ? 'border-white/10' : 'border-slate-200'} />
          
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Settings</span>
            <div className="flex gap-3">
              <button 
                onClick={toggleLang}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${ 
                  isDark 
                    ? 'bg-white/5 border-white/10 text-white' 
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <Languages size={16} />
                {lang.toUpperCase()}
              </button>

              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full border ${ 
                  isDark 
                    ? 'bg-white/5 border-white/10 text-yellow-300' 
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const ScrollProgress = ({ isDark }: AppProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setWidth(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-16 left-0 h-1 z-50 transition-all duration-100 ease-out ${ 
      isDark ? 'bg-gradient-to-r from-blue-500 to-emerald-400' : 'bg-gradient-to-r from-blue-600 to-emerald-500'
    }`} style={{ width: `${width}%` }} />
  );
};

// --- Sections ---

const Hero = ({ isDark, lang }: AppProps) => {
  const t = content[lang].hero;
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-16 transition-colors duration-500 ${ 
      isDark ? 'bg-slate-950' : 'bg-gradient-to-b from-blue-50 via-white to-white'
    }`}>
      {/* Ambient Background */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px] animate-pulse transition-colors duration-500 ${ 
        isDark ? 'bg-blue-600/20' : 'bg-blue-200/40'
      }`} />
      <div className={`absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] transition-colors duration-500 ${ 
        isDark ? 'bg-emerald-500/10' : 'bg-emerald-100/60'
      }`} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-8">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 border ${ 
          isDark 
            ? 'bg-white/5 border-white/10 text-blue-300' 
            : 'bg-blue-100/50 border-blue-200 text-blue-800'
        }`}> 
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
          </span>
          {t.tag}
        </div>
        
        <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 ${ 
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {t.title1} <br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${ 
            isDark ? 'from-blue-400 via-indigo-400 to-emerald-400' : 'from-blue-600 via-indigo-600 to-emerald-600'
          }`}> 
            {t.title2}
          </span>
        </h1>
        
        <p className={`text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 ${ 
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {t.desc}
        </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                  <a 
                    href="#problem"
                    className={`px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2 group ${
                      isDark 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 hover:-translate-y-1'
                    }`}
                  >
                    {t.btn1} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
      </div>

      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce ${isDark ? 'text-slate-500' : 'text-slate-400'}`}> 
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
};

const TheProblem = ({ isDark, lang }: AppProps) => {
  const t = content[lang].problem;
  return (
    <section id="problem" className={`py-24 relative transition-colors duration-500 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className={`text-3xl md:text-5xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.title1} <br/>
              <span className={isDark ? 'text-rose-500' : 'text-red-600 bg-red-50 px-2 rounded-lg'}>{t.title2}</span> {t.title3} <span className={isDark ? 'text-blue-500' : 'text-blue-600 bg-blue-50 px-2 rounded-lg'}>{t.title4}</span>
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.desc}
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100 hover:shadow-lg transition-shadow'}`}>
                <h3 className={`text-3xl font-extrabold mb-1 ${isDark ? 'text-white' : 'text-blue-900'}`}>48h+</h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.stat1}</p>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100 hover:shadow-lg transition-shadow'}`}>
                <h3 className={`text-3xl font-extrabold mb-1 ${isDark ? 'text-white' : 'text-blue-900'}`}>60%</h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.stat2}</p>
              </div>
            </div>
          </div>

          {/* Visualizing "Urban Decay" */}
          <div className={`relative h-[300px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl group border ${isDark ? 'bg-slate-800 border-white/5' : 'bg-slate-100 border-slate-200 shadow-slate-200/50'}`}>
            <img 
              src={indianCityScene} 
              alt="Urban Scene" 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-all duration-700 hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${isDark ? 'from-slate-900' : 'from-slate-900/80'}`} />
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${isDark ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-red-500/90 text-white border-transparent'}`}>{t.tag1}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${isDark ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-500/90 text-white border-transparent'}`}>{t.tag2}</span>
              </div>
              <p className="text-white font-medium italic pl-4 border-l-4 border-white/50">{t.quote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TheSolution = ({ isDark, lang }: AppProps) => {
  const t = content[lang].solution;
  return (
    <section id="solution" className={`py-24 relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-16">
        <div className={`inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full border ${ 
          isDark 
            ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' 
            : 'text-emerald-700 bg-emerald-100 border-emerald-200'
        }`}> 
          {t.tag}
        </div>
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.title}</h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}> 
          {t.desc}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Step 1: User App */}
        <div className={`group relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2 ${ 
          isDark 
            ? 'bg-slate-900 border-white/10 hover:border-blue-500/50' 
            : 'bg-white border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-200/50'
        }`}> 
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${ 
            isDark 
              ? 'bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white' 
              : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
          }`}> 
            <Smartphone size={28} />
          </div>
          <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.card1_title}</h3>
          <p className={`leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}> 
            {t.card1_desc}
          </p>
          <div className={`h-40 w-full rounded-xl overflow-hidden border relative ${ 
            isDark ? 'bg-slate-800 border-white/5' : 'bg-slate-50 border-slate-200 shadow-inner'
          }`}> 
            <div className={`absolute top-4 left-4 right-4 h-2 rounded-full w-1/2 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
            <div className={`absolute top-8 left-4 right-4 h-20 rounded-lg border flex items-center justify-center ${ 
              isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-white border-slate-200 shadow-sm'
            }`}> 
               <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ 
                 isDark ? 'bg-blue-500 opacity-75 animate-ping' : 'bg-blue-100 border-4 border-white'
               }`}> 
                  {!isDark && <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>}
               </div>
            </div>
          </div>
        </div>

        {/* Connection Arrow */}
        <div className={`hidden md:flex items-center justify-center ${isDark ? 'text-slate-700' : 'text-slate-300'}`}> 
           <ArrowRight size={48} className="animate-pulse" />
        </div>

        {/* Step 2: Admin Dashboard */}
        <div className={`group relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2 ${ 
          isDark 
            ? 'bg-slate-900 border-white/10 hover:border-emerald-500/50' 
            : 'bg-white border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-emerald-200/50'
        }`}> 
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${ 
            isDark 
              ? 'bg-emerald-600/20 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white' 
              : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
          }`}> 
            <LayoutDashboard size={28} />
          </div>
          <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.card2_title}</h3>
          <p className={`leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}> 
            {t.card2_desc}
          </p>
          <div className={`h-40 w-full rounded-xl overflow-hidden border relative group-hover:scale-[1.02] transition-transform duration-500 ${ 
            isDark ? 'bg-slate-800 border-white/5' : 'bg-slate-50 border-slate-200 shadow-inner'
          }`}> 
             {/* Map Background Pattern */}
             <div className={`absolute inset-0 opacity-40 ${isDark ? 'bg-[radial-gradient(#334155_1px,transparent_1px)]' : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)]'} [background-size:16px_16px]`} />
             
             {/* Simulated Map Paths */}
             <svg className="absolute inset-0 w-full h-full opacity-20" stroke={isDark ? '#4ade80' : '#10b981'} strokeWidth="2" fill="none">
                <path d="M 50 150 Q 100 100 150 150 T 250 150" />
                <path d="M 0 50 L 50 50 L 100 100 L 300 100" />
                <path d="M 200 0 L 200 200" />
             </svg>

             {/* Radar Scan Effect */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent w-[50%] h-full animate-[scan_3s_linear_infinite]" />

             {/* Map Pins */}
             <div className={`absolute top-1/2 left-1/2 rounded-full w-3 h-3 bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.2)] animate-pulse`} />
             <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-red-500 animate-ping" />
             <div className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-blue-500" />
             
             {/* Tooltip Simulation */}
             <div className={`absolute top-[40%] left-[55%] px-2 py-1 rounded text-[10px] font-mono border ${isDark ? 'bg-slate-900 border-emerald-500/30 text-emerald-400' : 'bg-white border-slate-200 text-slate-600 shadow-sm'}`}>
                LIVE: 24 reports
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Technology = ({ isDark, lang }: AppProps) => {
  const t = content[lang].tech;
  const icons = [Globe, Zap, Lock];
  const colors = ['purple', 'blue', 'emerald'];

  return (
    <section id="technology" className={`py-24 border-y transition-colors duration-500 ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.title}</h2>
            <div className="space-y-6">
              {t.items.map((item, index) => {
                const Icon = icons[index];
                const color = colors[index];
                return (
                  <div key={item.title} className="flex gap-4 group">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${ 
                      isDark ? `bg-${color}-500/10` : `bg-${color}-50 group-hover:bg-${color}-600`
                    }`}> 
                      <Icon size={24} className={`transition-colors ${ 
                        isDark ? `text-${color}-400` : `text-${color}-600 group-hover:text-white`
                      }`} />
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold transition-colors ${ 
                        isDark ? 'text-white' : `text-slate-900 group-hover:text-${color}-700`
                      }`}>{item.title}</h4>
                      <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="relative">
            {/* Tech Viz Decoration */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[80px] ${ 
              isDark ? 'bg-indigo-500/20' : 'bg-blue-100/50'
            }`} />
            <div className={`relative z-10 backdrop-blur-xl border rounded-2xl p-8 shadow-2xl transition-colors duration-500 ${ 
              isDark ? 'bg-slate-800/50 border-white/10' : 'bg-white/80 border-slate-200 shadow-blue-900/5'
            }`}> 
               <div className={`font-mono text-sm mb-4 border-b pb-2 font-bold ${isDark ? 'text-blue-300 border-white/10' : 'text-blue-600 border-slate-100'}`}> 
                 {'>'} {t.status}
               </div>
               <div className={`space-y-3 font-mono text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}> 
                 <div className="flex justify-between"><span>{t.log1}</span> <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{t.ok}</span></div>
                 <div className="flex justify-between"><span>{t.log2}</span> <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{t.cached}</span></div>
                 <div className="flex justify-between"><span>{t.log3}</span> <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{t.ready}</span></div>
                 <div className={`h-32 mt-4 rounded border p-2 overflow-hidden relative ${ 
                   isDark ? 'bg-slate-900 border-white/10' : 'bg-slate-50 border-slate-200'
                 }`}> 
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-emerald-500 shadow-[0_0_10px_#10b981] animate-[scan_2s_ease-in-out_infinite]" />
                    <span className={`opacity-70 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {t.analyzing}<br/>
                      {t.found}<br/>
                      {t.loc}<br/>
                      {t.prio}
                    </span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustAndImpact = ({ isDark, lang }: AppProps) => {
  const t = content[lang].impact;
  const icons = [Shield, Users, Activity];
  const colors = ['emerald', 'blue', 'purple'];

  return (
    <section id="impact" className={`py-24 transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-gradient-to-b from-slate-50 to-white'}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={`text-3xl md:text-5xl font-bold mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.title}</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {t.items.map((item, index) => {
            const Icon = icons[index];
            const color = colors[index];
            return (
              <div key={item.title} className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${ 
                isDark 
                  ? 'bg-white/5 border-white/5 hover:bg-white/10' 
                  : 'bg-white border-slate-100 shadow-md hover:shadow-lg'
              }`}> 
                <Icon className={`w-10 h-10 mx-auto mb-4 ${isDark ? `text-${color}-400` : `text-${color}-600`}`} />
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.title}</h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className={`mt-16 pt-16 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}> 
          <p className={`text-2xl font-serif italic mb-6 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}> 
            {t.quote}
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-white p-1 ${!isDark && 'shadow-md'}`}>
              <img src="/icon.svg" alt="CivicTech Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-left">
              <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.team}</div>
              <div className={`text-xs uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-500 font-semibold'}`}>{t.role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ isDark, lang }: AppProps) => {
  const t = content[lang].footer;
  return (
    <footer className={`py-12 border-t transition-colors duration-500 ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}> 
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <img src="/icon.svg" alt="CivicTech Logo" className="w-8 h-8" />
            <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Civic<span className={isDark ? 'text-blue-500' : 'text-blue-600'}>Tech</span>
            </span>
          </div>
          <p className={`max-w-sm text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {t.copyright}
          </p>
        </div>

        <div className="space-y-6 md:justify-self-end">
          <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.contact}</h4>
          <div className="space-y-4">
            <a href="mailto:civictech.hcmut@gmail.com" className={`flex items-center gap-3 group transition-colors ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}>
              <div className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-white/5 group-hover:bg-blue-500/10' : 'bg-slate-100 group-hover:bg-blue-50'}`}>
                <Mail size={18} />
              </div>
              <span className="text-sm font-medium">civictech.hcmut@gmail.com</span>
            </a>
            <a href="tel:0898801095" className={`flex items-center gap-3 group transition-colors ${isDark ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'}`}>
              <div className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-white/5 group-hover:bg-emerald-500/10' : 'bg-slate-100 group-hover:bg-emerald-50'}`}>
                <Phone size={18} />
              </div>
              <span className="text-sm font-medium">0898801095</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function IntroSite() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<Lang>('vi');

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleLang = () => {
    setLang(l => l === 'vi' ? 'en' : 'vi');
  };

  // Inject Font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  return (
    <div className={`font-sans antialiased transition-colors duration-500 ${ 
      isDark 
        ? 'bg-slate-950 text-slate-200 selection:bg-blue-500/30 selection:text-blue-200' 
        : 'bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900'
    }`} style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}>
      <ScrollProgress isDark={isDark} lang={lang} />
      <Navbar isDark={isDark} lang={lang} toggleTheme={toggleTheme} toggleLang={toggleLang} />
      <Hero isDark={isDark} lang={lang} />
      <TheProblem isDark={isDark} lang={lang} />
      <TheSolution isDark={isDark} lang={lang} />
      <Technology isDark={isDark} lang={lang} />
      <TrustAndImpact isDark={isDark} lang={lang} />
      <Footer isDark={isDark} lang={lang} />
    </div>
  );
}