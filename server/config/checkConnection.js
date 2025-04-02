import { MongoClient } from 'mongodb';
import { URI, DB } from './db-config.js';

// Crea un MongoClient con le opzioni appropriate
const client = new MongoClient(URI);

async function run() {
  try {
    // Connetti il client al server
    await client.connect();
    
    // Invia un ping per confermare la connessione
    await client.db("admin").command({ ping: 1 });
    console.log("Ping riuscito. Ti sei connesso con successo a MongoDB!");
    
    // Prova ad accedere al database specificato
    const db = client.db(DB);
    console.log(`Connesso al database: ${DB}`);
    
    // Elenca le collezioni nel database
    const collections = await db.listCollections().toArray();
    console.log("Collezioni disponibili:");
    collections.forEach(collection => console.log(` - ${collection.name}`));
    
  } catch (error) {
    console.error("Errore durante la connessione:", error);
  } finally {
    // Assicurati che il client venga chiuso quando hai finito
    await client.close();
  }
}

run().catch(console.dir);