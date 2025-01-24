function App() {
    const [products, setProducts] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [editingProduct, setEditingProduct] = React.useState(null);

    React.useEffect(() => {
        try {
            const predefinedProducts = [
                { id: "99401049", name: "Adesivo Plastico PVC", price: 0.00, unit: "un", idealQuantity: 1, minimumQuantity: 1, currentQuantity: 0 },
                { id: "99401050", name: "Adesivo PVC 90 KI KISAFIX 700g", price: 0.00, unit: "un", idealQuantity: 1, minimumQuantity: 1, currentQuantity: 0 },
                { id: "99401051", name: "Agua Destilada", price: 0.00, unit: "VIDRO", idealQuantity: 1, minimumQuantity: 1, currentQuantity: 0 },
                { id: "99401054", name: "Arame de Solda", price: 0.00, unit: "1Kg", idealQuantity: 1, minimumQuantity: 1, currentQuantity: 0 },
                { id: "99401055", name: "Arame GALVANIZADO rolo", price: 0.00, unit: "un", idealQuantity: 1, minimumQuantity: 1, currentQuantity: 0 },
                { id: "99401056", name: "Barbante p/ Banner", price: 0.00, unit: "un", idealQuantity: 2, minimumQuantity: 1, currentQuantity: 0 },
                { id: "99401057", name: "Bastão Madeira 16mm 5/8 - 105CM", price: 0.00, unit: "un", idealQuantity: 1, minimumQuantity: 1, currentQuantity: 0 },
                // Adicione mais itens da lista conforme necessário
            ];

            setProducts(predefinedProducts);
        } catch (error) {
            reportError(error);
        }
    }, []);

    const handleSaveProduct = (productData) => {
        try {
            if (productData.id) {
                const updated = updateProduct(productData);
                setProducts(getProducts());
            } else {
                const newProduct = addProduct(productData);
                setProducts(getProducts());
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleDeleteProduct = (productId) => {
        try {
            if (confirm('Tem certeza que deseja excluir este produto?')) {
                deleteProduct(productId);
                setProducts(getProducts());
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleEditProduct = (product) => {
        try {
            setEditingProduct(product);
            setShowModal(true);
        } catch (error) {
            reportError(error);
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        try {
            const product = products.find(p => p.id === productId);
            if (product) {
                updateProduct({ ...product, currentQuantity: newQuantity });
                setProducts(getProducts());
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleGeneratePdf = () => {
        try {
            generatePDF(products);
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
            <Header onGeneratePdf={handleGeneratePdf} />
            
            <ProductList 
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onQuantityChange={handleQuantityChange}
            />

            <FloatingButton onClick={() => {
                setEditingProduct(null);
                setShowModal(true);
            }} />

            {showModal && (
                <ProductModal
                    product={editingProduct}
                    onSave={handleSaveProduct}
                    onClose={() => {
                        setShowModal(false);
                        setEditingProduct(null);
                    }}
                />
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
