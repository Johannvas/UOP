
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import NEAE from './pages/NEAE';
import Anecdotico from './pages/Anecdotico';
import Planning from './pages/Planning';
import Cases from './pages/Cases';
import Convivencia from './pages/Convivencia';
import Family from './pages/Family';
import Portfolio from './pages/Portfolio';
import { MOCK_STUDENTS, MOCK_CASES, DIAGNOSTIC_BARRIERS } from './constants';
import { Student, Case, AnecdotalRecord } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Estado para el logo con persistencia en localStorage
  const [schoolLogo, setSchoolLogo] = useState<string>(() => {
    return localStorage.getItem('uop_school_logo') || '';
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('uop_students');
    return saved ? JSON.parse(saved) : MOCK_STUDENTS;
  });
  
  const [cases, setCases] = useState<Case[]>(MOCK_CASES);
  
  const [anecdotalRecords, setAnecdotalRecords] = useState<AnecdotalRecord[]>(() => {
    const saved = localStorage.getItem('uop_anecdotal');
    return saved ? JSON.parse(saved) : [];
  });

  const [showModal, setShowModal] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('uop_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('uop_anecdotal', JSON.stringify(anecdotalRecords));
  }, [anecdotalRecords]);

  // Guardar logo cuando cambie
  useEffect(() => {
    if (schoolLogo) {
      localStorage.setItem('uop_school_logo', schoolLogo);
    }
  }, [schoolLogo]);

  const handleLogoChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSchoolLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleQuickAction = (action: string) => {
    setShowModal(action);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard students={students} cases={cases} barriers={DIAGNOSTIC_BARRIERS} logo={schoolLogo} onLogoUpload={handleLogoChange} />;
      case 'students': return <Students students={students} onUpdateStudents={setStudents} />;
      case 'neae': return <NEAE students={students} />;
      case 'anecdotico': return <Anecdotico students={students} records={anecdotalRecords} onAddRecord={() => {}} onDeleteRecord={() => {}} />;
      case 'planning': return <Planning />;
      case 'cases': return <Cases cases={cases} students={students} />;
      case 'convivencia': return <Convivencia students={students} />;
      case 'family': return <Family />;
      case 'portfolio': return <Portfolio />;
      default: return <Dashboard students={students} cases={cases} barriers={DIAGNOSTIC_BARRIERS} logo={schoolLogo} onLogoUpload={handleLogoChange} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} onQuickAction={handleQuickAction} customLogo={schoolLogo}>
      {renderContent()}
    </Layout>
  );
};

export default App;
