
import { Student } from "../types";

export async function fetchStudentsFromSheet(sheetId: string): Promise<Student[]> {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("No se pudo acceder al archivo.");
    
    const csvText = await response.text();
    const rows = csvText.split(/\r?\n/)
      .map(row => row.trim())
      .filter(row => row.length > 0)
      .map(row => 
        row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
          .map(cell => cell.replace(/^["\s]+|["\s]+$/g, '').trim())
      );

    if (rows.length < 2) throw new Error("Sin datos.");

    const headers = rows[0].map(h => h.toLowerCase());
    const findIdx = (terms: string[]) => headers.findIndex(h => terms.some(term => h.includes(term)));

    const firstNameIdx = findIdx(['nombre', 'nombres', 'first name']);
    const lastNameIdx = findIdx(['apellido', 'apellidos', 'last name']);
    const sexIdx = findIdx(['sexo', 'genero', 'género', 'sex']);
    const ageIdx = findIdx(['edad', 'age']);
    const photoIdx = findIdx(['foto', 'imagen', 'photo', 'url']); // Mapeo de foto
    const dayIdx = findIdx(['dia', 'día', 'day']);
    const monthIdx = findIdx(['mes', 'month']);
    const yearIdx = findIdx(['año', 'anio', 'year']);
    const dateIdx = findIdx(['fecha', 'nacimiento', 'birth']);
    const livesIdx = findIdx(['vive con', 'convivencia', 'con quien']);
    const guardianIdx = findIdx(['tutor', 'padre', 'madre', 'nombre del tutor']);
    const phoneIdx = findIdx(['telefono', 'teléfono', 'contacto', 'celular']);
    const gradeIdx = findIdx(['grado', 'curso', 'nivel']);
    const sectionIdx = findIdx(['seccion', 'sección', 'grupo']);
    const tandaIdx = findIdx(['tanda', 'jornada', 'horario']);
    const rneIdx = findIdx(['rne', 'id', 'codigo', 'código']);
    const conditionIdx = findIdx(['neae', 'condicion', 'vulnerabilidad']);

    return rows.slice(1).map((row, index) => {
      let fullName = (firstNameIdx !== -1 ? (row[firstNameIdx] + (lastNameIdx !== -1 ? ' ' + row[lastNameIdx] : '')) : row[0]).trim();
      
      let d = row[dayIdx] || '01';
      let m = row[monthIdx] || '01';
      let y = row[yearIdx] || '2010';
      if (dateIdx !== -1 && row[dateIdx]) {
        const parts = row[dateIdx].split(/[-/]/);
        if (parts.length === 3) {
          d = parts[0]; m = parts[1]; y = parts[2];
        }
      }

      return {
        id: `student-${index}-${Date.now()}`,
        name: fullName || `Estudiante ${index + 1}`,
        sex: sexIdx !== -1 ? row[sexIdx] : 'N/D',
        age: ageIdx !== -1 ? row[ageIdx] : 'N/D',
        photoUrl: photoIdx !== -1 ? row[photoIdx] : undefined,
        birthDate: { day: d, month: m, year: y },
        livesWith: livesIdx !== -1 ? row[livesIdx] : 'N/D',
        guardianName: guardianIdx !== -1 ? row[guardianIdx] : 'N/D',
        phone: phoneIdx !== -1 ? row[phoneIdx] : 'N/D',
        grade: (gradeIdx !== -1 ? row[gradeIdx] : 'N/A').replace(/["']/g, ''),
        section: (sectionIdx !== -1 ? row[sectionIdx] : '').replace(/["']/g, ''),
        tanda: tandaIdx !== -1 ? row[tandaIdx] : 'N/D',
        rne: rneIdx !== -1 ? row[rneIdx] : `RNE-${index + 100}`,
        condition: conditionIdx !== -1 && row[conditionIdx] 
          ? row[conditionIdx].split(/[,|;]/).map(c => c.trim()).filter(c => c && c !== '""') 
          : []
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
