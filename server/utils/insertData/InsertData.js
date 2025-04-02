import conn from "../../services/connection.js";
import fs from 'fs';
import csv from 'csv-parser';

async function importData() {
  try {
    console.log('Utilizzo della connessione MongoDB esistente');
    
    // Importazione studenti
    await importCollection(conn, 'Students', 'Studenti.csv', (row) => ({
        serialNumber: parseInt(row.serialNumber),
        name: row.name,
        surname: row.surname,
        address: row.address,
        town: row.town,
        province: row.province,
        cap: row.cap,
        email: row.email
    }));
    
    // Importazione corsi
    await importCollection(conn, 'Courses', 'Materie.csv', (row) => ({
        courseId: parseInt(row.courseId),
        name: row.name,
        plannedHours: parseInt(row.plannedHours),
        abstract: row.abstract,
        teacher: row.teacher
    }));
    
    console.log('Importazione completata con successo');
  } catch (error) {
    console.error('Errore durante l\'importazione:', error);
  }
}

async function importCollection(db, collectionName, csvFile, transformFn) {
  const collection = db.collection(collectionName);
  
  // Svuota la collezione se esiste già
  await collection.deleteMany({});
  
  // Leggi e importa i dati CSV
  const rows = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFile)
      .pipe(csv())
      .on('data', (row) => rows.push(transformFn(row)))
      .on('end', resolve)
      .on('error', reject);
  });
  
  if (rows.length > 0) {
    await collection.insertMany(rows);
    console.log(`Importati ${rows.length} record nella collezione ${collectionName}`);
  }
}

importData().catch(console.error);