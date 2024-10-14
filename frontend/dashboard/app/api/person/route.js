import { openDB } from "@/app/lib/db";

export async function GET(request) {
    try {
      const db = await openDB();
      const persons = await db.all('SELECT * FROM person');
      
      return new Response(JSON.stringify(persons), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }