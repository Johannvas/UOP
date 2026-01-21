
export enum CaseStatus {
  OPEN = 'Abierto',
  FOLLOW_UP = 'En Seguimiento',
  REFERRED = 'Remitido',
  CLOSED = 'Cerrado'
}

export enum CaseCategory {
  COEXISTENCE = 'Convivencia',
  LEARNING = 'Aprendizaje',
  PSYCHOEMOTIONAL = 'Psicoemocional',
  RISK = 'Riesgo'
}

export interface Student {
  id: string;
  name: string;
  sex: string;
  age: string;
  photoUrl?: string;
  birthDate: {
    day: string;
    month: string;
    year: string;
  };
  livesWith: string; 
  guardianName: string; 
  phone: string;
  grade: string;
  section: string;
  tanda: string;
  rne: string;
  condition: string[]; // ['NEAE', 'Vulnerabilidad']
  neaeType?: string; // Ej: 'Autismo', 'Discapacidad Intelectual'
  observations?: string; // Notas adicionales u observaciones
  aciProgress?: number; // 0-100% de ajustes aplicados
  cases?: string[];
}

export interface Case {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: CaseStatus;
  category: CaseCategory;
  description: string;
  actions: string[];
}

export interface AnecdotalRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  context: string; // Aula, Recreo, Comedor, etc.
  description: string;
  interpretation: string; // Interpretación de la conducta
  recommendation: string;
  type: 'Positivo' | 'Negativo' | 'Neutral';
}

export interface OperationalPlan {
  id: string;
  date: string;
  activity: string;
  moment: string;
  resources: string;
  evaluation: string;
}

export interface DiagnosticBarrier {
  id: string;
  type: 'Infraestructura' | 'Actitudinales' | 'Curriculares';
  description: string;
  level: 'Bajo' | 'Medio' | 'Alto';
}
