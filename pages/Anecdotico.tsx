
import React, { useState } from 'react';
import { Student, AnecdotalRecord } from '../types';
import { BookOpenText, Search, Calendar, MapPin, Tag, MessageSquareText, Lightbulb, Trash2 } from 'lucide-react';

interface AnecdoticoProps {
  students: Student[];
  records: AnecdotalRecord[];
  onAddRecord: (record: AnecdotalRecord) => void;
  onDeleteRecord: (id: string) => void;
}

const Anecdotico: React.FC<AnecdoticoProps> = ({ students, records, onAddRecord, onDeleteRecord }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredRecords = records.filter(r => {
    const matchesSearch = r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         r.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || r.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const typeColors = {
    'Positivo': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Negativo': 'bg-rose-100 text-rose-700 border-rose-200',
    'Neutral': 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <BookOpenText className="text-emerald-600" size={28} />
            Registro Anecdótico
          </h2>
          <p className="text-slate-500">Documentación de conductas significativas e incidencias diarias</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar por alumno o descripción..."
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-64 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm font-bold text-slate-600"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="Positivo">Positivos</option>
            <option value="Negativo">Negativos</option>
            <option value="Neutral">Neutrales</option>
          </select>
        </div>
      </div>

      {/* Lista de Registros - Ahora ocupa todo el ancho */}
      <div className="space-y-6">
        {filteredRecords.length > 0 ? (
          filteredRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(record => (
            <div key={record.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6 group relative">
              <button 
                onClick={() => onDeleteRecord(record.id)}
                className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-64 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                      {record.studentName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 leading-tight">{record.studentName}</h4>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${typeColors[record.type]}`}>
                        {record.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar size={14} className="text-slate-300" />
                      {record.date}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin size={14} className="text-slate-300" />
                      {record.context}
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <MessageSquareText size={12} /> Descripción de la Conducta
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed italic">"{record.description}"</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                      <div className="flex items-center gap-2 mb-1 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                        <Tag size={12} /> Interpretación
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{record.interpretation}</p>
                    </div>
                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                      <div className="flex items-center gap-2 mb-1 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                        <Lightbulb size={12} /> Sugerencias / Recomendaciones
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-bold">{record.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
             <BookOpenText size={48} className="mx-auto text-slate-300 mb-4" />
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No hay registros anecdóticos registrados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Anecdotico;
