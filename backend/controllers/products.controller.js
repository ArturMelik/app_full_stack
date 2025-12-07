const productModel = require('../models/products.model');

const createProduct = async (req, res) => {
    
    const { name, price, description, img, id_provider, relevancia } = req.body;

    if (!name || !price || !id_provider) {
        return res.status(400).json({ error: 'Nombre, precio e ID de proveedor son obligatorios.' });
    }
    // Simple validación de tipos
    if (isNaN(parseFloat(price)) || isNaN(parseInt(id_provider))) {
        return res.status(400).json({ error: 'Precio e ID de proveedor deben ser numéricos.' });
    }

    try {
        const newProduct = await productModel.createProductModel(name, price, description, img, id_provider, relevancia);
        res.status(201).json({ 
            message: 'Producto creado con éxito.',
            product: newProduct
        });
    } catch (error) {
        if (error.message.includes('proveedor')) {
            return res.status(404).json({ error: error.message });
        }
        console.error('Error al crear producto:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const getProducts = async (req, res) => {
    try {
        const { page, limit, sort, order } = req.query;

        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;

        // valores por defecto
        const sortField = sort || "name";
        const sortOrder = order === "desc" ? "DESC" : "ASC";

        const result = await productModel.getAllProductsModel(
            pageNumber,
            limitNumber,
            sortField,
            sortOrder
        );

        res.status(200).json(result);

    } catch (error) {
        console.error("Error al obtener productos:", error.message);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};


const getProductById = async (req, res) => {
    // El ID viene como parámetro de la URL (ej. /api/products/1)
    const id_product = parseInt(req.params.id); 

    if (isNaN(id_product)) {
        return res.status(400).json({ error: 'El ID del producto debe ser un número válido.' });
    }

    try {
        const product = await productModel.getProductByIdModel(id_product);
        
        if (!product) {

            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener producto por ID:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const editProduct = async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    // (validaciones de datos)

    try {
        const updatedProduct = await productModel.updateProductModel(productId, productData);

        if (!updatedProduct) {
            return res.status(404).json({ error: `Producto con ID ${productId} no encontrado.` });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {

        if (error.message.includes('proveedor')) { 
             return res.status(404).json({ error: error.message });
        }
        console.error('Error al editar producto:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al editar el producto.' });
    }
};

const searchProducts = async (req, res) => {
    const searchTerm = req.query.q;
    const sort = req.query.sort;  // Lee el campo
    const order = req.query.order; // Lee el orden

    if (!searchTerm) {
        return res.status(400).json({ message: "Falta el término de búsqueda." });
    }

    try {
        // Pasamos los 3 parámetros al modelo
        const products = await productModel.searchProductsModel(searchTerm, sort, order);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al realizar la búsqueda." });
    }
};

/**
 * @description Elimina un producto por su ID.
 * @route DELETE /api/products/:id
 * @access Private (Admin Only)
 * @param {object} req - Petición HTTP.
 * @param {object} res - Respuesta HTTP.
 */
const deleteProduct = async (req, res) => { 
    const productId = req.params.id;

    try {
        const deletedProduct = await productModel.deleteProductModel(productId); 

        if (!deletedProduct) {
            return res.status(404).json({ error: `Producto con ID ${productId} no encontrado.` });
        }
        return res.status(200).json({ 
            message: `El producto con ID ${productId} ha sido eliminado.`
        });

        res.status(204).send(); 
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor al eliminar el producto.' });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    editProduct,
    deleteProduct,
    searchProducts
};