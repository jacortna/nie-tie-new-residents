// Data about residency permits in Spain

export const QUESTIONS = [
  {
    id: "nationality_type",
    question: "¿De dónde eres?",
    subtitle: "Tu nacionalidad determina qué régimen legal se aplica a tu caso.",
    options: [
      { value: "eu", label: "Ciudadano/a de la UE, EEE o Suiza", description: "Alemania, Francia, Italia, Rumanía, Portugal, etc.", icon: "flag" },
      { value: "non_eu", label: "Ciudadano/a de un país no comunitario", description: "Latinoamérica, África, Asia, EE.UU., etc.", icon: "globe" }
    ]
  },
  {
    id: "eu_situation",
    question: "¿Cuál es tu situación actual?",
    subtitle: "Selecciona la opción que mejor describe tu caso.",
    condition: { nationality_type: "eu" },
    options: [
      { value: "work", label: "Trabajo o busco trabajo en España", description: "Por cuenta ajena o como autónomo", icon: "briefcase" },
      { value: "study", label: "Voy a estudiar en España", description: "Universidad, máster, formación", icon: "graduation" },
      { value: "enough_resources", label: "Tengo recursos económicos suficientes", description: "No necesito trabajar, tengo ahorros o rentas", icon: "wallet" },
      { value: "family", label: "Soy familiar de un ciudadano UE", description: "Cónyuge, pareja, hijo/a o dependiente", icon: "users" },
      { value: "long_term", label: "Llevo más de 5 años residiendo en España", description: "Quiero la residencia permanente", icon: "home" }
    ]
  },
  {
    id: "non_eu_situation",
    question: "¿Cuál es tu situación actual?",
    subtitle: "Selecciona la opción que mejor describe tu caso.",
    condition: { nationality_type: "non_eu" },
    options: [
      { value: "no_visa", label: "Estoy en mi país y quiero ir a España", description: "Aún no tengo visado ni permiso", icon: "plane" },
      { value: "tourist", label: "Estoy en España como turista", description: "Con visado de turista o sin visado (estancia corta)", icon: "map" },
      { value: "irregular", label: "Estoy en España en situación irregular", description: "Sin papeles o con permiso caducado. ¡Atención: hay regularización extraordinaria hasta junio 2026!", icon: "alert" },
      { value: "has_permit", label: "Ya tengo un permiso de residencia", description: "Quiero renovar, modificar o conseguir la permanente", icon: "file" },
      { value: "reagrupacion", label: "Tengo residencia y quiero traer a mi familia", description: "Quiero reagrupar a mi cónyuge, hijos u otros familiares en España", icon: "users" },
      { value: "family_eu", label: "Soy familiar de un ciudadano UE", description: "Cónyuge, pareja, hijo/a o dependiente de ciudadano de otro país UE", icon: "heart" },
      { value: "family_spanish", label: "Soy familiar de un ciudadano/a español/a", description: "Cónyuge, hijo/a menor 26 años o ascendiente directo de español/a", icon: "flag" },
      { value: "exceptional", label: "Tengo circunstancias especiales o humanitarias", description: "Soy víctima de trata, violencia de género, solicitante de asilo, razones médicas u humanitarias", icon: "shield" }
    ]
  },
  {
    id: "non_eu_purpose",
    question: "¿Cuál será el motivo principal de tu estancia?",
    subtitle: "Esto determina el tipo de visado y permiso que necesitas.",
    condition: { nationality_type: "non_eu", non_eu_situation: "no_visa" },
    options: [
      { value: "work_employee", label: "Trabajar por cuenta ajena", description: "Tengo o busco una oferta de empleo", icon: "briefcase" },
      { value: "work_self", label: "Trabajar como autónomo/emprendedor", description: "Montar mi negocio o trabajar por mi cuenta", icon: "rocket" },
      { value: "study", label: "Estudiar o investigar", description: "Universidad, máster, doctorado, investigación", icon: "graduation" },
      { value: "digital_nomad", label: "Trabajar en remoto (nómada digital)", description: "Trabajo para empresa extranjera desde España", icon: "laptop" },
      { value: "family_reunification", label: "Reunirme con mi familia", description: "Tengo familiares residentes legales en España", icon: "users" },
      { value: "investor", label: "Invertir en España (Golden Visa)", description: "Inversión inmobiliaria, empresarial o financiera", icon: "trending" },
      { value: "no_work", label: "Vivir sin trabajar (tengo medios propios)", description: "Jubilado, rentista o con recursos suficientes", icon: "wallet" }
    ]
  },
  {
    id: "irregular_time",
    question: "¿Cuánto tiempo llevas en España?",
    subtitle: "El tiempo de estancia es clave para regularizar tu situación.",
    condition: { nationality_type: "non_eu", non_eu_situation: "irregular" },
    options: [
      { value: "less_1", label: "Menos de 1 año", icon: "clock" },
      { value: "1_to_3", label: "Entre 1 y 3 años", icon: "clock" },
      { value: "more_3", label: "Más de 3 años", description: "Puedo acreditar estancia continuada", icon: "clock" }
    ]
  },
  {
    id: "permit_type_held",
    question: "¿Qué quieres hacer con tu permiso actual?",
    subtitle: "Selecciona según tu necesidad.",
    condition: { nationality_type: "non_eu", non_eu_situation: "has_permit" },
    options: [
      { value: "renew", label: "Renovar mi permiso", description: "Se me va a caducar o ya caducó", icon: "refresh" },
      { value: "modify", label: "Modificar mi permiso", description: "Cambiar de tipo (ej: estudiante a trabajo)", icon: "edit" },
      { value: "long_term", label: "Obtener la residencia de larga duración", description: "Llevo 5 años residiendo legalmente", icon: "shield" },
      { value: "nationality", label: "Solicitar la nacionalidad española", description: "Llevo el tiempo suficiente residiendo", icon: "star" }
    ]
  },
  {
    id: "exceptional_type",
    question: "¿Cuál es tu circunstancia especial?",
    subtitle: "Selecciona la que mejor describe tu situación.",
    condition: { nationality_type: "non_eu", non_eu_situation: "exceptional" },
    options: [
      { value: "asylum", label: "Solicito asilo o protección internacional", description: "Huyo de persecución, guerra o riesgo grave en mi país", icon: "shield" },
      { value: "trata", label: "Soy víctima de trata de seres humanos", description: "He sido identificado/a o me han explotado", icon: "alert" },
      { value: "violencia_genero", label: "Soy víctima de violencia de género", description: "Mi pareja o expareja me maltrata o amenaza", icon: "heart" },
      { value: "colaboracion", label: "Colaboro con la policía o la justicia", description: "Denuncio redes criminales o tráfico de personas", icon: "briefcase" },
      { value: "humanitarias", label: "Tengo razones humanitarias o médicas graves", description: "Enfermedad grave, imposibilidad de retorno, vulnerabilidad extrema", icon: "graduation" },
      { value: "ucrania", label: "Soy desplazado/a de Ucrania", description: "Desde el 24 de febrero de 2022", icon: "plane" }
    ]
  },
  {
    id: "tourist_purpose",
    question: "¿Qué te gustaría conseguir?",
    subtitle: "Según tu objetivo, hay diferentes caminos.",
    condition: { nationality_type: "non_eu", non_eu_situation: "tourist" },
    options: [
      { value: "stay_work", label: "Quedarme y trabajar", description: "Quiero regularizar mi situación laboral", icon: "briefcase" },
      { value: "stay_study", label: "Quedarme y estudiar", description: "Quiero matricularme en un centro educativo", icon: "graduation" },
      { value: "stay_family", label: "Quedarme por vínculos familiares", description: "Tengo familia española o residente", icon: "heart" }
    ]
  },
  {
    id: "reagrupacion_tipo",
    question: "¿A quién quieres reagrupar?",
    subtitle: "El tipo de familiar determina los requisitos y documentación necesarios.",
    condition: { nationality_type: "non_eu", non_eu_situation: "reagrupacion" },
    options: [
      { value: "conyuge", label: "Mi cónyuge o pareja de hecho", description: "Matrimonio reconocido o pareja de hecho registrada", icon: "heart" },
      { value: "hijos", label: "Mis hijos menores de edad", description: "Hijos menores de 18 años o mayores incapacitados", icon: "users" },
      { value: "ascendientes", label: "Mis padres o ascendientes", description: "A cargo del reagrupante, mayores de 65 años o dependientes", icon: "home" },
      { value: "varios", label: "Varios familiares", description: "Cónyuge e hijos u otras combinaciones", icon: "flag" }
    ]
  }
];

export const PERMITS = {
  eu_registration: {
    id: "eu_registration", title: "Certificado de Registro de Ciudadano UE", shortTitle: "Registro UE", category: "eu", badge: "Comunitario", badgeColor: "bg-blue-100 text-blue-800", duration: "Indefinido (renovación cada 5-10 años del documento)", cost: "Tasa aproximada: 12 €", timeline: "Resolución inmediata al solicitarlo",
    description: "Es el trámite obligatorio para ciudadanos de la UE/EEE/Suiza que quieran residir en España más de 3 meses. Te asignan un NIE y un certificado verde.",
    requirements: ["Pasaporte o DNI del país de origen en vigor", "Formulario EX-18", "Justificante según la situación: contrato de trabajo, matrícula de estudios, acreditación de recursos económicos o vínculo familiar", "Seguro médico (si no trabajas)", "Empadronamiento"],
    documents: ["Pasaporte o DNI original + fotocopia", "Formulario EX-18 cumplimentado y firmado", "Justificante de pago tasa 790-012", "Según situación: contrato de trabajo / matrícula / certificado de recursos económicos / libro de familia", "Seguro médico si no cotizas a la Seguridad Social", "Certificado de empadronamiento o justificante de domicilio"],
    where_to_apply: [{ place: "Oficina de Extranjería", detail: "La de tu provincia de residencia. Necesitas cita previa en sede.gob.es" }, { place: "Comisaría de Policía Nacional habilitada", detail: "Algunas comisarías gestionan este trámite." }, { place: "Cita previa online", detail: "Reserva en: https://sede.administracionespublicas.gob.es" }],
    steps: ["Pide cita previa en la Oficina de Extranjería o comisaría de tu zona", "Rellena el formulario EX-18", "Paga la tasa 790-012", "Acude a tu cita con toda la documentación", "Te entregan el certificado de registro (tarjeta verde) en el acto"],
    tips: ["Es obligatorio si vas a estar más de 3 meses", "El NIE que te dan es permanente", "Los familiares NO comunitarios de ciudadanos UE tienen un proceso diferente (Tarjeta de Familiar UE, EX-19)"]
  },
  eu_permanent: {
    id: "eu_permanent", title: "Residencia Permanente de Ciudadano UE", shortTitle: "Permanente UE", category: "eu", badge: "Comunitario", badgeColor: "bg-blue-100 text-blue-800", duration: "Permanente (renovación del documento cada 10 años)", cost: "Tasa aproximada: 12 €", timeline: "1-3 meses",
    description: "Después de 5 años de residencia legal y continuada en España, los ciudadanos UE pueden obtener la residencia permanente.",
    requirements: ["Haber residido legalmente en España durante 5 años continuados", "Certificado de registro UE previo", "Pasaporte o DNI en vigor", "Empadronamiento histórico"],
    documents: ["Formulario EX-18 cumplimentado", "Pasaporte o DNI en vigor + fotocopia", "Certificado de empadronamiento histórico (acredita los 5 años)", "Certificado de registro de ciudadano UE anterior", "Justificante de pago tasa 790-012"],
    where_to_apply: [{ place: "Oficina de Extranjería de tu provincia", detail: "Presencialmente con cita previa en sede.gob.es" }, { place: "Online (sede electrónica)", detail: "Si tienes certificado digital o DNI electrónico" }],
    steps: ["Solicita cita previa en Extranjería", "Prepara documentación acreditativa de residencia continuada", "Presenta formulario EX-18 y documentación", "Espera resolución"],
    tips: ["Ausencias de hasta 6 meses al año no interrumpen la continuidad", "Otorga mayor protección frente a la expulsión"]
  },
  eu_family_card: {
    id: "eu_family_card", title: "Tarjeta de Familiar de Ciudadano UE", shortTitle: "Familiar UE", category: "eu", badge: "Comunitario / Familiar", badgeColor: "bg-purple-100 text-purple-800", duration: "5 años (renovable)", cost: "Tasa: 12 €", timeline: "1-3 meses",
    description: "Para familiares NO comunitarios de un ciudadano de la UE que reside en España. Permite residir y trabajar sin permiso de trabajo independiente.",
    requirements: ["Pasaporte en vigor del familiar no comunitario", "Certificado de registro del ciudadano UE en España", "Documentación que acredite el vínculo familiar", "Formulario EX-19", "3 fotos tamaño carnet"],
    documents: ["Pasaporte del familiar no comunitario (original + fotocopia)", "Formulario EX-19 cumplimentado", "Certificado de registro del ciudadano UE en España", "Documento que acredita el vínculo: libro de familia, certificado de matrimonio o pareja de hecho", "3 fotografías recientes", "Justificante de pago de la tasa 790-012"],
    where_to_apply: [{ place: "Oficina de Extranjería de la provincia de residencia", detail: "Con cita previa obligatoria en sede.gob.es" }],
    steps: ["Solicita cita previa en Extranjería", "Rellena el formulario EX-19", "Paga la tasa 790-012", "Presenta toda la documentación", "Recoge la tarjeta cuando esté lista"],
    tips: ["El ciudadano UE debe tener el certificado de registro vigente", "Permite trabajar en España sin permiso adicional", "También aplica para parejas de hecho registradas"]
  },
  family_spanish: {
    id: "family_spanish", title: "Residencia Temporal de Familiar de Español/a", shortTitle: "Familiar de español/a", category: "non_eu", badge: "Familiar de español", badgeColor: "bg-purple-100 text-purple-800", duration: "2 años (primera), renovable por 2 años más", cost: "Tasa: 10,94 €", timeline: "1-3 meses",
    description: "Autorización de residencia temporal para familiares de personas con nacionalidad española. Regulada en el artículo 97 del Reglamento de Extranjería (RD 1155/2024), modificado por el RD 316/2026.",
    requirements: ["Ser cónyuge o pareja de hecho registrada de español/a, O hijo/a menor de 26 años de español/a, O ascendiente directo de español/a a cargo", "El ciudadano español debe residir en España", "Pasaporte en vigor", "Sin antecedentes penales"],
    documents: ["Pasaporte en vigor del solicitante", "DNI o pasaporte del familiar español", "Acreditación del vínculo: certificado de matrimonio, libro de familia, acta de nacimiento (apostillados y traducidos)", "Certificado de empadronamiento", "Certificado de antecedentes penales del país de origen"],
    where_to_apply: [{ place: "Oficina de Extranjería de la provincia de residencia", detail: "Con cita previa en sede.gob.es" }, { place: "Sede electrónica", detail: "Tramitación online con certificado digital" }],
    steps: ["Reúne la documentación del vínculo familiar", "Solicita cita previa en Extranjería", "Presenta la solicitud", "Espera resolución y solicita la TIE"],
    tips: ["Novedad RD 316/2026: los hijos y ascendientes pueden solicitarlo estando ambos en España", "La autorización provisional de trabajo se concede desde la admisión a trámite"]
  },
  work_employee: {
    id: "work_employee", title: "Autorización de Residencia y Trabajo por Cuenta Ajena", shortTitle: "Trabajo por cuenta ajena", category: "non_eu", badge: "No comunitario", badgeColor: "bg-amber-100 text-amber-800", duration: "1 año (primera), renovable por 2 años, luego 2 años más", cost: "Tasa: 10,94 € (solicitante) + 790-062 a cargo del empleador", timeline: "3-6 meses",
    description: "Permiso para extranjeros no comunitarios que tienen una oferta de empleo en España. El empleador debe gestionar parte del proceso.",
    requirements: ["Oferta de empleo firme de un empleador en España", "Pasaporte en vigor", "Certificado de antecedentes penales", "Certificado médico", "El empleador debe acreditar la situación nacional de empleo (salvo excepciones)"],
    documents: ["Pasaporte en vigor (original + fotocopia)", "Certificado de antecedentes penales (apostillado y traducido)", "Certificado médico oficial", "Contrato de trabajo firmado por el empleador", "Formulario EX-03 (lo presenta el empleador)"],
    where_to_apply: [{ place: "El empleador lo inicia en la Delegación/Subdelegación del Gobierno", detail: "De la provincia donde se ejercerá el trabajo" }, { place: "Tú solicitas el visado en el Consulado de España de tu país", detail: "Una vez autorizado el permiso" }],
    steps: ["El empleador presenta la solicitud ante la Delegación de Gobierno", "Una vez aprobada, solicitas el visado en el consulado", "Viajas a España y te empadronas", "Solicitas la TIE en plazo de un mes", "Te das de alta en la Seguridad Social"],
    tips: ["El empleador es quien inicia el proceso", "Hay excepciones para ciertas nacionalidades (convenios bilaterales)"]
  },
  tarjeta_azul_ue: {
    id: "tarjeta_azul_ue", title: "Tarjeta Azul UE (Trabajadores Altamente Cualificados)", shortTitle: "Tarjeta Azul UE", category: "non_eu", badge: "Alta cualificación", badgeColor: "bg-blue-100 text-blue-800", duration: "2 años (primera), renovable por 2 años más", cost: "Tasa: 10,94 € (solicitante) + 790-062 a cargo del empleador", timeline: "20 días hábiles (vía UGE)",
    description: "Permiso especial de residencia y trabajo para trabajadores altamente cualificados de fuera de la UE. Requiere título universitario o 5 años de experiencia y un salario mínimo de 1,5 veces el salario medio en España.",
    requirements: ["Título universitario superior (mínimo 3 años) o 5 años de experiencia profesional acreditada", "Contrato de trabajo de al menos 1 año con un empleador en España", "Salario mínimo: 1,5 veces el salario medio español (aprox. 45.000 €/año)", "Pasaporte en vigor", "Certificado de antecedentes penales"],
    documents: ["Pasaporte en vigor (original + fotocopia)", "Título universitario homologado o certificado de experiencia profesional de 5 años", "Contrato de trabajo firmado (mínimo 1 año)", "Nóminas o justificante del salario acordado", "Certificado de antecedentes penales (apostillado y traducido)", "Formulario EX-17"],
    where_to_apply: [{ place: "Unidad de Grandes Empresas (UGE) - Madrid", detail: "Vía más rápida. Resolución en 20 días hábiles." }, { place: "Oficina de Extranjería de tu provincia", detail: "Tramitación ordinaria." }, { place: "Consulado de España en tu país (si estás en el extranjero)", detail: "Para solicitar el visado de Tarjeta Azul." }],
    steps: ["El empleador prepara el contrato con salario superior al mínimo requerido", "Presenta la solicitud en la UGE o Extranjería", "Espera resolución (20 días hábiles vía UGE)", "Solicita la TIE", "Date de alta en la Seguridad Social"],
    tips: ["Permite cambiar de empleador más fácilmente que otros permisos", "Facilita la movilidad dentro de la UE tras 18 meses en España", "Compatible con el régimen fiscal especial (Ley Beckham)"]
  },
  work_self: {
    id: "work_self", title: "Autorización de Residencia y Trabajo por Cuenta Propia", shortTitle: "Trabajo autónomo", category: "non_eu", badge: "No comunitario", badgeColor: "bg-amber-100 text-amber-800", duration: "1 año (primera), renovable", cost: "Tasa: 10,94 €", timeline: "3-6 meses",
    description: "Para quienes quieren desarrollar una actividad económica por cuenta propia (autónomo) en España.",
    requirements: ["Plan de negocio detallado y viable", "Acreditación de cualificación profesional o experiencia", "Inversión suficiente para el proyecto", "Pasaporte en vigor", "Certificado de antecedentes penales"],
    documents: ["Pasaporte en vigor (original + fotocopia)", "Certificado de antecedentes penales (apostillado y traducido)", "Plan de negocio detallado y firmado", "Acreditación de cualificación", "Formulario EX-07"],
    where_to_apply: [{ place: "Consulado de España en tu país de residencia", detail: "Presenta toda la documentación." }, { place: "Delegación/Subdelegación del Gobierno (si ya estás en España legalmente)", detail: "Puedes solicitar sin salir de España en algunos casos" }],
    steps: ["Prepara un plan de negocio completo", "Presenta la solicitud en el consulado de España", "Una vez aprobada, obtén el visado", "Viaja a España, empadrónate y solicita la TIE", "Date de alta como autónomo en Hacienda y Seguridad Social"],
    tips: ["El plan de negocio debe ser convincente y mostrar viabilidad", "Se valora especialmente la creación de empleo"]
  },
  visado_emprendedor: {
    id: "visado_emprendedor", title: "Visado y Autorización de Residencia para Emprendedores", shortTitle: "Visado emprendedor", category: "non_eu", badge: "Emprendimiento", badgeColor: "bg-green-100 text-green-800", duration: "1 año (visado) o 2 años (residencia), renovable por 2 años más", cost: "Tasa: 80 € (visado) o 10,94 € (residencia)", timeline: "10 días hábiles (vía UGE)",
    description: "Permiso especial regulado por la Ley 14/2013 para extranjeros que quieran desarrollar una actividad emprendedora innovadora de especial interés económico para España.",
    requirements: ["Proyecto empresarial innovador de especial interés económico para España", "Calificación favorable del proyecto por ENISA, DGCi u organismo autonómico", "Medios económicos suficientes", "Seguro médico", "Pasaporte en vigor", "Sin antecedentes penales"],
    documents: ["Pasaporte en vigor (original + fotocopia)", "Plan de negocio detallado con descripción del carácter innovador", "Calificación favorable del proyecto (emitida por ENISA, DGCi o equivalente)", "Justificante de medios económicos", "Seguro médico completo", "Certificado de antecedentes penales (apostillado y traducido)"],
    where_to_apply: [{ place: "ENISA o DGCi", detail: "Para obtener la calificación favorable del proyecto. Primer paso imprescindible." }, { place: "Consulado de España en tu país (si estás fuera)", detail: "Para solicitar el visado de emprendedor una vez obtenida la calificación." }, { place: "Unidad de Grandes Empresas (UGE)", detail: "Resolución en 10 días hábiles." }],
    steps: ["Prepara el plan de negocio innovador", "Solicita la calificación favorable ante ENISA o DGCi", "Solicita el visado en el consulado o la autorización en la UGE", "Viaja a España o solicita la TIE", "Inicia el proyecto empresarial"],
    tips: ["El proyecto debe ser innovador: no vale cualquier negocio", "La UGE resuelve en solo 10 días hábiles", "Compatible con el régimen fiscal especial (Ley Beckham)"]
  },
  student: {
    id: "student", title: "Estancia por Estudios", shortTitle: "Estancia por estudios", category: "non_eu", badge: "No comunitario", badgeColor: "bg-green-100 text-green-800", duration: "Duración del curso (renovable anualmente)", cost: "Tasa: 10,94 € (inicial) / 17,49 € (prórroga anual)", timeline: "1-3 meses",
    description: "Autorización para residir en España mientras realizas estudios, investigación, formación o prácticas.",
    requirements: ["Admisión en un centro educativo reconocido en España", "Medios económicos suficientes (100% del IPREM mensual)", "Seguro médico completo", "Pasaporte en vigor"],
    documents: ["Pasaporte en vigor (original + fotocopia)", "Carta de admisión oficial del centro educativo en España", "Seguro médico completo", "Justificante de medios económicos", "Certificado de antecedentes penales si la estancia supera 6 meses"],
    where_to_apply: [{ place: "Consulado de España en tu país", detail: "Solicita el visado de estudios antes de viajar." }, { place: "Oficina de Extranjería o Comisaría (una vez en España)", detail: "Solicita la TIE en el plazo de 30 días." }],
    steps: ["Obtén tu carta de admisión del centro educativo", "Solicita el visado de estudios en el consulado", "Viaja a España y empadrónate", "Solicita la TIE en plazo de un mes", "Si quieres trabajar, solicita autorización compatible (max 20h/semana)"],
    tips: ["Puedes trabajar hasta 20h semanales con autorización compatible", "Tras finalizar estudios, puedes modificar a permiso de trabajo"]
  },
  busqueda_empleo: {
    id: "busqueda_empleo", title: "Autorización de Residencia para Búsqueda de Empleo", shortTitle: "Búsqueda de empleo", category: "non_eu", badge: "No comunitario", badgeColor: "bg-blue-100 text-blue-800", duration: "1 año (no renovable; se modifica a trabajo si encuentras empleo)", cost: "Tasa: 10,94 €", timeline: "1-3 meses",
    description: "Nueva autorización del Reglamento de Extranjería (RD 1155/2024). Para estudiantes que terminaron estudios en España o personas con vínculos familiares, para buscar empleo o iniciar un proyecto empresarial durante 1 año.",
    requirements: ["Haber finalizado estudios universitarios, de FP o investigación en España (en los últimos 12 meses), O ser familiar de ciudadano español o residente legal", "Disponer de medios económicos suficientes durante el período de búsqueda", "Seguro médico", "Sin antecedentes penales"],
    documents: ["Pasaporte en vigor (original + fotocopia)", "Título o certificado de finalización de estudios en España", "Justificante de medios económicos suficientes", "Seguro médico completo", "Certificado de antecedentes penales"],
    where_to_apply: [{ place: "Oficina de Extranjería de tu provincia", detail: "Con cita previa en sede.gob.es." }, { place: "Sede electrónica", detail: "Tramitación online posible con certificado digital." }],
    steps: ["Finaliza tus estudios en España", "Reúne la documentación económica y el seguro médico", "Presenta la solicitud en Extranjería antes de que caduque tu permiso de estudios", "Busca empleo o desarrolla tu proyecto empresarial", "Si encuentras trabajo, modifica a permiso de trabajo"],
    tips: ["Es el puente entre estudios y trabajo en España", "Si inicias un proyecto empresarial, puedes modificarlo a permiso por cuenta propia", "Durante el año de búsqueda no puedes trabajar, solo buscar empleo"]
  },
  digital_nomad: {
    id: "digital_nomad", title: "Visado para Teletrabajo Internacional (Nómada Digital)", shortTitle: "Nómada digital", category: "non_eu", badge: "No comunitario", badgeColor: "bg-teal-100 text-teal-800", duration: "Hasta 1 año (visado) o 3 años (residencia), renovable por 2 más", cost: "Tasa: 80 € (visado) o 10,94 € (residencia)", timeline: "1-3 meses",
    description: "Introducido por la Ley de Startups (2023), permite a trabajadores remotos de empresas extranjeras residir en España.",
    requirements: ["Relación laboral o profesional con empresa fuera de España (mín. 1 año de antigüedad)", "Que la empresa no esté radicada en España", "Ingresos mínimos del 200% del SMI (aprox. 2.520 €/mes)", "Seguro médico", "Pasaporte en vigor"],
    documents: ["Pasaporte en vigor (original + fotocopia)", "Certificado de antecedentes penales (apostillado y traducido)", "Seguro médico completo en España", "Contrato laboral con empresa extranjera (mín. 1 año de antigüedad)", "Justificante de ingresos de los últimos 3 meses"],
    where_to_apply: [{ place: "Consulado de España en tu país (si estás en el extranjero)", detail: "Solicita el visado de teletrabajo internacional." }, { place: "Unidad de Grandes Empresas (UGE) o Extranjería (si ya estás en España)", detail: "Puedes solicitar directamente la autorización de residencia." }],
    steps: ["Prepara la documentación laboral y de ingresos", "Solicita el visado en el consulado o la autorización en la UGE", "Viaja a España y empadrónate", "Solicita la TIE", "Régimen fiscal especial disponible (Ley Beckham)"],
    tips: ["Puedes acogerte al régimen fiscal especial", "Tus familiares pueden acompañarte con permisos vinculados", "También aplica para freelancers que trabajan para clientes internacionales"]
  },
  residencia_no_lucrativa: {
    id: "residencia_no_lucrativa", title: "Residencia No Lucrativa", shortTitle: "Residencia no lucrativa", category: "non_eu", badge: "No comunitario", badgeColor: "bg-teal-100 text-teal-800", duration: "1 año (primera), renovable por 2 años", cost: "Tasa: 10,94 €", timeline: "1-3 meses",
    description: "Permiso de residencia para extranjeros que quieren vivir en España sin realizar actividades laborales, acreditando disponer de medios económicos suficientes. No permite trabajar.",
    requirements: ["Disponer de medios económicos suficientes: mínimo 400% del IPREM mensual (aprox. 2.400 €/mes) para el titular", "100% adicional del IPREM por cada familiar a cargo", "Seguro médico privado completo (sin copago)", "Pasaporte en vigor", "Certificado de antecedentes penales"],
    documents: ["Pasaporte en vigor con al menos 1 año de vigencia (original + fotocopia)", "Certificado de antecedentes penales del país de origen (apostillado y traducido)", "Seguro médico privado completo en España (sin copago)", "Justificante de medios económicos: extractos bancarios de los últimos 6 meses, certificado de pensión, rentas, dividendos o patrimonio"],
    where_to_apply: [{ place: "Consulado de España en tu país de residencia", detail: "Solicita el visado de residencia no lucrativa antes de viajar." }, { place: "Oficina de Extranjería (si ya estás en España legalmente)", detail: "En algunos casos se puede solicitar sin salir de España." }],
    steps: ["Acredita los medios económicos suficientes", "Solicita el visado en el consulado de España", "Viaja a España y empadrónate", "Solicita la TIE en la Oficina de Extranjería en el plazo de 1 mes", "Para renovar, acredita que sigues disponiendo de medios suficientes"],
    tips: ["No permite trabajar: si quieres trabajar, necesitas otro tipo de permiso", "Muy popular entre jubilados y personas con rentas o patrimonio", "Puedes modificarlo a permiso de trabajo si cambia tu situación"]
  },
  golden_visa: {
    id: "golden_visa", title: "Residencia para Inversores (Golden Visa)", shortTitle: "Golden Visa", category: "non_eu", badge: "Inversores", badgeColor: "bg-yellow-100 text-yellow-800", duration: "2 años (primera), renovable por 5 años", cost: "Tasa: 80 € (visado)", timeline: "20 días hábiles (vía UGE)",
    description: "Residencia para extranjeros que realizan una inversión significativa en España. NOTA: la inversión inmobiliaria ya no cualifica desde abril 2025.",
    requirements: ["Inversión significativa: deuda pública (≥2M€), acciones empresariales (≥1M€), depósitos bancarios (≥1M€), o proyecto empresarial de interés general", "Pasaporte en vigor", "Seguro médico", "Certificado de antecedentes penales"],
    documents: ["Pasaporte en vigor", "Certificado de antecedentes penales (apostillado y traducido)", "Seguro médico completo", "Documentación acreditativa de la inversión", "Formulario EX-01 o solicitud de visado de inversor"],
    where_to_apply: [{ place: "Consulado de España en tu país", detail: "Para solicitar el visado de inversor" }, { place: "Unidad de Grandes Empresas (UGE)", detail: "Para solicitar la autorización directamente en España." }],
    steps: ["Realiza la inversión y obtén documentación acreditativa", "Solicita el visado en el consulado o residencia ante la UGE", "Viaja a España", "Solicita la TIE"],
    tips: ["La vía inmobiliaria (≥500.000€) fue eliminada en abril 2025", "La UGE tramita más rápido que Extranjería", "No exige residencia efectiva para renovar"]
  },
  family_reunification: {
    id: "family_reunification", title: "Reagrupación Familiar", shortTitle: "Reagrupación familiar", category: "non_eu", badge: "No comunitario", badgeColor: "bg-pink-100 text-pink-800", duration: "Misma duración que el permiso del reagrupante", cost: "Tasa: 10,94 €", timeline: "3-6 meses",
    description: "Permite a un extranjero con residencia legal en España traer a sus familiares directos (cónyuge, hijos menores, ascendientes dependientes).",
    requirements: ["El reagrupante debe tener permiso de residencia renovado (o de larga duración)", "Medios económicos suficientes", "Vivienda adecuada (informe de habitabilidad)", "Documentación del vínculo familiar"],
    documents: ["Permiso de residencia del reagrupante en vigor", "Pasaporte del familiar a reagrupar", "Certificado de vínculo familiar (apostillados y traducidos)", "Informe de habitabilidad de la vivienda", "Justificante de ingresos suficientes", "Formulario EX-02"],
    where_to_apply: [{ place: "Oficina de Extranjería del reagrupante en España", detail: "El residente en España inicia el trámite." }, { place: "Consulado de España en el país del familiar", detail: "El familiar solicita el visado una vez aprobada la reagrupación." }],
    steps: ["El residente en España presenta la solicitud en Extranjería", "Obtiene autorización favorable", "Los familiares solicitan el visado en el consulado", "Viajan a España y solicitan la TIE"],
    tips: ["Necesitas vivienda adecuada certificada", "Los ingresos mínimos dependen del tamaño de la familia", "Los ascendientes solo pueden reagruparse si eres residente de larga duración"]
  },
  arraigo_extraordinario: {
    id: "arraigo_extraordinario", title: "Arraigo Extraordinario (RD 316/2026)", shortTitle: "Arraigo extraordinario", category: "non_eu", badge: "🆕 Regularización 2026", badgeColor: "bg-emerald-100 text-emerald-800", duration: "1 año (renovable → puede modificarse a trabajo u otros permisos)", cost: "Tasa: 38,28 € (Modelo 790-052, epígrafe 2.3.1)", timeline: "En tramitación — plazo de solicitud: 16 abril al 30 junio 2026",
    description: "Regularización extraordinaria aprobada por el Real Decreto 316/2026 (BOE 15/04/2026). Permite regularizar la situación de personas extranjeras en situación irregular que llegaron a España antes del 1 de enero de 2026.",
    requirements: ["Ser mayor de edad", "Encontrarse en España antes del 1 de enero de 2026 y en el momento de presentar la solicitud", "NO ser titular de una autorización de estancia o residencia vigente", "Haber permanecido en España de forma ininterrumpida durante los 5 meses anteriores a la solicitud", "Carecer de antecedentes penales en España y en los países donde residiste los 5 últimos años", "Cumplir AL MENOS UNO de estos supuestos: (A) haber trabajado o tener oferta/contrato de trabajo, (B) tener unidad familiar con hijos menores o ascendientes, o (C) estar en situación de vulnerabilidad acreditada"],
    documents: ["Solicitud en modelo oficial EX-32", "Copia completa del pasaporte (en vigor o caducado)", "Documentación que acredite estar en España antes del 1/1/2026", "Documentación de permanencia ininterrumpida de los últimos 5 meses", "Certificado de antecedentes penales de España y del país de residencia de los últimos 5 años", "Según el supuesto elegido: contrato de trabajo / documentación familiar / certificado de vulnerabilidad"],
    where_to_apply: [{ place: "Vía telemática (preferente) — 24/7 durante todo el plazo", detail: "A través del portal del Ministerio de Inclusión: con certificado electrónico, cl@ve o mediante abogado/gestor habilitado" }, { place: "Vía presencial con cita previa (hasta 30 junio 2026)", detail: "Oficinas de la Seguridad Social, Correos u Oficinas de Extranjería. Cita previa en el portal de la Regularización o llamando al 060" }],
    steps: ["Reúne toda la documentación acreditativa de tu estancia en España desde antes del 1/1/2026", "Obtén el certificado de antecedentes penales", "Decide el supuesto que vas a acreditar", "Solicita cita previa o accede al portal telemático antes del 30 de junio de 2026", "Presenta la solicitud EX-32 con toda la documentación"],
    tips: ["⚠️ PLAZO: solo hasta el 30 de junio de 2026. Actúa con urgencia", "La comunicación de inicio del procedimiento ya permite trabajar legalmente", "Se aceptan documentos acreditativos incluso los denegatorios"]
  },
  arraigo_social: {
    id: "arraigo_social", title: "Arraigo Social", shortTitle: "Arraigo social", category: "non_eu", badge: "Regularización", badgeColor: "bg-orange-100 text-orange-800", duration: "1 año (renovable)", cost: "Tasa: 38,28 €", timeline: "3-6 meses",
    description: "Vía de regularización para extranjeros en situación irregular que llevan al menos 2 años en España y pueden demostrar vínculos sociales.",
    requirements: ["2 años de estancia continuada en España", "Sin antecedentes penales en España ni en el país de origen", "Contrato de trabajo de al menos 1 año a jornada completa, O informe favorable de inserción social"],
    documents: ["Pasaporte en vigor (original + fotocopia)", "Certificado de empadronamiento continuo (histórico de los 2 años)", "Certificado de antecedentes penales de España y del país de origen", "Informe de integración social del Ayuntamiento o CC.AA. (o contrato de trabajo de mín. 1 año)", "Formulario EX-10"],
    where_to_apply: [{ place: "Oficina de Extranjería de tu provincia", detail: "Presentas la solicitud presencialmente con cita previa." }, { place: "Ayuntamiento (para el informe previo)", detail: "Solicita el informe de integración social, que tarda varias semanas." }],
    steps: ["Reúne pruebas de estancia de 2 años", "Obtén el informe de integración social de tu ayuntamiento", "Consigue un contrato de trabajo (si optas por esa vía)", "Presenta la solicitud en Extranjería", "Espera resolución y solicita la TIE"],
    tips: ["El empadronamiento es la prueba más fuerte de estancia", "El informe de integración social se pide al ayuntamiento o CC.AA."]
  },
  arraigo_laboral: {
    id: "arraigo_laboral", title: "Arraigo Laboral", shortTitle: "Arraigo laboral", category: "non_eu", badge: "Regularización", badgeColor: "bg-orange-100 text-orange-800", duration: "1 año (renovable)", cost: "Tasa: 38,28 €", timeline: "3-6 meses",
    description: "Para extranjeros en situación irregular que pueden demostrar que han estado trabajando en España (aunque fuera de forma irregular).",
    requirements: ["2 años de estancia continuada en España", "Relaciones laborales acreditadas (mín. 6 meses en los 2 años previos)", "Sin antecedentes penales", "La relación laboral debe probarse con resolución judicial o acta de inspección de trabajo"],
    documents: ["Pasaporte en vigor (original + fotocopia)", "Certificado de empadronamiento (acreditando 2 años de estancia)", "Certificado de antecedentes penales", "Acreditación de relaciones laborales: resolución judicial, acta de Inspección de Trabajo", "Formulario EX-10"],
    where_to_apply: [{ place: "Inspección de Trabajo (paso previo)", detail: "Puedes presentar denuncia para que acrediten la relación laboral" }, { place: "Oficina de Extranjería de tu provincia", detail: "Presentas la solicitud con cita previa." }],
    steps: ["Reúne pruebas de relación laboral", "Presenta denuncia ante Inspección de Trabajo si es necesario", "Presenta la solicitud con la acreditación laboral", "Espera resolución y solicita la TIE"],
    tips: ["No necesitas contrato nuevo: se acredita el trabajo ya realizado", "Una sentencia judicial o acta de Inspección son las pruebas más fuertes"]
  },
  arraigo_socioformativo: {
    id: "arraigo_socioformativo", title: "Arraigo para la Formación", shortTitle: "Arraigo socioformativo", category: "non_eu", badge: "Regularización", badgeColor: "bg-orange-100 text-orange-800", duration: "1 año (renovable si continúas la formación o modificas a trabajo)", cost: "Tasa: 38,28 €", timeline: "3-6 meses",
    description: "Modalidad de arraigo introducida por el nuevo Reglamento de Extranjería (RD 1155/2024). Permite regularizarse a personas en situación irregular que llevan al menos 2 años en España y se comprometen a realizar una formación profesional o curso de empleo reconocido.",
    requirements: ["2 años de permanencia continuada en España", "Estar matriculado o comprometerse a matricularse en una formación profesional, curso SEPE o programa de inserción laboral reconocido", "Sin antecedentes penales en España ni en el país de origen", "Pasaporte en vigor"],
    documents: ["Pasaporte en vigor (original + fotocopia)", "Certificado de empadronamiento continuo (acreditando 2 años de estancia)", "Matrícula o carta de admisión en el programa formativo (FP, curso SEPE, etc.)", "Certificado de antecedentes penales de España y del país de origen", "Formulario EX-10"],
    where_to_apply: [{ place: "Oficina de Extranjería de tu provincia", detail: "Con cita previa en sede.gob.es." }, { place: "SEPE (Servicio Público de Empleo Estatal)", detail: "Para información sobre cursos de formación para el empleo válidos para este arraigo." }],
    steps: ["Reúne pruebas de estancia de 2 años en España", "Matricúlate en un programa de formación profesional o curso reconocido", "Presenta la solicitud en la Oficina de Extranjería", "Espera resolución y solicita la TIE", "Completa la formación y renueva o modifica a permiso de trabajo"],
    tips: ["Permite regularizarse con solo 2 años (menos que el arraigo social que requiere 2)", "Al terminar la formación puedes modificar a permiso de trabajo", "Los cursos del SEPE, FP Básica y certificados de profesionalidad son válidos"]
  },
  arraigo_segunda_oportunidad: {
    id: "arraigo_segunda_oportunidad", title: "Arraigo de Segunda Oportunidad", shortTitle: "Arraigo segunda oportunidad", category: "non_eu", badge: "Regularización", badgeColor: "bg-orange-100 text-orange-800", duration: "1 año (renovable)", cost: "Tasa: 10,94 €", timeline: "3-6 meses",
    description: "Vía de regularización para personas que tuvieron un permiso de residencia en España, retornaron voluntariamente a su país y desean volver a residir en España. Introducida por el nuevo Reglamento de Extranjería (RD 1155/2024).",
    requirements: ["Haber sido titular de una autorización de residencia temporal o de residencia y trabajo en España", "Haberse acogido a un programa de retorno voluntario O haber retornado voluntariamente renunciando a la autorización en el consulado", "Haber cumplido el plazo de compromiso de no retorno, o haber transcurrido al menos 3 años desde el retorno voluntario", "Pasaporte en vigor"],
    documents: ["Pasaporte en vigor (original + fotocopia)", "Documentación acreditativa del retorno voluntario", "Certificado de antecedentes penales del país de origen (apostillado y traducido)", "Documentación del permiso anterior en España", "Formulario EX-10 o el correspondiente"],
    where_to_apply: [{ place: "Consulado de España en tu país de residencia actual", detail: "Presenta la solicitud de visado de retorno." }, { place: "Oficina de Extranjería de la provincia donde residirás", detail: "Si ya estás en España legalmente, puedes solicitarlo directamente aquí." }],
    steps: ["Reúne la documentación del retorno voluntario y del permiso anterior", "Solicita el visado en el consulado de España", "Viaja a España y empadrónate", "Solicita la TIE en la Oficina de Extranjería", "Renueva antes de que caduque el permiso"],
    tips: ["El procedimiento es más ágil que una primera solicitud", "Los años de residencia previa pueden computar para la residencia de larga duración", "Consulta con un profesional de extranjería para verificar si cumples el plazo de no retorno"]
  },
  arraigo_familiar: {
    id: "arraigo_familiar", title: "Arraigo Familiar", shortTitle: "Arraigo familiar", category: "non_eu", badge: "Regularización", badgeColor: "bg-orange-100 text-orange-800", duration: "5 años", cost: "Tasa: 10,94 €", timeline: "2-4 meses",
    description: "Para extranjeros que son padre/madre de un menor español, o hijos de padre/madre originariamente español.",
    requirements: ["Ser progenitor de un hijo/a español menor de edad (y tener a su cargo), O ser hijo/a de padre/madre que fue español de origen", "Pasaporte en vigor", "Sin antecedentes penales"],
    documents: ["Pasaporte en vigor del solicitante (original + fotocopia)", "Certificado de nacimiento del hijo/a español", "DNI del hijo/a español o libro de familia", "Certificado de antecedentes penales", "Formulario EX-10"],
    where_to_apply: [{ place: "Oficina de Extranjería de tu provincia", detail: "Solicitud presencial con cita previa. No necesitas haber vivido en España un tiempo mínimo." }],
    steps: ["Reúne la documentación familiar", "Presenta solicitud en Extranjería", "Espera resolución", "Solicita la TIE"],
    tips: ["No requiere tiempo mínimo de estancia en España", "Es la vía más rápida de regularización si tienes un hijo español", "Se concede directamente por 5 años"]
  },
  long_term: {
    id: "long_term", title: "Residencia de Larga Duración", shortTitle: "Larga duración", category: "non_eu", badge: "Permanente", badgeColor: "bg-indigo-100 text-indigo-800", duration: "Permanente (renovación del documento cada 5 años)", cost: "Tasa: 21,87 €", timeline: "3-6 meses",
    description: "Equivalente a la residencia permanente. Se obtiene tras 5 años de residencia legal y continuada en España.",
    requirements: ["5 años de residencia legal continuada", "No haber estado fuera de España más de 10 meses en total", "Pasaporte en vigor", "Sin antecedentes penales recientes"],
    documents: ["Pasaporte en vigor (original + fotocopia)", "TIE actual o último permiso de residencia", "Certificado de empadronamiento histórico (5 años)", "Certificado de antecedentes penales actualizado", "Formulario EX-11"],
    where_to_apply: [{ place: "Oficina de Extranjería de tu provincia", detail: "Con cita previa. Presenta la solicitud hasta 60 días antes de que caduque tu permiso actual." }, { place: "Sede electrónica (recomendado)", detail: "Tramitación online con certificado digital o cl@ve" }],
    steps: ["Presenta la solicitud 60 días antes de que caduque tu último permiso", "Acredita los 5 años de residencia continuada", "Presenta documentación en Extranjería", "Espera resolución y recoge nueva TIE"],
    tips: ["Te permite trabajar en cualquier sector y lugar de España", "Es el paso previo natural a solicitar la nacionalidad"]
  },
  nationality: {
    id: "nationality", title: "Nacionalidad Española", shortTitle: "Nacionalidad", category: "non_eu", badge: "Nacionalidad", badgeColor: "bg-red-100 text-red-800", duration: "Permanente", cost: "Tasa: 104 €", timeline: "1-3 años",
    description: "La nacionalidad española se puede obtener por residencia tras un período de residencia legal en España. El plazo varía según la nacionalidad.",
    requirements: ["Residencia legal continuada: 10 años (general), 5 años (refugiados), 2 años (iberoamericanos, andorranos, filipinos, ecuatoguineanos, portugueses, sefardíes), 1 año (nacidos en España, casados con español/a)", "Buena conducta cívica", "Superar el examen CCSE", "Superar el examen DELE A2 (si no eres de país hispanohablante)"],
    documents: ["Pasaporte en vigor (original + fotocopia)", "Certificado de nacimiento con apostilla y traducción jurada", "Certificado de empadronamiento histórico", "Certificado de antecedentes penales", "Diploma DELE A2 o superior (si aplica)", "Diploma CCSE del Instituto Cervantes"],
    where_to_apply: [{ place: "Ministerio de Justicia (sede electrónica)", detail: "La solicitud se presenta online en mjusticia.gob.es — es obligatorio hacerlo de forma telemática" }, { place: "Instituto Cervantes (exámenes previos)", detail: "CCSE y DELE A2 se realizan en el Instituto Cervantes." }],
    steps: ["Verifica que cumples el tiempo de residencia requerido", "Aprueba los exámenes CCSE y DELE A2 (si aplica)", "Presenta solicitud telemáticamente en el Ministerio de Justicia", "Espera resolución (puede tardar 1-3 años)", "Jura/promesa ante el Registro Civil"],
    tips: ["Ciudadanos iberoamericanos solo necesitan 2 años", "Casados con españoles solo necesitan 1 año", "Es necesario renunciar a la nacionalidad anterior (salvo iberoamericanos y algunas excepciones)"]
  },
  modification: {
    id: "modification", title: "Modificación de Permiso de Residencia", shortTitle: "Modificación", category: "non_eu", badge: "Trámite", badgeColor: "bg-slate-100 text-slate-800", duration: "Variable según el nuevo permiso", cost: "Tasa: 10,94 €", timeline: "1-3 meses",
    description: "Permite cambiar el tipo de autorización de residencia (por ejemplo, de estudios a trabajo, o de cuenta ajena a cuenta propia).",
    requirements: ["Tener un permiso de residencia en vigor", "Cumplir los requisitos del nuevo tipo de permiso", "Documentación específica según la modificación"],
    documents: ["TIE actual en vigor (original + fotocopia)", "Pasaporte en vigor", "Documentación específica del nuevo tipo de permiso", "Formulario EX-03 (cuenta ajena), EX-07 (cuenta propia) u otros según el tipo"],
    where_to_apply: [{ place: "Oficina de Extranjería de tu provincia", detail: "Con cita previa. Puedes presentar mientras tu permiso esté en vigor." }],
    steps: ["Identifica a qué tipo de permiso puedes cambiar", "Reúne la documentación del nuevo permiso", "Presenta la solicitud en Extranjería", "Espera resolución"],
    tips: ["La modificación más común es de estudiante a trabajo", "No todas las modificaciones son posibles: consulta las combinaciones permitidas"]
  },
  proteccion_internacional: {
    id: "proteccion_internacional", title: "Protección Internacional (Asilo y Refugio)", shortTitle: "Asilo / Refugio", category: "excepcional", badge: "Circunstancias excepcionales", badgeColor: "bg-sky-100 text-sky-800", duration: "5 años (estatuto de refugiado) / 3 años (protección subsidiaria), renovables", cost: "Gratuito", timeline: "Variable: procedimiento ordinario hasta 6 meses; puede alargarse",
    description: "Protección para personas que huyen de persecución por motivos de raza, religión, nacionalidad, opiniones políticas o pertenencia a grupo social determinado (asilo), o que corren riesgo de sufrir daños graves en su país (protección subsidiaria).",
    requirements: ["Encontrarse en España o en frontera española", "Acreditar fundados temores de persecución en su país de origen", "No haber sido reconocido como refugiado en otro país seguro"],
    documents: ["Pasaporte u otro documento de viaje (si se dispone)", "Cualquier documentación que acredite los motivos de persecución o riesgo", "Formulario de solicitud de protección internacional", "Fotografías recientes"],
    where_to_apply: [{ place: "Oficina de Asilo y Refugio (OAR) — Madrid", detail: "C/ Pradillo, 40. Cita previa por teléfono: 91 537 25 00" }, { place: "Comisarías de Policía Nacional habilitadas", detail: "En las principales ciudades." }, { place: "Puestos fronterizos (aeropuertos y puertos)", detail: "Puedes solicitarlo nada más entrar en España" }],
    steps: ["Solicita la protección internacional lo antes posible tras llegar a España", "Recoge el documento de solicitante", "Asiste a la entrevista personal ante el funcionario de la OAR", "Espera la resolución", "Si es favorable: obtén el estatuto de refugiado y solicita la TIE"],
    tips: ["Durante la tramitación tienes derecho a permanecer en España legalmente", "Tienes derecho a asistencia jurídica gratuita y a intérprete", "ACNUR y varias ONG (CEAR, Accem, Cruz Roja) ofrecen asistencia gratuita", "Tras 6 meses de espera, puedes solicitar autorización para trabajar"]
  },
  victima_trata: {
    id: "victima_trata", title: "Residencia por ser Víctima de Trata de Seres Humanos", shortTitle: "Víctima de trata", category: "excepcional", badge: "Circunstancias excepcionales", badgeColor: "bg-rose-100 text-rose-800", duration: "5 años (renovable)", cost: "Tasa: 10,94 €", timeline: "Período de restablecimiento: 90 días; residencia definitiva: 1-3 meses",
    description: "Autorización de residencia y trabajo para extranjeros identificados como víctimas de trata de seres humanos (art. 59 bis LOEx). Incluye un período de restablecimiento de 90 días.",
    requirements: ["Haber sido identificado/a como víctima de trata por las Fuerzas y Cuerpos de Seguridad del Estado", "Cooperar con la investigación policial y judicial (o acreditar situación personal de riesgo grave)", "Haber roto el vínculo con los tratantes"],
    documents: ["Informe de identificación como víctima de trata emitido por las FCSE", "Pasaporte u otro documento de identidad (si se dispone)", "Formulario EX-10"],
    where_to_apply: [{ place: "Unidad Central de Redes de Inmigración Ilegal (UCRIF)", detail: "De la Policía Nacional. Son ellos quienes inician el proceso de identificación." }, { place: "ONG especializadas", detail: "Médicos del Mundo, APRAMP, Proyecto Esperanza, Cruz Roja." }],
    steps: ["La identificación como víctima la realiza la Policía Nacional (UCRIF)", "Se concede un período de restablecimiento de 90 días", "Se solicita la autorización de residencia y trabajo en Extranjería", "Se obtiene la TIE y se puede acceder al mercado laboral"],
    tips: ["No es obligatorio denunciar para obtener la protección: basta con acreditar la situación de riesgo grave", "Tienes derecho a asistencia jurídica gratuita, atención médica y alojamiento seguro"]
  },
  victima_violencia_genero: {
    id: "victima_violencia_genero", title: "Residencia por ser Víctima de Violencia de Género", shortTitle: "Víctima de violencia de género", category: "excepcional", badge: "Circunstancias excepcionales", badgeColor: "bg-fuchsia-100 text-fuchsia-800", duration: "5 años (renovable)", cost: "Tasa: 10,94 €", timeline: "Autorización provisional inmediata; definitiva: 1-3 meses",
    description: "Autorización de residencia y trabajo independiente para mujeres extranjeras víctimas de violencia de género. No requieren condena previa para obtener protección provisional.",
    requirements: ["Ser mujer extranjera (con o sin residencia legal) víctima de violencia de género", "Haber solicitado una orden de protección o informe del Ministerio Fiscal"],
    documents: ["Orden de protección o medidas cautelares emitidas por el Juzgado de Violencia sobre la Mujer", "Pasaporte u otro documento de identidad", "Formulario EX-10"],
    where_to_apply: [{ place: "Juzgado de Violencia sobre la Mujer (primer paso)", detail: "Solicita la orden de protección." }, { place: "Oficina de Extranjería de tu provincia", detail: "Presenta la solicitud de residencia con la orden de protección." }, { place: "016 (gratuito, 24h)", detail: "Para asistencia y orientación inmediata." }],
    steps: ["Denuncia la situación y solicita la orden de protección", "Solicita la autorización provisional de residencia y trabajo en Extranjería", "La autorización provisional se concede inmediatamente", "Tras sentencia condenatoria, se convierte en autorización definitiva de 5 años"],
    tips: ["No necesitas estar en situación regular para solicitarlo", "La autorización provisional de trabajo se concede desde el mismo momento de la orden de protección", "El 016 es gratuito, confidencial y disponible 24h en múltiples idiomas"]
  },
  colaboracion_autoridades: {
    id: "colaboracion_autoridades", title: "Residencia por Colaboración con Autoridades", shortTitle: "Colaboración con autoridades", category: "excepcional", badge: "Circunstancias excepcionales", badgeColor: "bg-violet-100 text-violet-800", duration: "1 año (primera, renovable)", cost: "Tasa: 10,94 €", timeline: "1-3 meses",
    description: "Autorización de residencia temporal para extranjeros en situación irregular que colaboran con las autoridades en la lucha contra redes delictivas u otros delitos graves (art. 59 LOEx).",
    requirements: ["Colaboración activa con Fuerzas y Cuerpos de Seguridad, Ministerio Fiscal o autoridad judicial", "Informe favorable de la autoridad con la que colaboras", "No representar amenaza para el orden público"],
    documents: ["Informe favorable de la autoridad policial, fiscal o judicial", "Pasaporte u otro documento de identidad", "Formulario EX-10"],
    where_to_apply: [{ place: "Delegación/Subdelegación del Gobierno de tu provincia", detail: "La solicitud la inicia habitualmente la propia autoridad policial o fiscal." }, { place: "Oficina de Extranjería de tu provincia", detail: "Con cita previa." }],
    steps: ["La autoridad policial, fiscal o judicial emite el informe de colaboración", "Se suspende cautelarmente cualquier expediente de expulsión en curso", "Se presenta la solicitud de autorización de residencia", "Si se aprueba, se obtiene la TIE y permiso de trabajo"],
    tips: ["Puede solicitarse aunque exista un expediente de expulsión en trámite: la expulsión queda suspendida", "La colaboración puede ser con policía, fiscalía o jueces"]
  },
  razones_humanitarias: {
    id: "razones_humanitarias", title: "Residencia por Razones Humanitarias", shortTitle: "Razones humanitarias", category: "excepcional", badge: "Circunstancias excepcionales", badgeColor: "bg-cyan-100 text-cyan-800", duration: "1 año (renovable)", cost: "Tasa: 38,28 €", timeline: "1-3 meses",
    description: "Autorización de residencia temporal para extranjeros que acreditan razones humanitarias de especial gravedad: enfermedad sobrevenida grave, imposibilidad de retorno acreditada, o situaciones de vulnerabilidad extrema.",
    requirements: ["Encontrarse en España", "Acreditar al menos UNA de estas circunstancias: (A) Enfermedad sobrevenida grave; (B) Peligro para la integridad física si regresa; (C) Otras razones humanitarias de especial gravedad"],
    documents: ["Pasaporte u otro documento de identidad", "Formulario EX-10", "Informe médico oficial (si la causa es enfermedad)", "Informe de servicios sociales acreditando la situación de vulnerabilidad (si aplica)", "Certificado de empadronamiento"],
    where_to_apply: [{ place: "Oficina de Extranjería de tu provincia", detail: "Con cita previa en sede.gob.es." }, { place: "ONG y servicios sociales", detail: "Cruz Roja, Cáritas, CEAR pueden emitir informes de vulnerabilidad y apoyar la solicitud." }],
    steps: ["Reúne la documentación acreditativa de la situación humanitaria", "Solicita informe de servicios sociales si aplica", "Presenta la solicitud EX-10 en la Oficina de Extranjería", "Espera resolución y solicita la TIE"],
    tips: ["Se valoran situaciones muy diversas: enfermedad, riesgo en país de origen, situación de calle, menores a cargo", "Un informe detallado de servicios sociales o de una ONG reconocida puede ser determinante"]
  },
  mena_menor_no_acompanado: {
    id: "mena_menor_no_acompanado", title: "Residencia para Menores Extranjeros No Acompañados (MENA)", shortTitle: "Menores no acompañados (MENA)", category: "excepcional", badge: "Circunstancias excepcionales", badgeColor: "bg-amber-100 text-amber-800", duration: "2 años (renovable; al cumplir 18 años puede modificarse a trabajo o arraigo)", cost: "Exenta de tasa", timeline: "Inmediata (al quedar bajo tutela de la CC.AA.)",
    description: "Autorización de residencia para menores extranjeros no acompañados que se encuentran bajo la tutela de las Comunidades Autónomas o entidades públicas de protección de menores.",
    requirements: ["Ser menor de 18 años extranjero", "No estar acompañado de sus progenitores o tutores legales", "Encontrarse bajo la tutela de la entidad pública de protección de menores de una CC.AA."],
    documents: ["Documento de identidad del menor si está disponible", "Resolución de tutela o guarda emitida por la entidad pública", "Formulario EX-10 (presentado por la entidad tutora)", "Informe social de la entidad tutora"],
    where_to_apply: [{ place: "Oficina de Extranjería de la provincia donde está tutelado", detail: "La solicitud la presenta la entidad de protección de menores, no el menor directamente." }],
    steps: ["El menor es localizado y puesto bajo tutela de la entidad de protección de la CC.AA.", "La entidad tutora solicita la autorización de residencia", "Se concede autorización de residencia por 2 años", "Al cumplir 18 años, puede solicitar renovación o modificación"],
    tips: ["Al cumplir 18 años, los años bajo tutela computan a efectos del arraigo social", "Desde los 16 años se puede solicitar autorización de trabajo (la solicita la entidad tutora)"]
  },
  proteccion_temporal: {
    id: "proteccion_temporal", title: "Protección Temporal (Directiva UE 2001/55/CE)", shortTitle: "Protección temporal", category: "excepcional", badge: "Circunstancias excepcionales", badgeColor: "bg-blue-100 text-blue-800", duration: "1 año (prorrogable hasta 3 años en total)", cost: "Gratuito", timeline: "Resolución rápida (días/semanas)",
    description: "Protección provisional para personas desplazadas de Ucrania desde el 4 de marzo de 2022. Otorga permiso de residencia, trabajo, alojamiento, asistencia sanitaria y educación.",
    requirements: ["Ser nacional ucraniano/a desplazado/a desde el 24 de febrero de 2022 (o familiar directo)", "Encontrarse en España o solicitar en frontera"],
    documents: ["Pasaporte ucraniano u otro documento de identidad válido", "Formulario de solicitud de protección temporal", "Fotografías recientes"],
    where_to_apply: [{ place: "Comisarías de Policía Nacional habilitadas", detail: "Son el principal punto de solicitud. Cita previa en sede.gob.es" }, { place: "Centro de Atención a Desplazados de Ucrania (CREADE)", detail: "En Madrid, Barcelona, Valencia y otras ciudades." }],
    steps: ["Acude a la comisaría habilitada o al CREADE más cercano", "Presenta la documentación de identidad", "Se registra y se expide el documento de protección temporal", "Con el documento, puedes acceder al mercado laboral, sanidad y educación"],
    tips: ["El permiso de trabajo está incluido: no necesitas solicitud adicional", "Los menores tienen acceso garantizado al sistema educativo español", "La protección temporal no impide solicitar asilo ordinario si lo deseas"]
  }
};

export function getRecommendedPermits(answers) {
  const { nationality_type, eu_situation, non_eu_situation, non_eu_purpose, irregular_time, permit_type_held, tourist_purpose, exceptional_type } = answers;

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
    if (non_eu_situation === "family_eu") return ["eu_family_card"];
    if (non_eu_situation === "family_spanish") return ["family_spanish", "arraigo_familiar"];

    // Reagrupación: viene del wizard manual o del analizador con tiene_permiso_previo
    if (non_eu_situation === "reagrupacion" || (non_eu_situation === "no_visa" && non_eu_purpose === "family_reunification" && answers.tiene_permiso_previo)) {
      return ["family_reunification"];
    }

    if (non_eu_situation === "exceptional") {
      switch (exceptional_type) {
        case "asylum": return ["proteccion_internacional", "razones_humanitarias"];
        case "trata": return ["victima_trata"];
        case "violencia_genero": return ["victima_violencia_genero"];
        case "colaboracion": return ["colaboracion_autoridades"];
        case "humanitarias": return ["razones_humanitarias", "proteccion_internacional"];
        case "ucrania": return ["proteccion_temporal", "proteccion_internacional"];
        case "menor": return ["mena_menor_no_acompanado"];
        default: return ["proteccion_internacional", "razones_humanitarias", "victima_trata", "victima_violencia_genero"];
      }
    }

    if (non_eu_situation === "no_visa") {
      switch (non_eu_purpose) {
        case "work_employee": return ["work_employee", "tarjeta_azul_ue"];
        case "work_self": return ["work_self", "visado_emprendedor"];
        case "study": return ["student", "busqueda_empleo"];
        case "digital_nomad": return ["digital_nomad"];
        case "family_reunification": return ["family_reunification"];
        case "investor": return ["golden_visa"];
        case "no_work": return ["residencia_no_lucrativa"];
        default: return ["work_employee", "student", "residencia_no_lucrativa"];
      }
    }

    if (non_eu_situation === "tourist") {
      switch (tourist_purpose) {
        case "stay_work": return ["arraigo_extraordinario", "work_employee", "work_self", "digital_nomad"];
        case "stay_study": return ["student", "busqueda_empleo"];
        case "stay_family": return ["family_spanish", "arraigo_familiar", "family_reunification"];
        default: return ["arraigo_extraordinario", "student", "work_employee"];
      }
    }

    if (non_eu_situation === "irregular") {
      if (irregular_time === "more_3") return ["arraigo_extraordinario", "arraigo_social", "arraigo_laboral", "arraigo_socioformativo", "arraigo_familiar"];
      else if (irregular_time === "1_to_3") return ["arraigo_extraordinario", "arraigo_laboral", "arraigo_socioformativo", "arraigo_familiar"];
      else return ["arraigo_extraordinario", "arraigo_socioformativo", "arraigo_familiar"];
    }

    if (non_eu_situation === "has_permit") {
      switch (permit_type_held) {
        case "renew": return ["work_employee", "work_self", "student", "residencia_no_lucrativa"];
        case "modify": return ["modification", "busqueda_empleo"];
        case "long_term": return ["long_term"];
        case "nationality": return ["nationality"];
        default: return ["long_term"];
      }
    }
  }

  return ["eu_registration", "work_employee"];
}
