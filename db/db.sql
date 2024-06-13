CREATE TABLE clientes (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(40) NOT NULL,
	apellido VARCHAR(40) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL
);
SELECT * FROM clientes;
INSERT INTO clientes(nombre,apellido,email) VALUES ('Pablo','Schlotthauer','pablo@mail.com')
INSERT INTO clientes(nombre,apellido,email) VALUES ('Sebastian','Cozzi','sebastian@mail.com')
INSERT INTO clientes(nombre,apellido,email) VALUES ('Alejo','Beliz','alejo@mail.com')
INSERT INTO clientes(nombre,apellido,email) VALUES ('Sandra','Lopez','sandra@mail.com')
INSERT INTO clientes(nombre,apellido,email) VALUES ('Carlos Horacio','Lopez','carlos@mail.com')

UPDATE Clientes SET email = 'sandra@mail.com' WHERE id=4

SELECT * FROM clientes WHERE (id>1 AND id<6 and imagen IS NOT NULL) 
OR imagen IS NULL

CREATE TABLE tipos_clientes(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
descripcion VARCHAR(30) NOT NULL UNIQUE
);
ALTER TABLE tipos_clientes ADD COLUMN habilitado INT NOT null DEFAULT 1;

SELECT * FROM tipos_clientes;
SELECT * FROM clientes;
DESCRIBE tipos_clientes;
DESCRIBE clientes;

INSERT INTO tipos_clientes (descripcion) VALUES ('BRONCE');
INSERT INTO tipos_clientes (descripcion) VALUES ('PLATA');
INSERT INTO tipos_clientes (descripcion) VALUES ('ORO');

ALTER TABLE clientes ADD COLUMN clientes_tipos_id INT NOT NULL DEFAULT 1;

ALTER TABLE clientes ADD CONSTRAINT fk_cliente_tipos_clientes_id FOREIGN KEY (clientes_tipos_id) REFERENCES tipos_clientes(id);

UPDATE clientes 
SET clientes_tipos_id = 6
WHERE id= 5;

SELECT * FROM clientes;

SELECT * FROM clientes,tipos_clientes WHERE clientes.clientes_tipos_id = tipos_clientes.id;

SELECT c.id,
	c.nombre,
	c.apellido,
	c.email,
	t.descripcion
	FROM clientes AS c, 
		tipos_clientes AS t
	WHERE c.clientes_tipos_id=t.id
	ORDER BY c.id;

SELECT id, 
	CONCAT(nombre,' ', apellido) AS nombre_completo, 
	email,
	(SELECT descripcion FROM tipos_clientes WHERE clientes_tipos_id=id) AS tipo_cliente 
	FROM clientes
ORDER BY nombre_completo;

SELECT * FROM usuarios
