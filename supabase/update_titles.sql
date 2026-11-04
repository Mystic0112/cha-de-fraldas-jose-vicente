-- =====================================================================
-- Padronização de Títulos de Presentes (Separar Marca com Hífen)
-- Execute no SQL Editor do Supabase: https://supabase.com
-- =====================================================================

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
