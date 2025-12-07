


CREATE TABLE users (
  id_user serial NOT NULL PRIMARY KEY, 
  username varchar(45) NOT NULL UNIQUE, 
  email varchar(100) NOT NULL UNIQUE,
  password varchar NOT NULL,
  role varchar(15) NOT NULL
);

CREATE TABLE providers (
    id_provider     SERIAL PRIMARY KEY,
    companyname     VARCHAR(100) NOT NULL,
    website         VARCHAR(255),
    img             VARCHAR(255)
);

CREATE TABLE products (
    id_product    SERIAL PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    price         DECIMAL(10,2) NOT NULL,
    description   TEXT,
    img           VARCHAR(255),
    id_provider   INTEGER NOT NULL,
    FOREIGN KEY (id_provider) REFERENCES providers(id_provider)
);


CREATE TABLE favorites (
    id_favorito   SERIAL PRIMARY KEY,
    id_user       INTEGER NOT NULL,
    id_product    INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_product) REFERENCES products(id_product)
);

ALTER TABLE products
ADD COLUMN relevancia INTEGER NOT NULL DEFAULT 3;