import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'



type FormData = {
  name: string
  email: string
  phone: string
}

if (!supabase) throw new Error('supabaseUrl is required.')
  if (!supabase) throw new Error('supabaseKey is required.')

// GET-Methode: Alle Einträge aus der Tabelle abrufen
export async function GET() {
  try {
    const { data, error } = await supabase.from('contact-form').select('*')
    console.log(data, error)
    if (error) {
      console.error('Fehler beim Abrufen:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Serverfehler:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
    
  }
}

export async function POST(req: Request) {
  try {
    // 1️⃣ Hole die Daten aus der Anfrage (Request Body)
    const body: FormData = await req.json() as FormData

    // 2️⃣ Extrahiere die Felder aus dem Request Body
    const { name, email, phone } = body

    // 3️⃣ Validierung der Felder (sind alle Felder vorhanden?)
    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Bitte alle Felder ausfüllen' }, { status: 400 })
    }

    // 4️⃣ Speichere die Daten in der Tabelle `form_entries`
    const { data, error } = await supabase.from('contact-form').insert([
      { name, email, phone }
    ])

    if (error) {
      console.error('Fehler beim Einfügen:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // 5️⃣ Gib die Erfolgsmeldung zurück
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('Serverfehler:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}


// POST-Methode: Neue Daten in die Tabelle einfügen

