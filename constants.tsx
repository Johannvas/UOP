
import { Student, CaseStatus, CaseCategory, Case, DiagnosticBarrier } from './types';

export const INSTITUTION_NAME = "Unidad de Orientación y Psicología (UOP)";
export const SCHOOL_NAME = "Escuela Primaria Santa Martha";
export const SCHOOL_CODE = "00120";
export const DISTRICT_CODE = "15-04";
export const SCHOOL_ADDRESS = "Ramón Cáceres No. 159, Las Flores de Cristo Rey";
export const SCHOOL_PHONE = "809-732-4594";
export const STRATEGIC_GOAL = "Promover el desarrollo integral y el bienestar emocional de la comunidad educativa, garantizando la equidad y la inclusión.";

// Se deja vacío para que el usuario suba su propio archivo
export const SCHOOL_LOGO_URL = "";

export const MOCK_STUDENTS: Student[] = [
  { 
    id: '1', 
    name: 'Juan Pérez', 
    sex: 'M',
    age: '11',
    photoUrl: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?w=400&h=400&fit=crop',
    birthDate: { day: '15', month: '05', year: '2013' },
    livesWith: 'Madre',
    guardianName: 'Rosa Pérez',
    phone: '809-555-0101',
    grade: '5to', 
    section: 'A', 
    tanda: 'Matutina',
    rne: 'JP20130515', 
    condition: ['NEAE'] 
  },
  { 
    id: '2', 
    name: 'María García', 
    sex: 'F',
    age: '12',
    photoUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
    birthDate: { day: '20', month: '08', year: '2012' },
    livesWith: 'Ambos Padres',
    guardianName: 'Elena García',
    phone: '829-555-0202',
    grade: '6to', 
    section: 'B', 
    tanda: 'Vespertina',
    rne: 'MG20120820', 
    condition: ['Vulnerabilidad'] 
  }
];

export const MOCK_CASES: Case[] = [
  {
    id: 'c1',
    studentId: '1',
    studentName: 'Juan Pérez',
    date: '2024-03-15',
    status: CaseStatus.FOLLOW_UP,
    category: CaseCategory.LEARNING,
    description: 'Dificultades en lectoescritura detectadas en primer periodo.',
    actions: ['Entrevista con docente', 'Evaluación psicopedagógica inicial']
  }
];

export const DIAGNOSTIC_BARRIERS: DiagnosticBarrier[] = [
  { id: 'b1', type: 'Infraestructura', description: 'Falta de rampas de acceso al segundo nivel', level: 'Alto' },
  { id: 'b2', type: 'Actitudinales', description: 'Resistencia a ajustes curriculares por parte de 2 docentes', level: 'Medio' },
];
