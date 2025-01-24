function generatePDF(products) {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Set title
        doc.setFontSize(20);
        doc.text('Relatório de Reabastecimento', 20, 20);

        // Add current date
        doc.setFontSize(12);
        doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, 30);

        // Table headers
        const headers = ['Produto', 'Qtd. Atual', 'Qtd. Ideal', 'Diferença'];
        let y = 40;

        // Filter products that need restock
        const productsToRestock = products.filter(p => p.quantidadeAtual < p.quantidadeIdeal);

        if (productsToRestock.length === 0) {
            doc.text('Não há produtos que precisam ser reabastecidos.', 20, y);
        } else {
            // Draw headers
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            headers.forEach((header, i) => {
                doc.text(header, 20 + (i * 45), y);
            });

            // Draw products
            doc.setFont(undefined, 'normal');
            y += 10;
            productsToRestock.forEach(product => {
                const difference = product.quantidadeIdeal - product.quantidadeAtual;
                
                if (y > 270) { // Add new page if near bottom
                    doc.addPage();
                    y = 20;
                }

                doc.text(product.titulo.substring(0, 20), 20, y);
                doc.text(product.quantidadeAtual.toString(), 65, y);
                doc.text(product.quantidadeIdeal.toString(), 110, y);
                doc.text(difference.toString(), 155, y);
                
                y += 10;
            });
        }

        // Save the PDF
        doc.save('relatorio-estoque.pdf');
    } catch (error) {
        reportError(error);
    }
}
