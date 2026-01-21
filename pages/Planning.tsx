
import React from 'react';
import { Calendar as CalendarIcon, List, Clock, Filter, MapPin } from 'lucide-react';

const Planning: React.FC = () => {
  const weeklyActivities = [
    { day: 'Lunes', date: '18 Mar', activity: 'Intervención Individual (NEAE)', moment: '8:00 AM - 10:00 AM', room: 'Salón 201' },
    { day: 'Martes', date: '19 Mar', activity: 'Escuela de Padres: Prevención de Sustancias', moment: '2:30 PM - 4:00 PM', room: 'Cancha Central' },
    { day: 'Miércoles', date: '20 Mar', activity: 'Reunión de Equipo de Gestión', moment: '9:00 AM - 11:00 AM', room: 'Dirección' },
    { day: 'Jueves', date: '21 Mar', activity: 'Taller de Convivencia Estudiantil', moment: '10:30 AM - 12:00 PM', room: 'Salón Multiusos' },
    { day: 'Viernes', date: '22 Mar', activity: 'Seguimiento SAS / Digitalización', moment: '1:00 PM - 3:00 PM', room: 'Cubículo UOP' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Planificación Operativa</h2>
          <p className="text-sm text-slate-500">Cronograma semanal y plan mensual MINERD</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white shadow-sm rounded-md text-sm font-bold text-slate-700">
            <CalendarIcon size={16} /> Calendario
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">
            <List size={16} /> Tabla
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {weeklyActivities.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 block">{item.day}</span>
                <span className="text-sm font-medium text-slate-400">{item.date}</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-4 min-h-[40px] leading-tight group-hover:text-blue-700 transition-colors">{item.activity}</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                <Clock size={12} className="text-slate-400" />
                {item.moment}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                <MapPin size={12} className="text-slate-400" />
                {item.room}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Operational Template Hint */}
      <div className="bg-blue-600 p-8 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl">
          <h3 className="text-2xl font-bold mb-2">Modelo de Plan Diario</h3>
          <p className="text-blue-100 opacity-90">Utilice nuestra plantilla estandarizada para registrar sus actividades diarias. Incluye secciones de Momento, Recursos y Evaluación.</p>
        </div>
        <button className="whitespace-nowrap bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
          Usar Plantilla de Plan
        </button>
      </div>
    </div>
  );
};

export default Planning;
