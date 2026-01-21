
import React, { useState } from 'react';
import { Student } from '../types';
import { ShieldAlert, ChevronRight, FileText, ChevronDown } from 'lucide-react';

interface ConvivenciaProps {
  students: Student[];
}

const Convivencia: React.FC<ConvivenciaProps> = ({ students }) => {
  const [openProtocol, setOpenProtocol] = useState<number | null>(0);

  const protocols = [
    {
      title: 'Protocolo ante Abuso Infantil',
      steps: [
        'Detección de indicadores físicos o emocionales.',
        'Entrevista inicial de contención (no interrogatorio).',
        'Notificación inmediata al Equipo de Gestión.',
        'Remisión a CONANI y/o Fiscalía de Menores.',
        'Acompañamiento psicológico continuo.'
      ]
    },
    {
      title: 'Protocolo por Consumo de Sustancias',
      steps: [
        'Identificación y resguardo de la integridad del estudiante.',
        'Notificación inmediata a la familia.',
        'Evaluación médica de emergencia si aplica.',
        'Referimiento a centros especializados de tratamiento.',
        'Plan de reintegración escolar.'
      ]
    },
    {
      title: 'Protocolo de Acoso Escolar (Bullying)',
      steps: [
        'Denuncia y registro en el Libro de Incidencias.',
        'Entrevistas por separado a las partes involucradas.',
        'Medidas disciplinarias reparadoras según reglamento.',
        'Talleres de sensibilización con el grupo curso.',
        'Seguimiento a los 15 y 30 días.'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Roadmap Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Mapa de Ruta y Protocolos</h2>
          <p className="text-sm text-slate-500">Pasos legales y administrativos ante crisis (CONANI/Fiscalía)</p>
        </div>

        <div className="space-y-3">
          {protocols.map((protocol, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button 
                onClick={() => setOpenProtocol(openProtocol === idx ? null : idx)}
                className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                    <ShieldAlert size={20} />
                  </div>
                  <span className="font-bold text-slate-800">{protocol.title}</span>
                </div>
                {openProtocol === idx ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
              
              {openProtocol === idx && (
                <div className="px-14 pb-4 animate-in slide-in-from-top-2 duration-300">
                  <ul className="space-y-3">
                    {protocol.steps.map((step, sIdx) => (
                      <li key={sIdx} className="text-sm text-slate-600 flex gap-3">
                        <span className="font-bold text-rose-300">0{sIdx + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                    <FileText size={14} /> Descargar Formato PDF Oficial
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Incident Mini-Log */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <FileText size={20} className="text-slate-400" />
          Libro de Incidencias Recientes
        </h3>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-rose-600">GRAVE</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">12 Mar, 2024</span>
            </div>
            <p className="text-sm font-bold text-slate-900 mb-1">Riña en el patio de recreo</p>
            <p className="text-xs text-slate-500 mb-4">Involucra a 3 estudiantes de 6to grado B. Se aplicaron medidas de convivencia según protocolo.</p>
            <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Ver Detalle Completo</button>
          </div>
          
          <div className="p-4 rounded-xl border border-slate-100">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-amber-600">MODERADA</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">10 Mar, 2024</span>
            </div>
            <p className="text-sm font-bold text-slate-900 mb-1">Inasistencia injustificada reiterada</p>
            <p className="text-xs text-slate-500 mb-4">Estudiante Carlos Ruíz. Se citó a los padres para entrevista de seguimiento.</p>
            <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Ver Detalle Completo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Convivencia;
