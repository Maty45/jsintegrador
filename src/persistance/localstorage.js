export const handleGetProductLS = () => {
    const products = JSON.parse(localStorage.getItem('products'));

    if (products) {
        return products;
    } else {
        return [];
    };


};

export const setInLocalStorage = (productIn) => {
    if (productIn) {
        let productsinLocal = handleGetProductLS();
    
        const existingIndex = productsinLocal.findIndex((productsinLocal) => {
          return productsinLocal.id === productIn.id;
        });
    
        if (existingIndex !== -1) {
            productsinLocal[existingIndex] = productIn;
        } else {
            productsinLocal.push(productIn);
        }
    
        localStorage.setItem('products', JSON.stringify(productsinLocal));
    }

};