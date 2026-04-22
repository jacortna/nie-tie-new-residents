// Data about residency permits in Spain

export const QUESTIONS = [
  {
    id: "nationality_type",
    question: "¿De dónde eres?",
    subtitle: "Tu nacionalidad determina qué régimen legal se aplica a tu caso.",
    options: [
      {
        value: "eu",
        label: "Ciudadano/a de la UE, EEE o Suiza",
        description: "Alemania, Francia, Italia, Rumanía, Portugal, etc.",
        icon: "flag"
      },
      {
        value: "non_eu",
        label: "Ciudadano/a de un país no comunitario",
        description: "Latinoamérica, África, Asia, EE.UU., etc.",
        icon: "globe"
      }
    ]
  },
  // EU Questions
  {
    id: "eu_situation",
    question: "¿Cuál es tu situación actual?",
    subtitle: "Selecciona la opción que mejor describe tu caso.",
    condition: { nationality_type: "eu" },
    options: [
      {
        value: "work",
        label: "Trabajo o busco trabajo en España",
        description: "Por cuenta ajena o como autónomo",
        icon: "briefcase"
      },
      {
        value: "study",
        label: "Voy a estudiar en España",
        description: "Universidad, máster, formación",
        icon: "graduation"
      },
      {
        value: "enough_resources",
        label: "Tengo recursos económicos suficientes",
        description: "No necesito trabajar, tengo ahorros o rentas",
        icon: "wallet"
      },
      {
        value: "family",
        label: "Soy familiar de un ciudadano UE",
        description: "Cónyuge, pareja, hijo/a o dependiente",
        icon: "users"
      },
      {
        value: "long_term",
        label: "Llevo más de 5 años residiendo en España",
        description: "Quiero la residencia permanente",
        icon: "home"
      }
    ]
  },
  // Non-EU Questions
  {
    id: "non_eu_situation",
    question: "¿Cuál es tu situación actual?",
    subtitle: "Selecciona la opción que mejor describe tu caso.",
    condition: { nationality_type: "non_eu" },
    options: [
      {
        value: "no_visa",
        label: "Estoy en mi país y quiero ir a España",
        description: "Aún no tengo visado ni permiso",
        icon: "plane"
      },
      {
        value: "tourist",
        label: "Estoy en España como turista",
        description: "Con visado de turista o sin visado (estancia corta)",
        icon: "map"
      },
      {
        value: "irregular",
        label: "Estoy en España en situación irregular",
        description: "Sin papeles o con permiso caducado",
        icon: "alert"
      },
      {
        value: "has_permit",
        label: "Ya tengo un permiso de residencia",
        description: "Quiero renovar, modificar o conseguir la permanente",
        icon: "file"
      },
      {
        value: "family_eu",
        label: "Soy familiar de un ciudadano UE/español",
        description: "Cónyuge, pareja, hijo/a o dependiente",
        icon: "heart"
      }
    ]
  },
  // Sub-question for non-EU wanting to come
  {
    id: "non_eu_purpose",
    question: "¿Cuál será el motivo principal de tu estancia?",
    subtitle: "Esto determina el tipo de visado y permiso que necesitas.",
    condition: { nationality_type: "non_eu", non_eu_situation: "no_visa" },
    options: [
      {
        value: "work_employee",
        label: "Trabajar por cuenta ajena",
        description: "Tengo o busco una oferta de empleo",
        icon: "briefcase"
      },
      {
        value: "work_self",
        label: "Trabajar como autónomo/emprendedor",
        description: "Montar mi negocio o trabajar por mi cuenta",
        icon: "rocket"
      },
      {
        value: "study",
        label: "Estudiar o investigar",
        description: "Universidad, máster, doctorado, investigación",
        icon: "graduation"
      },
      {
        value: "digital_nomad",
        label: "Trabajar en remoto (nómada digital)",
        description: "Trabajo para empresa extranjera desde España",
        icon: "laptop"
      },
      {
        value: "family_reunification",
        label: "Reunirme con mi familia",
        description: "Tengo familiares residentes legales en España",
        icon: "users"
      },
      {
        value: "investor",
        label: "Invertir en España (Golden Visa)",
        description: "Inversión inmobiliaria, empresarial o financiera",
        icon: "trending"
      }
    ]
  },
  // Sub-question for irregular situation
  {
    id: "irregular_time",
    question: "¿Cuánto tiempo llevas en España?",
    subtitle: "El tiempo de estancia es clave para regularizar tu situación.",
    condition: { nationality_type: "non_eu", non_eu_situation: "irregular" },
    options: [
      {
        value: "less_1",
        label: "Menos de 1 año",
        icon: "clock"
      },
      {
        value: "1_to_3",
        label: "Entre 1 y 3 años",
        icon: "clock"
      },
      {
        value: "more_3",
        label: "Más de 3 años",
        description: "Puedo acreditar estancia continuada",
        icon: "clock"
      }
    ]
  },
  // Sub-question for already has permit
  {
    id: "permit_type_held",
    question: "¿Qué quieres hacer con tu permiso actual?",
    subtitle: "Selecciona según tu necesidad.",
    condition: { nationality_type: "non_eu", non_eu_situation: "has_permit" },
    options: [
      {
        value: "renew",
        label: "Renovar mi permiso",
        description: "Se me va a caducar o ya caducó",
        icon: "refresh"
      },
      {
        value: "modify",
        label: "Modificar mi permiso",
        description: "Cambiar de tipo (ej: estudiante a trabajo)",
        icon: "edit"
      },
      {
        value: "long_term",
        label: "Obtener la residencia de larga duración",
        description: "Llevo 5 años residiendo legalmente",
        icon: "shield"
      },
      {
        value: "nationality",
        label: "Solicitar la nacionalidad española",
        description: "Llevo el tiempo suficiente residiendo",
        icon: "star"
      }
    ]
  },
  // Tourist sub-question
  {
    id: "tourist_purpose",
    question: "¿Qué te gustaría conseguir?",
    subtitle: "Según tu objetivo, hay diferentes caminos.",
    condition: { nationality_type: "non_eu", non_eu_situation: "tourist" },
    options: [
      {
        value: "stay_work",
        label: "Quedarme y trabajar",
        description: "Quiero regularizar mi situación laboral",
        icon: "briefcase"
      },
      {
        value: "stay_study",
        label: "Quedarme y estudiar",
        description: "Quiero matricularme en un centro educativo",
        icon: "graduation"
      },
      {
        value: "stay_family",
        label: "Quedarme por vínculos familiares",
        description: "Tengo familia española o residente",
        icon: "heart"
      }
    ]
  }
];

export const PERMITS = {
  // EU Permits
  eu_registration: {
    id: "eu_registration",
    title: "Certificado de Registro de Ciudadano UE",
    shortTitle: "Registro UE",
    category: "eu",
    badge: "Comunitario",
    badgeColor: "bg-blue-100 text-blue-800",
    duration: "Indefinido (renovación cada 5-10 años del documento)",
    cost: "Tasa aproximada: 12 €",
    timeline: "Resolución inmediata al solicitarlo",
    description: "Es el trámite obligatorio para ciudadanos de la UE/EEE/Suiza que quieran residir en España más de 3 meses. Te asignan un NIE y un certificado verde.",
    requirements: [
      "Pasaporte o DNI del país de origen en vigor",
      "Formulario EX-18",
      "Justificante según la situación: contrato de trabajo, matrícula de estudios, acreditación de recursos económicos o vínculo familiar",
      "Seguro médico (si no trabajas)",
      "Empadronamiento"
    ],
    documents: [
      "Pasaporte o DNI original + fotocopia",
      "Formulario EX-18 cumplimentado y firmado",
      "Justificante de pago tasa 790-012 (modelo 790, código 012)",
      "Según situación: contrato de trabajo / matrícula / certificado de recursos económicos / libro de familia",
      "Seguro médico si no cotizas a la Seguridad Social",
      "Certificado de empadronamiento o justificante de domicilio"
    ],
    where_to_apply: [
      { place: "Oficina de Extranjería", detail: "La de tu provincia de residencia. Necesitas cita previa en sede.gob.es" },
      { place: "Comisaría de Policía Nacional habilitada", detail: "Algunas comisarías gestionan este trámite. Consulta la de tu municipio." },
      { place: "Cita previa online", detail: "Reserva en: https://sede.administracionespublicas.gob.es (búsqueda: 'Certificados UE')" }
    ],
    steps: [
      "Pide cita previa en la Oficina de Extranjería o comisaría de tu zona",
      "Rellena el formulario EX-18",
      "Paga la tasa 790-012",
      "Acude a tu cita con toda la documentación",
      "Te entregan el certificado de registro (tarjeta verde) en el acto"
    ],
    tips: [
      "Es obligatorio si vas a estar más de 3 meses",
      "El NIE que te dan es permanente",
      "Los familiares NO comunitarios de ciudadanos UE tienen un proceso diferente"
    ]
  },
  eu_permanent: {
    id: "eu_permanent",
    title: "Residencia Permanente de Ciudadano UE",
    shortTitle: "Permanente UE",
    category: "eu",
    badge: "Comunitario",
    badgeColor: "bg-blue-100 text-blue-800",
    duration: "Permanente (renovación del documento cada 10 años)",
    cost: "Tasa aproximada: 12 €",
    timeline: "1-3 meses",
    description: "Después de 5 años de residencia legal y continuada en España, los ciudadanos UE pueden obtener la residencia permanente, que otorga derechos reforzados.",
    requirements: [
      "Haber residido legalmente en España durante 5 años continuados",
      "Certificado de registro UE previo",
      "Pasaporte o DNI en vigor",
      "Empadronamiento histórico",
      "Formulario EX-18"
    ],
    documents: [
      "Formulario EX-18 cumplimentado",
      "Pasaporte o DNI en vigor + fotocopia",
      "Certificado de empadronamiento histórico (acredita los 5 años)",
      "Certificado de registro de ciudadano UE anterior",
      "Justificante de pago tasa 790-012"
    ],
    where_to_apply: [
      { place: "Oficina de Extranjería de tu provincia", detail: "Presencialmente con cita previa en sede.gob.es" },
      { place: "Online (sede electrónica)", detail: "Si tienes certificado digital o DNI electrónico puedes tramitarlo en sede.administracionespublicas.gob.es" }
    ],
    steps: [
      "Solicita cita previa en Extranjería",
      "Prepara documentación acreditativa de residencia continuada",
      "Presenta formulario EX-18 y documentación",
      "Espera resolución"
    ],
    tips: [
      "Ausencias de hasta 6 meses al año no interrumpen la continuidad",
      "Otorga mayor protección frente a la expulsión"
    ]
  },
  eu_family_card: {
    id: "eu_family_card",
    title: "Tarjeta de Familiar de Ciudadano UE",
    shortTitle: "Familiar UE",
    category: "eu",
    badge: "Comunitario / Familiar",
    badgeColor: "bg-purple-100 text-purple-800",
    duration: "5 años (renovable)",
    cost: "Tasa aproximada: 16 €",
    timeline: "1-3 meses",
    description: "Para familiares NO comunitarios de un ciudadano de la UE que reside en España. Permite residir y trabajar sin necesidad de permiso de trabajo independiente.",
    requirements: [
      "Pasaporte en vigor del familiar no comunitario",
      "Certificado de registro del ciudadano UE en España",
      "Documentación que acredite el vínculo familiar (matrimonio, pareja de hecho, nacimiento, dependencia económica)",
      "Formulario EX-19",
      "3 fotos tamaño carnet"
    ],
    documents: [
      "Pasaporte del familiar no comunitario (original + fotocopia de todas las páginas)",
      "Formulario EX-19 cumplimentado",
      "Certificado de registro del ciudadano UE en España",
      "Documento que acredita el vínculo: libro de familia, certificado de matrimonio o pareja de hecho, acta de nacimiento",
      "3 fotografías recientes en color fondo blanco",
      "Justificante de pago de la tasa 790-012"
    ],
    where_to_apply: [
      { place: "Oficina de Extranjería de la provincia de residencia", detail: "Con cita previa obligatoria en sede.gob.es" },
      { place: "Comisaría de Policía Nacional (algunas)", detail: "Dependiendo de la provincia, puede tramitarse en comisaría" }
    ],
    steps: [
      "Solicita cita previa en Extranjería",
      "Rellena el formulario EX-19",
      "Paga la tasa 790-012",
      "Presenta toda la documentación",
      "Recoge la tarjeta cuando esté lista"
    ],
    tips: [
      "El ciudadano UE debe tener el certificado de registro vigente",
      "Permite trabajar en España sin permiso adicional",
      "También aplica para parejas de hecho registradas"
    ]
  },

  // Non-EU Permits
  work_employee: {
    id: "work_employee",
    title: "Autorización de Residencia y Trabajo por Cuenta Ajena",
    shortTitle: "Trabajo por cuenta ajena",
    category: "non_eu",
    badge: "No comunitario",
    badgeColor: "bg-amber-100 text-amber-800",
    duration: "1 año (primera), renovable por 2 años, luego 2 años más",
    cost: "Tasa aproximada: 10-16 €",
    timeline: "3-6 meses",
    description: "Permiso para extranjeros no comunitarios que tienen una oferta de empleo en España. El empleador debe gestionar parte del proceso.",
    requirements: [
      "Oferta de empleo firme de un empleador en España",
      "Pasaporte en vigor",
      "Certificado de antecedentes penales",
      "Certificado médico",
      "El empleador debe acreditar la situación nacional de empleo (salvo excepciones)",
      "El puesto debe estar en el catálogo de ocupaciones de difícil cobertura o se debe acreditar insuficiencia de demandantes"
    ],
    documents: [
      "Pasaporte en vigor con al menos 1 año de vigencia (original + fotocopia)",
      "Certificado de antecedentes penales del país de origen (apostillado y traducido)",
      "Certificado médico oficial",
      "Contrato de trabajo firmado por el empleador",
      "Formulario EX-03 (lo presenta el empleador)",
      "Alta en la Seguridad Social o compromiso de alta"
    ],
    where_to_apply: [
      { place: "El empleador lo inicia en la Delegación/Subdelegación del Gobierno", detail: "De la provincia donde se ejercerá el trabajo" },
      { place: "Tú solicitas el visado en el Consulado de España de tu país", detail: "Una vez autorizado el permiso, debes recoger el visado en el consulado" },
      { place: "TIE en Extranjería o Comisaría (tras llegar)", detail: "En el plazo de 1 mes desde tu llegada, en la oficina de extranjería o comisaría de tu provincia" }
    ],
    steps: [
      "El empleador presenta la solicitud de autorización ante la Delegación de Gobierno",
      "Una vez aprobada, solicitas el visado en el consulado de España en tu país",
      "Viajas a España y te empadronas",
      "Solicitas la TIE (Tarjeta de Identidad de Extranjero) en plazo de un mes",
      "Te das de alta en la Seguridad Social"
    ],
    tips: [
      "El empleador es quien inicia el proceso",
      "Hay excepciones a la situación nacional de empleo para ciertas nacionalidades (convenios bilaterales)",
      "Puedes solicitar la modificación a trabajo si ya tienes otro tipo de permiso"
    ]
  },
  work_self: {
    id: "work_self",
    title: "Autorización de Residencia y Trabajo por Cuenta Propia",
    shortTitle: "Trabajo autónomo",
    category: "non_eu",
    badge: "No comunitario",
    badgeColor: "bg-amber-100 text-amber-800",
    duration: "1 año (primera), renovable",
    cost: "Tasa aproximada: 10-16 €",
    timeline: "3-6 meses",
    description: "Para quienes quieren desarrollar una actividad económica por cuenta propia (autónomo) en España.",
    requirements: [
      "Plan de negocio detallado y viable",
      "Acreditación de cualificación profesional o experiencia",
      "Inversión suficiente para el proyecto",
      "Pasaporte en vigor",
      "Certificado de antecedentes penales",
      "Certificado médico"
    ],
    documents: [
      "Pasaporte en vigor (original + fotocopia)",
      "Certificado de antecedentes penales (apostillado y traducido)",
      "Certificado médico",
      "Plan de negocio detallado y firmado",
      "Acreditación de cualificación: título profesional, certificado de experiencia laboral",
      "Justificación de medios económicos para la inversión inicial",
      "Formulario EX-07"
    ],
    where_to_apply: [
      { place: "Consulado de España en tu país de residencia", detail: "Presenta toda la documentación. Ellos evalúan el plan de negocio y conceden el visado." },
      { place: "Delegación/Subdelegación del Gobierno (si ya estás en España legalmente)", detail: "Puedes solicitar la autorización sin salir de España en algunos casos" },
      { place: "TIE en Extranjería tras llegar", detail: "Solicita la tarjeta de identidad en el plazo de 1 mes desde tu llegada" }
    ],
    steps: [
      "Prepara un plan de negocio completo",
      "Presenta la solicitud en el consulado de España",
      "Una vez aprobada, obtén el visado",
      "Viaja a España, empadrónate y solicita la TIE",
      "Date de alta como autónomo en Hacienda y Seguridad Social"
    ],
    tips: [
      "El plan de negocio debe ser convincente y mostrar viabilidad",
      "Se valora especialmente la creación de empleo",
      "Algunas comunidades autónomas facilitan emprendimiento"
    ]
  },
  student: {
    id: "student",
    title: "Estancia por Estudios",
    shortTitle: "Estancia por estudios",
    category: "non_eu",
    badge: "No comunitario",
    badgeColor: "bg-green-100 text-green-800",
    duration: "Duración del curso (renovable anualmente)",
    cost: "Tasa aproximada: 16 €",
    timeline: "1-3 meses",
    description: "Autorización para residir en España mientras realizas estudios, investigación, formación o prácticas. No es un permiso de residencia como tal, sino una 'estancia'.",
    requirements: [
      "Admisión en un centro educativo reconocido en España",
      "Medios económicos suficientes (100% del IPREM mensual)",
      "Seguro médico completo",
      "Pasaporte en vigor",
      "Certificado de antecedentes penales (si la estancia supera 6 meses)",
      "Certificado médico"
    ],
    documents: [
      "Pasaporte en vigor (original + fotocopia de todas las páginas)",
      "Carta de admisión oficial del centro educativo en España",
      "Seguro médico completo (sin copago, que cubra toda la estancia)",
      "Justificante de medios económicos: extractos bancarios, carta de patrocinio, beca",
      "Certificado de antecedentes penales si la estancia supera 6 meses (apostillado y traducido)",
      "Certificado médico",
      "Formulario nacional de solicitud de visado de estudios"
    ],
    where_to_apply: [
      { place: "Consulado de España en tu país", detail: "Solicita el visado de estudios antes de viajar. Necesitas cita previa." },
      { place: "Oficina de Extranjería o Comisaría (una vez en España)", detail: "Solicita la TIE en el plazo de 30 días desde tu entrada con cita previa en sede.gob.es" }
    ],
    steps: [
      "Obtén tu carta de admisión del centro educativo",
      "Solicita el visado de estudios en el consulado de España",
      "Viaja a España y empadrónate",
      "Solicita la TIE en plazo de un mes",
      "Si quieres trabajar, solicita autorización compatible (max 20h/semana)"
    ],
    tips: [
      "Puedes trabajar hasta 20h semanales con autorización compatible",
      "Tras finalizar estudios, puedes modificar a permiso de trabajo",
      "3 años de estancia por estudios computan como 1 año para la residencia de larga duración"
    ]
  },
  digital_nomad: {
    id: "digital_nomad",
    title: "Visado para Teletrabajo Internacional (Nómada Digital)",
    shortTitle: "Nómada digital",
    category: "non_eu",
    badge: "No comunitario",
    badgeColor: "bg-teal-100 text-teal-800",
    duration: "Hasta 1 año (visado) o 3 años (residencia), renovable por 2 más",
    cost: "Tasa: 80 € (visado) o 16 € (residencia)",
    timeline: "1-3 meses",
    description: "Introducido por la Ley de Startups (2023), permite a trabajadores remotos de empresas extranjeras residir en España.",
    requirements: [
      "Relación laboral o profesional con empresa fuera de España (mín. 1 año de antigüedad)",
      "Que la empresa no esté radicada en España",
      "Ingresos mínimos del 200% del SMI (aprox. 2.520 €/mes en 2024)",
      "Seguro médico",
      "Pasaporte en vigor",
      "Certificado de antecedentes penales"
    ],
    documents: [
      "Pasaporte en vigor (original + fotocopia)",
      "Certificado de antecedentes penales (apostillado y traducido)",
      "Seguro médico completo en España",
      "Contrato laboral o acuerdo de prestación de servicios con empresa extranjera (mín. 1 año de antigüedad)",
      "Justificante de ingresos: nóminas o pagos de los últimos 3 meses (mín. 200% del SMI)",
      "Documentación de la empresa: registro mercantil extranjero, descripción de actividad",
      "Formulario EX-11 (si solicitas desde España) o solicitud de visado (si desde el consulado)"
    ],
    where_to_apply: [
      { place: "Consulado de España en tu país (si estás en el extranjero)", detail: "Solicita el visado de teletrabajo internacional. Cita previa obligatoria." },
      { place: "Unidad de Grandes Empresas (UGE) o Extranjería (si ya estás en España legalmente)", detail: "Puedes solicitar directamente la autorización de residencia sin salir de España" },
      { place: "Sede electrónica del Ministerio de Inclusión", detail: "Algunos trámites se pueden iniciar online en sede.immigracion.gob.es" }
    ],
    steps: [
      "Prepara la documentación laboral y de ingresos",
      "Solicita el visado en el consulado (si estás fuera) o la autorización de residencia (si estás en España legalmente)",
      "Viaja a España y empadrónate",
      "Solicita la TIE",
      "Régimen fiscal especial disponible (Ley Beckham)"
    ],
    tips: [
      "Puedes acogerte al régimen fiscal especial (tributar solo por rentas españolas)",
      "Tus familiares pueden acompañarte con permisos vinculados",
      "También aplica para freelancers que trabajan para clientes internacionales"
    ]
  },
  golden_visa: {
    id: "golden_visa",
    title: "Residencia para Inversores (Golden Visa)",
    shortTitle: "Golden Visa",
    category: "non_eu",
    badge: "Inversores",
    badgeColor: "bg-yellow-100 text-yellow-800",
    duration: "2 años (primera), renovable por 5 años",
    cost: "Tasa: 80 € (visado)",
    timeline: "20 días hábiles (vía UGE)",
    description: "Residencia para extranjeros que realizan una inversión significativa en España. NOTA: la inversión inmobiliaria ya no cualifica desde abril 2025.",
    requirements: [
      "Inversión significativa: deuda pública (≥2M€), acciones empresariales (≥1M€), depósitos bancarios (≥1M€), o proyecto empresarial de interés general",
      "Pasaporte en vigor",
      "Seguro médico",
      "Certificado de antecedentes penales",
      "Medios económicos suficientes"
    ],
    documents: [
      "Pasaporte en vigor",
      "Certificado de antecedentes penales (apostillado y traducido)",
      "Seguro médico completo",
      "Documentación acreditativa de la inversión: certificado del Banco de España, escrituras, certificado de acciones",
      "Declaración de no tener deudas con la AEAT ni con la Seguridad Social",
      "Formulario EX-01 o solicitud de visado de inversor"
    ],
    where_to_apply: [
      { place: "Consulado de España en tu país", detail: "Para solicitar el visado de inversor antes de viajar a España" },
      { place: "Unidad de Grandes Empresas (UGE)", detail: "Para solicitar la autorización de residencia directamente en España. Más rápida que Extranjería ordinaria." },
      { place: "Sede electrónica", detail: "Trámite posible online en algunos casos en sede.administracionespublicas.gob.es" }
    ],
    steps: [
      "Realiza la inversión y obtén documentación acreditativa",
      "Solicita el visado en el consulado o residencia ante la UGE (Unidad de Grandes Empresas)",
      "Viaja a España",
      "Solicita la TIE"
    ],
    tips: [
      "La vía inmobiliaria (≥500.000€) fue eliminada en abril 2025",
      "La UGE tramita más rápido que Extranjería",
      "No exige residencia efectiva para renovar",
      "Familiares pueden obtener permiso vinculado"
    ]
  },
  family_reunification: {
    id: "family_reunification",
    title: "Reagrupación Familiar",
    shortTitle: "Reagrupación familiar",
    category: "non_eu",
    badge: "No comunitario",
    badgeColor: "bg-pink-100 text-pink-800",
    duration: "Misma duración que el permiso del reagrupante",
    cost: "Tasa aproximada: 10-16 €",
    timeline: "3-6 meses",
    description: "Permite a un extranjero con residencia legal en España traer a sus familiares directos (cónyuge, hijos menores, ascendientes dependientes).",
    requirements: [
      "El reagrupante debe tener permiso de residencia renovado (o de larga duración)",
      "Medios económicos suficientes (según número de familiares)",
      "Vivienda adecuada (informe de habitabilidad)",
      "Documentación del vínculo familiar",
      "Pasaportes en vigor de los familiares"
    ],
    documents: [
      "Permiso de residencia del reagrupante en vigor (o de larga duración)",
      "Pasaporte del familiar a reagrupar (original + fotocopia)",
      "Certificado de vínculo familiar: libro de familia, acta de matrimonio o nacimiento (apostillados y traducidos)",
      "Informe de habitabilidad de la vivienda (emitido por el ayuntamiento)",
      "Justificante de ingresos suficientes: nóminas, declaración de renta (según tabla IPREM + nº familiares)",
      "Formulario EX-02 (lo presenta el reagrupante en España)"
    ],
    where_to_apply: [
      { place: "Oficina de Extranjería del reagrupante en España", detail: "El residente en España inicia el trámite en Extranjería de su provincia con cita previa" },
      { place: "Consulado de España en el país del familiar", detail: "Una vez aprobada la reagrupación, el familiar solicita el visado de residencia por reagrupación familiar" },
      { place: "Extranjería o Comisaría (tras llegar a España)", detail: "El familiar solicita la TIE en el plazo de 1 mes desde su entrada en España" }
    ],
    steps: [
      "El residente en España presenta la solicitud en Extranjería",
      "Obtiene autorización favorable",
      "Los familiares solicitan el visado en el consulado",
      "Viajan a España y solicitan la TIE"
    ],
    tips: [
      "Necesitas vivienda adecuada certificada",
      "Los ingresos mínimos dependen del tamaño de la familia",
      "Los ascendientes solo pueden reagruparse si eres residente de larga duración"
    ]
  },
  arraigo_social: {
    id: "arraigo_social",
    title: "Arraigo Social",
    shortTitle: "Arraigo social",
    category: "non_eu",
    badge: "Regularización",
    badgeColor: "bg-orange-100 text-orange-800",
    duration: "1 año (renovable)",
    cost: "Tasa aproximada: 10-16 €",
    timeline: "3-6 meses",
    description: "Vía de regularización para extranjeros en situación irregular que llevan al menos 3 años en España y pueden demostrar vínculos sociales.",
    requirements: [
      "3 años de estancia continuada en España (acreditable con empadronamiento, etc.)",
      "Sin antecedentes penales en España ni en el país de origen",
      "Contrato de trabajo de al menos 1 año a jornada completa (o equivalente), O informe favorable de inserción social",
      "Vínculos familiares o informe de integración social del ayuntamiento"
    ],
    documents: [
      "Pasaporte en vigor (original + fotocopia)",
      "Certificado de empadronamiento continuo (histórico de los 3 años)",
      "Certificado de antecedentes penales de España y del país de origen",
      "Informe de integración social emitido por el Ayuntamiento o Comunidad Autónoma (o contrato de trabajo de mín. 1 año)",
      "Pruebas adicionales de estancia: facturas, recibos bancarios, informes médicos, contratos de alquiler",
      "Formulario EX-10"
    ],
    where_to_apply: [
      { place: "Oficina de Extranjería de tu provincia", detail: "Presentas la solicitud presencialmente con cita previa en sede.gob.es" },
      { place: "Sede electrónica (con certificado digital)", detail: "Puedes enviar la solicitud online en sede.administracionespublicas.gob.es" },
      { place: "Ayuntamiento (para el informe previo)", detail: "Primero ve al ayuntamiento de tu municipio para solicitar el informe de integración social, que tarda varias semanas" }
    ],
    steps: [
      "Reúne pruebas de estancia de 3 años",
      "Obtén el informe de integración social de tu ayuntamiento (o servicios sociales)",
      "Consigue un contrato de trabajo (si optas por esa vía)",
      "Presenta la solicitud en Extranjería",
      "Espera resolución y solicita la TIE"
    ],
    tips: [
      "El empadronamiento es la prueba más fuerte de estancia",
      "El informe de integración social se pide al ayuntamiento o CC.AA.",
      "Si tienes familiares españoles o residentes, es más fácil"
    ]
  },
  arraigo_laboral: {
    id: "arraigo_laboral",
    title: "Arraigo Laboral",
    shortTitle: "Arraigo laboral",
    category: "non_eu",
    badge: "Regularización",
    badgeColor: "bg-orange-100 text-orange-800",
    duration: "1 año (renovable)",
    cost: "Tasa aproximada: 10-16 €",
    timeline: "3-6 meses",
    description: "Para extranjeros en situación irregular que pueden demostrar que han estado trabajando en España (aunque fuera de forma irregular).",
    requirements: [
      "2 años de estancia continuada en España",
      "Relaciones laborales acreditadas (mín. 6 meses en los 2 años previos)",
      "Sin antecedentes penales",
      "La relación laboral debe probarse con resolución judicial, acta de inspección de trabajo, etc."
    ],
    documents: [
      "Pasaporte en vigor (original + fotocopia)",
      "Certificado de empadronamiento (acreditando 2 años de estancia)",
      "Certificado de antecedentes penales de España y del país de origen",
      "Acreditación de relaciones laborales: resolución judicial, acta de Inspección de Trabajo, o sentencia que reconozca la relación laboral",
      "Formulario EX-10"
    ],
    where_to_apply: [
      { place: "Inspección de Trabajo (paso previo)", detail: "Si no tienes acta de inspección, puedes presentar denuncia ante la Inspección de Trabajo de tu provincia para que acrediten la relación laboral" },
      { place: "Oficina de Extranjería de tu provincia", detail: "Presentas la solicitud de arraigo laboral con cita previa en sede.gob.es" },
      { place: "Sede electrónica", detail: "Tramitación online posible con certificado digital en sede.administracionespublicas.gob.es" }
    ],
    steps: [
      "Reúne pruebas de relación laboral",
      "Presenta denuncia ante Inspección de Trabajo si es necesario",
      "Presenta la solicitud con la acreditación laboral",
      "Espera resolución y solicita la TIE"
    ],
    tips: [
      "No necesitas contrato nuevo: se acredita el trabajo ya realizado",
      "Una sentencia judicial o acta de Inspección son las pruebas más fuertes",
      "Es independiente del arraigo social"
    ]
  },
  arraigo_familiar: {
    id: "arraigo_familiar",
    title: "Arraigo Familiar",
    shortTitle: "Arraigo familiar",
    category: "non_eu",
    badge: "Regularización",
    badgeColor: "bg-orange-100 text-orange-800",
    duration: "5 años",
    cost: "Tasa aproximada: 10-16 €",
    timeline: "2-4 meses",
    description: "Para extranjeros que son padre/madre de un menor español, o hijos de padre/madre originariamente español.",
    requirements: [
      "Ser progenitor de un hijo/a español menor de edad (y tener a su cargo), O ser hijo/a de padre/madre que fue español de origen",
      "Pasaporte en vigor",
      "Sin antecedentes penales",
      "Certificado de nacimiento del menor / documentación de filiación"
    ],
    documents: [
      "Pasaporte en vigor del solicitante (original + fotocopia)",
      "Certificado de nacimiento del hijo/a español (con apostilla si aplica)",
      "DNI del hijo/a español o libro de familia que acredite la filiación",
      "Certificado de antecedentes penales de España y del país de origen",
      "Formulario EX-10",
      "Si eres hijo/a de español: certificado de nacimiento del padre/madre español (original)"
    ],
    where_to_apply: [
      { place: "Oficina de Extranjería de tu provincia", detail: "Solicitud presencial con cita previa en sede.gob.es. No necesitas haber vivido en España un tiempo mínimo." },
      { place: "Sede electrónica", detail: "Tramitación online con certificado digital en sede.administracionespublicas.gob.es" }
    ],
    steps: [
      "Reúne la documentación familiar",
      "Presenta solicitud en Extranjería",
      "Espera resolución",
      "Solicita la TIE"
    ],
    tips: [
      "No requiere tiempo mínimo de estancia en España",
      "Es la vía más rápida de regularización si tienes un hijo español",
      "Se concede directamente por 5 años"
    ]
  },
  long_term: {
    id: "long_term",
    title: "Residencia de Larga Duración",
    shortTitle: "Larga duración",
    category: "non_eu",
    badge: "Permanente",
    badgeColor: "bg-indigo-100 text-indigo-800",
    duration: "Permanente (renovación del documento cada 5 años)",
    cost: "Tasa aproximada: 16 €",
    timeline: "3-6 meses",
    description: "Equivalente a la residencia permanente. Se obtiene tras 5 años de residencia legal y continuada en España.",
    requirements: [
      "5 años de residencia legal continuada",
      "No haber estado fuera de España más de 10 meses en total (ni más de 6 seguidos)",
      "Pasaporte en vigor",
      "Sin antecedentes penales recientes"
    ],
    documents: [
      "Pasaporte en vigor (original + fotocopia)",
      "TIE actual o último permiso de residencia",
      "Certificado de empadronamiento histórico (5 años)",
      "Historial de permisos de residencia anteriores",
      "Certificado de antecedentes penales actualizado",
      "Formulario EX-11"
    ],
    where_to_apply: [
      { place: "Oficina de Extranjería de tu provincia", detail: "Con cita previa. Presenta la solicitud hasta 60 días antes de que caduque tu permiso actual." },
      { place: "Sede electrónica (recomendado)", detail: "Tramitación online en sede.administracionespublicas.gob.es con certificado digital o cl@ve" }
    ],
    steps: [
      "Presenta la solicitud 60 días antes de que caduque tu último permiso",
      "Acredita los 5 años de residencia continuada",
      "Presenta documentación en Extranjería",
      "Espera resolución y recoge nueva TIE"
    ],
    tips: [
      "Te permite trabajar en cualquier sector y lugar de España",
      "Es el paso previo natural a solicitar la nacionalidad",
      "Acumula tiempo desde tu primera autorización de residencia"
    ]
  },
  nationality: {
    id: "nationality",
    title: "Nacionalidad Española",
    shortTitle: "Nacionalidad",
    category: "non_eu",
    badge: "Nacionalidad",
    badgeColor: "bg-red-100 text-red-800",
    duration: "Permanente",
    cost: "Tasa: 104 €",
    timeline: "1-3 años",
    description: "La nacionalidad española se puede obtener por residencia tras un período de residencia legal en España. El plazo varía según la nacionalidad.",
    requirements: [
      "Residencia legal continuada: 10 años (general), 5 años (refugiados), 2 años (iberoamericanos, andorranos, filipinos, ecuatoguineanos, portugueses, sefardíes), 1 año (nacidos en España, casados con español/a, viudo/a de español/a)",
      "Buena conducta cívica",
      "Superar el examen CCSE (conocimientos constitucionales y socioculturales)",
      "Superar el examen DELE A2 (si no eres de país hispanohablante)",
      "Suficiente grado de integración en la sociedad española"
    ],
    documents: [
      "Pasaporte en vigor (original + fotocopia)",
      "Certificado de nacimiento con apostilla y traducción jurada",
      "Certificado de empadronamiento histórico",
      "Certificado de antecedentes penales de España y del país de origen",
      "Diploma DELE A2 o superior (si no eres de país hispanohablante)",
      "Diploma CCSE (Conocimientos Constitucionales y Socioculturales de España) — examen del Instituto Cervantes",
      "En su caso: certificado de matrimonio con español/a, libro de familia"
    ],
    where_to_apply: [
      { place: "Ministerio de Justicia (sede electrónica)", detail: "La solicitud se presenta online en mjusticia.gob.es — es obligatorio hacerlo de forma telemática" },
      { place: "Instituto Cervantes (exámenes previos)", detail: "CCSE y DELE A2 se realizan en el Instituto Cervantes. Hay que inscribirse con antelación en cervantes.es" },
      { place: "Registro Civil de tu domicilio (fase final)", detail: "Una vez aprobada la solicitud, debes comparecer para la jura/promesa de la Constitución" }
    ],
    steps: [
      "Verifica que cumples el tiempo de residencia requerido",
      "Aprueba los exámenes CCSE y DELE A2 (si aplica)",
      "Presenta solicitud telemáticamente en el Ministerio de Justicia",
      "Espera resolución (puede tardar 1-3 años)",
      "Jura/promesa ante el Registro Civil"
    ],
    tips: [
      "Ciudadanos iberoamericanos solo necesitan 2 años",
      "Casados con españoles solo necesitan 1 año",
      "Es necesario renunciar a la nacionalidad anterior (salvo iberoamericanos y algunas excepciones)"
    ]
  },
  modification: {
    id: "modification",
    title: "Modificación de Permiso de Residencia",
    shortTitle: "Modificación",
    category: "non_eu",
    badge: "Trámite",
    badgeColor: "bg-slate-100 text-slate-800",
    duration: "Variable según el nuevo permiso",
    cost: "Tasa aproximada: 10-16 €",
    timeline: "1-3 meses",
    description: "Permite cambiar el tipo de autorización de residencia (por ejemplo, de estudios a trabajo, o de cuenta ajena a cuenta propia).",
    requirements: [
      "Tener un permiso de residencia en vigor",
      "Cumplir los requisitos del nuevo tipo de permiso",
      "Documentación específica según la modificación"
    ],
    documents: [
      "TIE actual en vigor (original + fotocopia)",
      "Pasaporte en vigor",
      "Documentación específica del nuevo tipo de permiso al que modificas",
      "Formulario EX-03 (cuenta ajena), EX-07 (cuenta propia) u otros según el tipo",
      "Justificante de pago de la tasa correspondiente"
    ],
    where_to_apply: [
      { place: "Oficina de Extranjería de tu provincia", detail: "Con cita previa. Puedes presentar mientras tu permiso esté en vigor." },
      { place: "Sede electrónica", detail: "Algunos tipos de modificación se pueden tramitar online en sede.administracionespublicas.gob.es" }
    ],
    steps: [
      "Identifica a qué tipo de permiso puedes cambiar",
      "Reúne la documentación del nuevo permiso",
      "Presenta la solicitud en Extranjería",
      "Espera resolución"
    ],
    tips: [
      "La modificación más común es de estudiante a trabajo",
      "No todas las modificaciones son posibles: consulta las combinaciones permitidas",
      "Es mejor solicitarla antes de que caduque tu permiso actual"
    ]
  }
};

// Rules to determine which permits to show based on answers
export function getRecommendedPermits(answers) {
  const { nationality_type, eu_situation, non_eu_situation, non_eu_purpose, irregular_time, permit_type_held, tourist_purpose } = answers;

  if (nationality_type === "eu") {
    switch (eu_situation) {
      case "work":
      case "study":
      case "enough_resources":
        return ["eu_registration"];
      case "family":
        return ["eu_family_card", "eu_registration"];
      case "long_term":
        return ["eu_permanent"];
      default:
        return ["eu_registration"];
    }
  }

  if (nationality_type === "non_eu") {
    // Family of EU citizen
    if (non_eu_situation === "family_eu") {
      return ["eu_family_card"];
    }

    // Coming from abroad
    if (non_eu_situation === "no_visa") {
      switch (non_eu_purpose) {
        case "work_employee":
          return ["work_employee"];
        case "work_self":
          return ["work_self"];
        case "study":
          return ["student"];
        case "digital_nomad":
          return ["digital_nomad"];
        case "family_reunification":
          return ["family_reunification"];
        case "investor":
          return ["golden_visa"];
        default:
          return ["work_employee", "student"];
      }
    }

    // Tourist wanting to stay
    if (non_eu_situation === "tourist") {
      switch (tourist_purpose) {
        case "stay_work":
          return ["work_employee", "work_self", "digital_nomad"];
        case "stay_study":
          return ["student"];
        case "stay_family":
          return ["arraigo_familiar", "family_reunification"];
        default:
          return ["student", "work_employee"];
      }
    }

    // Irregular situation
    if (non_eu_situation === "irregular") {
      if (irregular_time === "more_3") {
        return ["arraigo_social", "arraigo_laboral", "arraigo_familiar"];
      } else if (irregular_time === "1_to_3") {
        return ["arraigo_laboral", "arraigo_familiar"];
      } else {
        return ["arraigo_familiar"];
      }
    }

    // Has permit
    if (non_eu_situation === "has_permit") {
      switch (permit_type_held) {
        case "renew":
          return ["work_employee", "work_self", "student"];
        case "modify":
          return ["modification"];
        case "long_term":
          return ["long_term"];
        case "nationality":
          return ["nationality"];
        default:
          return ["long_term"];
      }
    }
  }

  return ["eu_registration", "work_employee"];
}