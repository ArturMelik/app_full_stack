const pool = require('../config/db'); 
const queries = require('../queries/providers.queries');

const getAllProvidersModel = async () => {
    let client, rows;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getAllProviders);
        rows = data.rows; 
    } catch (err) {
        console.error('Error en providerModel.getAllProvidersModel:', err.message);
        throw err;
    } finally {
        if (client) client.release();
    }
    return rows;
};

const createProviderModel = async (companyname, website, img) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createProvider, [companyname, website, img]);
        result = data.rows[0];
    } catch (err) {
        console.error('Error en providerModel.createProviderModel:', err.message);
        throw err;
    } finally {
        if (client) client.release();
    }
    return result;
};

module.exports = {
    getAllProvidersModel,
    createProviderModel
};