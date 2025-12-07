const pool = require("../config/db");
const queries = require("../queries/products.queries");

const createProductModel = async (
  name,
  price,
  description,
  img,
  id_provider,
  relevancia
) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.createProduct, [
      name,
      price,
      description,
      img,
      id_provider,
      relevancia,
    ]);
    result = data.rows[0];
  } catch (err) {
    console.error("Error en productModel.createProductModel:", err.message);
    throw err;
  } finally {
    if (client) client.release();
  }
  return result;
};

const getAllProductsModel = async (page, limit, sort, order) => {
  let client, rows, totalItems;

  // whitelist de columnas permitidas (evita SQL injection)
  const allowedSort = ["name", "price", "relevancia"];
  const sortField = allowedSort.includes(sort) ? sort : "name";
  const sortOrder = order === "DESC" ? "DESC" : "ASC";

  try {
    client = await pool.connect();

    const countData = await client.query(queries.getTotalProducts);
    totalItems = parseInt(countData.rows[0].total);

    const offset = (page - 1) * limit;

    // ORDER BY dinámico
    const query = `
  SELECT 
    p.id_product,
    p.name,
    p.price,
    p.description,
    p.img,
    p.relevancia,
    pr.companyname AS provider_name
  FROM products p
  JOIN providers pr ON p.id_provider = pr.id_provider
  ORDER BY ${sortField} ${sortOrder}
  LIMIT $1 OFFSET $2;
`;

    const data = await client.query(query, [limit, offset]);
    rows = data.rows;
  } catch (err) {
    console.error("Error en getAllProductsModel:", err.message);
    throw err;
  } finally {
    if (client) client.release();
  }

  return {
    products: rows,
    totalItems: totalItems,
  };
};

const searchProductsModel = async (term, sort, order) => { 
  let client, result;
  try {
    client = await pool.connect();
    const queryTerm = `%${term}%`;

    // Validamos campos para evitar inyecciones SQL
    const allowedFields = ['name', 'price', 'relevancia', 'id_product'];
    const sortField = allowedFields.includes(sort) ? sort : 'id_product';
    const sortOrder = order && order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    // Construimos la query pegando el orden elegido 
    const dynamicQuery = `${queries.searchProducts} ORDER BY ${sortField} ${sortOrder}`;

    const data = await client.query(dynamicQuery, [queryTerm]);
    result = data.rows;
  } catch (err) {
    console.error("Error en productModel.searchProductsModel:", err.message);
    throw err;
  } finally {
    if (client) client.release();
  }
  return result;
};

const getProductByIdModel = async (id_product) => {
  let client, result;
  try {
    client = await pool.connect();
    // Usamos el ID como parámetro $1
    const data = await client.query(queries.getProductById, [id_product]);
    result = data.rows[0]; // Solo esperamos un resultado
  } catch (err) {
    console.error("Error en productModel.getProductByIdModel:", err.message);
    throw err;
  } finally {
    if (client) client.release();
  }
  return result;
};

const updateProductModel = async (id, productData) => {
  let client, result;
  const { query, values } = queries.updateProductQuery(id, productData);

  try {
    client = await pool.connect(); // Conectar el cliente

    const data = await client.query(query, values);
    result = data.rows[0] || null;
  } catch (err) {
    console.error("Error en productModel.updateProductModel:", err.message);
    throw err;
  } finally {
    if (client) client.release(); // Liberar el cliente
  }
  return result;
};

/**
 * @description Elimina un producto existente por su ID.
 * @param {number} id - ID del producto a eliminar.
 * @returns {object|null} El ID del producto eliminado o null si no se encontró.
 */
const deleteProductModel = async (id) => {
  let client, result;

  try {
    client = await pool.connect();
    const data = await client.query(queries.deleteProduct, [id]);
    result = data.rows[0] || null;
  } catch (error) {
    console.error("Error en productModel.deleteProductModel:", error.message);
    throw new Error("Error al eliminar el producto en la base de datos.");
  } finally {
    if (client) client.release();
  }
  return result;
};

module.exports = {
  createProductModel,
  getAllProductsModel,
  getProductByIdModel,
  updateProductModel,
  deleteProductModel,
  searchProductsModel,
};
