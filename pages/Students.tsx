
import React, { useState } from 'react';
import { Student } from '../types';
import { Search, Database, Settings2, ExternalLink, AlertCircle, User, Phone, Home, Calendar, Clock, Baby, Camera } from 'lucide-react';
import { fetchStudentsFromSheet } from '../services/googleSheets';

interface StudentsProps {
  students: Student[];
  onUpdateStudents: (students: Student[]) => void;
}

const Students: React.FC<StudentsProps> = ({ students, onUpdateStudents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [sheetUrl, setSheetUrl] = useState('https://docs.google.com/spreadsheets/d/1ZJQPgctYcLbD4ddb8zKMmLZBOvjWrPI8L7C_pG-PDXI');

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rne.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.guardianName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const extractId = (url: string) => {
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : url;
  };

  const handleSync = async () => {
    const id = extractId(sheetUrl);
    if (!id) {
      setSyncError("ID de hoja no válido.");
      return;
    }
    setIsSyncing(true);
    setSyncError(null);
    try {
      const newStudents = await fetchStudentsFromSheet(id);
      onUpdateStudents(newStudents);
      setShowConfig(false);
    } catch (err) {
      setSyncError("Error al sincronizar.");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controles Superiores */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Búsqueda de Estudiantes</h2>
            <p className="text-xs text-slate-500">Acceso inmediato a la ficha básica del alumno</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Nombre, RNE, Tutor o Grado..."
                className="pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={() => setShowConfig(!showConfig)} className="p-3 bg-slate-50 border rounded-xl hover:bg-slate-100 transition-colors">
              <Settings2 size={20} className="text-slate-600" />
            </button>
            <button onClick={handleSync} disabled={isSyncing} className="bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-md active:scale-95">
              <Database size={18} className={isSyncing ? 'animate-spin' : ''} />
              {isSyncing ? 'Sincronizando' : 'Sincronizar'}
            </button>
          </div>
        </div>

        {showConfig && (
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 animate-in fade-in zoom-in-95">
             <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Google Sheets URL</label>
             <div className="flex gap-2">
               <input type="text" value={sheetUrl} onChange={(e) => setSheetUrl(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg text-sm" />
               <button onClick={handleSync} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold">Actualizar</button>
             </div>
          </div>
        )}
      </div>

      {/* Grid de Resultados / Tabla Informativa */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Información Básica</th>
                <th className="px-6 py-4">Nacimiento / Edad</th>
                <th className="px-6 py-4">Contacto / Tutor</th>
                <th className="px-6 py-4">Curso / Tanda</th>
                <th className="px-6 py-4 text-right">Ficha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(student => (
                <tr key={student.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white overflow-hidden shadow-sm border border-slate-100 ${!student.photoUrl ? (student.sex === 'F' ? 'bg-rose-400' : 'bg-blue-500') : 'bg-slate-100'}`}>
                        {student.photoUrl ? (
                          <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" onError={(e) => { (e.target as any).src = ''; (e.target as any).parentElement.style.backgroundColor = student.sex === 'F' ? '#fb7185' : '#3b82f6'; }} />
                        ) : (
                          student.sex.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{student.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">RNE: {student.rne}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Calendar size={12} className="text-slate-400" />
                        {student.birthDate.day}/{student.birthDate.month}/{student.birthDate.year}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <Baby size={12} /> {student.age} años
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                        <User size={12} className="text-slate-400" /> {student.guardianName}
                      </div>
                      <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold">
                        <Phone size={12} /> {student.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-bold text-xs">
                        {student.grade} {student.section}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-black uppercase tracking-tighter">
                        <Clock size={10} /> {student.tanda}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedStudent(student)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <ExternalLink size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ficha Detallada (Overlay) */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className={`p-8 text-white flex justify-between items-start relative ${selectedStudent.sex === 'F' ? 'bg-rose-500' : 'bg-blue-600'}`}>
              <div className="flex gap-6 items-center z-10">
                <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center text-4xl font-black shadow-xl overflow-hidden border-4 border-white/20">
                  {selectedStudent.photoUrl ? (
                    <img src={selectedStudent.photoUrl} alt={selectedStudent.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className={selectedStudent.sex === 'F' ? 'text-rose-500' : 'text-blue-600'}>{selectedStudent.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h3 className="text-3xl font-black mb-1">{selectedStudent.name}</h3>
                  <p className="opacity-80 font-bold uppercase tracking-widest text-xs">Expediente de Orientación y Psicología</p>
                  <div className="mt-2 inline-flex items-center gap-2 bg-black/10 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                    <Camera size={12} /> Actualizar Foto
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="p-2 hover:bg-white/10 rounded-lg z-10">✕</button>
              
              {/* Decoración de fondo */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Columna 1: Datos Personales */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Identificación</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm text-slate-500">Sexo</span>
                      <span className="text-sm font-bold text-slate-900">{selectedStudent.sex === 'F' ? 'Femenino' : 'Masculino'}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm text-slate-500">Edad</span>
                      <span className="text-sm font-bold text-slate-900">{selectedStudent.age} años</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm text-slate-500">Nacimiento</span>
                      <span className="text-sm font-bold text-slate-900">{selectedStudent.birthDate.day} / {selectedStudent.birthDate.month} / {selectedStudent.birthDate.year}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm text-slate-500">RNE</span>
                      <span className="text-sm font-mono font-bold text-blue-600">{selectedStudent.rne}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Escolaridad</h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-around">
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Grado</p>
                      <p className="text-lg font-black text-slate-900">{selectedStudent.grade}</p>
                    </div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Sección</p>
                      <p className="text-lg font-black text-slate-900">{selectedStudent.section}</p>
                    </div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Tanda</p>
                      <p className="text-lg font-black text-slate-900">{selectedStudent.tanda}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna 2: Entorno Familiar */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Convivencia y Contacto</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <Home className="text-blue-600 mt-1" size={18} />
                      <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase">Vive con</p>
                        <p className="text-sm font-bold text-slate-900">{selectedStudent.livesWith}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <User className="text-emerald-600 mt-1" size={18} />
                      <div>
                        <p className="text-[10px] font-black text-emerald-400 uppercase">Nombre del Tutor</p>
                        <p className="text-sm font-bold text-slate-900">{selectedStudent.guardianName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                      <Phone className="text-amber-600 mt-1" size={18} />
                      <div>
                        <p className="text-[10px] font-black text-amber-400 uppercase">Teléfono de Contacto</p>
                        <p className="text-sm font-bold text-slate-900">{selectedStudent.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedStudent.condition.length > 0 && (
                   <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Condiciones Especiales</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.condition.map(c => (
                        <span key={c} className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-black uppercase">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 border-t bg-slate-50 flex gap-4">
               <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                 <ExternalLink size={18} /> Imprimir Ficha Completa
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
