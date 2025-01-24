function ProductList({ products, onEdit, onDelete, onQuantityChange }) {
    const [sortBy, setSortBy] = React.useState('name');

    const sortProducts = (items) => {
        return [...items].sort((a, b) => {
            if (sortBy === 'name') {
                return a.titulo.localeCompare(b.titulo);
            } else if (sortBy === 'quantity') {
                return a.quantidadeAtual - b.quantidadeAtual;
            } else if (sortBy === 'priority') {
                const aPriority = (a.quantidadeIdeal - a.quantidadeAtual) / a.quantidadeIdeal;
                const bPriority = (b.quantidadeIdeal - b.quantidadeAtual) / b.quantidadeIdeal;
                return bPriority - aPriority;
            }
            return 0;
        });
    };

    const handleQuantityChange = (productId, newValue) => {
        try {
            const value = parseInt(newValue, 10);
            if (!isNaN(value) && value >= 0) {
                onQuantityChange(productId, value);
            }
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="container mx-auto" data-name="product-list">
            <div className="mb-4 flex gap-4" data-name="sort-controls">
                <button 
                    className={`btn ${sortBy === 'name' ? 'btn-primary' : ''}`}
                    onClick={() => setSortBy('name')}
                    data-name="sort-by-name"
                >
                    Ordenar por Nome
                </button>
                <button 
                    className={`btn ${sortBy === 'quantity' ? 'btn-primary' : ''}`}
                    onClick={() => setSortBy('quantity')}
                    data-name="sort-by-quantity"
                >
                    Ordenar por Quantidade
                </button>
                <button 
                    className={`btn ${sortBy === 'priority' ? 'btn-primary' : ''}`}
                    onClick={() => setSortBy('priority')}
                    data-name="sort-by-priority"
                >
                    Ordenar por Prioridade
                </button>
            </div>

            <div className="grid gap-4" data-name="products-grid">
                {sortProducts(products).map(product => (
                    <div key={product.id} className="product-card" data-name={`product-${product.id}`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold mb-2">{product.titulo}</h3>
                                {product.descricao && (
                                    <p className="text-gray-400 mb-2">{product.descricao}</p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => onEdit(product)}
                                    data-name={`edit-product-${product.id}`}
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => onDelete(product.id)}
                                    data-name={`delete-product-${product.id}`}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                                <label className="text-sm text-gray-400">Quantidade Atual</label>
                                <div className="quantity-control">
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(product.id, product.quantidadeAtual - 1)}
                                        data-name={`decrease-quantity-${product.id}`}
                                    >
                                        -
                                    </button>
                                    <input 
                                        type="number"
                                        value={product.quantidadeAtual}
                                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                        className="form-input w-20 text-center"
                                        data-name={`quantity-input-${product.id}`}
                                    />
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(product.id, product.quantidadeAtual + 1)}
                                        data-name={`increase-quantity-${product.id}`}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400">Quantidade Ideal</label>
                                <div className="text-lg">{product.quantidadeIdeal}</div>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400">Quantidade Mínima</label>
                                <div className="text-lg">{product.quantidadeMinima}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
