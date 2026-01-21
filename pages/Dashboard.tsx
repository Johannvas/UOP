
import React, { useRef } from 'react';
import { Student, Case, DiagnosticBarrier, CaseStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, Users, TrendingUp, TrendingDown, Layout as LayoutIcon, Camera, School, Info } from 'lucide-react';
import { STRATEGIC_GOAL, SCHOOL_NAME, DISTRICT_CODE } from '../constants';

interface DashboardProps {
  students: Student[];
  cases: Case[];
  barriers: DiagnosticBarrier[];
  logo: string;
  onLogoUpload: (file: File) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ students, cases, barriers, logo, onLogoUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const caseStats = [
    { name: 'Abiertos', value: cases.filter(c => c.status === CaseStatus.OPEN).length, color: '#f43f5e' },
    { name: 'Seguimiento', value: cases.filter(c => c.status === CaseStatus.FOLLOW_UP).length, color: '#3b82f6' },
    { name: 'Cerrados', value: cases.filter(c => c.status === CaseStatus.CLOSED).length, color: '#10b981' },
    { name: 'Remitidos', value: cases.filter(c => c.status === CaseStatus.REFERRED).length, color: '#f59e0b' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onLogoUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* CALLOUT BLOCK - Header Principal con Carga de Logo */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-10 shadow-sm relative overflow-hidden">
        {/* Decoración sutil de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/40 rounded-full translate-x-32 -translate-y-32"></div>
        
        <div className="relative z-10">
          {/* Contenedor Circular del Logo con Efecto Hover */}
          <div className="group relative w-40 h-40 bg-white rounded-full flex items-center justify-center p-3 shadow-2xl border-4 border-white overflow-hidden cursor-pointer">
            {logo ? (
              <img src={logo} alt="Logo Institucional" className="w-full h-full object-contain" />
            ) : (
              <div className="flex flex-col items-center text-slate-300">
                <School size={56} />
                <span className="text-[9px] font-black uppercase mt-1">Logo</span>
              </div>
            )}
            
            {/* Overlay de Carga (Sólo visible en hover) */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white text-center p-2"
            >
              <Camera size={28} className="mb-1" />
              <span className="text-[9px] font-black uppercase tracking-widest leading-tight">Subir Logo<br/>Institucional</span>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left z-10">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <div className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              <Info size={12} />
              Distrito {DISTRICT_CODE}
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">• República Dominicana</span>
          </div>
          
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-none">
            {SCHOOL_NAME}
          </h2>
          
          <div className="bg-slate-50 border-l-4 border-blue-600 p-4 rounded-r-2xl max-w-2xl">
            <p className="text-slate-600 text-sm leading-relaxed italic font-medium">
              "{STRATEGIC_GOAL}"
            </p>
          </div>
        </div>
        
        {/* Badge de Estado */}
        <div className="hidden lg:flex flex-col items-center px-8 py-6 bg-slate-900 rounded-[2rem] text-white min-w-[200px] z-10 border border-slate-800 shadow-xl">
           <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2 opacity-80 font-mono">Status Operativo</span>
           <div className="flex items-center gap-2 font-black text-lg tracking-tighter">
             <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
             ACTIVO
           </div>
           <p className="text-[8px] mt-4 opacity-40 uppercase tracking-[0.3em] font-bold">UOP DIGITAL V2.5</p>
        </div>
      </div>

      {/* Indicadores Cuantitativos */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:border-blue-500 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors"><Users size={24} /></div>
            </div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Matrícula Estudiantil</p>
            <h4 className="text-3xl font-black text-slate-900">{students.length}</h4>
          </div>

          <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:border-rose-500 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3.5 bg-rose-50 text-rose-600 rounded-2xl group-hover:bg-rose-600 group-hover:text-white transition-colors"><AlertTriangle size={24} /></div>
            </div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Casos SAS Activos</p>
            <h4 className="text-3xl font-black text-slate-900">{cases.length}</h4>
          </div>

          <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl"><TrendingUp size={24} /></div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Promoción</p>
                <h4 className="text-2xl font-black text-slate-900">94.2%</h4>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: `94%` }}></div>
            </div>
          </div>

          <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3.5 bg-rose-50 text-rose-600 rounded-2xl"><TrendingDown size={24} /></div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Abandono</p>
                <h4 className="text-2xl font-black text-slate-900">5.8%</h4>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full" style={{ width: `5.8%` }}></div>
            </div>
          </div>
      </section>

      {/* Grid de Reportes y Gráficos */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2 text-slate-900">
              <LayoutIcon size={20} className="text-blue-600" />
              Diagnóstico Institucional: Barreras
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['Infraestructura', 'Actitudinales', 'Curriculares'] as const).map(type => (
              <div key={type} className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{type}</span>
                </div>
                <div className="bg-slate-50/70 p-4 rounded-3xl min-h-[220px] border border-dashed border-slate-200">
                  {barriers.filter(b => b.type === type).map(barrier => (
                    <div key={barrier.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-4 hover:border-blue-200 transition-colors group/card">
                      <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                        barrier.level === 'Alto' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        Nivel {barrier.level}
                      </span>
                      <p className="text-[11px] text-slate-700 mt-3 font-semibold leading-relaxed">{barrier.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col h-[520px]">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-10">Distribución de Casos</h3>
          <div className="flex-1 w-full" style={{ minHeight: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={caseStats} layout="vertical" margin={{ left: 10, right: 30, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} style={{ fontSize: '11px', fontWeight: '900', fill: '#64748b', textTransform: 'uppercase' }} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', fontWeight: 'bold'}}
                />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={24}>
                  {caseStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-50">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Población NEAE</span>
              <span className="text-xs font-black bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full border border-blue-100">
                {students.filter(s => s.condition.includes('NEAE')).length} Registros
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
