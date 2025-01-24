function Header({ onGeneratePdf }) {
    return (
        <header className="glassmorphism p-4 mb-6">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold" data-name="header-title">
                    Sistema de Estoque
                </h1>
                <button 
                    className="btn btn-primary"
                    onClick={onGeneratePdf}
                    data-name="generate-pdf-button"
                >
                    <i className="fas fa-file-pdf mr-2"></i>
                    Gerar PDF
                </button>
            </div>
        </header>
    );
}
