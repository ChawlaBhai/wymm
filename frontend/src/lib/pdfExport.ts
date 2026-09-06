import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Base A4 width in mm (we'll scale the height proportionally)
const BASE_WIDTH_MM = 210

/**
 * Export any HTMLElement to a single-page PDF that exactly fits its content.
 * The element should already be rendered at the desired width before calling.
 *
 * @param templateElement - The DOM element to capture (should be 800px wide, off-screen)
 * @param filename        - Full filename including .pdf extension
 * @param onProgress      - Optional callback with 0–100 progress
 */
export async function exportTemplateToPDF(
  templateElement: HTMLElement,
  filename: string,
  onProgress?: (pct: number) => void,
): Promise<void> {
  onProgress?.(5)

  // Temporarily unlock any overflow/height constraints so html2canvas gets the full element
  const originalOverflow = templateElement.style.overflow
  const originalMaxHeight = templateElement.style.maxHeight
  templateElement.style.overflow = 'visible'
  templateElement.style.maxHeight = 'none'

  let canvas: HTMLCanvasElement
  try {
    canvas = await html2canvas(templateElement, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
    })
  } finally {
    templateElement.style.overflow = originalOverflow
    templateElement.style.maxHeight = originalMaxHeight
  }

  onProgress?.(70)

  const imgData = canvas.toDataURL('image/jpeg', 0.95)
  const pxPerMm = canvas.width / BASE_WIDTH_MM
  const contentHeightMm = canvas.height / pxPerMm

  // Create a single-page PDF with custom dimensions matching the exact content ratio
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [BASE_WIDTH_MM, contentHeightMm],
  })

  pdf.addImage(imgData, 'JPEG', 0, 0, BASE_WIDTH_MM, contentHeightMm)

  onProgress?.(95)
  pdf.save(filename)
  onProgress?.(100)
}

/**
 * Export a DOM element to a single-page PDF that exactly fits its content and trigger a download.
 *
 * @param elementId   - The `id` attribute of the element to capture
 * @param filename    - Base filename (will be prefixed with "wymm-biodata-")
 * @param setLoading  - Optional callback to show/hide a loading indicator
 */
export async function exportToPDF(
  elementId: string,
  filename: string,
  setLoading?: (loading: boolean) => void,
): Promise<void> {
  setLoading?.(true)

  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found.`)
    }

    // Temporarily make the element visible at full height so html2canvas captures everything
    const originalStyle = {
      overflow: element.style.overflow,
      maxHeight: element.style.maxHeight,
      height: element.style.height,
    }
    element.style.overflow = 'visible'
    element.style.maxHeight = 'none'

    const canvas = await html2canvas(element, {
      scale: 2,               // retina quality
      useCORS: true,          // allow cross-origin images (Firebase Storage URLs)
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
    })

    // Restore element styles
    element.style.overflow = originalStyle.overflow
    element.style.maxHeight = originalStyle.maxHeight
    element.style.height = originalStyle.height

    const imgData = canvas.toDataURL('image/jpeg', 0.95)

    // Calculate the pixel-to-mm ratio so the image fits the width exactly
    const pxPerMm = canvas.width / BASE_WIDTH_MM
    const contentHeightMm = canvas.height / pxPerMm

    // Single custom-sized page matching exactly the full height
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [BASE_WIDTH_MM, contentHeightMm],
    })

    pdf.addImage(imgData, 'JPEG', 0, 0, BASE_WIDTH_MM, contentHeightMm)

    pdf.save(`wymm-biodata-${filename}.pdf`)
  } catch (err) {
    console.error('[pdfExport] Failed to export PDF:', err)
    throw err
  } finally {
    setLoading?.(false)
  }
}
