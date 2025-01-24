function ProductModal({ product, onSave, onClose }) {
    const [formData, setFormData] = React.useState(
        product || {
            titulo: '',
            descricao: '',
            quantidadeAtual: 0,
            quantidadeIdeal: 0,
            quantidadeMinima: 0
        }
    );

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            onSave(formData);
            onClose();
        } catch (error) {
            reportError(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name.includes('quantidade') ? parseInt(value, 10) : value
        }));
    };

    return (
        <div className="modal-overlay" data-name="product-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">
                        {product ? 'Editar Produto' : 'Adicionar Produto'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Título do Produto</label>
                            <input
                                type="text"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleChange}
                                className="form-input"
                                required
                                data-name="product-title-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Descrição (opcional)</label>
                            <textarea
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                className="form-input"
                                rows="3"
                                data-name="product-description-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Quantidade Atual</label>
                            <input
                                type="number"
                                name="quantidadeAtual"
                                value={formData.quantidadeAtual}
                                onChange={handleChange}
                                className="form-input"
                                min="0"
                                required
                                data-name="product-current-quantity-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Quantidade Ideal</label>
                            <input
                                type="number"
                                name="quantidadeIdeal"
                                value={formData.quantidadeIdeal}
                                onChange={handleChange}
                                className="form-input"
                                min="0"
                                required
                                data-name="product-ideal-quantity-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Quantidade Mínima</label>
                            <input
                                type="number"
                                name="quantidadeMinima"
                                value={formData.quantidadeMinima}
                                onChange={handleChange}
                                className="form-input"
                                min="0"
                                required
                                data-name="product-minimum-quantity-input"
                            />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn" 
                            onClick={onClose}
                            data-name="cancel-button"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            data-name="save-button"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
