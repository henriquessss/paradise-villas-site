// Textos do site. Estrutura e tom inspirados em homeholidays.pt; o conteúdo factual vem do
// site atual (paradisevillas.pt). Os blocos marcados «NOVO» não existiam e aguardam validação.
// `**negrito**` é interpretado por <Rich>; `*itálico*` nos títulos vira destaque em terracota.

export const pt = {
  locale: 'pt-PT',
  meta: {
    siteName: 'Paradise Villas',
    home: {
      title: 'Paradise Villas — Alojamentos de férias e gestão de Alojamento Local no Algarve',
      description:
        'Alojamentos de férias selecionados no Algarve, experiências e gestão completa de Alojamento Local. Reserve diretamente com a Paradise Villas, em Albufeira.',
    },
    experiencias: {
      title: 'Experiências no Algarve — Paradise Villas',
      description:
        'Passeios de barco às grutas de Benagil, golfinhos, caiaque, jipe, provas de vinho e muito mais. Reserve online as melhores experiências no Algarve.',
    },
    gestao: {
      title: 'Gestão de Alojamento Local no Algarve — Paradise Villas',
      description:
        'Gestão completa do seu Alojamento Local: limpezas, check-in, manutenção, preços dinâmicos e visibilidade nas principais plataformas. Simule o rendimento do seu imóvel.',
    },
    parceiros: {
      title: 'Programa de Parceiros — Paradise Villas',
      description:
        'Indique proprietários à Paradise Villas e receba uma comissão de parceria por cada imóvel que entre em gestão. Para imobiliárias, condomínios, contabilistas e particulares.',
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
    experiencias: 'Experiências',
    gestao: 'Gestão AL',
    parceiros: 'Parceiros',
    sobre: 'Sobre Nós',
    contactos: 'Contactos',
    owner: 'Proprietário',
    ownerLogin: 'Área do proprietário',
    book: 'Reservar',
    menu: 'Menu',
    close: 'Fechar',
    skip: 'Saltar para o conteúdo',
    switchLang: 'English',
    switchLangShort: 'EN',
    langLabel: 'Idioma',
  },

  common: {
    verAlojamentos: 'Ver alojamentos',
    saberMais: 'Saber mais',
    reservarAgora: 'Reservar agora',
    home: 'Início',
    opensNewTab: '(abre num novo separador)',
    scroll: 'Deslize',
  },

  // Campos partilhados pelos formulários (contacto, proposta, simulador, parceiros).
  form: {
    name: 'Nome',
    namePlaceholder: 'O seu nome',
    email: 'Email',
    emailPlaceholder: 'email@exemplo.com',
    phone: 'Telemóvel',
    phonePlaceholder: '+351 …',
    select: 'Selecione…',
    consent: 'Li e aceito a',
    consentLink: 'Política de Privacidade',
    sending: 'A enviar…',
    required: 'Campo obrigatório',
    error: 'Não foi possível enviar. Tente novamente ou escreva-nos para',
  },

  home: {
    hero: {
      title: 'O início das suas *melhores férias*',
      lead: 'Alojamentos selecionados no Algarve, com check-in personalizado e apoio durante toda a estadia.',
      search: {
        label: 'Pesquisar alojamentos',
        checkin: 'Check-in',
        checkout: 'Check-out',
        guests: 'Hóspedes',
        guest: 'hóspede',
        guestsUnit: 'hóspedes',
        submit: 'Pesquisar',
        invalid: 'A data de saída tem de ser depois da data de entrada.',
      },
      // Números do site atual — confirmar com o cliente.
      stats: [
        { value: 7, suffix: '+', label: 'Anos de experiência' },
        { value: 750, suffix: '+', label: 'Hóspedes' },
        { value: 100, suffix: '%', label: 'Satisfação' },
      ],
    },
    services: {
      eyebrow: 'Serviços',
      title: 'Para uma estadia *incrível*',
      body: 'Muito mais do que alojamento: tratamos dos detalhes para que as suas férias no Algarve comecem antes de chegar.',
      items: [
        {
          icon: 'home',
          title: 'Alojamentos selecionados',
          text: 'Moradias e apartamentos verificados, com limpeza profissional e amenities de boas-vindas.',
          cta: 'Ver alojamentos',
        },
        {
          icon: 'compass',
          title: 'Experiências no Algarve',
          text: 'Grutas, golfinhos, caiaque e aventura — escolha a sua e reserve online em poucos minutos.',
          cta: 'Ver experiências',
        },
        {
          icon: 'car',
          title: 'Transfers privados',
          text: 'Do aeroporto de Faro à porta do seu alojamento, com conforto e à hora de que precisar.',
          cta: 'Reservar transfer',
        },
      ],
    },
    featured: {
      eyebrow: 'Alojamentos',
      title: 'Escolha a sua *casa de férias*',
      body: 'Moradias com piscina, apartamentos perto da praia e casas para toda a família, nas melhores zonas do Algarve.',
      cta: 'Ver todos os alojamentos',
      villas: [
        {
          name: 'Villa Goreti',
          place: 'Pêra',
          text: 'Moradia luxuosa, moderna e espaçosa, em zona tranquila, a apenas 2,5 km da praia.',
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
    management: {
      eyebrow: 'Gestão completa',
      title: 'Gestão de *Alojamento Local*',
      body: 'Deixe-nos cuidar de todo o processo de gestão do seu imóvel: maximizamos a rentabilidade e garantimos uma experiência de excelência a cada hóspede.',
      items: [
        'Limpezas entre reservas',
        'Manutenção',
        'Sessão fotográfica',
        'Amenities',
        'Check-in personalizado',
        'Roupa de cama e banho',
        'Gestão de cauções',
        'Preços dinâmicos',
      ],
      badge: { value: '7+', label: 'anos de experiência em Alojamento Local' },
      imageAlt: 'Sala de uma moradia gerida pela Paradise Villas',
      cta: 'Saber mais',
      simulate: 'Simular rendimento',
    },
    algarve: {
      eyebrow: 'Algarve',
      title: 'Muito mais do que um *destino*',
      body: 'Praias que parecem postais, falésias douradas, vilas caiadas e mais de 300 dias de sol por ano. O Algarve tem tudo para umas férias perfeitas — e nós conhecemo-lo como ninguém.',
      features: [
        { icon: 'sun', title: '300+ dias de sol', text: 'Uma das regiões mais soalheiras da Europa, para férias em qualquer altura do ano.' },
        { icon: 'waves', title: 'Praias deslumbrantes', text: 'Da Falésia à Marinha: grandes areais e enseadas escondidas.' },
        { icon: 'utensils', title: 'Gastronomia única', text: 'Peixe fresco, marisco e os sabores autênticos da serra algarvia.' },
      ],
      imageAlt: ['Praia do Algarve com falésias', 'Arco de rocha sobre o mar', 'Vila algarvia', 'Praia ao pôr do sol'],
    },
    experiences: {
      eyebrow: 'Experiências',
      title: 'Viva o melhor do *Algarve*',
      body: 'Selecionámos as experiências que mais recomendamos aos nossos hóspedes. Reserve online, com confirmação imediata.',
      cta: 'Ver todas as experiências',
    },
    direct: {
      badge: 'Reserva direta',
      title: 'Reserve diretamente e *poupe*',
      body: 'Ao reservar no nosso site evita as taxas de serviço das plataformas e fala diretamente com quem cuida do seu alojamento.',
      items: ['Sem taxas de serviço das plataformas', 'Contacto direto com a equipa', 'Check-in personalizado', 'Apoio durante toda a estadia'],
      cta: 'Ver alojamentos',
    },
    testimonials: {
      eyebrow: 'Opiniões',
      title: 'O que dizem *sobre nós*',
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
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Fale *connosco*',
      body: 'Tem um imóvel ou está a planear as suas férias? Estamos à distância de uma chamada ou mensagem.',
    },
  },

  // Cartões de contacto (Início, Contactos).
  channels: {
    phone: { title: 'Telefone', note: '(chamada para rede móvel nacional)' },
    email: { title: 'Email' },
  },

  experiencias: {
    header: {
      eyebrow: 'Algarve',
      title: 'Aventura, diversão e *descoberta*',
      body: 'Passeios de barco, grutas, golfinhos e muito mais. Selecionámos as melhores experiências para viver o Algarve durante a sua estadia.',
    },
    filtersLabel: 'Filtrar experiências',
    filters: { all: 'Todas', barco: 'Barco', aventura: 'Aventura', natureza: 'Natureza', cultura: 'Cultura' },
    // NOVO: atividades da Civitatis (Albufeira) com fotografias do site atual.
    items: [
      {
        title: 'Grutas de Benagil, Algar Seco e Praia da Marinha',
        text: 'Passeio de barco pelas grutas e falésias mais famosas do Algarve.',
        place: 'Albufeira',
        category: 'barco',
        image: 'experiencias-arco',
        slug: { pt: 'sete-vales-suspensos-algarve-passeio-barco', en: 'seven-hanging-valleys-benagil-boat-tour' },
      },
      {
        title: 'Avistamento de golfinhos',
        text: 'Observe golfinhos no seu habitat natural, ao largo da costa de Albufeira.',
        place: 'Albufeira',
        category: 'barco',
        image: 'exp-golfinhos-grutas',
        slug: { pt: 'avistamento-golfinhos-albufeira', en: 'dolphin-watching-albufeira' },
      },
      {
        title: 'Tour de caiaque',
        text: 'Explore grutas e enseadas escondidas a remar, perto da água e da rocha.',
        place: 'Albufeira',
        category: 'natureza',
        image: 'exp-caiaque',
        slug: { pt: 'tour-caiaque-albufeira', en: 'kayak-tour-albufeira' },
      },
      {
        title: 'Jeep safari ao entardecer',
        text: 'Uma aventura por caminhos de terra, aldeias e miradouros da serra algarvia.',
        place: 'Albufeira',
        category: 'aventura',
        image: 'exp-safari',
        slug: { pt: 'jeep-safari-albufeira-entardecer', en: 'jeep-safari-tour' },
      },
      {
        title: 'Carvoeiro, Benagil e Ferragudo + prova de vinhos',
        text: 'As aldeias mais bonitas da costa, com prova de vinhos do Algarve.',
        place: 'Lagoa',
        category: 'cultura',
        image: 'exp-vinhos-silves',
        slug: { pt: 'carvoeiro-benagil-ferragudo-degustacao-vinhos', en: 'algarve-villages-wine-tasting' },
      },
      {
        title: 'Parasailing',
        text: 'Voe sobre o mar e veja Albufeira de uma perspetiva única.',
        place: 'Albufeira',
        category: 'aventura',
        image: 'exp-parasailing',
        slug: { pt: 'parasailing-albufeira', en: 'parasailing' },
      },
      {
        title: 'Batismo de mergulho',
        text: 'Primeira experiência de mergulho, acompanhada por instrutores certificados.',
        place: 'Albufeira',
        category: 'natureza',
        image: 'exp-mergulho',
        slug: { pt: 'batismo-mergulho-albufeira', en: 'scuba-diving-introduction' },
      },
      {
        title: 'Sagres, Cabo de São Vicente e Silves',
        text: 'Excursão de um dia ao extremo sudoeste da Europa e à cidade histórica de Silves.',
        place: 'Sagres',
        category: 'cultura',
        image: 'experiencias-capela',
        slug: { pt: 'excursao-sagres-lagos', en: 'sagres-lagos-st-vincent-tour' },
      },
    ],
    more: {
      eyebrow: 'Mais experiências',
      title: 'Explore todas as atividades *disponíveis*',
      body: 'Descubra centenas de atividades e experiências no Algarve, com reserva online segura.',
      cta: 'Ver todas na Civitatis',
    },
    extras: {
      eyebrow: 'Serviços adicionais',
      title: 'Tornamos a sua estadia *ainda mais fácil*',
      body: 'Além das experiências, temos serviços práticos para que não se preocupe com nada durante as férias.',
      items: [
        {
          icon: 'car',
          title: 'Transfer do aeroporto',
          text: 'Chegue ao seu alojamento sem preocupações: transfers privados diretos do aeroporto de Faro, com conforto e pontualidade.',
          cta: 'Reservar transfer',
        },
        {
          icon: 'map',
          title: 'Experiências com locais',
          text: 'Passeios, parques temáticos e atividades recomendados por quem vive no Algarve, na nossa página HugLocals.',
          cta: 'Ver na HugLocals',
        },
      ],
    },
  },

  gestao: {
    hero: {
      eyebrow: 'Gestão de Alojamento Local',
      title: 'Pronto para *começar*?',
      body: 'Deixe-nos os seus contactos e os dados do imóvel. Preparamos uma proposta personalizada, sem compromisso.',
      // NOVO — validar com o cliente.
      points: [
        'Avaliação gratuita do potencial do imóvel',
        'Proposta personalizada, sem compromisso',
        'Tratamos da legalização, se for preciso',
        'Acompanhamento do início ao fim',
      ],
      highlight: { value: '7+', label: 'anos de experiência', text: 'a gerir Alojamento Local no Algarve.' },
    },
    proposal: {
      title: 'Peça a sua proposta',
      details: 'Dados do imóvel (opcional)',
      type: 'Tipo',
      types: ['Apartamento', 'Moradia', 'Outro'],
      bedrooms: 'Quartos',
      location: 'Localização',
      locationPlaceholder: 'Ex.: Albufeira',
      pool: 'Tem piscina',
      submit: 'Pedir proposta',
      success: 'Obrigado! Recebemos o seu pedido e entraremos em contacto muito em breve.',
    },
    services: {
      eyebrow: 'O que incluímos',
      title: 'Serviços *incluídos*',
      body: 'Tudo o que precisa para rentabilizar o seu imóvel sem preocupações.',
      items: [
        {
          icon: 'sparkles',
          title: 'Limpezas entre reservas',
          text: 'Limpeza após cada check-out, feita por equipas qualificadas, para garantir o conforto e a higiene do espaço.',
        },
        {
          icon: 'wrench',
          title: 'Manutenção e inspeções',
          text: 'Equipa técnica para pequenas reparações, substituições ou assistência pontual, com o imóvel sempre a funcionar.',
        },
        {
          icon: 'camera',
          title: 'Sessão de fotografia e vídeo',
          text: 'Fotografia e vídeo profissionais para valorizar o imóvel nas plataformas e atrair mais reservas.',
        },
        {
          icon: 'gift',
          title: 'Amenities de boas-vindas',
          text: 'Shampoo, gel de banho, papel higiénico e um kit de boas-vindas para os hóspedes se sentirem em casa.',
        },
        {
          icon: 'key',
          title: 'Check-in personalizado',
          text: 'Acompanhamos cada hóspede da reserva ao check-out, com receção personalizada e apoio durante a estadia.',
        },
        {
          icon: 'shirt',
          title: 'Roupa de cama e banho',
          text: 'Lençóis e toalhas limpos e passados a ferro, com lavagem profissional e trocas entre estadias.',
        },
        {
          icon: 'shield',
          title: 'Gestão de cauções',
          text: 'Controlo rigoroso de cauções, entradas e devoluções, para proteger o imóvel e o proprietário.',
        },
        {
          icon: 'globe',
          title: 'Visibilidade e ocupação',
          text: 'Anúncios no Airbnb, Booking, Vrbo, Expedia e no nosso site, para máxima visibilidade e ocupação.',
        },
        {
          icon: 'chart',
          title: 'Preços dinâmicos',
          text: 'Preços ajustados à procura, à época e à ocupação, para maximizar o rendimento ao longo do ano.',
        },
      ],
    },
    legal: {
      eyebrow: 'Quer começar do zero?',
      title: 'Tratamos de *tudo*',
      body: 'Da legalização à gestão diária, trabalhamos com solicitadores, contabilistas e técnicos qualificados para que tudo seja feito com rigor.',
      steps: [
        { icon: 'shield', title: 'Seguro de AL', text: 'Tratamos do seguro de responsabilidade civil obrigatório para Alojamento Local.' },
        { icon: 'file', title: 'Registo no SIBA', text: 'Comunicação obrigatória do alojamento de hóspedes estrangeiros, como exige a lei.' },
        { icon: 'badge', title: 'Licença de AL', text: 'Pedido oficial da licença de Alojamento Local junto da Câmara Municipal.' },
        { icon: 'briefcase', title: 'Início de atividade', text: 'Abrimos ou atualizamos a sua atividade nas Finanças para que tudo esteja legal.' },
        { icon: 'flame', title: 'Kit AL', text: 'Extintor, manta de fogo, sinalética, livro de reclamações e restantes elementos obrigatórios.' },
      ],
    },
    simulator: {
      eyebrow: 'Simulador',
      title: 'Quanto pode render o *seu imóvel*?',
      body: 'Indique a localização e as características do imóvel e receba uma estimativa da receita anual em Alojamento Local.',
      location: 'Localização',
      locationNote: '(apenas Algarve)',
      locationPlaceholder: 'Selecione a localidade…',
      type: 'Tipo de imóvel',
      types: { apartamento: 'Apartamento', moradia: 'Moradia' },
      bedrooms: 'Quartos',
      bedroomOptions: ['Estúdio (T0)', '1 quarto', '2 quartos', '3 quartos', '4 quartos', '5 quartos', '6 ou mais'],
      extras: 'Características',
      pool: 'Piscina',
      seaView: 'Vista mar',
      next: 'Calcular rendimento',
      contactTitle: 'Para onde enviamos a estimativa?',
      contactBody: 'Deixe os seus contactos para ver o resultado. Um gestor pode depois ajudá-lo a perceber o potencial real do seu imóvel.',
      back: 'Voltar',
      submit: 'Ver estimativa',
      resultTitle: 'Rendimento anual estimado',
      to: 'a',
      perNight: 'preço médio por noite',
      nights: 'noites ocupadas por ano',
      disclaimer:
        'Estimativa indicativa da receita bruta de reservas, antes de limpezas, comissões das plataformas e impostos. O valor real depende do imóvel, da época e da procura.',
      cta: 'Quero uma proposta',
      restart: 'Nova simulação',
      sendError: 'Não conseguimos registar o seu contacto, mas aqui tem a estimativa. Ligue-nos para saber mais.',
    },
    faq: {
      eyebrow: 'Nós respondemos',
      title: 'Perguntas *frequentes*',
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
          a: 'É simples! Basta **pedir a sua proposta** nesta página ou **entrar em contacto connosco**. O processo de adesão é **rápido, sem complicações** e o seu alojamento pode começar a gerar rendimento em pouco tempo.',
        },
      ],
    },
    cta: {
      eyebrow: 'Fale connosco',
      title: 'Quer saber *mais*?',
      body: 'Tem um imóvel e procura uma forma de o rentabilizar sem preocupações? Está no sítio certo.',
      button: 'Pedir proposta',
    },
  },

  // NOVO: página de parceiros — validar percentagem, base de cálculo e condições.
  parceiros: {
    hero: {
      eyebrow: 'Programa de parceiros',
      title: 'Cresça connosco como *parceiro*',
      body: 'Conhece proprietários que procuram uma gestão de confiança? Indique-os à Paradise Villas e receba uma comissão por cada imóvel que entre em gestão.',
      cta: 'Tornar-me parceiro',
    },
    rate: {
      label: 'Comissão de parceria',
      text: 'sobre o lucro de gestão de cada imóvel que nos indicar.',
    },
    who: {
      eyebrow: 'Para quem',
      title: 'Quem pode ser *parceiro*',
      items: [
        {
          icon: 'building',
          title: 'Imobiliárias e consultores',
          text: 'Os seus clientes compram para investir? Ajudamo-los a rentabilizar o imóvel desde o primeiro dia.',
        },
        {
          icon: 'key',
          title: 'Administradores de condomínio',
          text: 'Conhece os proprietários do edifício e sabe quem tem casas paradas ou mal aproveitadas.',
        },
        {
          icon: 'briefcase',
          title: 'Contabilistas e solicitadores',
          text: 'Aconselham proprietários todos os dias. Indique um serviço de gestão sério e completo.',
        },
        {
          icon: 'users',
          title: 'Particulares',
          text: 'Um amigo ou familiar tem uma casa de férias? Uma recomendação basta.',
        },
      ],
    },
    steps: {
      eyebrow: 'Como funciona',
      title: 'Três passos, *zero complicações*',
      items: [
        { title: 'Indique', text: 'Envie-nos o contacto do proprietário, com a autorização dele, pelo formulário ou por telefone.' },
        { title: 'Nós tratamos do resto', text: 'Visitamos o imóvel, apresentamos a proposta e cuidamos de todo o processo.' },
        { title: 'Receba a sua comissão', text: 'Quando o imóvel entra em gestão, recebe a sua percentagem — com total transparência.' },
      ],
    },
    benefits: {
      title: 'Porquê ser parceiro da *Paradise Villas*',
      items: [
        'Comissão paga com transparência e documentada',
        'Acompanhamento de cada indicação',
        'Uma equipa local, no Algarve',
        'Sem custos para o parceiro',
      ],
    },
    form: {
      eyebrow: 'Candidatura',
      title: 'Torne-se *parceiro*',
      body: 'Preencha o formulário e entraremos em contacto para explicar todos os detalhes do programa.',
      company: 'Empresa (opcional)',
      companyPlaceholder: 'Nome da empresa',
      partnerType: 'Tipo de parceiro',
      partnerTypes: ['Imobiliária ou consultor', 'Administrador de condomínio', 'Contabilista ou solicitador', 'Particular', 'Outro'],
      message: 'Mensagem (opcional)',
      submit: 'Quero ser parceiro',
      success: 'Obrigado! Recebemos a sua candidatura e entraremos em contacto muito em breve.',
    },
  },

  sobre: {
    header: {
      eyebrow: 'Sobre nós',
      title: 'Conheça a *Paradise Villas*',
      body: 'Especialistas em gestão de alojamento local no Algarve, focados em criar estadias acolhedoras e inesquecíveis.',
    },
    intro: {
      body: [
        'Em **Paradise Villas** somos especialistas em gestão de alojamento local no Algarve, focados em criar estadias acolhedoras e inesquecíveis. Mais do que gerir imóveis, **proporcionamos experiências únicas que fazem os hóspedes sentirem-se em casa.**',
        'Trabalhamos com proximidade, dedicação e atenção ao detalhe — para garantir conforto, segurança e bem-estar em cada estadia.',
      ],
      imageAlt: 'Piscina de uma villa Paradise Villas',
    },
    pillars: {
      eyebrow: 'O que nos move',
      title: 'Missão, visão e *valores*',
      items: [
        {
          icon: 'compass',
          title: 'Missão',
          text: 'Proporcionar estadias memoráveis e confortáveis a quem visita o Algarve, através de uma gestão de alojamento local eficiente, tanto para hóspedes como para proprietários.',
        },
        {
          icon: 'star',
          title: 'Visão',
          text: 'Ser uma referência na gestão de alojamento local no Algarve, reconhecida pela excelência no atendimento, atenção aos detalhes e criação de experiências autênticas e acolhedoras.',
        },
        {
          icon: 'heart',
          title: 'Valores',
          text: 'Confiança, hospitalidade, dedicação e profissionalismo — com proprietários, hóspedes e parceiros. São estes os pilares que guiam todas as nossas ações e relações.',
        },
        {
          icon: 'sparkles',
          title: 'Diferenciação',
          text: 'Atendimento próximo e um serviço pensado ao detalhe. Gerimos cada imóvel como se fosse nosso e recebemos cada hóspede como gostaríamos de ser recebidos.',
        },
      ],
    },
    founder: {
      eyebrow: 'Conheça o fundador',
      name: 'Bruno Pereira',
      title: 'Paixão pelo Algarve. *Dedicação* a cada detalhe.',
      imageAlt: 'Bruno Pereira, fundador da Paradise Villas',
      body: [
        'Bruno Pereira é o fundador da Paradise Villas e o rosto por trás de cada estadia bem-sucedida. Natural do Algarve e com mais de 7 anos de experiência em alojamento local, criou a marca para proporcionar muito mais do que casas para férias: experiências acolhedoras, tranquilas e autênticas, tanto para os hóspedes como para os proprietários.',
        'Com espírito empreendedor e atenção constante aos detalhes, o Bruno acompanha pessoalmente cada processo — da receção de hóspedes à gestão diária dos imóveis — com profissionalismo, proximidade e um sorriso genuíno.',
      ],
      closing: 'Confie em quem vive o Algarve, entende de hospitalidade e trata o seu imóvel e as suas férias com atenção única.',
    },
    ctas: [
      {
        title: 'Gestão de Alojamento Local',
        text: 'Rentabilize o seu imóvel com confiança, transparência e apoio total — nós tratamos de tudo por si.',
        image: 'sobre-cta-gestao',
      },
      {
        title: 'Alojamentos para férias',
        text: 'Férias no Algarve com conforto, privacidade e tudo preparado ao detalhe — só precisa de relaxar.',
        image: 'sobre-cta-alojamentos',
      },
    ],
  },

  contactos: {
    header: {
      eyebrow: 'Contacto',
      title: 'Fale *connosco*',
      body: 'Tem um imóvel ou está a planear as suas férias? Ligue, envie mensagem ou preencha o formulário — respondemos o mais rápido possível.',
    },
    form: {
      title: 'Envie-nos uma mensagem',
      service: 'Assunto',
      services: ['Reservas para férias', 'Gestão de Alojamento Local', 'Parcerias', 'Outro assunto'],
      message: 'Mensagem',
      submit: 'Enviar mensagem',
      success: 'Obrigado! Recebemos a sua mensagem e entraremos em contacto o mais rápido possível.',
    },
    address: { title: 'Morada' },
  },

  legal: {
    privacidade: { title: 'Política de Privacidade' },
    termos: { title: 'Termos e Condições' },
  },

  notFound: {
    eyebrow: 'Erro 404',
    title: 'Esta página foi de *férias*.',
    body: 'A página que procura não existe ou mudou de endereço.',
    back: 'Voltar ao início',
  },

  footer: {
    tagline: 'Alojamentos de férias e gestão de Alojamento Local no Algarve.',
    links: 'Links úteis',
    contacts: 'Contactos',
    follow: 'Redes sociais',
    company: 'Paradise Villas é uma marca da Powerfuleader, Lda.',
    rights: 'Todos os direitos reservados.',
    complaints: 'Livro de Reclamações',
  },
}

export type Content = typeof pt
