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

const newGifts = [
  { title: 'Mimo em PIX (qualquer valor)', category: 'Presente em PIX', total_quantity: 9999, available_quantity: 9999, sort_order: 1 },
  { title: 'Lenços Umedecidos (pacote) - Bepantol Baby ou Johnsons Baby RN', category: 'Higiene e Cuidados', total_quantity: 10, available_quantity: 10, sort_order: 10 },
  { title: 'Pomada para Assaduras (tubo) - Bepantol Baby ou Mustela', category: 'Higiene e Cuidados', total_quantity: 5, available_quantity: 5, sort_order: 20 },
  { title: 'Algodão Quadrado (pacote) - Johnsons Baby RN ou Cremer Baby', category: 'Higiene e Cuidados', total_quantity: 5, available_quantity: 5, sort_order: 30 },
  { title: 'Sabonete Líquido (frasco) - Verdi Natural, Mustela ou Johnsons Derma Protect', category: 'Higiene e Cuidados', total_quantity: 5, available_quantity: 5, sort_order: 40 },
  { title: 'Kit Shampoo e Condicionador - Verdi Natural, Mustela ou Johnsons Baby RN', category: 'Higiene e Cuidados', total_quantity: 3, available_quantity: 3, sort_order: 50 },
  { title: 'Lixeira Anti-odor (Branca)', category: 'Higiene e Cuidados', total_quantity: 1, available_quantity: 1, sort_order: 60 },
  { title: 'Mamadeira Philips Avent 125ml', category: 'Alimentação e Amamentação', total_quantity: 1, available_quantity: 1, sort_order: 10 },
  { title: 'Mamadeira Philips Avent 260ml', category: 'Alimentação e Amamentação', total_quantity: 1, available_quantity: 1, sort_order: 20 },
  { title: 'Esterilizador de Mamadeira Philips Avent (Micro-ondas)', category: 'Alimentação e Amamentação', total_quantity: 1, available_quantity: 1, sort_order: 30 },
  { title: 'Copo de Transição Philips Avent', category: 'Alimentação e Amamentação', total_quantity: 1, available_quantity: 1, sort_order: 40 },
  { title: 'Kit de Limpeza de Mamadeira - Buba', category: 'Alimentação e Amamentação', total_quantity: 1, available_quantity: 1, sort_order: 50 },
  { title: 'Babador de Silicone - Buba', category: 'Alimentação e Amamentação', total_quantity: 2, available_quantity: 2, sort_order: 60 },
  { title: 'Termômetro Digital para Bebê - Sugestão: Omron ou Fischer', category: 'Banho e Saúde', total_quantity: 1, available_quantity: 1, sort_order: 10 },
  { title: 'Kit Cuidados - Buba (Cortador, lixa, etc.)', category: 'Banho e Saúde', total_quantity: 1, available_quantity: 1, sort_order: 20 },
  { title: 'Kit Escova e Pente - Marca Buba ou similar', category: 'Banho e Saúde', total_quantity: 1, available_quantity: 1, sort_order: 30 },
  { title: 'Toalha com Capuz 100% algodão', category: 'Banho e Saúde', total_quantity: 3, available_quantity: 3, sort_order: 40 },
  { title: 'Kit Brinquedos de Banho - Buba', category: 'Banho e Saúde', total_quantity: 2, available_quantity: 2, sort_order: 50 },
  { title: 'Kit Bodies Manga Curta - RN', category: 'Roupas e Enxoval', total_quantity: 2, available_quantity: 2, sort_order: 10 },
  { title: 'Kit Bodies Manga Curta - P', category: 'Roupas e Enxoval', total_quantity: 3, available_quantity: 3, sort_order: 20 },
  { title: 'Kit Bodies Manga Curta - M', category: 'Roupas e Enxoval', total_quantity: 3, available_quantity: 3, sort_order: 30 },
  { title: 'Kit Bodies Manga Curta - G', category: 'Roupas e Enxoval', total_quantity: 2, available_quantity: 2, sort_order: 40 },
  { title: 'Kit Bodies Manga Longa - RN', category: 'Roupas e Enxoval', total_quantity: 2, available_quantity: 2, sort_order: 50 },
  { title: 'Kit Bodies Manga Longa - P', category: 'Roupas e Enxoval', total_quantity: 3, available_quantity: 3, sort_order: 60 },
  { title: 'Kit Bodies Manga Longa - M', category: 'Roupas e Enxoval', total_quantity: 3, available_quantity: 3, sort_order: 70 },
  { title: 'Kit Bodies Manga Longa - G', category: 'Roupas e Enxoval', total_quantity: 2, available_quantity: 2, sort_order: 80 },
  { title: 'Kit Macacões - P', category: 'Roupas e Enxoval', total_quantity: 1, available_quantity: 1, sort_order: 90 },
  { title: 'Kit Macacões - M', category: 'Roupas e Enxoval', total_quantity: 1, available_quantity: 1, sort_order: 100 },
  { title: 'Kit Macacões - G', category: 'Roupas e Enxoval', total_quantity: 1, available_quantity: 1, sort_order: 110 },
  { title: 'Kit Mijões (Culotes) - P', category: 'Roupas e Enxoval', total_quantity: 1, available_quantity: 1, sort_order: 120 },
  { title: 'Kit Mijões (Culotes) - M', category: 'Roupas e Enxoval', total_quantity: 1, available_quantity: 1, sort_order: 130 },
  { title: 'Kit Mijões (Culotes) - G', category: 'Roupas e Enxoval', total_quantity: 1, available_quantity: 1, sort_order: 140 },
  { title: 'Kit Fraldas de Boca', category: 'Roupas e Enxoval', total_quantity: 5, available_quantity: 5, sort_order: 150 },
  { title: 'Naninha', category: 'Roupas e Enxoval', total_quantity: 2, available_quantity: 2, sort_order: 160 },
  { title: 'Trocador Portátil - Marca Buba', category: 'Roupas e Enxoval', total_quantity: 1, available_quantity: 1, sort_order: 170 },
  { title: 'Mordedores - Buba', category: 'Estímulo e Diversão', total_quantity: 2, available_quantity: 2, sort_order: 10 },
  { title: 'Livros Sensoriais - Buba', category: 'Estímulo e Diversão', total_quantity: 2, available_quantity: 2, sort_order: 20 }
]

async function run() {
  console.log(`Conectando ao Supabase (${supabaseUrl})...`)
  const { data: existing, error } = await supabase.from('gifts').select('title')
  if (error) {
    console.log('Aviso ao consultar presentes:', error.message)
    console.log('Dica: Para atualizar diretamente pelo Supabase, copie o arquivo supabase/seed.sql no SQL Editor do painel do Supabase.')
    return
  }
  
  const existingTitles = new Set((existing || []).map(g => g.title))
  const toInsert = newGifts.filter(g => !existingTitles.has(g.title))
  
  if (toInsert.length === 0) {
    console.log('Todos os novos presentes já estão cadastrados!')
    return
  }

  console.log(`Inserindo ${toInsert.length} novos presentes...`)
  const { error: insertErr } = await supabase.from('gifts').insert(toInsert)
  if (insertErr) {
    console.error('Erro na inserção (RLS):', insertErr.message)
    console.log('\nComo o RLS exige permissão de escrita, execute o conteúdo de supabase/seed.sql no SQL Editor do Supabase.')
  } else {
    console.log('Presentes sincronizados com sucesso!')
  }
}

run()
