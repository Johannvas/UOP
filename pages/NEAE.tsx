
import React from 'react';
import { Student } from '../types';
import { BrainCircuit, Clock, MessageSquareQuote, Download, FileText } from 'lucide-react';

interface NEAEProps {
  students: Student[];
}

const NEAE: React.FC<NEAEProps> = ({ students }) => {
  const neaeStudents = students.filter(s => s.condition.includes('NEAE'));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <BrainCircuit className="text-purple-600" size={28} />
            Apoyo Psicopedagógico (NEAE)
          </h2>
          <p className="text-slate-500">Gestión de Ajustes Curriculares (ACI) y seguimiento de diversidad</p>
        </div>
        <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-xl text-sm font-black border border-purple-100 flex items-center gap-2">
          Total NEAE: {neaeStudents.length} Estudiantes
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {neaeStudents.map(student => (
          <div key={student.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all p-6 flex flex-col group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-purple-100 border-2 border-purple-50">
                {student.photoUrl ? (
                  <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-purple-600 font-black text-xl">
                    {student.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-black text-slate-900 leading-tight group-hover:text-purple-700 transition-colors">{student.name}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{student.grade} {student.section}</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Condición Detectada</span>
                <span className={`text-sm font-bold ${student.neaeType?.includes('No confirmado') ? 'text-amber-600' : 'text-slate-700'}`}>
                  {student.neaeType || 'En proceso de evaluación'}
                </span>
              </div>

              {student.observations && (
                <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100/50">
                  <div className="flex items-center gap-2 mb-1 text-[10px] font-black text-purple-400 uppercase tracking-widest">
                    <MessageSquareQuote size={12} /> Observaciones
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-3">
                    "{student.observations}"
                  </p>
                </div>
              )}

              <div className="space-y-2 mt-auto">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
                  <span>Progreso ACI</span>
                  <span className="text-purple-600">{student.aciProgress || 0}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full transition-all duration-1000" style={{ width: `${student.aciProgress || 20}%` }}></div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-purple-600 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <FileText size={14} /> Ficha PAP
                </button>
                <button className="flex-1 bg-slate-100 text-slate-700 text-xs font-bold py-2.5 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                  <Clock size={14} /> Seguimiento
                </button>
              </div>
            </div>
          </div>
        ))}

        {neaeStudents.length === 0 && (
          <div className="col-span-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
             <BrainCircuit size={48} className="mx-auto text-slate-300 mb-4" />
             <p className="text-slate-500 font-bold">No hay estudiantes marcados con NEAE</p>
             <p className="text-xs text-slate-400">Utiliza el botón de "Nuevo Registro NEAE" para agregar uno.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NEAE;
