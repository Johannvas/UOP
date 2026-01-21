
import React from 'react';
import { INSTITUTION_NAME, SCHOOL_NAME, DISTRICT_CODE, SCHOOL_ADDRESS, SCHOOL_PHONE } from '../constants';
import { LayoutDashboard, Users, ClipboardList, Calendar, ShieldCheck, Heart, Archive, Plus, ShieldAlert, MapPin, BrainCircuit, BookOpenText, Phone, School } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onQuickAction: (action: string) => void;
  customLogo?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onQuickAction, customLogo }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Estudiantes', icon: Users },
    { id: 'anecdotico', label: 'Registro Anecdótico', icon: BookOpenText },
    { id: 'neae', label: 'Apoyo NEAE', icon: BrainCircuit },
    { id: 'planning', label: 'Planificación', icon: Calendar },
    { id: 'cases', label: 'Casos SAS', icon: ClipboardList },
    { id: 'convivencia', label: 'Convivencia', icon: ShieldCheck },
    { id: 'family', label: 'Familia', icon: Heart },
    { id: 'portfolio', label: 'Portafolio', icon: Archive },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans">
      {/* Sidebar Permanente */}
      <aside className="no-print hidden md:flex flex-col w-64 bg-slate-950 text-white sticky top-0 h-screen overflow-y-auto z-30 border-r border-slate-800 shadow-2xl">
        <div className="p-8 border-b border-slate-800 bg-slate-950">
          <div className="flex flex-col items-center text-center gap-5">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center p-1 shadow-inner border border-white/10 overflow-hidden">
               {customLogo ? (
                 <img src={customLogo} alt="Logo" className="w-full h-full object-contain" />
               ) : (
                 <School className="text-blue-400 w-12 h-12" />
               )}
            </div>
            <div>
              <h1 className="text-sm font-black tracking-[0.2em] leading-tight uppercase text-blue-400">UOP Digital</h1>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black mt-2">Santa Martha</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-5 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-5 py-4 rounded-[1.5rem] transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold translate-x-1' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'scale-110' : ''} />
              <span className="font-black text-[11px] uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Contenido Dinámico */}
      <main className="flex-1 flex flex-col min-h-0">
        <div className="h-44 bg-slate-900 w-full no-print shadow-inner"></div>

        {/* Sticky Header de Sección */}
        <header className="no-print bg-white/90 backdrop-blur-xl border border-slate-200/50 px-8 pb-8 -mt-14 relative z-20 mx-8 rounded-[3rem] shadow-2xl">
          <div className="max-w-7xl mx-auto pt-8 flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8">
            <div className="flex items-center gap-8">
              {/* Logo en Header */}
              <div className="hidden sm:block w-28 h-28 bg-white rounded-full p-2.5 shadow-2xl -mt-20 border-4 border-white overflow-hidden">
                 {customLogo ? (
                   <img src={customLogo} alt="Logo" className="w-full h-full object-contain" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-full">
                     <School className="text-blue-600 w-12 h-12" />
                   </div>
                 )}
              </div>
              <div>
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <ShieldCheck size={16} />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80">{INSTITUTION_NAME}</span>
                </div>
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                  {SCHOOL_NAME}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full uppercase tracking-widest border border-slate-200">
                    Distrito Educativo {DISTRICT_CODE}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mb-1">
              <button 
                onClick={() => onQuickAction('anecdotico')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2.5"
              >
                <Plus size={18} /> Registro Diario
              </button>
              <button 
                onClick={() => onQuickAction('incident')}
                className="bg-rose-600 hover:bg-rose-700 text-white px-7 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-rose-600/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2.5"
              >
                <ShieldAlert size={18} /> Alerta SAS
              </button>
            </div>
          </div>
        </header>

        {/* Espacio para la vista activa */}
        <div className="p-6 lg:p-12 max-w-7xl mx-auto w-full flex-1">
          {children}
        </div>
        
        <footer className="no-print p-12 text-center border-t border-slate-200 bg-white">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-slate-400 mb-6">
             <div className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.25em]">
               <MapPin size={14} className="text-blue-500" /> {SCHOOL_ADDRESS}
             </div>
             <div className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.25em]">
               <Phone size={14} className="text-blue-500" /> {SCHOOL_PHONE}
             </div>
          </div>
          <div className="w-16 h-1 bg-slate-100 mx-auto mb-6 rounded-full"></div>
          <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.4em]">
            Ministerio de Educación • República Dominicana © 2024
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Layout;
