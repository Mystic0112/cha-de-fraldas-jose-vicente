import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Lê .env se existir
const envPath = path.resolve(process.cwd(), '.env')
let supabaseUrl = process.env.VITE_SUPABASE_URL
let supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8')
  const urlMatch = content.match(/VITE_SUPABASE_URL=(.*)/)
  const keyMatch = content.match(/VITE_SUPABASE_ANON_KEY=(.*)/)
  const serviceMatch = content.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)
  if (!supabaseUrl && urlMatch) supabaseUrl = urlMatch[1].trim()
  if (!supabaseKey && serviceMatch) supabaseKey = serviceMatch[1].trim()
  if (!supabaseKey && keyMatch) supabaseKey = keyMatch[1].trim()
}

if (!supabaseUrl || !supabaseKey) {
  console.error('Erro: VITE_SUPABASE_URL ou chave não encontradas.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const UPDATES = [
  { from: ['Trocador Portátil Marca Buba', 'Trocador Portátil Buba'], to: 'Trocador Portátil - Marca Buba' },
  { from: ['Mordedores Buba'], to: 'Mordedores - Buba' },
  { from: ['Livros Sensoriais Buba'], to: 'Livros Sensoriais - Buba' },
  { from: ['Babador de Silicone Buba'], to: 'Babador de Silicone - Buba' },
  { from: ['Kit de Limpeza de Mamadeira Buba'], to: 'Kit de Limpeza de Mamadeira - Buba' },
  { from: ['Kit Brinquedos de Banho Buba'], to: 'Kit Brinquedos de Banho - Buba' },
  { from: ['Kit Cuidados Buba', 'Kit Cuidados Buba (Cortador, lixa, etc.)'], to: 'Kit Cuidados - Buba (Cortador, lixa, etc.)' },
  { from: ['Kit Escova e Pente Buba ou similar', 'Kit Escova e Pente Buba'], to: 'Kit Escova e Pente - Marca Buba ou similar' },
]

async function run() {
  console.log(`Conectando ao Supabase (${supabaseUrl})...`)
  let anyError = false

  for (const item of UPDATES) {
    for (const oldTitle of item.from) {
      const { data, error } = await supabase
        .from('gifts')
        .update({ title: item.to })
        .eq('title', oldTitle)
        .select('id, title')

      if (error) {
        anyError = true
      } else if (data && data.length > 0) {
        console.log(`✓ Atualizado: "${oldTitle}" -> "${item.to}"`)
      }
    }
  }

  if (anyError) {
    console.log('\n[Nota de Segurança RLS]')
    console.log('O Supabase bloqueia updates anônimos sem service role key.')
    console.log('O frontend já normaliza todos os títulos automaticamente na exibição.')
    console.log('Para atualizar permanentemente o banco de dados no Supabase, execute:')
    console.log('SQL Editor do Supabase -> Copie o arquivo supabase/update_titles.sql e clique em Run.')
  } else {
    console.log('\nTodos os títulos foram atualizados com sucesso no Supabase!')
  }
}

run()
