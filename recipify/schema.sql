CREATE TABLE IF NOT EXISTS recipies (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS recipies_tag  (
    id SERIAL PRIMARY KEY,
    tag TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS steps (
    id SERIAL PRIMARY KEY,
    step TEXT NOT NULL,
    recipie_id INTEGER REFERENCES recipies
);