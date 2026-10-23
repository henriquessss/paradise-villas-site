import type { Content } from './pt'

// English version. Same structure as pt.ts — TypeScript flags any missing key.

export const en: Content = {
  locale: 'en-GB',
  meta: {
    siteName: 'Paradise Villas',
    home: {
      title: 'Paradise Villas — Holiday rentals and property management in the Algarve',
      description:
        'Hand-picked holiday homes in the Algarve, local experiences and complete holiday rental management. Book direct with Paradise Villas in Albufeira.',
    },
    experiencias: {
      title: 'Experiences in the Algarve — Paradise Villas',
      description:
        'Boat trips to the Benagil caves, dolphin watching, kayaking, jeep safaris, wine tasting and much more. Book the best experiences in the Algarve online.',
    },
    gestao: {
      title: 'Holiday Rental Management in the Algarve — Paradise Villas',
      description:
        'Complete management of your holiday rental: cleaning, check-in, maintenance, dynamic pricing and visibility on the main booking platforms. Estimate your property’s income.',
    },
    parceiros: {
      title: 'Partner Programme — Paradise Villas',
      description:
        'Refer property owners to Paradise Villas and earn a partner commission for every property that joins our management. For estate agents, building managers, accountants and individuals.',
    },
    sobre: {
      title: 'About Us — Paradise Villas',
      description:
        'Holiday rental management specialists in the Algarve, focused on warm and unforgettable stays. Meet Paradise Villas and its founder, Bruno Pereira.',
    },
    contactos: {
      title: 'Contact — Paradise Villas',
      description: 'Talk to us by phone, email or form. Paradise Villas, Albufeira — Algarve.',
    },
    privacidade: {
      title: 'Privacy Policy — Paradise Villas',
      description: 'How Paradise Villas processes and protects your personal data.',
    },
    termos: {
      title: 'Terms and Conditions — Paradise Villas',
      description: 'Booking and stay conditions for Paradise Villas properties.',
    },
    notFound: {
      title: 'Page not found — Paradise Villas',
      description: 'The page you are looking for does not exist.',
    },
  },

  nav: {
    home: 'Home',
    alojamentos: 'Rentals',
    experiencias: 'Experiences',
    gestao: 'Property management',
    parceiros: 'Partners',
    sobre: 'About us',
    contactos: 'Contact',
    owner: 'Owners',
    ownerLogin: 'Owner area',
    book: 'Book',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
    switchLang: 'Português',
    switchLangShort: 'PT',
    langLabel: 'Language',
  },

  common: {
    verAlojamentos: 'View rentals',
    saberMais: 'Learn more',
    reservarAgora: 'Book now',
    home: 'Home',
    opensNewTab: '(opens in a new tab)',
    scroll: 'Scroll',
  },

  form: {
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'email@example.com',
    phone: 'Phone',
    phonePlaceholder: '+44 …',
    select: 'Select…',
    consent: 'I have read and accept the',
    consentLink: 'Privacy Policy',
    sending: 'Sending…',
    required: 'Required field',
    error: 'We could not send this. Please try again or email us at',
  },

  home: {
    hero: {
      badges: ['Over 7 years of experience'],
      title: 'Where your *best holidays* begin',
      lead: 'Hand-picked holiday homes in the Algarve, with a personal check-in and support throughout your stay.',
      search: {
        label: 'Search rentals',
        checkin: 'Check-in',
        checkout: 'Check-out',
        guests: 'Guests',
        guest: 'guest',
        guestsUnit: 'guests',
        submit: 'Search',
        invalid: 'The check-out date must be after the check-in date.',
      },
      stats: [
        { value: 7, suffix: '+', label: 'Years of experience' },
        { value: 750, suffix: '+', label: 'Guests' },
        { value: 100, suffix: '%', label: 'Satisfaction' },
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'For an *incredible* stay',
      body: 'Much more than a place to stay: we take care of the details so your Algarve holiday starts before you arrive.',
      items: [
        {
          icon: 'home',
          title: 'Hand-picked rentals',
          text: 'Verified villas and apartments, professionally cleaned and stocked with welcome amenities.',
          cta: 'View rentals',
        },
        {
          icon: 'compass',
          title: 'Experiences in the Algarve',
          text: 'Sea caves, dolphins, kayaking and adventure — choose yours and book online in minutes.',
          cta: 'View experiences',
        },
        {
          icon: 'car',
          title: 'Private transfers',
          text: 'From Faro airport to your front door, in comfort and whenever you need.',
          cta: 'Book a transfer',
        },
      ],
    },
    featured: {
      eyebrow: 'Rentals',
      title: 'Choose your *holiday home*',
      body: 'Villas with pools, apartments close to the beach and homes for the whole family, in the best areas of the Algarve.',
      cta: 'View all rentals',
      villas: [
        {
          name: 'Villa Goreti',
          place: 'Pêra',
          text: 'A luxurious, modern and spacious villa in a quiet area, just 2.5 km from the beach.',
          image: 'villa-goreti',
          href: 'https://alojamentos.paradisevillas.pt/aluguer/villa-pera-villa-goreti-688926.html',
        },
        {
          name: 'Apt. Palmeiras',
          place: 'Lagoa',
          text: 'A cosy apartment in Alporchinhos — one of the most sought-after areas of the Algarve.',
          image: 'apt-palmeiras',
          href: 'https://alojamentos.paradisevillas.pt/aluguer/apartamento-porches-apartamento-palmeiras-689717.html',
        },
        {
          name: 'Villa Marina',
          place: 'Albufeira',
          text: 'A luxury villa at Albufeira Marina, with every comfort and a prime location.',
          image: 'villa-marina',
          href: 'https://alojamentos.paradisevillas.pt/aluguer/villa-albufeira-villa-marina-689147.html',
        },
      ],
    },
    management: {
      eyebrow: 'Complete management',
      title: 'Holiday rental *management*',
      body: 'Let us take care of everything: we maximise your property’s income and make sure every guest has an excellent stay.',
      items: [
        'Cleaning between bookings',
        'Maintenance',
        'Photo shoot',
        'Amenities',
        'Personal check-in',
        'Bed and bath linen',
        'Deposit management',
        'Dynamic pricing',
      ],
      badge: { value: '7+', label: 'years of experience in holiday rentals' },
      imageAlt: 'Living room of a villa managed by Paradise Villas',
      cta: 'Learn more',
      simulate: 'Estimate your income',
    },
    algarve: {
      eyebrow: 'Algarve',
      title: 'Much more than a *destination*',
      body: 'Postcard beaches, golden cliffs, whitewashed villages and over 300 days of sunshine a year. The Algarve has everything for the perfect holiday — and we know it like no one else.',
      features: [
        { icon: 'sun', title: '300+ days of sun', text: 'One of the sunniest regions in Europe, for holidays at any time of year.' },
        { icon: 'waves', title: 'Stunning beaches', text: 'From Falésia to Marinha: long sandy beaches and hidden coves.' },
        { icon: 'utensils', title: 'Unique food', text: 'Fresh fish, seafood and the authentic flavours of the Algarve hills.' },
      ],
      imageAlt: ['Algarve beach with cliffs', 'Rock arch over the sea', 'Algarve village', 'Beach at sunset'],
    },
    experiences: {
      eyebrow: 'Experiences',
      title: 'Live the best of the *Algarve*',
      body: 'The experiences we recommend most to our guests. Book online with instant confirmation.',
      cta: 'View all experiences',
    },
    direct: {
      badge: 'Book direct',
      title: 'Book direct and *save*',
      body: 'Booking on our website avoids the platforms’ service fees and puts you in touch with the people who look after your home.',
      items: ['No platform service fees', 'Direct contact with our team', 'Personal check-in', 'Support throughout your stay'],
      cta: 'View rentals',
    },
    testimonials: {
      eyebrow: 'Reviews',
      title: 'What people say *about us*',
      items: [
        {
          quote:
            'We loved our stay! The house was even better than in the photos, spotless and well equipped. Check-in was quick and easy, and the team’s support was faultless. We will definitely be back!',
          name: 'Marta Amorim',
          role: 'Guest in Albufeira',
        },
        {
          quote:
            'I trusted my villa to Paradise Villas and could not be happier. The team handles everything professionally and transparently. Regular bookings and zero worries.',
          name: 'João Matias',
          role: 'Owner in Lagoa',
        },
        {
          quote:
            'The perfect family holiday. Excellent location, close to the beach with everything nearby. The kids loved the pool! We really felt at home.',
          name: 'Carla Tavares',
          role: 'Guest in Pêra',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Talk *to us*',
      body: 'Own a property or planning your holiday? We are just a call or message away.',
    },
  },

  channels: {
    phone: { title: 'Phone', note: '(call to a Portuguese mobile number)' },
    email: { title: 'Email' },
  },

  experiencias: {
    header: {
      eyebrow: 'Algarve',
      title: 'Adventure, fun and *discovery*',
      body: 'Boat trips, sea caves, dolphins and much more. We have picked the best experiences to enjoy the Algarve during your stay.',
    },
    filtersLabel: 'Filter experiences',
    filters: { all: 'All', barco: 'Boat', aventura: 'Adventure', natureza: 'Nature', cultura: 'Culture' },
    items: [
      {
        title: 'Benagil Cave, Algar Seco and Praia da Marinha',
        text: 'A boat trip to the Algarve’s most famous sea caves and cliffs.',
        place: 'Albufeira',
        category: 'barco',
        image: 'experiencias-arco',
        slug: { pt: 'sete-vales-suspensos-algarve-passeio-barco', en: 'seven-hanging-valleys-benagil-boat-tour' },
      },
      {
        title: 'Dolphin watching',
        text: 'See dolphins in their natural habitat off the coast of Albufeira.',
        place: 'Albufeira',
        category: 'barco',
        image: 'exp-golfinhos-grutas',
        slug: { pt: 'avistamento-golfinhos-albufeira', en: 'dolphin-watching-albufeira' },
      },
      {
        title: 'Kayak tour',
        text: 'Paddle into sea caves and hidden coves, close to the water and the rock.',
        place: 'Albufeira',
        category: 'natureza',
        image: 'exp-caiaque',
        slug: { pt: 'tour-caiaque-albufeira', en: 'kayak-tour-albufeira' },
      },
      {
        title: 'Jeep safari',
        text: 'An off-road adventure through dirt tracks, villages and viewpoints in the Algarve hills.',
        place: 'Albufeira',
        category: 'aventura',
        image: 'exp-safari',
        slug: { pt: 'jeep-safari-albufeira-entardecer', en: 'jeep-safari-tour' },
      },
      {
        title: 'Algarve villages and wine tasting',
        text: 'Carvoeiro, Benagil and Ferragudo, the coast’s prettiest villages, with an Algarve wine tasting.',
        place: 'Lagoa',
        category: 'cultura',
        image: 'exp-vinhos-silves',
        slug: { pt: 'carvoeiro-benagil-ferragudo-degustacao-vinhos', en: 'algarve-villages-wine-tasting' },
      },
      {
        title: 'Parasailing',
        text: 'Fly over the sea and see Albufeira from a unique perspective.',
        place: 'Albufeira',
        category: 'aventura',
        image: 'exp-parasailing',
        slug: { pt: 'parasailing-albufeira', en: 'parasailing' },
      },
      {
        title: 'Beginner scuba diving',
        text: 'Your first dive, guided by certified instructors.',
        place: 'Albufeira',
        category: 'natureza',
        image: 'exp-mergulho',
        slug: { pt: 'batismo-mergulho-albufeira', en: 'scuba-diving-introduction' },
      },
      {
        title: 'Sagres, Cape St. Vincent and Silves',
        text: 'A day trip to the south-western tip of Europe and the historic town of Silves.',
        place: 'Sagres',
        category: 'cultura',
        image: 'experiencias-capela',
        slug: { pt: 'excursao-sagres-lagos', en: 'sagres-lagos-st-vincent-tour' },
      },
    ],
    more: {
      eyebrow: 'More experiences',
      title: 'Explore all *available* activities',
      body: 'Discover hundreds of activities and experiences in the Algarve, with secure online booking.',
      cta: 'View all on Civitatis',
    },
    extras: {
      eyebrow: 'Extra services',
      title: 'Making your stay *even easier*',
      body: 'Beyond experiences, we offer practical services so you have nothing to worry about on holiday.',
      items: [
        {
          icon: 'car',
          title: 'Airport transfer',
          text: 'Arrive at your rental stress-free: private transfers straight from Faro airport, comfortable and on time.',
          cta: 'Book a transfer',
        },
        {
          icon: 'map',
          title: 'Experiences with locals',
          text: 'Tours, theme parks and activities recommended by people who live in the Algarve, on our HugLocals page.',
          cta: 'View on HugLocals',
        },
      ],
    },
  },

  gestao: {
    hero: {
      eyebrow: 'Holiday rental management',
      title: 'Ready to *get started*?',
      body: 'Leave your details and a few facts about your property. We will prepare a tailored proposal, with no commitment.',
      points: [
        'Free assessment of your property’s potential',
        'Tailored proposal, no commitment',
        'We handle the licensing if needed',
        'Support from start to finish',
      ],
      highlight: { value: '7+', label: 'years of experience', text: 'managing holiday rentals in the Algarve.' },
    },
    proposal: {
      title: 'Request your proposal',
      details: 'Property details (optional)',
      type: 'Type',
      types: ['Apartment', 'Villa', 'Other'],
      bedrooms: 'Bedrooms',
      location: 'Location',
      locationPlaceholder: 'e.g. Albufeira',
      pool: 'Has a pool',
      submit: 'Request proposal',
      success: 'Thank you! We have received your request and will be in touch very soon.',
    },
    services: {
      eyebrow: 'What’s included',
      title: 'Services *included*',
      body: 'Everything you need to earn from your property without the hassle.',
      items: [
        {
          icon: 'sparkles',
          title: 'Cleaning between bookings',
          text: 'Cleaning after every check-out by qualified teams, keeping the property comfortable and hygienic.',
        },
        {
          icon: 'wrench',
          title: 'Maintenance and inspections',
          text: 'A technical team for small repairs, replacements and one-off assistance, so everything always works.',
        },
        {
          icon: 'camera',
          title: 'Photo and video shoot',
          text: 'Professional photography and video to showcase your property and attract more bookings.',
        },
        {
          icon: 'gift',
          title: 'Welcome amenities',
          text: 'Shampoo, shower gel, toilet paper and a welcome kit so guests feel at home from the start.',
        },
        {
          icon: 'key',
          title: 'Personal check-in',
          text: 'We look after every guest from booking to check-out, with a personal welcome and support throughout.',
        },
        {
          icon: 'shirt',
          title: 'Bed and bath linen',
          text: 'Clean, ironed sheets and towels, professionally laundered and changed between stays.',
        },
        {
          icon: 'shield',
          title: 'Deposit management',
          text: 'Careful handling of security deposits, payments and refunds, protecting the property and the owner.',
        },
        {
          icon: 'globe',
          title: 'Visibility and occupancy',
          text: 'Listings on Airbnb, Booking, Vrbo, Expedia and our own website for maximum visibility and occupancy.',
        },
        {
          icon: 'chart',
          title: 'Dynamic pricing',
          text: 'Prices adjusted to demand, season and occupancy to maximise your income all year round.',
        },
      ],
    },
    legal: {
      eyebrow: 'Starting from scratch?',
      title: 'We take care of *everything*',
      body: 'From licensing to day-to-day management, we work with qualified solicitors, accountants and technicians so everything is done properly.',
      steps: [
        { icon: 'shield', title: 'Rental insurance', text: 'We arrange the mandatory civil liability insurance for holiday rentals.' },
        { icon: 'file', title: 'SIBA registration', text: 'The legally required reporting of foreign guests’ stays.' },
        { icon: 'badge', title: 'Rental licence', text: 'The official holiday rental (AL) licence application with the local council.' },
        { icon: 'briefcase', title: 'Tax registration', text: 'We open or update your business activity with the tax office so everything is in order.' },
        { icon: 'flame', title: 'Safety kit', text: 'Fire extinguisher, fire blanket, signage, complaints book and every other mandatory item.' },
      ],
    },
    simulator: {
      eyebrow: 'Income estimate',
      title: 'How much could *your property* earn?',
      body: 'Tell us where your property is and what it offers, and get an estimate of its yearly holiday rental income.',
      location: 'Location',
      locationNote: '(Algarve only)',
      locationPlaceholder: 'Select a location…',
      type: 'Property type',
      types: { apartamento: 'Apartment', moradia: 'Villa' },
      bedrooms: 'Bedrooms',
      bedroomOptions: ['Studio', '1 bedroom', '2 bedrooms', '3 bedrooms', '4 bedrooms', '5 bedrooms', '6 or more'],
      extras: 'Features',
      pool: 'Pool',
      seaView: 'Sea view',
      next: 'Estimate income',
      contactTitle: 'Where should we send the estimate?',
      contactBody: 'Leave your details to see the result. One of our managers can then help you understand your property’s real potential.',
      back: 'Back',
      submit: 'See estimate',
      resultTitle: 'Estimated yearly income',
      to: 'to',
      perNight: 'average nightly rate',
      nights: 'booked nights per year',
      disclaimer:
        'Indicative estimate of gross booking revenue, before cleaning, platform commissions and taxes. Actual figures depend on the property, the season and demand.',
      cta: 'I want a proposal',
      restart: 'New estimate',
      sendError: 'We could not register your details, but here is your estimate. Give us a call to find out more.',
    },
    faq: {
      eyebrow: 'Your questions',
      title: 'Frequently asked *questions*',
      items: [
        {
          q: 'How are booking prices set?',
          a: 'We use **dynamic pricing**, adjusted automatically according to **season**, **demand**, **competition** and **occupancy**. This way we strike the best balance between competitiveness and profitability for your property.',
        },
        {
          q: 'How can I follow my property’s performance?',
          a: 'You get an **online dashboard** where you can follow **bookings**, **occupancy rate**, **prices** and **guest reviews** in real time — with full transparency.',
        },
        {
          q: 'How do I sign up?',
          a: 'It’s simple! Just **request your proposal** on this page or **get in touch**. Joining is **quick and hassle-free**, and your property can start earning in no time.',
        },
      ],
    },
    cta: {
      eyebrow: 'Talk to us',
      title: 'Want to know *more*?',
      body: 'Own a property and looking for a hassle-free way to earn from it? You are in the right place.',
      button: 'Request proposal',
    },
  },

  parceiros: {
    hero: {
      eyebrow: 'Partner programme',
      title: 'Grow with us as a *partner*',
      body: 'Know owners looking for management they can trust? Refer them to Paradise Villas and earn a commission for every property that joins our management.',
      cta: 'Become a partner',
    },
    rate: {
      label: 'Partner commission',
      text: 'of the management profit from every property you refer.',
    },
    who: {
      eyebrow: 'Who it’s for',
      title: 'Who can be a *partner*',
      items: [
        {
          icon: 'building',
          title: 'Estate agents and consultants',
          text: 'Clients buying to invest? We help them earn from the property from day one.',
        },
        {
          icon: 'key',
          title: 'Building managers',
          text: 'You know the owners in the building and which homes sit empty or under-used.',
        },
        {
          icon: 'briefcase',
          title: 'Accountants and solicitors',
          text: 'You advise owners every day. Recommend a serious, complete management service.',
        },
        {
          icon: 'users',
          title: 'Individuals',
          text: 'A friend or relative owns a holiday home? A recommendation is all it takes.',
        },
      ],
    },
    steps: {
      eyebrow: 'How it works',
      title: 'Three steps, *zero hassle*',
      items: [
        { title: 'Refer', text: 'Send us the owner’s contact, with their permission, through the form or by phone.' },
        { title: 'We do the rest', text: 'We visit the property, present our proposal and handle the whole process.' },
        { title: 'Earn your commission', text: 'Once the property joins our management, you receive your share — fully transparent.' },
      ],
    },
    benefits: {
      title: 'Why partner with *Paradise Villas*',
      items: ['Commission paid transparently, with paperwork', 'Every referral followed up', 'A local team in the Algarve', 'No cost to the partner'],
    },
    form: {
      eyebrow: 'Apply',
      title: 'Become a *partner*',
      body: 'Fill in the form and we will get in touch to explain every detail of the programme.',
      company: 'Company (optional)',
      companyPlaceholder: 'Company name',
      partnerType: 'Partner type',
      partnerTypes: ['Estate agent or consultant', 'Building manager', 'Accountant or solicitor', 'Individual', 'Other'],
      message: 'Message (optional)',
      submit: 'I want to be a partner',
      success: 'Thank you! We have received your application and will be in touch very soon.',
    },
  },

  sobre: {
    header: {
      eyebrow: 'About us',
      title: 'Meet *Paradise Villas*',
      body: 'Holiday rental management specialists in the Algarve, focused on warm and unforgettable stays.',
    },
    intro: {
      body: [
        'At **Paradise Villas** we specialise in holiday rental management in the Algarve, focused on creating warm and unforgettable stays. More than managing properties, **we create unique experiences that make guests feel at home.**',
        'We work closely, with dedication and attention to detail — to ensure comfort, safety and well-being in every stay.',
      ],
      imageAlt: 'Pool of a Paradise Villas villa',
    },
    pillars: {
      eyebrow: 'What drives us',
      title: 'Mission, vision and *values*',
      items: [
        {
          icon: 'compass',
          title: 'Mission',
          text: 'To provide memorable, comfortable stays for visitors to the Algarve through efficient holiday rental management, for guests and owners alike.',
        },
        {
          icon: 'star',
          title: 'Vision',
          text: 'To be a benchmark in holiday rental management in the Algarve, known for excellent service, attention to detail and authentic, welcoming experiences.',
        },
        {
          icon: 'heart',
          title: 'Values',
          text: 'Trust, hospitality, dedication and professionalism — with owners, guests and partners. These are the pillars behind everything we do.',
        },
        {
          icon: 'sparkles',
          title: 'What sets us apart',
          text: 'Personal service, designed down to the last detail. We manage every property as if it were our own and welcome every guest as we would like to be welcomed.',
        },
      ],
    },
    founder: {
      eyebrow: 'Meet the founder',
      name: 'Bruno Pereira',
      title: 'Passion for the Algarve. *Dedication* to every detail.',
      imageAlt: 'Bruno Pereira, founder of Paradise Villas',
      body: [
        'Bruno Pereira is the founder of Paradise Villas and the face behind every successful stay. Born in the Algarve and with more than 7 years of experience in holiday rentals, he created the brand to offer much more than holiday homes: warm, relaxed and authentic experiences for guests and owners alike.',
        'With an entrepreneurial spirit and constant attention to detail, Bruno personally oversees every process — from welcoming guests to the day-to-day management of each property — with professionalism, closeness and a genuine smile.',
      ],
      closing: 'Trust someone who lives the Algarve, understands hospitality and looks after your property and your holiday with unique care.',
    },
    ctas: [
      {
        title: 'Holiday rental management',
        text: 'Earn from your property with confidence, transparency and full support — we take care of everything.',
        image: 'sobre-cta-gestao',
      },
      {
        title: 'Holiday rentals',
        text: 'Holidays in the Algarve with comfort, privacy and every detail prepared — all you need to do is relax.',
        image: 'sobre-cta-alojamentos',
      },
    ],
  },

  contactos: {
    header: {
      eyebrow: 'Contact',
      title: 'Talk *to us*',
      body: 'Own a property or planning your holiday? Call, send a message or fill in the form — we reply as soon as possible.',
    },
    form: {
      title: 'Send us a message',
      service: 'Subject',
      services: ['Holiday bookings', 'Holiday rental management', 'Partnerships', 'Something else'],
      message: 'Message',
      submit: 'Send message',
      success: 'Thank you! We have received your message and will get back to you as soon as possible.',
    },
    address: { title: 'Address' },
  },

  legal: {
    privacidade: { title: 'Privacy Policy' },
    termos: { title: 'Terms and Conditions' },
  },

  notFound: {
    eyebrow: 'Error 404',
    title: 'This page went on *holiday*.',
    body: 'The page you are looking for does not exist or has moved.',
    back: 'Back to home',
  },

  footer: {
    tagline: 'Holiday rentals and holiday rental management in the Algarve.',
    links: 'Useful links',
    contacts: 'Contact',
    follow: 'Social media',
    company: 'Paradise Villas is a brand of Powerfuleader, Lda.',
    rights: 'All rights reserved.',
    complaints: 'Complaints Book',
  },
}
