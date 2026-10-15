// Texto do site atual (paradisevillas.pt), revisto: gralhas corrigidas, parágrafos
// duplicados removidos, SEF → SIBA na Gestão AL. Os textos marcados «NOVO» não existiam
// no site antigo (as páginas de detalhe tinham texto de demonstração) e aguardam validação.
// `**negrito**` é interpretado pelo componente <Rich>.

export const pt = {
  locale: 'pt-PT',
  meta: {
    siteName: 'Paradise Villas',
    home: {
      title: 'Paradise Villas — Alojamentos de férias e gestão de Alojamento Local no Algarve',
      description:
        'Na Paradise Villas, criamos experiências únicas para quem viaja — e soluções inteligentes para quem investe. Alojamentos de férias e gestão de Alojamento Local no Algarve.',
    },
    gestao: {
      title: 'Gestão de Alojamento Local no Algarve — Paradise Villas',
      description:
        'Gestão completa do seu Alojamento Local: limpezas, check-in, manutenção, preços dinâmicos e visibilidade nas principais plataformas.',
    },
    experiencias: {
      title: 'Experiências no Algarve — Paradise Villas',
      description:
        'Passeios de barco, grutas, golfinhos, provas de vinho, parques temáticos e muito mais. As experiências que recomendamos para viver o melhor do Algarve.',
    },
    sobre: {
      title: 'Sobre Nós — Paradise Villas',
      description:
        'Especialistas em gestão de alojamento local no Algarve, focados em criar estadias acolhedoras e inesquecíveis. Conheça a Paradise Villas e o fundador, Bruno Pereira.',
    },
    contactos: {
      title: 'Contactos — Paradise Villas',
      description: 'Fale connosco por telefone, email ou formulário. Paradise Villas, Albufeira — Algarve.',
    },
    privacidade: {
      title: 'Política de Privacidade — Paradise Villas',
      description: 'Como a Paradise Villas trata e protege os seus dados pessoais.',
    },
    termos: {
      title: 'Termos e Condições — Paradise Villas',
      description: 'Condições de reserva e de estadia nos alojamentos Paradise Villas.',
    },
    notFound: {
      title: 'Página não encontrada — Paradise Villas',
      description: 'A página que procura não existe.',
    },
  },

  nav: {
    home: 'Início',
    alojamentos: 'Alojamentos',
    gestao: 'Gestão AL',
    experiencias: 'Experiências',
    sobre: 'Sobre Nós',
    contactos: 'Contactos',
    ownerLogin: 'Login Proprietário',
    book: 'Reservar',
    menu: 'Menu',
    close: 'Fechar',
    skip: 'Saltar para o conteúdo',
    switchLang: 'English',
    switchLangShort: 'EN',
  },

  common: {
    verAlojamentos: 'Ver alojamentos',
    verTodos: 'Ver todos',
    saberMais: 'Saber mais',
    contacteNos: 'Contacte-nos',
    faleConnosco: 'Fale connosco',
    comeceHoje: 'Comece hoje',
    comprar: 'Comprar',
    verTodas: 'Ver todas',
    scroll: 'Deslize',
    home: 'Início',
    opensNewTab: '(abre num novo separador)',
  },

  marquee: {
    alojamentos: 'Alojamentos incríveis para as suas férias',
    gestao: 'Gestão de Alojamento Local',
    footer: 'Paradise Villas — Férias perfeitas',
  },

  home: {
    hero: {
      title: ['Explore', 'o', 'Algarve'],
      secondary: 'Gestão de Alojamento Local',
      // NOVO: capítulos da hero (scroll sobre o vídeo das falésias) — validar com o cliente.
      chapters: [
        { eyebrow: 'Lugares mágicos', title: 'Falésias douradas, esculpidas pelo mar.' },
        { eyebrow: 'Férias perfeitas', title: 'A casa perfeita à sua espera.' },
      ],
    },
    welcome: {
      eyebrow: 'Seja bem-vindo',
      title: 'Paradise Villas: o início das suas melhores férias!',
      body: 'Em Paradise Villas acreditamos que umas férias perfeitas começam num espaço onde o conforto, a privacidade e a confiança se encontram. Temos alojamentos incríveis para férias e serviços completos de gestão de alojamento local, com um compromisso firme com a qualidade, a transparência e a excelência no atendimento.',
      stats: [
        { value: 750, suffix: '+', label: 'Hóspedes' },
        { value: 100, suffix: '%', label: 'Satisfação' },
      ],
      imageAlt: ['Piscina de uma villa Paradise Villas', 'Sala de uma villa Paradise Villas com vista'],
    },
    featured: {
      eyebrow: 'Reserve as suas férias',
      title: 'Encontre aqui o alojamento perfeito para as suas férias',
      villas: [
        {
          name: 'Villa Goreti',
          place: 'Pêra',
          text: 'Moradia luxuosa, moderna e espaçosa, localizada em zona tranquila, a apenas 2,5 km da praia.',
          image: 'villa-goreti',
          href: 'https://alojamentos.paradisevillas.pt/aluguer/villa-pera-villa-goreti-688926.html',
        },
        {
          name: 'Apt. Palmeiras',
          place: 'Lagoa',
          text: 'Acolhedor apartamento em Alporchinhos — uma das zonas mais privilegiadas do Algarve.',
          image: 'apt-palmeiras',
          href: 'https://alojamentos.paradisevillas.pt/aluguer/apartamento-porches-apartamento-palmeiras-689717.html',
        },
        {
          name: 'Villa Marina',
          place: 'Albufeira',
          text: 'Moradia de luxo na Marina de Albufeira, com todo o conforto e uma localização privilegiada.',
          image: 'villa-marina',
          href: 'https://alojamentos.paradisevillas.pt/aluguer/villa-albufeira-villa-marina-689147.html',
        },
      ],
    },
    advantages: {
      eyebrow: 'Reserve connosco',
      title: 'Vantagens de reservar as suas férias connosco',
      body: 'Na Paradise Villas, garantimos muito mais do que uma estadia. Desde o momento da reserva até ao último dia de estadia, queremos que se sinta verdadeiramente em casa, sem preocupações.',
      items: [
        'Melhor preço',
        'Alojamentos verificados',
        'Limpeza profissional',
        'Amenities de boas-vindas',
        'Serviço de apoio',
        'Check-in personalizado',
      ],
    },
    testimonials: {
      eyebrow: 'O que dizem sobre nós',
      title: 'Opiniões de quem escolheu a Paradise Villas',
      items: [
        {
          quote:
            'Adorámos a nossa estadia! A casa era ainda melhor do que nas fotos, super limpa e bem equipada. O check-in foi simples e rápido, e o apoio da equipa foi impecável. Voltaremos com certeza!',
          name: 'Marta Amorim',
          role: 'Hóspede em Albufeira',
        },
        {
          quote:
            'Confiei a minha moradia à Paradise Villas e não podia estar mais satisfeito. A equipa trata de tudo com profissionalismo e transparência. Tenho ocupação regular e zero preocupações.',
          name: 'João Matias',
          role: 'Proprietário em Lagoa',
        },
        {
          quote:
            'Foram as férias perfeitas em família. A localização era excelente, muito perto da praia e com tudo por perto. Os miúdos adoraram a piscina! Sentimo-nos mesmo em casa.',
          name: 'Carla Tavares',
          role: 'Hóspede em Pêra',
        },
      ],
      prev: 'Opinião anterior',
      next: 'Opinião seguinte',
    },
    algarve: {
      eyebrow: 'Porquê passar férias no Algarve?',
      title: 'Seis razões para escolher o Algarve',
      // NOVO: frases curtas para os 6 temas (o site antigo só tinha títulos).
      items: [
        {
          title: 'Vários desportos',
          text: 'Golfe, surf, vela, paddle e caminhadas pela costa — há desporto para todas as estações.',
          image: 'algarve-desportos',
        },
        {
          title: 'Simpatia e hospitalidade',
          text: 'Gente que sabe receber, à mesa e na rua. No Algarve, sente-se em casa desde o primeiro dia.',
          image: 'algarve-hospitalidade',
        },
        {
          title: 'Tem lugares mágicos',
          text: 'Grutas marinhas, arcos de rocha dourada e falésias que parecem esculpidas à mão.',
          image: 'algarve-lugares',
        },
        {
          title: 'Para famílias ou amigos',
          text: 'Praias tranquilas, parques aquáticos e casas espaçosas para partilhar os melhores dias do ano.',
          image: 'algarve-familias',
        },
        {
          title: 'Tradição e modernidade',
          text: 'Vilas caiadas, mercados e cozinha tradicional, lado a lado com marinas e restaurantes de autor.',
          image: 'algarve-tradicao',
        },
        {
          title: 'Praias incríveis',
          text: 'Grandes areais e enseadas escondidas, de areia dourada e água cristalina.',
          image: 'algarve-praias',
        },
      ],
    },
    management: {
      eyebrow: 'Gestão Alojamento Local',
      title: 'Gestão completa do seu Alojamento Local',
      body: 'Na Paradise Villas, temos um serviço **completo** de gestão de alojamento local — pensado para proprietários que valorizam um acompanhamento profissional. Gerimos o seu imóvel como se fosse nosso — **com foco na rentabilidade e qualidade da experiência.**',
      items: [
        'Check-in personalizado',
        'Limpezas e manutenção',
        'Lavandaria',
        'Inspeção ao alojamento',
        'Promoção e visibilidade',
        'Fotografia e vídeo',
        'Amenities de boas-vindas',
        'Gestão de cauções',
      ],
    },
    cta: {
      eyebrow: 'Nós tratamos de tudo por si',
      title: 'Não sabe como começar a rentabilizar o seu imóvel?',
      lead: 'Na Paradise Villas, tornamos simples aquilo que parece complexo.',
      body: 'Seja para começar do zero ou para otimizar o que já tem, cuidamos de todo o processo: da legalização à gestão diária do seu Alojamento Local. Tratamos da burocracia, recebemos os hóspedes, garantimos limpeza, manutenção e apoio contabilístico.',
    },
  },

  gestao: {
    header: { eyebrow: 'Serviços Alojamento Local', title: 'Gestão AL' },
    intro: {
      title: 'Gestão completa do seu Alojamento Local, sem complicações',
      body: 'Tem uma casa de férias que gostaria de rentabilizar ao máximo e sem complicações? Garantimos um serviço de excelência, com **gestão completa do seu imóvel**, desde a legalização até ao check-out dos hóspedes. Cuidamos de tudo para que tenha tranquilidade e retorno.',
      lead: 'Veja todas as vantagens e o que inclui ao confiar a gestão do seu Alojamento Local à Paradise Villas:',
    },
    services: [
      {
        title: 'Limpezas entre reservas',
        text: 'Fazemos limpezas sempre após cada check-out, realizadas por equipas externas qualificadas, garantindo o conforto e higiene do espaço para o próximo hóspede.',
      },
      {
        title: 'Manutenção e inspeções',
        text: 'Contamos com equipa técnica para pequenas reparações, substituições ou assistência pontual, garantindo o bom funcionamento do imóvel em todas as reservas.',
      },
      {
        title: 'Sessão de fotografia e/ou vídeo',
        text: 'Realizamos uma sessão de fotografia e/ou vídeo profissional para valorizar a apresentação do imóvel nas plataformas de reservas e atrair mais hóspedes com qualidade.',
      },
      {
        title: 'Amenities de boas-vindas',
        text: 'Fornecemos shampoo, gel de banho, papel higiénico e um kit de boas-vindas para que os hóspedes se sintam confortáveis logo à chegada ao alojamento.',
      },
      {
        title: 'Check-in personalizado',
        text: 'Acompanhamos cada hóspede desde a reserva até ao check-out, garantindo uma receção personalizada e total apoio durante toda a estadia no seu alojamento.',
      },
      {
        title: 'Lavandaria e roupa de cama e WC',
        text: 'Trabalhamos com equipas externas e lavandaria que asseguram a limpeza profunda e higienização dos alojamentos entre cada reserva, com atenção ao detalhe.',
      },
      {
        title: 'Gestão segura de cauções',
        text: 'Fazemos a gestão segura das cauções entregues pelos hóspedes, com controlo rigoroso de entradas e devoluções, assegurando proteção ao imóvel e ao proprietário.',
      },
      {
        title: 'Visibilidade e ocupação',
        text: 'Promovemos o seu alojamento nos principais canais de reservas — como Airbnb, Booking, Vrbo, Expedia — e no nosso site, para garantir máxima visibilidade e ocupação.',
      },
      {
        title: 'Preços dinâmicos e ajustados',
        text: 'Ajustamos os preços com base na procura, época do ano e ocupação, maximizando o rendimento do proprietário sem comprometer a atratividade do imóvel.',
      },
    ],
    stats: [
      { value: 500, suffix: '+', label: 'Proprietários' },
      { value: 200, suffix: '+', label: 'Imóveis' },
      { value: 750, suffix: '+', label: 'Hóspedes' },
    ],
    legal: {
      eyebrow: 'Tratamos de tudo por si',
      title: 'Quer legalizar o seu Alojamento Local?',
      body: 'Fazemos isso por si. Trabalhamos com profissionais qualificados como solicitadores, contabilistas e técnicos, para garantir que tudo é feito com rigor. **Cuidamos dos 5 passos essenciais:**',
      steps: [
        {
          title: 'Seguro de Alojamento Local',
          text: 'Tratamos do seguro de responsabilidade civil obrigatório para imóveis de Alojamento Local.',
        },
        {
          title: 'Registo no SIBA',
          text: 'Tratamos do registo para a comunicação obrigatória do alojamento de hóspedes estrangeiros (SIBA), como exigido por lei.',
        },
        {
          title: 'Licença de Alojamento Local',
          text: 'Tratamos do pedido oficial da Licença de Alojamento Local junto da Câmara Municipal.',
        },
        {
          title: 'Declaração de Início de Atividade',
          text: 'Abrimos ou atualizamos a sua atividade nas Finanças para que tudo esteja legal.',
        },
        {
          title: 'Instalação do Kit AL',
          text: 'Providenciamos todos os elementos obrigatórios: extintor, manta de fogo, sinalética, livro de reclamações, entre outros.',
        },
      ],
    },
    includes: {
      eyebrow: 'Atraímos mais reservas',
      title: 'Garantimos que o seu alojamento se destaca!',
      label: 'O que inclui?',
      cards: [
        {
          title: 'Roupas e atoalhados',
          image: 'gestao-roupas',
          items: [
            '**Fornecimento completo:** lençóis e toalhas limpos e passados a ferro.',
            '**Lavagem profissional:** higiene assegurada com produtos certificados.',
            '**Trocas eficientes:** reposição entre estadias para manter o espaço pronto.',
          ],
        },
        {
          title: 'Manutenção e reparos',
          image: 'gestao-manutencao',
          items: [
            '**Visitas regulares:** inspecionamos o imóvel para prevenir problemas.',
            '**Reparações rápidas:** corrigimos falhas como torneiras, fechaduras ou luzes.',
            '**Imóvel funcional:** garantimos que tudo funciona corretamente do check-in ao check-out.',
          ],
        },
        {
          title: 'Marketing e anúncios',
          image: 'gestao-marketing',
          items: [
            '**Marketing:** anúncios e campanhas para captar mais reservas.',
            '**Criação e otimização de anúncios:** publicamos o seu alojamento nas principais plataformas.',
            '**Ajustes de performance contínuos:** analisamos os dados e otimizamos preços, textos e promoções.',
          ],
        },
      ],
    },
    faq: {
      eyebrow: 'Nós respondemos',
      title: 'Perguntas frequentes',
      body: 'Respondemos às perguntas mais frequentes. Sinta-se à vontade para entrar em contacto connosco, caso continue com dúvidas.',
      items: [
        {
          q: 'Como são definidos os preços das reservas?',
          a: 'Trabalhamos com **preços dinâmicos**, ajustados automaticamente com base na **época do ano**, **procura**, **concorrência** e **ocupação**. Desta forma, garantimos o melhor equilíbrio entre competitividade e rentabilidade para o seu imóvel.',
        },
        {
          q: 'Como posso acompanhar o desempenho do meu alojamento?',
          a: 'Disponibilizamos um **painel de controlo online**, onde pode acompanhar em tempo real as **reservas**, **taxa de ocupação**, **preços aplicados** e **avaliações dos hóspedes** — com total transparência.',
        },
        {
          q: 'Como posso aderir ao serviço?',
          a: 'É simples! Basta **entrar em contacto connosco** e enviamos todos os detalhes. O processo de adesão é **rápido, sem complicações** e o seu alojamento pode começar a gerar rendimento em pouco tempo.',
        },
      ],
    },
    cta: {
      eyebrow: 'Não perca mais tempo',
      title: 'Aproveite o potencial do seu imóvel ainda hoje!',
      body: 'Se tem uma casa parada ou pouco explorada, esta é a oportunidade de a transformar num verdadeiro ativo. Na Paradise Villas, tratamos de tudo por si — para que rentabilize sem esforço, com total apoio e zero burocracia. Comece agora e deixe o seu imóvel trabalhar por si.',
    },
  },

  experiencias: {
    header: { eyebrow: 'Viva o melhor do Algarve', title: 'Experiências' },
    intro: {
      title: 'Porquê escolher o Algarve para as suas férias?',
      body: [
        'Sol o ano inteiro, praias deslumbrantes, natureza preservada e uma energia acolhedora fazem do Algarve o destino ideal para férias em qualquer altura do ano. Combinando a beleza da costa com cultura, gastronomia e aventura, é o local perfeito tanto para relaxar como para explorar.',
        'Na **Paradise Villas**, acreditamos que cada viagem merece ser única — por isso reunimos as melhores experiências para que aproveite tudo o que esta região incrível tem para oferecer.',
      ],
      stripAlt: ['Costa do Algarve vista do mar', 'Marina no Algarve', 'Arco de rocha sobre o mar', 'Praia e falésias ao pôr do sol'],
    },
    complete: {
      eyebrow: 'Experiência completa',
      title: 'Mais do que férias, uma experiência completa!',
      body: [
        'Na **Paradise Villas**, não nos limitamos a ter alojamentos — criamos estadias completas, confortáveis e sem preocupações. Quer esteja à procura de relaxar, aventurar-se ou explorar o melhor do Algarve, temos tudo pensado para si.',
        'Selecionámos experiências únicas em parceria com os melhores operadores locais, para garantir que cada momento da sua estadia seja memorável.',
      ],
      checks: [
        '**Reserve experiências** connosco de forma simples e segura',
        '**Receba apoio personalizado** antes, durante e após a estadia',
        '**Desfrute de recomendações locais**',
      ],
    },
    solutions: {
      eyebrow: 'Soluções para tudo',
      items: [
        {
          title: 'Precisa de guardar as suas malas?',
          text: 'Temos a solução perfeita para voos tardios: deixe as malas connosco e continue a explorar o Algarve com toda a liberdade.',
        },
        {
          title: 'Transfers diretos e privados',
          text: 'Desloque-se sem stress! Temos transporte privado para todos os hóspedes, a qualquer hora. Também disponibilizamos **serviço de táxi personalizado** para que possa chegar onde quiser, quando quiser.',
        },
      ],
    },
    list: {
      eyebrow: 'Para todos os gostos',
      title: 'As experiências que recomendamos',
      placeLabel: 'Local',
      durationLabel: 'Duração',
      items: [
        { title: 'Golfinhos e grutas', area: 'Marina de Albufeira', text: 'Observação de golfinhos e visita às grutas marinhas', place: 'Albufeira', duration: '2h30', image: 'exp-golfinhos-grutas', href: 'https://huglocals.com/Pereira/a/dolphins-and-caves/15' },
        { title: 'Caiaque e linha costeira', area: 'Marina de Albufeira', text: 'Desfrute da beleza do mar de forma ecológica', place: 'Albufeira', duration: '2h30', image: 'exp-caiaque', href: 'https://huglocals.com/Pereira/a/kayak-and-coast-line/533' },
        { title: 'Dois mergulhos', area: 'Albufeira', text: '2 mergulhos apenas para mergulhadores certificados', place: 'Albufeira', duration: '4h00', image: 'exp-mergulho', href: 'https://huglocals.com/Pereira/a/2-dives-trip/53' },
        { title: 'Prova de vinhos', area: 'Silves', text: 'Prova de vinhos locais e visita à cidade histórica de Silves', place: 'Silves', duration: '4h00', image: 'exp-vinhos-silves', href: 'https://huglocals.com/Pereira/a/half-day-wine-tasting-tour/511' },
        { title: '1 dia Zoomarine', area: 'Guia', text: 'O melhor parque temático da região do Algarve', place: 'Guia', duration: '1 dia', image: 'exp-zoomarine', href: 'https://huglocals.com/Pereira/a/entry-1-day/11015' },
        { title: '1 dia Aquashow', area: 'Albufeira', text: 'O melhor parque aquático da região do Algarve', place: 'Albufeira', duration: '1 dia', image: 'exp-aquashow', href: 'https://huglocals.com/Pereira/a/outside-water-park/10483' },
        { title: '1 dia Krazy World', area: 'Algoz', text: 'Animais exóticos, piscinas, escorregas, golfe e mais', place: 'Algoz', duration: '1 dia', image: 'exp-krazy-world', href: 'https://huglocals.com/Pereira/a/zoo-and-activity-ticket/59' },
        { title: 'Paraquedismo tandem', area: 'Aeródromo de Portimão', text: 'Queda livre num emocionante salto duplo', place: 'Aeródromo de Portimão', duration: '2h00', image: 'exp-paraquedismo', href: 'https://huglocals.com/Pereira/a/tandem-skydiving-10-000-ft/81' },
        { title: 'Passeio safari em jipe', area: 'Albufeira', text: 'Embarque numa aventura de safari pela serra algarvia', place: 'Albufeira', duration: '4h00', image: 'exp-safari', href: 'https://huglocals.com/Pereira/a/safari-half-day/110' },
        { title: 'Churrasco na praia', area: 'Vilamoura', text: 'Combina cruzeiro pela costa do Algarve e churrasco na praia', place: 'Vilamoura', duration: '7h30', image: 'exp-churrasco', href: 'https://huglocals.com/Pereira/a/beach-bbq-vilamoura/10159' },
        { title: 'Festa de barco no Algarve', area: 'Marina de Albufeira', text: 'Música, mar e boa energia num passeio ao pôr do sol', place: 'Albufeira', duration: '3h00', image: 'exp-festa-barco', href: 'https://huglocals.com/Pereira/a/boat-party/12' },
        { title: 'Parasailing: voe pelo mar', area: 'Albufeira', text: 'Voe sobre o mar e descubra o Algarve de outra perspetiva', place: 'Albufeira', duration: '10 min', image: 'exp-parasailing', href: 'https://huglocals.com/Pereira/a/parasailling/17' },
      ],
    },
  },

  sobre: {
    header: { eyebrow: 'Sobre nós', title: 'Sobre Nós' },
    intro: {
      title: 'Conheça a Paradise Villas',
      body: [
        'Em **Paradise Villas** somos especialistas em gestão de alojamento local no Algarve, focados em criar estadias acolhedoras e inesquecíveis. Mais do que gerir imóveis, **proporcionamos experiências únicas que fazem os hóspedes sentirem-se em casa.**',
        'Trabalhamos com proximidade, dedicação e atenção ao detalhe — para garantir conforto, segurança e bem-estar em cada estadia.',
      ],
      rings: [
        { value: 100, label: 'Transparência' },
        { value: 100, label: 'Hospitalidade' },
      ],
    },
    pillars: [
      {
        title: 'Missão',
        text: 'Proporcionar estadias memoráveis e confortáveis a quem visita o Algarve, através de uma gestão de alojamento local eficiente, tanto para hóspedes como para proprietários.',
        image: 'sobre-missao',
      },
      {
        title: 'Visão',
        text: 'Ser uma referência na gestão de alojamento local no Algarve, reconhecida pela excelência no atendimento, atenção aos detalhes e criação de experiências autênticas e acolhedoras.',
        image: 'sobre-visao',
      },
      {
        title: 'Valores',
        text: 'Confiança, hospitalidade, dedicação e profissionalismo — com proprietários, hóspedes e parceiros. São estes os pilares que guiam todas as nossas ações e relações, dia após dia.',
        image: 'sobre-valores',
      },
      {
        title: 'Diferenciação',
        text: 'O que nos diferencia? Atendimento próximo e um serviço pensado ao detalhe. Gerimos cada imóvel como se fosse nosso e recebemos cada hóspede como gostaríamos de ser recebidos.',
        image: 'sobre-diferenciacao',
      },
    ],
    founder: {
      eyebrow: 'Conheça o fundador',
      name: 'Bruno Pereira',
      title: 'Paixão pelo Algarve. Dedicação a cada detalhe.',
      imageAlt: 'Bruno Pereira, fundador da Paradise Villas',
      body: [
        'Bruno Pereira é o fundador da Paradise Villas e o rosto por trás de cada estadia bem-sucedida. Natural do Algarve e com mais de 7 anos de experiência em alojamento local, criou a marca com o objetivo de proporcionar muito mais do que casas para férias: queria criar experiências acolhedoras, tranquilas e autênticas, tanto para os hóspedes como para os proprietários.',
        'Com um espírito empreendedor e uma atenção constante aos detalhes, o Bruno acompanha pessoalmente cada processo — da receção de hóspedes à gestão diária dos imóveis. A sua missão é garantir que tudo corre bem, todos os dias, com profissionalismo, proximidade e um sorriso genuíno.',
        '**Apaixonado pela região e pelo contacto com pessoas, acredita que o sucesso de um alojamento começa pela forma como se cuida de quem o escolhe — seja para férias ou para investimento.**',
      ],
      closing:
        'Confie em quem vive o Algarve, entende de hospitalidade e trata o seu imóvel e as suas férias com atenção única. Confie na Paradise Villas.',
    },
    ctas: [
      {
        title: 'Gestão Alojamento Local',
        text: 'Rentabilize o seu imóvel com confiança, transparência e apoio total — nós tratamos de tudo por si.',
        image: 'sobre-cta-gestao',
      },
      {
        title: 'Alojamentos para Férias',
        text: 'Férias no Algarve com conforto, privacidade e tudo preparado ao detalhe — só precisa de relaxar.',
        image: 'sobre-cta-alojamentos',
      },
    ],
  },

  contactos: {
    header: { eyebrow: 'Fale connosco', title: 'Contactos' },
    info: { location: 'Localização', locationValue: 'Albufeira, Algarve', phone: 'Telefone', email: 'Email' },
    form: {
      title: 'Tem alguma dúvida? Fale connosco',
      body: 'Entre em contacto por email, telefone ou preencha o formulário e entraremos em contacto o mais rápido possível.',
      name: 'Nome',
      email: 'Email',
      phone: 'Telemóvel',
      service: 'Serviço',
      servicePlaceholder: 'Selecione o serviço',
      services: ['Reservas para férias', 'Gestão de Alojamento Local'],
      message: 'Mensagem',
      consent: 'Li e aceito a',
      consentLink: 'Política de Privacidade',
      submit: 'Enviar',
      sending: 'A enviar…',
      success: 'Obrigado! Recebemos a sua mensagem e entraremos em contacto o mais rápido possível.',
      error: 'Não foi possível enviar a mensagem. Tente novamente ou escreva-nos para',
      required: 'Campo obrigatório',
    },
    map: {
      title: 'Onde estamos',
      notice: 'O mapa é carregado a partir do Google Maps, que pode definir cookies.',
      load: 'Mostrar mapa',
      open: 'Abrir no Google Maps',
    },
  },

  legal: {
    privacidade: { title: 'Política de Privacidade' },
    termos: { title: 'Termos e Condições' },
  },

  notFound: {
    eyebrow: 'Erro 404',
    title: 'Esta página foi de férias.',
    body: 'A página que procura não existe ou mudou de endereço.',
    back: 'Voltar ao início',
  },

  footer: {
    tagline: 'Férias perfeitas!',
    contacts: 'Contactos',
    services: 'Serviços',
    alojamentos: 'Alojamentos de férias',
    follow: 'Siga-nos',
    company: 'Paradise Villas é uma marca da Powerfuleader, Lda.',
    rights: 'Todos os direitos reservados.',
    complaints: 'Livro de Reclamações',
  },
}

export type Content = typeof pt
