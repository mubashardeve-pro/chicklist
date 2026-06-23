export async function generatePDF(element, country) {
  if (!element || typeof window === 'undefined') {
    throw new Error('PDF content is not available.');
  }

  const html2canvas = (await import('html2canvas-pro')).default;
  const { jsPDF } = await import('jspdf');

  element.classList.add('pdf-capture');

  await new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: -window.scrollY,
      onclone: (clonedDoc) => {
        const clonedContent = clonedDoc.querySelector('.pdf-content');
        if (clonedContent) {
          clonedContent.classList.add('pdf-capture');
        }
      },
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const contentHeight = pageHeight - margin * 2;

    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= contentHeight;

    while (heightLeft > 0) {
      position = margin - (imgHeight - heightLeft);
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= contentHeight;
    }

    const safeCountry = country.trim().replace(/\s+/g, '_') || 'Checklist';
    const fileName = `Edify_documents_checklist_${safeCountry}_${new Date().toISOString().slice(0, 10)}.pdf`;
    pdf.save(fileName);
  } finally {
    element.classList.remove('pdf-capture');
  }
}
