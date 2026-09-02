/* =========================================================
   DADOS DO SITE — edite este arquivo para trocar o conteúdo
   =========================================================

   PRODUTOS
   --------
   Cada objeto vira um card no catálogo. Campos:
     id          número único (não repita)
     nome        nome do modelo exibido no card
     categoria   "solar" | "grau" | "infantil" | "esportivo"
     material    ex.: "Acetato", "Metal", "TR-90"
     cor         cor da armação
     formato     ex.: "Quadrado", "Redondo", "Aviador"
     preco       número (use ponto decimal). Ex.: 349.9
     precoAntigo (opcional) mostra preço riscado ao lado
     badge       (opcional) "Novo" ou "Promo"
     imagem      (opcional) caminho da foto, ex.: "assets/img/aviador.jpg"
                 deixe null para usar a ilustração placeholder
     descricao   texto curto exibido no modal
   ========================================================= */

const PRODUTOS = [
  {
    id: 1,
    nome: 'Aviador Clássico',
    categoria: 'solar',
    material: 'Metal',
    cor: 'Dourado',
    formato: 'Aviador',
    preco: 349.90,
    precoAntigo: 499.90,
    badge: 'Promo',
    imagem: null,
    descricao: 'O modelo atemporal que combina com qualquer rosto. Lentes polarizadas com proteção UV400 e hastes flexíveis para uso o dia inteiro.'
  },
  {
    id: 2,
    nome: 'Quadrado Urbano',
    categoria: 'grau',
    material: 'Acetato',
    cor: 'Preto fosco',
    formato: 'Quadrado',
    preco: 279.90,
    imagem: null,
    descricao: 'Armação leve e discreta, ideal para quem passa horas em frente à tela. Aceita lentes com filtro de luz azul.'
  },
  {
    id: 3,
    nome: 'Redondo Retrô',
    categoria: 'grau',
    material: 'Metal',
    cor: 'Bronze',
    formato: 'Redondo',
    preco: 319.90,
    badge: 'Novo',
    imagem: null,
    descricao: 'Inspirado nos anos 70, com aro fino e ponte ajustável. Valoriza rostos quadrados e angulosos.'
  },
  {
    id: 4,
    nome: 'Gatinho Charme',
    categoria: 'solar',
    material: 'Acetato',
    cor: 'Tartaruga',
    formato: 'Gatinho',
    preco: 389.90,
    imagem: null,
    descricao: 'Formato cat-eye que alonga o olhar. Lentes degradê com proteção total contra raios UVA e UVB.'
  },
  {
    id: 5,
    nome: 'Wayfarer Noturno',
    categoria: 'solar',
    material: 'Acetato',
    cor: 'Preto brilhante',
    formato: 'Quadrado',
    preco: 299.90,
    precoAntigo: 399.90,
    badge: 'Promo',
    imagem: null,
    descricao: 'Um ícone que nunca sai de moda. Estrutura reforçada e lentes antirreflexo para dirigir com conforto.'
  },
  {
    id: 6,
    nome: 'Titânio Ultraleve',
    categoria: 'grau',
    material: 'Titânio',
    cor: 'Grafite',
    formato: 'Retangular',
    preco: 599.90,
    badge: 'Novo',
    imagem: null,
    descricao: 'Pesa menos de 12 gramas. Hipoalergênico, resistente à corrosão e praticamente indestrutível no dia a dia.'
  },
  {
    id: 7,
    nome: 'Mini Color Kids',
    categoria: 'infantil',
    material: 'TR-90 flexível',
    cor: 'Azul e amarelo',
    formato: 'Redondo',
    preco: 189.90,
    imagem: null,
    descricao: 'Feito para aguentar o ritmo das crianças: dobra sem quebrar, tem haste emborrachada e vem com cordão de segurança.'
  },
  {
    id: 8,
    nome: 'Pequeno Explorador',
    categoria: 'infantil',
    material: 'Silicone',
    cor: 'Verde',
    formato: 'Oval',
    preco: 209.90,
    badge: 'Novo',
    imagem: null,
    descricao: 'Armação de silicone macio, sem parafusos e à prova de alergias. Indicada para crianças de 2 a 6 anos.'
  },
  {
    id: 9,
    nome: 'Sport Runner',
    categoria: 'esportivo',
    material: 'Policarbonato',
    cor: 'Preto e amarelo',
    formato: 'Máscara',
    preco: 429.90,
    imagem: null,
    descricao: 'Lente única envolvente, antiembaçante e com apoio nasal emborrachado. Não escapa nem na corrida mais intensa.'
  },
  {
    id: 10,
    nome: 'Ciclista Pro',
    categoria: 'esportivo',
    material: 'TR-90',
    cor: 'Branco',
    formato: 'Máscara',
    preco: 479.90,
    precoAntigo: 559.90,
    badge: 'Promo',
    imagem: null,
    descricao: 'Lentes intercambiáveis (clara, espelhada e âmbar) para qualquer condição de luz. Compatível com clip de grau interno.'
  },
  {
    id: 11,
    nome: 'Executivo Meio-Aro',
    categoria: 'grau',
    material: 'Metal + nylon',
    cor: 'Prata',
    formato: 'Retangular',
    preco: 359.90,
    imagem: null,
    descricao: 'Visual sóbrio e profissional, com aro inferior em fio de nylon que deixa a lente praticamente invisível.'
  },
  {
    id: 12,
    nome: 'Oversized Sol',
    categoria: 'solar',
    material: 'Acetato',
    cor: 'Nude',
    formato: 'Oversized',
    preco: 409.90,
    imagem: null,
    descricao: 'Cobertura ampla que protege até a região das pálpebras. Lentes marrom degradê com acabamento espelhado sutil.'
  }
];

/* =========================================================
   DEPOIMENTOS
   ---------------------------------------------------------
     nome     quem escreveu
     papel    descrição curta (bairro, profissão, tempo de cliente)
     nota     de 1 a 5 (vira estrelas)
     texto    o depoimento em si
   ========================================================= */

const DEPOIMENTOS = [
  {
    nome: 'Marina Alves',
    papel: 'Cliente há 6 anos',
    nota: 5,
    texto: 'Fui em três óticas antes e só aqui alguém explicou direito a diferença entre as lentes. Saí com um multifocal que me adaptei em dois dias.'
  },
  {
    nome: 'Carlos Eduardo',
    papel: 'Professor',
    nota: 5,
    texto: 'Meu óculos ficou pronto em um dia e meio. O ajuste ficou perfeito e, quando entortei a haste, refizeram na hora sem cobrar nada.'
  },
  {
    nome: 'Juliana Ramos',
    papel: 'Mãe do Théo, 4 anos',
    nota: 5,
    texto: 'A paciência com meu filho foi impressionante. Escolheram uma armação que ele não consegue quebrar e ele adora usar.'
  },
  {
    nome: 'Roberto Nunes',
    papel: 'Ciclista amador',
    nota: 5,
    texto: 'Precisava de grau em óculos esportivo e ninguém resolvia. Aqui fizeram sob medida e ficou melhor do que eu esperava.'
  },
  {
    nome: 'Ana Paula Souza',
    papel: 'Cliente há 2 anos',
    nota: 5,
    texto: 'Preço honesto e sem empurrar o modelo mais caro. Voltei três vezes só para limpar e ajustar, e sempre fui tratada muito bem.'
  }
];
