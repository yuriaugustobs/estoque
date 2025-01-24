function FloatingButton({ onClick }) {
    return (
        <button 
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 text-white text-3xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            onClick={onClick}
            data-name="add-product-button"
        >
            <i className="fas fa-plus"></i>
        </button>
    );
}
