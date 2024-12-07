-- CREATE TABLE cart_product(
--     id INTEGER NOT NULL PRIMARY KEY,
--     cart_id INTEGER,
--     product_id INTEGER,
--     quantity INTEGER,
--     FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
--     FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
    
-- )

-- CREATE TABLE product(
--     id INTEGER NOT NULL PRIMARY KEY,
--     name VARCHAR(250),
--     price INTEGER,
--     brand VARCHAR(250),
--     category VARCHAR(250)
-- )

-- INSERT INTO customer(
--     id, name, age, gender, email, password
-- )
-- VALUES (5, 'John', 26, 'male', 'john@gmail.com', '123456');

-- INSERT INTO address(
--     id, pin_code, door_no, city, customer_id
-- )
-- VALUES (1, 553355, '20-30', 'Hyderabad', 1),
--        (2, 553366, '30-22', 'Delhi', 1),
--        (3, 553353, '20-35', 'Hyderabad', 1),
--        (4, 553364, '30-24', 'Delhi', 2),
--        (5, 553356, '40-30', 'Hyderabad', 3),
--        (6, 553363, '50-20', 'Delhi', 3),
--        (7, 553358, '60-30', 'Hyderabad', 4),
--        (8, 553360, '70-20', 'Delhi', 4)

-- INSERT INTO cart(
--     id, total_price, customer_id
-- )
-- VALUES (1, 12000, 1),
--        (2, 3000, 2),
--        (3, 400, 3),
--        (4, 600, 4)

-- INSERT INTO product(
--     id, name, price, brand, category
-- )
-- VALUES (1, 'T-shirt', 400, 'Puma', 'Clothing'),
--        (2, 'iPhone 15 pro max', 120000, 'Apple', 'Gadgets'),
--        (3, 'i watch', 30000, 'Apple', 'Gadgets'),
--        (4, 'Dabar Red tooth paste', 200, 'Godrej', 'Grocery')

-- INSERT INTO cart_product(
--     id, cart_id, product_id, quantity
-- )
-- VALUES (1, 1, 1, 1),
--        (2, 1, 2, 1),
--        (3, 2, 3, 2),
--        (4, 4, 1, 3)


-- SELECT * FROM cart_product;

-- GETTING addresses (One to Many)
-- SELECT *
-- FROM customer
-- JOIN address ON customer.id = address.customer_id
-- WHERE customer.name = 'Ashok';

-- Getting cart details of customer (One to One)
-- SELECT *
-- FROM customer
--     JOIN cart ON customer.id = cart.customer_id
-- WHERE customer.name = 'Ashok';

-- Getting all products (Many to Many)
-- SELECT *
-- FROM cart
--      JOIN cart_product ON cart.id = cart_product.cart_id
--      JOIN product ON product.id = cart_product.product_id 
-- WHERE cart.customer_id = 1; 



-- SELECT * FROM customer INNER JOIN address ON customer.id = address.customer_id
-- WHERE customer.name = 'Ashok';

-- SELECT * FROM customer JOIN cart ON customer.id = cart.customer_id
-- WHERE customer.name = 'Ashok';

-- SELECT * FROM cart JOIN cart_product ON cart.id = cart_product.cart_id
-- WHERE cart.customer_id = 1;

