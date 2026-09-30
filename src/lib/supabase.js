import { createClient } from '@supabase/supabase-js'

// Variables de entorno de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://tu-proyecto.supabase.co' &&
  !supabaseUrl.includes('your-project')
)

// Cliente real si existen credenciales válidas, de lo contrario cliente nulo controlado
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null

export const getSupabaseStatus = () => {
  return {
    configured: isSupabaseConfigured,
    url: supabaseUrl ? supabaseUrl.replace(/https:\/\/(.*)\.supabase\.co.*/, 'https://$1.supabase.co') : 'No configurado',
    mode: isSupabaseConfigured ? 'Producción (Supabase Cloud)' : 'Modo Demostración Local (Mock Data)'
  }
}
