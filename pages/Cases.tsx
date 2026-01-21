
import React, { useState, useMemo } from 'react';
import { Case, Student, CaseStatus, CaseCategory } from '../types';
import { ClipboardList, ExternalLink, Plus, Search, Filter, Calendar, X, FileText } from 'lucide-react';

interface CasesProps {
  cases: Case[];
  students: Student[];
}

const Cases: React.FC<CasesProps> = ({ cases, students }) => {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Lógica de filtrado avanzado
  const filteredCases = useMemo(() => {
    return cases.filter(item => {
      const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      
      const itemDate = new Date(item.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      
      const matchesStartDate = !start || itemDate >= start;
      const matchesEndDate = !end || itemDate <= end;

      return matchesSearch && matchesCategory && matchesStartDate && matchesEndDate;
    });
  }, [cases, searchTerm, filterCategory, startDate, endDate]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCategory('all');
    setStartDate('');
    setEndDate('');
  };

  const statusColors = {
    [CaseStatus.OPEN]: 'bg-rose-100 text-rose-700 border-rose-200',
    [CaseStatus.FOLLOW_UP]: 'bg-blue-100 text-blue-700 border-blue-200',
    [CaseStatus.REFERRED]: 'bg-amber-100 text-amber-700 border-amber-200',
    [CaseStatus.CLOSED]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  return (
    <div className="space-y-6">
      {/* Header and New Case Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl border border-slate-100 gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Seguimiento SAS</h2>
          <p className="text-sm text-slate-500">Gestión de casos y expedientes de orientación</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95">
          <Plus size={18} /> Nuevo Referimiento
        </button>
      </div>

      {/* Advanced Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Buscar estudiante..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select 
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Todas las categorías</option>
            {Object.values(CaseCategory).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input 
            type="date" 
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <div className="flex gap-2">
            <input 
              type="date" 
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button 
              onClick={clearFilters}
              className="p-2 text-slate-400 hover:text-rose-500 bg-slate-50 border border-slate-200 rounded-lg transition-all"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Results List - Full Width */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCases.map(item => (
          <div key={item.id} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                  {item.studentName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-slate-900">{item.studentName}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    <span>{item.date}</span>
                    <span className="text-slate-200">•</span>
                    <span className="text-blue-600">{item.category}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${statusColors[item.status]}`}>
                {item.status}
              </span>
            </div>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100 italic">
              "{item.description}"
            </p>
            
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
              <button 
                onClick={() => setSelectedCase(item)}
                className="bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2 transition-all shadow-sm"
              >
                <FileText size={14} /> Ver Expediente
              </button>
              <button 
                className="bg-slate-100 text-slate-700 text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-slate-200 flex items-center gap-2 transition-all"
              >
                <ExternalLink size={14} /> Registrar Acción
              </button>
            </div>
          </div>
        ))}
        {filteredCases.length === 0 && (
          <div className="col-span-full py-20 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
            <ClipboardList className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No se encontraron casos con los filtros aplicados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cases;
