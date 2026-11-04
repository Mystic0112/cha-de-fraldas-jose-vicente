-- =====================================================================
-- Atualização para o Chá de Fraldas do José Vicente (Pequeno Marinheiro)
-- Execute este script no SQL Editor do Supabase (https://supabase.com)
-- Ele atualiza os títulos existentes e insere itens faltantes.
-- =====================================================================

-- 1. Atualizar títulos existentes para padronizar marcas com hífen
update public.gifts
   set title = 'Trocador Portátil - Marca Buba'
 where title in ('Trocador Portátil Marca Buba', 'Trocador Portátil Buba');

update public.gifts
   set title = 'Mordedores - Buba'
 where title = 'Mordedores Buba';

update public.gifts
   set title = 'Livros Sensoriais - Buba'
 where title = 'Livros Sensoriais Buba';

update public.gifts
   set title = 'Babador de Silicone - Buba'
 where title = 'Babador de Silicone Buba';

update public.gifts
   set title = 'Kit de Limpeza de Mamadeira - Buba'
 where title = 'Kit de Limpeza de Mamadeira Buba';

update public.gifts
   set title = 'Kit Brinquedos de Banho - Buba'
 where title = 'Kit Brinquedos de Banho Buba';

update public.gifts
   set title = 'Kit Cuidados - Buba (Cortador, lixa, etc.)'
 where title in ('Kit Cuidados Buba (Cortador, lixa, etc.)', 'Kit Cuidados Buba');

update public.gifts
   set title = 'Kit Escova e Pente - Marca Buba ou similar'
 where title in ('Kit Escova e Pente - Marca Buba ou similar', 'Kit Escova e Pente Buba ou similar', 'Kit Escova e Pente Buba');

-- 2. Inserir itens faltantes caso ainda não existam
insert into public.gifts (title, category, total_quantity, available_quantity, sort_order)
select v.title, v.category, v.qty, v.qty, v.sort_order
from (values
  ('Mimo em PIX (qualquer valor)',                                                               'Presente em PIX',             9999, 1),

  -- Higiene e Cuidados
  ('Lenços Umedecidos (pacote) - Bepantol Baby ou Johnsons Baby RN',                            'Higiene e Cuidados',            10, 10),
  ('Pomada para Assaduras (tubo) - Bepantol Baby ou Mustela',                                   'Higiene e Cuidados',             5, 20),
  ('Algodão Quadrado (pacote) - Johnsons Baby RN ou Cremer Baby',                               'Higiene e Cuidados',             5, 30),
  ('Sabonete Líquido (frasco) - Verdi Natural, Mustela ou Johnsons Derma Protect',              'Higiene e Cuidados',             5, 40),
  ('Kit Shampoo e Condicionador - Verdi Natural, Mustela ou Johnsons Baby RN',                  'Higiene e Cuidados',             3, 50),
  ('Lixeira Anti-odor (Branca)',                                                                 'Higiene e Cuidados',             1, 60),

  -- Alimentação e Amamentação
  ('Mamadeira Philips Avent 125ml',                                                             'Alimentação e Amamentação',      1, 10),
  ('Mamadeira Philips Avent 260ml',                                                             'Alimentação e Amamentação',      1, 20),
  ('Esterilizador de Mamadeira Philips Avent (Micro-ondas)',                                    'Alimentação e Amamentação',      1, 30),
  ('Copo de Transição Philips Avent',                                                           'Alimentação e Amamentação',      1, 40),
  ('Kit de Limpeza de Mamadeira - Buba',                                                        'Alimentação e Amamentação',      1, 50),
  ('Babador de Silicone - Buba',                                                                'Alimentação e Amamentação',      2, 60),

  -- Banho e Saúde
  ('Termômetro Digital para Bebê - Sugestão: Omron ou Fischer',                                 'Banho e Saúde',                  1, 10),
  ('Kit Cuidados - Buba (Cortador, lixa, etc.)',                                                'Banho e Saúde',                  1, 20),
  ('Kit Escova e Pente - Marca Buba ou similar',                                                'Banho e Saúde',                  1, 30),
  ('Toalha com Capuz 100% algodão',                                                             'Banho e Saúde',                  3, 40),
  ('Kit Brinquedos de Banho - Buba',                                                            'Banho e Saúde',                  2, 50),

  -- Roupas e Enxoval
  ('Kit Bodies Manga Curta - RN',                                                               'Roupas e Enxoval',               2, 10),
  ('Kit Bodies Manga Curta - P',                                                                'Roupas e Enxoval',               3, 20),
  ('Kit Bodies Manga Curta - M',                                                                'Roupas e Enxoval',               3, 30),
  ('Kit Bodies Manga Curta - G',                                                                'Roupas e Enxoval',               2, 40),
  ('Kit Bodies Manga Longa - RN',                                                               'Roupas e Enxoval',               2, 50),
  ('Kit Bodies Manga Longa - P',                                                                'Roupas e Enxoval',               3, 60),
  ('Kit Bodies Manga Longa - M',                                                                'Roupas e Enxoval',               3, 70),
  ('Kit Bodies Manga Longa - G',                                                                'Roupas e Enxoval',               2, 80),
  ('Kit Macacões - P',                                                                          'Roupas e Enxoval',               1, 90),
  ('Kit Macacões - M',                                                                          'Roupas e Enxoval',               1, 100),
  ('Kit Macacões - G',                                                                          'Roupas e Enxoval',               1, 110),
  ('Kit Mijões (Culotes) - P',                                                                  'Roupas e Enxoval',               1, 120),
  ('Kit Mijões (Culotes) - M',                                                                  'Roupas e Enxoval',               1, 130),
  ('Kit Mijões (Culotes) - G',                                                                  'Roupas e Enxoval',               1, 140),
  ('Kit Fraldas de Boca',                                                                       'Roupas e Enxoval',               5, 150),
  ('Naninha',                                                                                   'Roupas e Enxoval',               2, 160),
  ('Trocador Portátil - Marca Buba',                                                            'Roupas e Enxoval',               1, 170),

  -- Estímulo e Diversão
  ('Mordedores - Buba',                                                                         'Estímulo e Diversão',            2, 10),
  ('Livros Sensoriais - Buba',                                                                  'Estímulo e Diversão',            2, 20)
) as v(title, category, qty, sort_order)
where not exists (select 1 from public.gifts g where g.title = v.title);
