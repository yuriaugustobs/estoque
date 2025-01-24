const STORAGE_KEY = 'stock_products';

function getProducts() {
    try {
        const products = localStorage.getItem(STORAGE_KEY);
        return products ? JSON.parse(products) : [];
    } catch (error) {
        reportError(error);
        return [];
    }
}

function saveProducts(products) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
        reportError(error);
    }
}

function addProduct(product) {
    try {
        const products = getProducts();
        const newProduct = {
            ...product,
            id: Date.now().toString()
        };
        products.push(newProduct);
        saveProducts(products);
        return newProduct;
    } catch (error) {
        reportError(error);
    }
}

function updateProduct(product) {
    try {
        const products = getProducts();
        const index = products.findIndex(p => p.id === product.id);
        if (index !== -1) {
            products[index] = product;
            saveProducts(products);
            return product;
        }
    } catch (error) {
        reportError(error);
    }
}

function deleteProduct(productId) {
    try {
        const products = getProducts();
        const newProducts = products.filter(p => p.id !== productId);
        saveProducts(newProducts);
    } catch (error) {
        reportError(error);
    }
}
