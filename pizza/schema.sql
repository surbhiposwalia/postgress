CREATE TABLE IF NOT EXISTS pizzas (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS batches (
    id SERIAL PRIMARY KEY,
    pizza_id INTEGER REFERENCES pizzas,
    quantity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS toppings(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pizzas_toppings(
    pizza_id INTEGER REFERENCES pizzas,
    topping_id INTEGER REFERENCES toppings,
    PRIMARY KEY (pizza_id,topping_id)
);
