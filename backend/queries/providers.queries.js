const getAllProviders = `
    SELECT id_provider, companyname, website, img
    FROM providers
`;

const createProvider = `
    INSERT INTO providers (companyname, website, img)
    VALUES ($1, $2, $3)
    RETURNING id_provider, companyname;
`;

// Necesitarás otras para GET by ID, UPDATE y DELETE, pero empezamos por estas.

const providerQueries = {
    getAllProviders,
    createProvider
};

module.exports = providerQueries;