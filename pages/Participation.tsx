
import React from 'react';
import { Star, Trophy, Users } from 'lucide-react';

const Participation: React.FC = () => {
  const councils = [
    { grade: '5to A', president: 'Ana Valdez', secretary: 'Pedro Sosa', active_projects: 2 },
    { grade: '6to B', president: 'Luis Henríquez', secretary: 'Elena Marte', active_projects: 3 },
    { grade: '4to C', president: 'Marcos Ruíz', secretary: 'Sara Gil', active_projects: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-purple-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Participación Estudiantil</h2>
          <p className="text-purple-200 max-w-md">Fortaleciendo el liderazgo y los valores democráticos a través de los Consejos de Curso y el Comité de Estudiantes.</p>
        </div>
        <Users className="absolute -right-12 -bottom-12 w-64 h-64 text-white opacity-10 rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {councils.map((council, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-900">{council.grade}</h3>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Star size={20} fill="currentColor" />
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Presidente/a</p>
                <p className="text-sm font-bold text-slate-800">{council.president}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Secretario/a</p>
                <p className="text-sm font-bold text-slate-800">{council.secretary}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl">
              <Trophy size={16} className="text-amber-500" />
              <span className="text-xs font-bold text-slate-600">{council.active_projects} Proyectos de Impacto Social</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Comité Escolar de Estudiantes</h3>
        <p className="text-slate-500 mb-6 max-w-lg mx-auto">Nuestro comité central coordina las actividades de bienestar estudiantil y convivencia en todo el centro educativo.</p>
        <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
          Ver Acta de Elecciones
        </button>
      </div>
    </div>
  );
};

export default Participation;
