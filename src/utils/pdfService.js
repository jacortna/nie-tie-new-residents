import { jsPDF } from "jspdf";
import { Filesystem, Directory } from '@capacitor/filesystem';

/**
 * Genera un documento PDF con la información del NIE/TIE y lo guarda 
 * directamente en la carpeta de Documentos del dispositivo Android.
 * * @param {Object} datosUsuario - Datos que se van a estampar en el PDF.
 */
export async function generarDocumentoNIE(datosUsuario = {}) {
  try {
    // 1. Inicializar jsPDF
    // 'p' = portrait (vertical), 'mm' = milímetros, 'a4' = tamaño de hoja
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4"
    });

    // 2. Configurar diseño y contenido del PDF
    // Título Principal
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(61, 220, 132); // El color verde característico de Android (#3DDC84)
    doc.text("SOLICITUD NIE / IA", 20, 30);

    // Línea divisoria decorativa
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Subtítulo e información de control
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 20, 42);
    doc.text(`ID de Control: NIE-${Math.floor(100000 + Math.random() * 900000)}`, 140, 42);

    // Bloque de datos del Residente
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text("Datos del Nuevo Residente", 20, 60);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    // Extraer datos o usar valores por defecto si viene vacío
    const nombre = datosUsuario.nombre || "Juan Pérez";
    const nie = datosUsuario.nie || "X-1234567-L";
    const email = datosUsuario.email || "usuario@ejemplo.com";
    const estado = datosUsuario.estado || "Asignado - Trámite Nuevo Residente";

    doc.text(`Nombre Completo:  ${nombre}`, 25, 72);
    doc.text(`Número NIE/TIE:    ${nie}`, 25, 82);
    doc.text(`Email de Contacto: ${email}`, 25, 92);
    doc.text(`Estado Actual:     ${estado}`, 25, 102);

    // Cuadro de verificación decorativo
    doc.setDrawColor(61, 220, 132);
    doc.setFillColor(245, 255, 248);
    doc.rect(20, 115, 170, 25, "FD");
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(40, 120, 70);
    doc.text("Este documento sirve como comprobante digital generado por la aplicación", 25, 125);
    doc.text("nie-ia-new-residents. Válido para control interno del proceso de residencia.", 25, 131);

    // Pie de página
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("App built with Capacitor & jsPDF - Secure Document Storage", 20, 280);

    // 3. Convertir el PDF a string de datos URI
    const pdfDataUri = doc.output('datauristring');
    
    // 4. Extraer únicamente la cadena Base64 pura (eliminando el encabezado "data:application/pdf;base64,")
    const pdfBase64 = pdfDataUri.split(',')[1];

    // 5. Definir el nombre del archivo con un sello de tiempo único
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const nombreArchivo = `Comprobante_NIE_${timestamp}.pdf`;

    // 6. Guardar en el almacenamiento nativo de Android usando Capacitor Filesystem
    await Filesystem.writeFile({
      path: nombreArchivo,
      data: pdfBase64,
      directory: Directory.Documents, // Guarda el PDF directamente en la carpeta física 'Documentos'
    });

    // 7. Retornar éxito con el nombre del archivo para que la interfaz lo use
    return {
      success: true,
      fileName: nombreArchivo,
      message: `¡PDF guardado con éxito en Documentos!`
    };

  } catch (error) {
    console.error("Error crítico en el servicio de generación de PDF:", error);
    return {
      success: false,
      error: error,
      message: error.message || "No se pudo escribir el archivo en el dispositivo."
    };
  }
}
