
import React from 'react';
import { Image, FileText, Camera, FolderOpen, MoreHorizontal } from 'lucide-react';

const Portfolio: React.FC = () => {
  const files = [
    { title: 'Evidencia Taller Prevención', date: '15 Mar 2024', type: 'image', url: 'https://picsum.photos/seed/ev1/400/300' },
    { title: 'Actas de Reunión Marzo', date: '20 Mar 2024', type: 'pdf', url: 'https://picsum.photos/seed/ev2/400/300' },
    { title: 'Mural Convivencia Paz', date: '10 Mar 2024', type: 'image', url: 'https://picsum.photos/seed/ev3/400/300' },
    { title: 'Reporte Anual UOP 2023', date: '05 Ene 2024', type: 'pdf', url: 'https://picsum.photos/seed/ev4/400/300' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Portafolio de Evidencias</h2>
          <p className="text-slate-500">Archivo digital para supervisión técnica del Distrito Escolar</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200">
            <FolderOpen size={20} />
          </button>
          <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
            <Camera size={18} /> Subir Archivo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {files.map((file, idx) => (
          <div key={idx} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
            <div className="aspect-video w-full bg-slate-100 relative">
              <img src={file.url} alt={file.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal size={16} />
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-[10px] font-bold rounded uppercase tracking-widest">
                {file.type}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900 text-sm mb-1 truncate">{file.title}</h3>
              <p className="text-xs text-slate-400 font-medium">{file.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Directory Folders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Informes Técnicos', count: 12 },
          { name: 'Actas de Compromiso', count: 45 },
          { name: 'Registro de Talleres', count: 8 },
        ].map((folder, idx) => (
          <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{folder.name}</h4>
                <p className="text-xs text-slate-500 font-medium">{folder.count} archivos</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400">
              →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
