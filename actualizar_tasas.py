import re

file = r"src\lib\permitData.js"

with open(file, encoding="utf-8") as f:
    content = f.read()

# Mapa: id del permiso -> nuevo valor del campo cost
replacements = {
    "eu_family_card":             "Tasa: 12 \u20ac",
    "family_spanish":             "Tasa: 10,94 \u20ac",
    "work_employee":              "Tasa: 10,94 \u20ac (solicitante) + 790-062 a cargo del empleador",
    "tarjeta_azul_ue":            "Tasa: 10,94 \u20ac (solicitante) + 790-062 a cargo del empleador",
    "work_self":                  "Tasa: 10,94 \u20ac",
    "visado_emprendedor":         "Tasa: 80 \u20ac (visado) o 10,94 \u20ac (residencia)",
    "student":                    "Tasa: 10,94 \u20ac (inicial) / 17,49 \u20ac (pr\u00f3rroga anual)",
    "busqueda_empleo":            "Tasa: 10,94 \u20ac",
    "digital_nomad":              "Tasa: 80 \u20ac (visado) o 10,94 \u20ac (residencia)",
    "residencia_no_lucrativa":    "Tasa: 10,94 \u20ac",
    "family_reunification":       "Tasa: 10,94 \u20ac",
    "arraigo_extraordinario":     "Tasa: 38,28 \u20ac (Modelo 790-052, ep\u00edgrafe 2.3.1)",
    "arraigo_social":             "Tasa: 38,28 \u20ac",
    "arraigo_laboral":            "Tasa: 38,28 \u20ac",
    "arraigo_socioformativo":     "Tasa: 38,28 \u20ac",
    "arraigo_segunda_oportunidad":"Tasa: 10,94 \u20ac",
    "arraigo_familiar":           "Tasa: 10,94 \u20ac",
    "long_term":                  "Tasa: 21,87 \u20ac",
    "modification":               "Tasa: 10,94 \u20ac",
    "colaboracion_autoridades":   "Tasa: 10,94 \u20ac",
    "razones_humanitarias":       "Tasa: 38,28 \u20ac",
    "victima_trata":              "Tasa: 10,94 \u20ac",
    "victima_violencia_genero":   "Tasa: 10,94 \u20ac",
}

# Divide el contenido en bloques por permit id
# Reemplaza el campo cost dentro del bloque de cada permiso
def replace_cost_in_block(content, permit_id, new_cost):
    # Encuentra la posicion del id del permiso
    marker = f'id: "{permit_id}"'
    pos = content.find(marker)
    if pos == -1:
        print(f"  AVISO: no encontrado {permit_id}")
        return content
    
    # Busca el siguiente campo cost: "..." despues de este punto
    cost_pattern = re.compile(r'cost: "([^"]*)"')
    match = cost_pattern.search(content, pos)
    if not match:
        print(f"  AVISO: no encontrado cost para {permit_id}")
        return content
    
    # Verifica que este cost pertenece a este permiso (no al siguiente)
    next_id_pos = content.find('id: "', pos + len(marker))
    if next_id_pos != -1 and match.start() > next_id_pos:
        print(f"  AVISO: cost de {permit_id} esta despues del siguiente id")
        return content
    
    old_cost = match.group(1)
    new_content = content[:match.start(1)] + new_cost + content[match.end(1):]
    print(f"  {permit_id}: '{old_cost}' -> '{new_cost}'")
    return new_content

print("Actualizando tasas...")
for permit_id, new_cost in replacements.items():
    content = replace_cost_in_block(content, permit_id, new_cost)

with open(file, "w", encoding="utf-8") as f:
    f.write(content)

print("\nArchivo guardado correctamente.")
