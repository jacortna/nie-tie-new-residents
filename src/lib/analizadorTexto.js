/**
 * Analizador de texto por palabras clave - v7.2
 * Sistema completo de detección de situaciones migratorias
 * Optimización estricta para la derivación de Cuenta Propia y Autónomos.
 */

// ── DICCIONARIOS EXPANDIDOS y OPTIMIZADOS ──────────────────────────────────

const DICCIONARIOS = {
  // NACIONALIDAD UE / EEE / SUIZA
  UE: [
    "europeo", "europea", "comunitario", "comunitaria", "ciudadano ue", "ciudadana ue",
    "alemania", "francia", "italia", "portugal", "rumania", "polonia", "bulgaria",
    "grecia", "holanda", "paises bajos", "belgica", "suecia", "dinamarca", "finlandia",
    "austria", "hungria", "republica checa", "chequia", "eslovaquia", "eslovenia",
    "croacia", "lituania", "letonia", "estonia", "irlanda", "luxemburgo", "malta",
    "chipre", "noruega", "islandia", "liechtenstein", "suiza",
    "aleman", "alemana", "frances", "francesa", "italiano", "italiana",
    "portugues", "portuguesa", "rumano", "rumana", "polaco", "polaca",
    "bulgaro", "bulgara", "griego", "griega", "holandes", "holandesa",
    "belga", "sueco", "sueca", "danes", "danesa", "finlandes", "finlandesa",
    "austriaco", "austriaca", "hungaro", "hungara", "checo", "checa",
    "eslovaco", "eslovaca", "esloveno", "eslovena", "croata",
    "lituano", "leton", "estonio", "irlandes", "irlandesa",
    "luxemburgues", "maltes", "chipriota", "noruego", "islandes", "suizo"
  ],

  // PAÍSES Y GENTILICIOS FUERA DE LA UE
  MUNDO: [
    "colombia", "venezuela", "honduras", "peru", "argentina", "ecuador", "marruecos",
    "cuba", "dominicana", "mexico", "chile", "bolivia", "paraguay", "uruguay", 
    "estados unidos", "eeuu", "brasil", "colombiano", "venezolano", "hondureno", 
    "peruano", "argentino", "ecuatoriano", "marroqui", "cubano", "dominicano", 
    "mexicano", "chileno", "boliviano", "paraguayo", "uruguayo", "brasileno",
    "extranjero", "extranjera", "emigrar", "inmigrante", "mi pais", "pais de origen"
  ],

  // SITUACIONES EXCEPCIONALES
  UCRANIA: [
    "ucrania", "ucraniano", "ucraniana", "guerra de ucrania",
    "desplazado ucrania", "kiev", "proteccion temporal ucrania", "proteccion temporal"
  ],

  VIOLENCIA_GENERO: [
    "violencia de genero", "violencia domestica", "maltrato", "maltrata",
    "maltratada", "victima de violencia", "me pega", "me golpea",
    "me amenaza", "me agrede", "orden de proteccion", "denuncia por maltrato",
    "violencia machista", "pareja violenta", "marido violento", "mujer maltratada",
    "me controla", "me encierra", "agresor", "agresora", "abuso psicologico",
    "me insulta", "me humilla", "control coercitivo", "aislamiento", "miedo a la pareja"
  ],

  TRATA: [
    "trata de personas", "trata de seres humanos", "victima de trata",
    "explotacion sexual", "explotacion laboral", "prostitucion forzada",
    "trabajo forzado", "esclavitud moderna", "me quitaron el pasaporte",
    "me tienen enganada", "me trajeron enganada", "trafficking",
    "explotacion sexual comercial", "servidumbre", "deuda imposible"
  ],

  ASILO: [
    "asilo", "solicitar asilo", "pedir asilo", "refugio", "refugiado", "refugiada",
    "persecucion", "perseguido", "perseguida", "me persiguen",
    "guerra en mi pais", "conflicto armado", "hui de mi pais",
    "amenaza de muerte", "proteccion internacional", "estatuto de refugiado",
    "temo por mi vida", "persecucion politica", "discriminacion religiosa"
  ],

  HUMANITARIAS: [
    "razon humanitaria", "razones humanitarias", "enfermedad grave",
    "cancer", "vih", "sida", "tratamiento medico urgente", "hospitalizacion prolongada",
    "discapacidad grave", "emergencia humanitaria", "operacion urgente",
    "enfermedad terminal", "cuidador de familia enferma"
  ],

  COLABORACION: [
    "colaboro con la policia", "denuncia redes", "red criminal",
    "delincuencia organizada", "narcotrafico", "testigo protegido",
    "colaboracion con autoridades", "he denunciado la red", "testigo de delito",
    "informante", "witness protection"
  ],

  MENA: [
    "menor no acompanado", "mena", "menor extranjero sin familia",
    "sin padres en espana", "soy menor de edad", "tengo menos de 18",
    "huerfano en espana", "menor desprotegido", "no tengo familia aqui"
  ],

  // PERMISOS VIGENTES
  NACIONALIDAD: [
    "nacionalidad espanola", "ciudadania espanola",
    "hacerme espanol", "hacerme espanola", "solicitar nacionalidad",
    "quiero ser espanol", "quiero ser espanola", "pedir la nacionalidad"
  ],

  RENOVACION: [
    "renovar permiso", "renovar residencia", "renovar nie", "renovar tie",
    "renovar tarjeta", "permiso caducado", "residencia caducada",
    "tarjeta caducada", "se me acaba el permiso", "vence el permiso",
    "me caduca en", "caduca el proximo", "quiero renovar", "renovacion proxima"
  ],

  RENOVACION_PROXIMA: [
    "vence en", "se acaba en", "caduca en", "expira en", "queda poco",
    "proximamente", "en pocos meses", "antes de fin de ano", "antes de fin de mes"
  ],

  MODIFICACION: [
    "modificar permiso", "cambiar permiso", "modificacion de permiso",
    "de estudiante a trabajo", "de estudios a trabajo",
    "de cuenta ajena a cuenta propia", "cambiar tipo de permiso",
    "cambio de modalidad"
  ],

  LARGA_DURACION: [
    "larga duracion", "residencia permanente", "5 anos legalmente",
    "cinco anos legalmente", "llevo 5 anos con permiso",
    "quiero residencia permanente", "permanente", "tarjeta permanente"
  ],

  TIENE_PERMISO: [
    "tengo permiso de residencia", "tengo residencia legal", "tengo nie vigente",
    "tengo tie vigente", "tengo tarjeta de residencia vigente",
    "resido legalmente", "tengo autorizacion de residencia vigente",
    "tengo permiso vigente", "permiso valido"
  ],

  // FAMILIA
  FAMILIAR_ESPANOL: [
    "mi pareja es espanola", "mi pareja es espanol",
    "mi marido es espanol", "mi mujer es espanola",
    "mi conyuge es espanol", "mi conyuge es espanola",
    "mi padre es espanol", "mi madre es espanola",
    "mi hijo es espanol", "mi hija es espanola",
    "hijo espanol", "hija espanola", "padre espanol", "madre espanola",
    "familiar espanol", "familiar de espanol",
    "soy hijo de espanol", "soy hija de espanola",
    "descendiente de espanol", "tengo un hijo espanol",
    "tengo una hija espanola", "abuelo espanol", "abuela espanola",
    "conyuge espanol", "pareja espanola"
  ],

  FAMILIAR_UE: [
    "mi pareja es europea", "mi pareja es europeo",
    "mi marido es europeo", "mi mujer es europea",
    "familiar comunitario", "familiar europeo",
    "familiar de ciudadano ue", "familiar de ciudadano europeo"
  ],

  // ARRAIGO
  ARRAIGO_EXTRAORDINARIO: [
    "arraigo extraordinario", "regularizacion extraordinaria",
    "regularizacion 2026", "real decreto 316", "rd 316", "ex-32",
    "nueva regularizacion masiva", "decreto de regularizacion"
  ],

  ARRAIGO_SOCIAL: [
    "arraigo social", "arraigo por circunstancias excepcionales",
    "arraigo de raices", "integral social", "vida familiar"
  ],

  ARRAIGO_LABORAL: [
    "arraigo laboral", "tres anos trabajando", "contrato de trabajo estable",
    "situacion laboral estable"
  ],

  SEGUNDA_OPORTUNIDAD: [
    "segunda oportunidad", "programa reincorporacion", "retorno con arraigo",
    "retorno asistido"
  ],

  // SITUACION SIN PAPELES
  SIN_PAPELES: [
    "sin papeles", "sin documentos en regla", "sin permiso de residencia",
    "indocumentado", "indocumentada", "estoy ilegal", "ilegal",
    "en situacion irregular", "no tengo papeles", "no tengo permiso",
    "permiso caducado hace", "caduco hace", "me quede sin papeles",
    "estoy sin regularizar", "irregular", "sin permiso valido"
  ],

  PERMISO_CADUCADO_ESPECIFICO: [
    "permiso vencido", "caduco hace anos", "caduco hace meses",
    "permiso expirado", "residencia expirada", "nie caducado"
  ],

  // TIEMPO EN ESPAÑA
  MENOS_1_ANO: [
    "menos de un ano", "menos de 1 ano", "hace unos meses",
    "llevo 3 meses", "llevo 4 meses", "llevo 5 meses",
    "llevo 6 meses", "llevo 7 meses", "llevo 8 meses",
    "llevo 9 meses", "llevo 10 meses", "llevo 11 meses",
    "recien llegue", "llegue hace poco", "hace poco", "reciente",
    "recientemente", "seis meses"
  ],

  UNO_A_TRES_ANOS: [
    "llevo 1 ano", "llevo un ano", "llevo 2 anos", "llevo dos anos",
    "llevo ano y medio", "llevo 18 meses", "llevo 20 meses",
    "llevo casi 2 anos", "hace un ano", "hace dos anos", "alrededor de 2 anos"
  ],

  MAS_TRES_ANOS: [
    "llevo 3 anos", "llevo 4 anos", "llevo 5 anos", "llevo 6 anos",
    "llevo 7 anos", "llevo 8 anos", "llevo 9 anos", "llevo 10 anos",
    "llevo tres anos", "llevo cuatro anos", "llevo cinco anos",
    "llevo muchos anos", "llevo bastantes anos", "llevo mucho tiempo aqui",
    "mas de 3 anos", "mas de tres anos", "mas de 5 anos aqui",
    "varios anos", "anos aqui"
  ],

  // TRABAJO / VISADOS
  TURISTA: [
    "turista", "visa turistica", "visado turistico",
    "vine como turista", "estoy de turismo", "estoy de visita",
    "90 dias", "noventa dias", "estancia corta",
    "visado schengen", "me quedo mas de 90 dias",
    "se me acaba el visado de turista"
  ],

  NOMADA_DIGITAL: [
    "nomada digital", "teletrabajo desde espana",
    "trabajo remoto desde espana", "trabajo para empresa extranjera desde espana",
    "trabajo en remoto para empresa de otro pais",
    "visa nomada digital", "permiso nomada digital",
    "trabajo online para empresa extranjera", "teletrabajo", "trabajo remoto"
  ],

  EMPRENDEDOR: [
    "emprendedor", "emprendedora", "startup", "proyecto innovador",
    "empresa innovadora", "ley de startups", "actividad emprendedora",
    "plan de negocio innovador", "visa emprendedor", "permiso emprendedor",
    "crear empresa en espana", "montar startup"
  ],

  INVERSOR: [
    "golden visa", "inversion in espana", "invertir en espana",
    "inversor", "inversora", "visa inversora", "permiso inversor",
    "inversion inmobiliaria", "deuda publica espana",
    "proyecto de interes general", "inversor activo"
  ],

  // ── REFORZADO: CUENTA PROPIA / AUTÓNOMOS ──
  CUENTA_PROPIA: [
    "autonomo", "autonoma", "cuenta propia", "trabajar por mi cuenta",
    "mi propio negocio", "abrir un negocio en espana", "abrir un negocio",
    "montar una empresa en espana", "permiso de trabajo por cuenta propia",
    "alta de autonomo en espana", "trabajador independiente", "freelance",
    "poner un negocio", "montar un negocio", "poner una tienda", "abrir un local",
    "abrir una tienda", "trabajar de forma independiente", "mi propia empresa",
    "hacer trabajos por mi cuenta", "ser mi propio jefe", "vender por mi cuenta",
    "ofrecer mis servicios", "abrir una cafeteria", "abrir un restaurante", "vender online"
  ],

  CUENTA_AJENA: [
    "contrato de trabajo en espana", "oferta de trabajo en espana",
    "empresa me contrata en espana", "tengo oferta laboral en espana",
    "permiso de trabajo por cuenta ajena", "visa de trabajo",
    "visado de trabajo", "me han ofrecido trabajo en espana",
    "me contratan en espana", "me llaman para trabajar en espana",
    "contrato laboral", "empleado", "empleada"
  ],

  TRABAJO_ILEGAL: [
    "trabajo ilegal", "trabajo en negro", "sin contrato",
    "trabajo clandestino", "trabajando sin permiso", "trabajo sin registrar",
    "trabajo no declaro", "no pagado", "trabajo sin papeles",
    "explotacion laboral", "sin salario", "pagado en efectivo",
    "trabajo esclavo", "trabajando sin permiso legal"
  ],

  TRABAJO_TEMPORAL: [
    "trabajo temporal", "trabajo de temporada", "seasonal worker",
    "trabajo estacional", "trabajo puntual", "trabajo ocasional",
    "temporada de recoleccion", "trabajo de campana"
  ],

  SIN_CONTRATO: [
    "sin contrato", "contrato no firmado", "acuerdo verbal",
    "trabajo informalmente", "no tengo contrato"
  ],

  FALTA_PAGO: [
    "no me pagan", "no cobro", "salario atrasado", "deudor de salario",
    "no recibo sueldo", "pago retrasado", "debe dinero", "salario impago",
    "me debe meses de sueldo", "no pagado"
  ],

  ALTA_CUALIFICACION: [
    "ingeniero", "ingeniera", "medico", "medica", "doctor", "doctora",
    "abogado", "abogada", "arquitecto", "arquitecta", "economista",
    "programador", "programadora", "informatico", "informatica",
    "master universitario", "doctorado", "titulo universitario",
    "alta cualificacion", "altamente cualificado", "altamente cualificada",
    "tarjeta azul", "blue card", "trabajador cualificado",
    "salario alto", "ingeniero de software", "desarrollador", "desarrolladora",
    "especialista", "experto", "profesional titulado"
  ],

  ESTUDIOS: [
    "estudiar en espana", "estudiar una carrera en espana",
    "hacer un master en espana", "estudiar el doctorado en espana",
    "universidad espanola", "beca en espana",
    "matricularme en espana", "quiero estudiar en espana",
    "visa de estudios", "visado de estudios", "permiso de estudios",
    "estudiante", "alumno", "becario", "investigador",
    "formacion en espana", "realizar una formacion en espana",
    "hacer una formacion en espana", "quiero formarme en espana",
    "curso en espana", "hacer un curso en espana", "ciclo formativo",
    "formacion profesional", "fp en espana", "grado en espana",
    "matricularme en un curso", "aprender en espana", "formarme en espana",
    "quiero estudiar", "quiero hacer un curso", "quiero hacer una formacion",
    "quiero realizar una formacion", "formacion", "formarme"
  ],

  REAGRUPACION: [
    "reagrupar a mi familia", "traer a mi familia a espana",
    "reagrupacion familiar", "traer a mis hijos a espana",
    "traer a mi conyuge a espana", "traer a mi pareja a espana",
    "quiero traer a mis hijos a espana", "tramitar reagrupacion",
    "visa de reagrupacion", "visado de reagrupacion familiar",
    "family reunification",
    "traer a mi hija", "traer a mi hijo", "traer a mi madre",
    "traer a mi padre", "traer a mis padres", "traer a mi esposo",
    "traer a mi esposa", "traer a mi marido", "traer a mi mujer",
    "traer a mis hijos", "traer a mi familia", "traer a vivir conmigo",
    "vivir conmigo en espana", "vengan a vivir conmigo",
    "que venga a vivir conmigo", "que vengan a vivir conmigo",
    "quiero que mi familia este conmigo", "quiero que mi hijo este conmigo",
    "quiero que mi hija este conmigo", "quiero que mis hijos esten conmigo",
    "reunir con mi familia", "reunirme con mi familia",
    "mi familia pueda venir", "mi hijo pueda venir", "mi hija pueda venir",
    "solicitar reagrupacion", "pedir reagrupacion",
    "traer a mis hijos menores", "traer a mi familia desde",
    "vivir junto a mi", "venirse a vivir conmigo"
  ],

  NO_LUCRATIVA: [
    "jubilado en espana", "jubilada en espana", "pension de jubilacion en espana",
    "rentista en espana", "no necesito trabajar en espana",
    "tengo suficiente dinero para vivir en espana",
    "vivir sin trabajar en espana", "residencia no lucrativa",
    "ahorros para vivir en espana", "visa no lucrativa",
    "permiso de residencia sin trabajar", "jubilacion", "pensionista"
  ],

  BUSQUEDA_EMPLEO: [
    "acabe mis estudios en espana", "termine la carrera en espana",
    "termine el master en espana", "busco trabajo despues de estudiar en espana",
    "permiso de busqueda de empleo", "ex becario en espana",
    "investigador que busca empleo en espana", "buscar trabajo"
  ],

  RETORNO: [
    "retorne voluntariamente", "retorno voluntario",
    "volvi a mi pais voluntariamente", "programa de retorno",
    "quiero volver a espana despues de retornar",
    "arraigo segunda oportunidad", "retorno asistido"
  ],

  // CONTEXTO UBI
  QUIERE_VENIR: [
    "quiero ir a espana", "quiero emigrar a espana",
    "me quiero ir a espana", "desde mi pais quiero ir",
    "pedir visa para espana", "solicitar visa para espana",
    "emigrar a espana", "irme a espana a vivir",
    "me gustaria vivir en espana", "quiero mudarme a espana",
    "planeo ir a espana", "pienso emigrar a espana",
    "tengo intension de ir", "viajar a espana"
  ],

  DENTRO_ESPANA: [
    "estoy en espana", "vivo en espana", "resido en espana",
    "llevo aqui", "llevo viviendo en espana", "estoy viviendo en espana",
    "me encuentro en espana", "actualmente en espana", "aqui en espana"
  ],

  RECIEN_LLEGADO: [
    "acabo de llegar", "hace poco llegue", "recien llegue",
    "llegue hace poco", "mi primer ano", "primeros meses"
  ],

  // NECESIDADES ADICIONALES
  SIN_VIVIENDA: [
    "sin casa", "sin vivienda", "sin domicilio", "duermo en la calle",
    "sin techo", "hogar precario", "ocupo", "casita improvisada",
    "vivo en la calle", "sin lugar donde dormir"
  ],

  PROBLEMA_VIVIENDA: [
    "problema de vivienda", "alquiler muy caro", "no puedo pagar alquiler",
    "desahucio", "desalojamiento", "riesgo desahucio", "vivienda precaria"
  ],

  NECESIDAD_MEDICA: [
    "necesito medicinas", "no puedo ir al medico", "medico", "hospital",
    "consulta medica", "operacion", "urgencia medica", "enfermedad",
    "discapacidad", "cuidados especiales", "embarazo", "parto",
    "salud mental", "depresion", "ansiedad"
  ],

  AYUDA_ECONOMICA: [
    "sin dinero", "economicamente vulnerable", "pobres", "necesidad economica",
    "no tengo dinero", "muy dificultades economicas", "extrema pobreza",
    "vivir con poco dinero", "subsidio", "ayuda social"
  ],

  APOYO_PSICOLOGICO: [
    "trauma", "estres", "miedo", "ansiedad", "depresion",
    "apoyo psicologico", "necesito psicologo", "ayuda mental",
    "trastorno", "psicologico", "psiquiatra"
  ],

  URGENCIA: [
    "urgente", "urgencia", "rapido", "pronto", "inmediatamente",
    "ya no puedo", "situacion desesperada", "critica", "emergencia"
  ],

  // CAPACIDAD TRABAJO
  TIENE_TRABAJO: [
    "tengo trabajo", "trabajo en", "empleado en", "trabajando en",
    "puesto de trabajo", "mi trabajo", "donde trabajo"
  ],

  BUSCA_TRABAJO: [
    "busco trabajo", "buscando empleo", "necesito trabajo", "quiero trabajar",
    "en busca de empleo", "offers de trabajo"
  ],

  NO_PUEDE_TRABAJAR: [
    "no puedo trabajar", "impedido para trabajar", "discapacidad total",
    "minusvalido", "minusvalia", "cuidador", "cuidadora", "padre cuidador",
    "madre cuidadora", "incapacitado", "incapacitada"
  ]
};

// ── UTILIDADES ─────────────────────────────────────────────────────────────

const normalizar = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const contiene = (textoNorm, palabras) =>
  palabras.some((p) => {
    if (p.includes(" ")) return textoNorm.includes(p);
    return new RegExp(`\\b${p}\\b`, "u").test(textoNorm);
  });

const contarCoincidencias = (textoNorm, palabras) =>
  palabras.filter((p) => {
    if (p.includes(" ")) return textoNorm.includes(p);
    return new RegExp(`\\b${p}\\b`, "u").test(textoNorm);
  }).length;

function extraerMesesEstancia(t) {
  const mapaNumeros = {
    "un": 1, "una": 1, "dos": 2, "tres": 3, "cuatro": 4, "cinco": 5, "seis": 6,
    "siete": 7, "ocho": 8, "nueve": 9, "diez": 10, "once": 11, "doce": 12, "medio": 0.5
  };

  const regexAnosMeses = /(\d+|un|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\s*an?os?\s*y\s*(\d+|un|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|medio)\s*mes/iu;
  let match = t.match(regexAnosMeses);
  if (match) {
    const numAnos = isNaN(match[1]) ? (mapaNumeros[match[1]] || 0) : parseInt(match[1], 10);
    const numMeses = isNaN(match[2]) ? (mapaNumeros[match[2]] || 0) : parseInt(match[2], 10);
    return (numAnos * 12) + (match[2] === "medio" ? 6 : numMeses);
  }

  const regexAnos = /(\d+|un|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\s*an?os?/iu;
  match = t.match(regexAnos);
  if (match) {
    const numAnos = isNaN(match[1]) ? (mapaNumeros[match[1]] || 0) : parseInt(match[1], 10);
    return numAnos * 12;
  }

  const regexMeses = /(\d+|un|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\s*meses?/iu;
  match = t.match(regexMeses);
  if (match) {
    const numMeses = isNaN(match[1]) ? (mapaNumeros[match[1]] || 0) : parseInt(match[1], 10);
    return numMeses;
  }

  return null;
}

// ── MAPAS DE VALIDACIÓN ────────────────────────────────────────────────────

const EXCEPCIONALES_MAP = [
  { palabras: DICCIONARIOS.UCRANIA, tipo: "ucrania", prioridad: 1 },
  { palabras: DICCIONARIOS.VIOLENCIA_GENERO, tipo: "violencia_genero", prioridad: 1 },
  { palabras: DICCIONARIOS.TRATA, tipo: "trata", prioridad: 1 },
  { palabras: DICCIONARIOS.ASILO, tipo: "asylum", prioridad: 1 },
  { palabras: DICCIONARIOS.HUMANITARIAS, tipo: "humanitarias", prioridad: 2 },
  { palabras: DICCIONARIOS.COLABORACION, tipo: "colaboracion", prioridad: 2 },
  { palabras: DICCIONARIOS.MENA, tipo: "mena", prioridad: 1 }
];

// Reordenado para dar máxima prioridad a intenciones comerciales frente a contratos de terceros
const PROPÓSITOS_MAP = [
  { palabras: DICCIONARIOS.NOMADA_DIGITAL, proposito: "digital_nomad" },
  { palabras: DICCIONARIOS.INVERSOR, proposito: "investor" },
  { palabras: DICCIONARIOS.EMPRENDEDOR, proposito: "work_self" },
  { palabras: DICCIONARIOS.CUENTA_PROPIA, proposito: "work_self" }, 
  { palabras: DICCIONARIOS.BUSQUEDA_EMPLEO, proposito: "search_employment" },
  { palabras: DICCIONARIOS.ALTA_CUALIFICACION, proposito: "work_employee" },
  { palabras: DICCIONARIOS.CUENTA_AJENA, proposito: "work_employee" },
  { palabras: DICCIONARIOS.NO_LUCRATIVA, proposito: "no_work" },
  { palabras: DICCIONARIOS.ESTUDIOS, proposito: "study" },
  { palabras: DICCIONARIOS.REAGRUPACION, proposito: "family_reunification" }
];

// ── FUNCIONES AUXILIARES DE PROCESAMIENTO ──────────────────────────────────

function determinarTipoPermiso(t) {
  if (contiene(t, DICCIONARIOS.MODIFICACION)) return "modify";
  if (contiene(t, DICCIONARIOS.LARGA_DURACION)) return "long_term";
  if (contiene(t, DICCIONARIOS.NACIONALIDAD)) return "nationality";
  return "renew";
}

function detectarProposito(t) {
  for (const { palabras, proposito } of PROPÓSITOS_MAP) {
    if (contiene(t, palabras)) return proposito;
  }
  return "work_employee";
}

function detectarTiempoEstancia(t) {
  const meses = extraerMesesEstancia(t);
  if (meses !== null) {
    if (meses < 12) return "less_1";
    if (meses > 36) return "more_3";
    return "1_to_3";
  }
  if (contiene(t, DICCIONARIOS.MENOS_1_ANO)) return "less_1";
  if (contiene(t, DICCIONARIOS.MAS_TRES_ANOS)) return "more_3";
  if (contiene(t, DICCIONARIOS.UNO_A_TRES_ANOS)) return "1_to_3";
  return "1_to_3";
}

function detectarExcepcional(t) {
  for (const { palabras, tipo } of EXCEPCIONALES_MAP) {
    if (contiene(t, palabras)) return tipo;
  }
  return null;
}

function detectarNecesidades(t) {
  const necesidades = [];
  if (contiene(t, DICCIONARIOS.SIN_VIVIENDA)) necesidades.push("sin_vivienda");
  if (contiene(t, DICCIONARIOS.PROBLEMA_VIVIENDA)) necesidades.push("problema_vivienda");
  if (contiene(t, DICCIONARIOS.NECESIDAD_MEDICA)) necesidades.push("necesidad_medica");
  if (contiene(t, DICCIONARIOS.AYUDA_ECONOMICA)) necesidades.push("ayuda_economica");
  if (contiene(t, DICCIONARIOS.APOYO_PSICOLOGICO)) necesidades.push("apoyo_psicologico");
  if (contiene(t, DICCIONARIOS.TRABAJO_ILEGAL)) necesidades.push("problema_laboral");
  if (contiene(t, DICCIONARIOS.FALTA_PAGO)) necesidades.push("problema_laboral");
  if (contiene(t, DICCIONARIOS.URGENCIA)) necesidades.push("urgencia");
  return necesidades;
}

function detectarOportunidades(t, tiempo) {
  const oportunidades = {};
  const meses = extraerMesesEstancia(t);
  let aplicaArraigoExtraordinario = false;

  if (meses !== null) {
    const fechaConsulta = new Date();
    const fechaLlegadaEstimada = new Date(fechaConsulta.getTime());
    fechaLlegadaEstimada.setMonth(fechaLlegadaEstimada.getMonth() - meses);
    
    const FECHA_CORTE = new Date("2025-12-28T23:59:59");
    if (fechaLlegadaEstimada <= FECHA_CORTE) {
      aplicaArraigoExtraordinario = true;
    }
  }

  if ((tiempo === "more_3" || aplicaArraigoExtraordinario) && (contiene(t, DICCIONARIOS.SIN_PAPELES) || contiene(t, DICCIONARIOS.MENOS_1_ANO) || contiene(t, DICCIONARIOS.UNO_A_TRES_ANOS))) {
    oportunidades.puede_solicitar_arraigo = true;
    oportunidades.tipo_arraigo = "extraordinario";
  }

  if (tiempo === "more_3" && contiene(t, DICCIONARIOS.TRABAJO_ILEGAL)) {
    oportunidades.puede_solicitar_arraigo = true;
    oportunidades.tipo_arraigo = "laboral";
  }

  if (contiene(t, DICCIONARIOS.FAMILIAR_ESPANOL)) {
    oportunidades.puede_solicitar_arraigo = true;
    oportunidades.tipo_arraigo = "social";
  }

  if (contiene(t, DICCIONARIOS.RENOVACION) && contiene(t, DICCIONARIOS.RENOVACION_PROXIMA)) {
    oportunidades.renovacion_proxima = true;
  }

  return oportunidades;
}

function procesarCiudadanoUE(t, resultado) {
  if (contiene(t, ["autonomo", "cuenta propia", "mi negocio", "empresa", "local", "tienda", "freelance"])) {
    resultado.eu_situation = "work_self";
  } else if (contiene(t, ["trabajo", "empleo", "contrato", "trabajar", "trabajando"])) {
    resultado.eu_situation = "work";
  } else if (contiene(t, ["estudio", "estudiante", "universidad", "master", "doctorado", "beca", "estudiar"])) {
    resultado.eu_situation = "study";
  } else if (contiene(t, ["familia", "familiar", "conyuge", "pareja", "hijo", "hija", "esposo", "esposa"])) {
    resultado.eu_situation = "family";
  } else if (contiene(t, DICCIONARIOS.LARGA_DURACION)) {
    resultado.eu_situation = "long_term";
  } else {
    resultado.eu_situation = "enough_resources";
  }
  return resultado;
}

function procesarConPermiso(t, resultado) {
  if (contiene(t, DICCIONARIOS.NACIONALIDAD)) {
    resultado.non_eu_situation = "has_permit";
    resultado.permit_type_held = "nationality";
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.RETORNO)) {
    resultado.non_eu_situation = "has_permit";
    resultado.permit_type_held = "renew";
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.RENOVACION) && !contiene(t, DICCIONARIOS.SIN_PAPELES)) {
    resultado.non_eu_situation = "has_permit";
    resultado.permit_type_held = determinarTipoPermiso(t);
    if (contiene(t, DICCIONARIOS.RENOVACION_PROXIMA)) {
      resultado.permit_status = "needs_renewal_soon";
      resultado.urgencia = "alta";
    }
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.MODIFICACION)) {
    resultado.non_eu_situation = "has_permit";
    resultado.permit_type_held = "modify";
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.TIENE_PERMISO)) {
    // Si además quiere reagrupar familia, eso tiene prioridad sobre renovación genérica
    if (contiene(t, DICCIONARIOS.REAGRUPACION)) {
      resultado.non_eu_situation = "no_visa";
      resultado.non_eu_purpose = "family_reunification";
      resultado.tiene_permiso_previo = true;
      return resultado;
    }
    resultado.non_eu_situation = "has_permit";
    resultado.permit_type_held = determinarTipoPermiso(t);
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.FAMILIAR_ESPANOL)) {
    resultado.non_eu_situation = "family_spanish";
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.FAMILIAR_UE)) {
    resultado.non_eu_situation = "family_eu";
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.ARRAIGO_EXTRAORDINARIO)) {
    resultado.non_eu_situation = "irregular";
    resultado.irregular_time = "more_3";
    resultado.irregular_subtype = "arraigo_extraordinario";
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.ARRAIGO_SOCIAL)) {
    resultado.non_eu_situation = "irregular";
    resultado.irregular_subtype = "arraigo_social";
    resultado.oportunidades = { puede_solicitar_arraigo: true, tipo_arraigo: "social" };
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.ARRAIGO_LABORAL)) {
    resultado.non_eu_situation = "irregular";
    resultado.irregular_subtype = "arraigo_allaboral";
    resultado.oportunidades = { puede_solicitar_arraigo: true, tipo_arraigo: "laboral" };
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.SEGUNDA_OPORTUNIDAD)) {
    resultado.non_eu_situation = "has_permit";
    resultado.permit_type_held = "second_chance";
    return resultado;
  }
  return null;
}

function procesarNoVisa(t, estaDentro, resultado) {
  const tienePerfilNoVisa =
    contiene(t, DICCIONARIOS.QUIERE_VENIR) ||
    contiene(t, DICCIONARIOS.NOMADA_DIGITAL) ||
    contiene(t, DICCIONARIOS.INVERSOR) ||
    contiene(t, DICCIONARIOS.EMPRENDEDOR) ||
    contiene(t, DICCIONARIOS.CUENTA_PROPIA) ||
    contiene(t, DICCIONARIOS.NO_LUCRATIVA) ||
    contiene(t, DICCIONARIOS.ESTUDIOS) ||
    contiene(t, DICCIONARIOS.REAGRUPACION) ||
    contiene(t, DICCIONARIOS.CUENTA_AJENA) ||
    contiene(t, DICCIONARIOS.BUSQUEDA_EMPLEO) ||
    (contiene(t, DICCIONARIOS.ALTA_CUALIFICACION) && !estaDentro && !contiene(t, DICCIONARIOS.SIN_PAPELES));

  if (tienePerfilNoVisa && !contiene(t, DICCIONARIOS.SIN_PAPELES)) {
    resultado.non_eu_situation = "no_visa";
    resultado.non_eu_purpose = detectarProposito(t);
    return resultado;
  }
  return null;
}

function esIrregular(t, estaDentro) {
  const meses = extraerMesesEstancia(t);
  return (
    contiene(t, DICCIONARIOS.SIN_PAPELES) ||
    meses !== null || 
    (estaDentro &&
      !contiene(t, DICCIONARIOS.TIENE_PERMISO) &&
      (contiene(t, DICCIONARIOS.MAS_TRES_ANOS) ||
        contiene(t, DICCIONARIOS.UNO_A_TRES_ANOS) ||
        contiene(t, DICCIONARIOS.MENOS_1_ANO)))
  );
}

function procesarFallback(t, resultado) {
  // Se prioriza la cuenta propia sobre la cuenta ajena en la evaluación por defecto
  if (contiene(t, DICCIONARIOS.CUENTA_PROPIA) || contiene(t, ["autonomo", "mi negocio", "freelance"])) {
    resultado.non_eu_situation = "no_visa";
    resultado.non_eu_purpose = "work_self";
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.NOMADA_DIGITAL) || contiene(t, ["teletrabajo", "trabajo remoto"])) {
    resultado.non_eu_situation = "no_visa";
    resultado.non_eu_purpose = "digital_nomad";
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.TIENE_TRABAJO)) {
    resultado.non_eu_situation = "no_visa";
    resultado.non_eu_purpose = "work_employee";
    resultado.empleado = true;
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.BUSCA_TRABAJO)) {
    resultado.non_eu_situation = "no_visa";
    resultado.non_eu_purpose = "work_employee";
    resultado.buscando_empleo = true;
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.ALTA_CUALIFICACION)) {
    resultado.non_eu_situation = "no_visa";
    resultado.non_eu_purpose = "work_employee";
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.ESTUDIOS) || contiene(t, ["estudiar", "estudio", "universidad"])) {
    resultado.non_eu_situation = "no_visa";
    resultado.non_eu_purpose = "study";
    return resultado;
  }
  if (contiene(t, DICCIONARIOS.FAMILIAR_ESPANOL) || contiene(t, ["familia", "hijo", "pareja"])) {
    resultado.non_eu_situation = "family_spanish";
    return resultado;
  }

  resultado.non_eu_situation = "no_visa";
  resultado.non_eu_purpose = "work_employee";
  return resultado;
}

// ── ANÁLISIS CONTEXTUAL ────────────────────────────────────────────────────
// Infiere situación, tiempo, propósito y vínculos sin depender de palabras
// exactas del diccionario. Complementa (no reemplaza) la detección por keywords.

/**
 * Extrae meses a partir de expresiones naturales no cubiertas por el regex
 * principal: "siete meses", "año y tres meses", "casi un año", "medio año", etc.
 */
function extraerMesesContextual(t) {
  const num = {
    "un": 1, "una": 1, "dos": 2, "tres": 3, "cuatro": 4, "cinco": 5,
    "seis": 6, "siete": 7, "ocho": 8, "nueve": 9, "diez": 10,
    "once": 11, "doce": 12, "medio": 0.5, "media": 0.5,
    "quince": 15, "veinte": 20
  };
  const toN = (s) => isNaN(s) ? (num[s] || 0) : parseInt(s, 10);

  // "X años y medio" / "X años y Y mes(es)"
  let m = t.match(/(\d+|un|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\s*an?os?\s*y\s*(medio|media|\d+|un|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\s*mes/i);
  if (m) return toN(m[1]) * 12 + (m[2] === "medio" || m[2] === "media" ? 6 : toN(m[2]));

  // "casi X años" / "más de X años" / "X años"
  m = t.match(/(?:casi|mas de|unos|alrededor de)?\s*(\d+|un|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\s*an?os?/i);
  if (m) return toN(m[1]) * 12;

  // "X meses" / "unos X meses"
  m = t.match(/(?:unos|casi|mas de)?\s*(\d+|un|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|quince|veinte|medio|media)\s*meses?/i);
  if (m) return toN(m[1]);

  // "medio año"
  if (/medio\s*an?o/i.test(t)) return 6;

  return null;
}

/**
 * Infiere si la persona está en España sin usar palabras exactas del diccionario.
 */
function inferirDentroEspana(t) {
  const ciudadesES = [
    "madrid", "barcelona", "sevilla", "valencia", "malaga", "bilbao",
    "zaragoza", "murcia", "alicante", "cordoba", "valladolid", "vigo",
    "gijon", "granada", "vitoria", "elche", "santander", "almeria",
    "burgos", "salamanca", "huelva", "badajoz", "tarragona", "leon",
    "cadiz", "jaen", "logrono", "palma", "pamplona", "tenerife"
  ];
  if (ciudadesES.some(c => t.includes(c))) return true;
  if (/llevo\s+(?:aqui|viviendo|residiendo)/i.test(t)) return true;
  if (/desde\s+que\s+(?:llegue|llegue)/i.test(t)) return true;
  if (/cuando\s+llegue\s+a\s+espana/i.test(t)) return true;
  if (/estoy\s+(?:viviendo|residiendo|aqui)/i.test(t)) return true;
  if (/mi\s+(?:piso|casa|apartamento|habitacion)\s+(?:en|de)\s+espana/i.test(t)) return true;
  if (/trabajo(?:ndo)?\s+(?:aqui|en\s+espana)/i.test(t)) return true;
  return false;
}

/**
 * Infiere situación irregular a partir del contexto, sin palabras como "sin papeles".
 */
function inferirIrregularidad(t, estaDentro, meses) {
  if (meses !== null && estaDentro &&
      !contiene(t, DICCIONARIOS.TIENE_PERMISO) &&
      !contiene(t, DICCIONARIOS.RENOVACION)) return true;
  if (/arreglar\s+(?:mis?\s+)?(?:situacion|papeles|documentos)/i.test(t)) return true;
  if (/regularizar(?:me|se|nos)?/i.test(t)) return true;
  if (/ponerme?\s+en\s+regla/i.test(t)) return true;
  if (/obtener\s+(?:papeles|documentos|permiso|residencia)/i.test(t)) return true;
  if (/no\s+(?:tengo|tiene)\s+(?:nada|permiso|documentos|nie|tie|residencia)/i.test(t)) return true;
  if (/entre\s+(?:de\s+vacaciones|como\s+turista)\s+y\s+me\s+(?:quede|quede)/i.test(t)) return true;
  if (/nunca\s+he\s+(?:tenido|tramitado)\s+(?:permiso|residencia|nie)/i.test(t)) return true;
  return false;
}

/**
 * Infiere vínculo con ciudadano español a partir de frases naturales.
 */
function inferirFamiliarEspanol(t) {
  if (/(?:mi|el|la)\s+(?:marido|mujer|esposo|esposa|pareja|novio|novia)\s+(?:es|tiene)\s+(?:espanol|espanola|nacionalidad espanola)/i.test(t)) return true;
  if (/(?:me|nos)\s+case\s+con\s+(?:un|una)\s+(?:espanol|espanola)/i.test(t)) return true;
  if (/(?:mi|un|una)\s+(?:padre|madre|hijo|hija|abuelo|abuela)\s+(?:es|tiene)\s+(?:la\s+)?(?:nacionalidad\s+)?(?:espanola|espanol)/i.test(t)) return true;
  if (/mis\s+hijos?\s+(?:son|tienen|nacieron|tienen\s+la)\s+(?:espanola|espanol|nacionalidad espanola)/i.test(t)) return true;
  if (/tengo\s+(?:hijo|hija|hijos|hijas)\s+(?:con\s+)?(?:nacionalidad\s+)?(?:espanola|espanol)/i.test(t)) return true;
  return false;
}

/**
 * Infiere propósito laboral a partir de frases descriptivas.
 */
function inferirPropositoLaboral(t) {
  // ── CUENTA PROPIA / AUTÓNOMO ──────────────────────────────────────────────
  // Intención de montar negocio (verbo + tipo de negocio)
  if (/(?:quiero|quisiera|me\s+gustaria|pienso|planeo|deseo|tengo\s+intencion\s+de)\s+(?:abrir|montar|crear|tener|poner|emprender|establecer|iniciar)\s+(?:mi\s+)?(?:propio\s+)?(?:negocio|empresa|tienda|bar|restaurante|cafeteria|local|peluqueria|barberia|salon|taller|consulta|estudio|agencia|comercio)/i.test(t)) return "work_self";
  // "quiero trabajar por mi cuenta / de forma independiente"
  if (/(?:quiero|quisiera|me\s+gustaria|pienso|planeo)\s+trabajar\s+(?:por\s+mi\s+cuenta|de\s+forma\s+independiente|como\s+autonomo|independientemente)/i.test(t)) return "work_self";
  // Ya trabaja por cuenta propia
  if (/trabajo(?:r)?\s+(?:como\s+)?(?:por\s+mi\s+cuenta|de\s+forma\s+independiente|independiente|autonomo)/i.test(t)) return "work_self";
  // Identidad profesional autónoma
  if (/(?:soy|trabajo\s+como)\s+(?:freelance|autonomo|autonoma|consultor|consultora|coach|disenador|disenadora|fotografo|fotografa|arquitecto|arquitecta|programador|programadora|desarrollador|desarrolladora)/i.test(t)) return "work_self";
  if (/cobro\s+(?:por\s+factura|mis\s+propias\s+facturas|como\s+autonomo)/i.test(t)) return "work_self";
  // Frases de emprendimiento sin verbo explícito
  if (/(?:mi\s+(?:negocio|empresa|tienda|bar|restaurante|peluqueria|local))\s+(?:en\s+espana|aqui|en\s+madrid|en\s+barcelona|en\s+sevilla)/i.test(t)) return "work_self";
  if (/(?:poner|tener|abrir)\s+(?:una?\s+)?(?:empresa|negocio|tienda|bar|restaurante|peluqueria|barberia|salon|local|cafeteria|taller)/i.test(t)) return "work_self";
  // "ofrecer mis servicios", "vender por mi cuenta", "vender online"
  if (/(?:ofrecer|dar|prestar)\s+mis\s+servicios/i.test(t)) return "work_self";
  if (/vender\s+(?:por\s+mi\s+cuenta|online|mis\s+productos|mis\s+servicios)/i.test(t)) return "work_self";
  if (/ser\s+(?:mi\s+propio\s+jefe|autonomo|autonoma|emprendedor|emprendedora)/i.test(t)) return "work_self";
  if (/emprender\s+(?:en\s+espana|aqui|un\s+negocio|mi\s+proyecto)/i.test(t)) return "work_self";
  if (/(?:montar|crear|fundar)\s+(?:mi\s+)?(?:startup|proyecto\s+empresarial|empresa\s+propia)/i.test(t)) return "work_self";

  // ── NÓMADA DIGITAL ────────────────────────────────────────────────────────
  if (/trabajo(?:r)?\s+(?:desde\s+casa|en\s+remoto|remotamente|desde\s+espana)\s+(?:para|con)\s+(?:una\s+)?(?:empresa|compania|startup)\s+(?:de\s+)?(?:otro\s+pais|extranjera|fuera\s+de\s+espana)/i.test(t)) return "digital_nomad";
  if (/(?:mi\s+)?(?:empresa|empleador|jefe|trabajo)\s+(?:esta|es)\s+(?:en\s+)?(?:otro\s+pais|estados\s+unidos|eeuu|reino\s+unido|alemania|canada|california)/i.test(t)) return "digital_nomad";
  if (/trabajo\s+(?:para|con)\s+(?:una\s+)?(?:empresa|compania|startup|cliente)\s+(?:de\s+)?(?:california|estados\s+unidos|eeuu|canada|reino\s+unido|alemania)/i.test(t)) return "digital_nomad";
  if (/trabaj(?:o|ar)\s+(?:remotamente|en\s+remoto|desde\s+casa)\s+(?:para|con)/i.test(t)) return "digital_nomad";
  if (/(?:trabajo|empleo)\s+(?:es|esta)\s+(?:en\s+)?(?:remoto|online)\s+(?:para|con)/i.test(t)) return "digital_nomad";

  // ── CUENTA AJENA ──────────────────────────────────────────────────────────
  if (/(?:me\s+han\s+(?:ofrecido|dado)|tengo)\s+(?:un\s+)?(?:contrato|oferta\s+de\s+trabajo|trabajo)\s+(?:en\s+espana|aqui)/i.test(t)) return "work_employee";
  if (/empresa\s+(?:espanola|de\s+espana)\s+(?:me\s+(?:quiere|va\s+a)\s+contratar|me\s+ha\s+contratado)/i.test(t)) return "work_employee";
  if (/(?:tengo|consegui)\s+(?:un\s+)?(?:contrato|oferta)\s+(?:de\s+trabajo)?\s+(?:en\s+espana|aqui|en\s+madrid|en\s+barcelona)/i.test(t)) return "work_employee";

  return null;
}

/**
 * Infiere situación excepcional sin keywords directas.
 */
function inferirSituacionExcepcional(t) {
  if (/(?:hui|escape|sali\s+huyendo|tuve\s+que\s+irme)\s+(?:de\s+)?(?:mi\s+pais|venezuela|colombia|siria|sudan|afganistan)/i.test(t)) return "asylum";
  if (/(?:me\s+)?(?:persiguen|amenazan|pueden\s+matarme)\s+(?:en\s+mi\s+pais|si\s+vuelvo|alli)/i.test(t)) return "asylum";
  if (/no\s+puedo\s+volver\s+a\s+(?:mi\s+pais|venezuela|mi\s+pais)/i.test(t)) return "asylum";
  if (/(?:mi\s+(?:marido|pareja|ex|novio))\s+(?:me\s+)?(?:pega|golpea|amenaza|maltrata|insulta|controla|grita)/i.test(t)) return "violencia_genero";
  if (/tengo\s+miedo\s+de\s+(?:mi\s+(?:marido|pareja|ex|novio))/i.test(t)) return "violencia_genero";
  if (/(?:vine|me\s+trajeron)\s+(?:enganada|enganado|con\s+una\s+promesa\s+falsa)\s+(?:a\s+trabajar|para\s+trabajar)/i.test(t)) return "trata";
  if (/(?:me\s+(?:quitaron|tienen)\s+el\s+pasaporte|no\s+puedo\s+irme|me\s+tienen\s+(?:encerrada|retenida))/i.test(t)) return "trata";
  return null;
}

/**
 * Núcleo del análisis contextual. Devuelve datos inferidos que se mezclan
 * con los resultados de las keywords en la función principal.
 */
function analizarContexto(t) {
  const inferido = {};
  const mesesCtx = extraerMesesContextual(t);
  if (mesesCtx !== null) inferido.meses_inferidos = mesesCtx;
  const dentroCtx = inferirDentroEspana(t);
  if (dentroCtx) inferido.dentro_espana = true;
  const irregularCtx = inferirIrregularidad(t, dentroCtx, mesesCtx);
  if (irregularCtx) inferido.posible_irregular = true;
  const familiarES = inferirFamiliarEspanol(t);
  if (familiarES) inferido.familiar_espanol = true;
  const proposito = inferirPropositoLaboral(t);
  if (proposito) inferido.proposito_laboral = proposito;
  const excepcional = inferirSituacionExcepcional(t);
  if (excepcional) inferido.excepcional = excepcional;
  return inferido;
}

// ── FUNCIÓN PRINCIPAL ──────────────────────────────────────────────────────

export function analizarSituacion(textoOriginal) {
  if (!textoOriginal || typeof textoOriginal !== "string") {
    return { valido: false, error: "Texto inválido o vacío" };
  }

  const t = normalizar(textoOriginal);

  // ── ANÁLISIS CONTEXTUAL (infiere lo que las keywords no cubren) ───────────
  const ctx = analizarContexto(t);

  // 1. FILTRO DE VALIDEZ: nacionalidad, contexto migratorio, o datos inferidos
  const mencionaUE = contiene(t, DICCIONARIOS.UE);
  const mencionaMundo = contiene(t, DICCIONARIOS.MUNDO);
  const mencionaUcrania = contiene(t, DICCIONARIOS.UCRANIA);

  const terminosContextuales = [
    "nie", "tie", "arraigo", "asilo", "refugio", "papeles", "irregular", "visado", "visa",
    "residencia", "renovacion", "renovar", "extranjeria", "llevo meses", "llevo anos",
    "autonomo", "cuenta propia", "mi propio negocio", "montar empresa"
  ];
  const tieneContextoValido = contiene(t, terminosContextuales);
  // El análisis contextual puede salvar textos sin keywords exactas
  const tieneContextoInferido = ctx.dentro_espana || ctx.meses_inferidos !== undefined || ctx.posible_irregular;

  if (!mencionaUE && !mencionaMundo && !mencionaUcrania && !tieneContextoValido && !tieneContextoInferido) {
    return {
      valido: false,
      error: "No se identifica nacionalidad ni contexto comprensible de extranjería",
      non_eu_situation: "unknown"
    };
  }

  const resultado = {
    valido: true,
    necesidades_especiales: detectarNecesidades(t),
    contexto_inferido: ctx  // datos enriquecidos disponibles para la capa de UI
  };

  // PASO 1: Determinar nacionalidad base
  resultado.nationality_type = mencionaUE ? "eu" : "non_eu";

  // PASO 2: Detectar situaciones excepcionales — keywords + inferencia contextual
  if (resultado.nationality_type === "non_eu") {
    const excKeyword = detectarExcepcional(t);
    const excContexto = ctx.excepcional || null;
    const excFinal = excKeyword || excContexto;
    if (excFinal) {
      resultado.non_eu_situation = "exceptional";
      resultado.exceptional_type = excFinal;
      resultado.prioridad_atencion = "maxima";
      resultado.detectado_por = excKeyword ? "keyword" : "contexto";
      return resultado;
    }
  }

  // PASO 3: Procesar como ciudadano de la Unión Europea
  if (resultado.nationality_type === "eu") {
    return procesarCiudadanoUE(t, resultado);
  }

  // PASO 4: Familiar de español inferido contextualmente (si no lo recogió procesarConPermiso)
  if (ctx.familiar_espanol && !contiene(t, DICCIONARIOS.FAMILIAR_ESPANOL)) {
    resultado.non_eu_situation = "family_spanish";
    resultado.detectado_por = "contexto";
    return resultado;
  }

  // PASO 5: Verificar si posee algún tipo de permiso de residencia legal vigente
  const resultadoPermiso = procesarConPermiso(t, resultado);
  if (resultadoPermiso) return resultadoPermiso;

  // PASO 6: Contexto geográfico/temporal enriquecido con inferencia
  const mesesViviendo = extraerMesesEstancia(t) ?? ctx.meses_inferidos ?? null;
  const estaDentro =
    contiene(t, DICCIONARIOS.DENTRO_ESPANA) ||
    contiene(t, DICCIONARIOS.SIN_PAPELES) ||
    mesesViviendo !== null ||
    ctx.dentro_espana === true;

  // PASO 7: Propósito laboral con prioridad máxima sobre irregularidad
  // Si la persona tiene una intención clara de trabajar/negocio, eso prevalece
  // aunque también esté en situación irregular (la app mostrará ambas vías).
  const propositoLaboral =
    ctx.proposito_laboral ||
    (contiene(t, DICCIONARIOS.CUENTA_PROPIA)  ? "work_self"      : null) ||
    (contiene(t, DICCIONARIOS.EMPRENDEDOR)    ? "work_self"      : null) ||
    (contiene(t, DICCIONARIOS.NOMADA_DIGITAL) ? "digital_nomad"  : null) ||
    (contiene(t, DICCIONARIOS.INVERSOR)       ? "investor"       : null) ||
    (contiene(t, DICCIONARIOS.ESTUDIOS)       ? "study"          : null) ||
    (contiene(t, DICCIONARIOS.NO_LUCRATIVA)   ? "no_work"        : null) ||
    (contiene(t, DICCIONARIOS.CUENTA_AJENA)   ? "work_employee"  : null) ||
    (contiene(t, DICCIONARIOS.REAGRUPACION)   ? "family_reunification" : null);

  // Si hay propósito laboral/negocio EXPLÍCITO, lo derivamos directamente
  // independientemente de si también está en situación irregular.
  if (propositoLaboral) {
    resultado.non_eu_situation = "no_visa";
    resultado.non_eu_purpose = propositoLaboral;
    resultado.detectado_por = ctx.proposito_laboral ? "contexto" : "keyword";
    // Si además está en situación irregular, lo anotamos como secundario
    // para que la UI pueda informar de ambas vías si lo necesita.
    const mesesParaIrregular = mesesViviendo ?? ctx.meses_inferidos ?? null;
    const posibleIrregular =
      contiene(t, DICCIONARIOS.SIN_PAPELES) ||
      ctx.posible_irregular ||
      (estaDentro && mesesParaIrregular !== null && !contiene(t, DICCIONARIOS.TIENE_PERMISO));
    if (posibleIrregular && mesesParaIrregular !== null && mesesParaIrregular >= 5) {
      const fechaCorte = new Date("2025-12-28T23:59:59");
      const llegada = new Date();
      llegada.setMonth(llegada.getMonth() - mesesParaIrregular);
      if (llegada <= fechaCorte) {
        resultado.via_alternativa = {
          non_eu_situation: "irregular",
          irregular_subtype: "arraigo_extraordinario",
          meses: mesesParaIrregular,
          nota: "También puede optar al arraigo extraordinario mientras tramita el permiso de trabajo."
        };
      }
    }
    return resultado;
  }

  // PASO 7b: Sin propósito claro — evaluar perfiles fuera de España
  const esPotencialIrregular =
    contiene(t, DICCIONARIOS.SIN_PAPELES) ||
    contiene(t, DICCIONARIOS.TRABAJO_ILEGAL) ||
    ctx.posible_irregular ||
    (estaDentro && mesesViviendo !== null);

  if (!esPotencialIrregular) {
    const resultadoNoVisa = procesarNoVisa(t, estaDentro, resultado);
    if (resultadoNoVisa) return resultadoNoVisa;
  }

  // PASO 8: Situación de Estancia por Turismo
  if (contiene(t, DICCIONARIOS.TURISTA)) {
    resultado.non_eu_situation = "tourist";
    const propCtx = ctx.proposito_laboral;
    if (contiene(t, DICCIONARIOS.CUENTA_PROPIA) || contiene(t, DICCIONARIOS.EMPRENDEDOR) || propCtx === "work_self") {
      resultado.tourist_purpose = "stay_work_self";
    } else if (contiene(t, DICCIONARIOS.CUENTA_AJENA) || contiene(t, ["trabajo", "trabajar"]) || propCtx === "work_employee") {
      resultado.tourist_purpose = "stay_work";
    } else if (contiene(t, DICCIONARIOS.ESTUDIOS) || contiene(t, ["estudiar"])) {
      resultado.tourist_purpose = "stay_study";
    } else {
      resultado.tourist_purpose = "stay_family";
    }
    return resultado;
  }

  // PASO 9: Trabajo informal / Irregularidad laboral interna
  if (contiene(t, DICCIONARIOS.TRABAJO_ILEGAL) && estaDentro) {
    resultado.non_eu_situation = "irregular";
    resultado.trabajando_ilegal = true;
    resultado.irregular_time = detectarTiempoEstancia(t);
    resultado.irregular_subtype = "trabajo_ilegal";
    resultado.oportunidades = detectarOportunidades(t, resultado.irregular_time);
    return resultado;
  }

  // PASO 10: Situación Irregular — keywords + inferencia contextual
  if (esIrregular(t, estaDentro) || ctx.posible_irregular) {
    resultado.non_eu_situation = "irregular";
    // Usa meses inferidos si el regex principal no los encontró
    resultado.irregular_time = detectarTiempoEstancia(t);
    if (resultado.irregular_time === "1_to_3" && ctx.meses_inferidos !== undefined) {
      const m = ctx.meses_inferidos;
      resultado.irregular_time = m < 12 ? "less_1" : m > 36 ? "more_3" : "1_to_3";
    }
    resultado.oportunidades = detectarOportunidades(t, resultado.irregular_time);
    // Refuerzo: si hay meses inferidos < 24, forzar arraigo_extraordinario si aplica
    if (ctx.meses_inferidos !== undefined && ctx.meses_inferidos >= 5) {
      const fechaConsulta = new Date();
      const fechaLlegadaEstimada = new Date(fechaConsulta.getTime());
      fechaLlegadaEstimada.setMonth(fechaLlegadaEstimada.getMonth() - ctx.meses_inferidos);
      const FECHA_CORTE = new Date("2025-12-28T23:59:59");
      if (fechaLlegadaEstimada <= FECHA_CORTE) {
        resultado.oportunidades = resultado.oportunidades || {};
        resultado.oportunidades.puede_solicitar_arraigo = true;
        resultado.oportunidades.tipo_arraigo = "extraordinario";
        resultado.irregular_subtype = "arraigo_extraordinario";
      }
    }
    if (!resultado.irregular_subtype) {
      resultado.irregular_subtype = resultado.oportunidades?.tipo_arraigo === "extraordinario"
        ? "arraigo_extraordinario" : null;
    }
    return resultado;
  }

  // PASO 11: Fallback resolutivo inteligente — enriquecido con propósito inferido
  if (ctx.proposito_laboral) {
    resultado.non_eu_situation = "no_visa";
    resultado.non_eu_purpose = ctx.proposito_laboral;
    resultado.detectado_por = "contexto";
    return resultado;
  }
  return procesarFallback(t, resultado);
}

export { DICCIONARIOS, normalizar, contiene, contarCoincidencias, extraerMesesEstancia };