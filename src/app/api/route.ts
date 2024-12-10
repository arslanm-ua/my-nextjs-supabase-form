import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'



type FormData = {
  name: string
  email: string
  phone: string
}





// POST-Methode: Neue Daten in die Tabelle einfügen

