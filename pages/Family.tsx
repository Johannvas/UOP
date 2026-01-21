
import React from 'react';
import { QrCode, Mail, Users, ArrowRight } from 'lucide-react';

const Family: React.FC = () => {
  const familyActivities = [
    { title: 'Taller: Límites y Afectos', date: '05 Mar 2024', attendants: 45, type: 'Escuela de Padres' },
    { title: 'Entrega de Informes Trimestrales', date: '10 Mar 2024', attendants: 120, type: 'Reunión General' },
    { title: 'Charla: Crianza Positiva', date: '15 Mar 2024', attendants: 38, type: 'Webinar' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Familia y Comunidad</h2>
          <p className="text-slate-500">Gestión de la Escuela de Padres y Cuadernos de Familia</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
          <QrCode size={18} /> Generar QR de Asistencia
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {familyActivities.map((activity, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">{activity.type}</span>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{activity.title}</h3>
            <p className="text-sm text-slate-400 mb-6">{activity.date}</p>
            
            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    P
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold text-slate-600">+{activity.attendants} asistentes</span>
            </div>
          </div>
        ))}
      </div>

      {/* Control de Cuadernos */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Control de Cuadernos de Familia</h3>
          <span className="text-xs font-bold text-slate-400">Marzo 2024</span>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
            <tr>
              <th className="px-6 py-4">Grado/Sección</th>
              <th className="px-6 py-4">Entregados</th>
              <th className="px-6 py-4">Pendientes</th>
              <th className="px-6 py-4">Porcentaje</th>
              <th className="px-6 py-4">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { grade: '1ero A', delivered: 28, total: 30, color: 'emerald' },
              { grade: '1ero B', delivered: 25, total: 32, color: 'amber' },
              { grade: '2do A', delivered: 30, total: 30, color: 'emerald' },
            ].map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800">{row.grade}</td>
                <td className="px-6 py-4">{row.delivered}</td>
                <td className="px-6 py-4">{row.total - row.delivered}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden min-w-[100px]">
                      <div className={`h-full bg-${row.color}-500`} style={{ width: `${(row.delivered/row.total)*100}%` }}></div>
                    </div>
                    <span className="font-bold">{Math.round((row.delivered/row.total)*100)}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 font-bold flex items-center gap-1 hover:underline">
                    Notificar <Mail size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Family;
