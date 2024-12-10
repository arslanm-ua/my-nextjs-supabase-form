import { NextResponse } from 'next/server'
import { supabase } from '../../../../../utils/supabaseClient'



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