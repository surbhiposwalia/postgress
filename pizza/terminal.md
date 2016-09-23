kl012:~/workspace $ psql -d pizza
psql (9.3.14)
Type "help" for help.

pizza=# SELECT * FROM pizzas;
 id |      name      
----+----------------
  1 | Surpreme-pizza
  2 | Farm-pizza
  3 | Meat-pizza
  4 | Kev-pizza
  5 | Vege-pizza
  6 | mushroom-pizza
  9 | fdf
 10 | ggrg
(8 rows)

pizza=# SELECT * FROM toppings;
 id |    name     
----+-------------
  1 | pineapple
  2 | peppers
  3 | onions
  4 | hot peppers
(4 rows)

pizza=# SELECT * FROM pizzas_toppings;
 pizza_id | topping_id 
----------+------------
        1 |          2
        2 |          3
        1 |          4
        3 |          3
        4 |          2
        3 |          1
        2 |          1
        1 |          1
(8 rows)

pizza=# \q
kl012:~/workspace $ psql -d recipify
psql (9.3.14)
Type "help" for help.

recipify=# select * from recipie
recipify-# SELECT * FROM recipies;
ERROR:  syntax error at or near "SELECT"
LINE 2: SELECT * FROM recipies;
        ^
recipify=# select * from recipie
SELECT * FROM recipies;
ERROR:  syntax error at or near "SELECT"
LINE 2: SELECT * FROM recipies;
        ^
recipify=# select * from recipies;
 id |  name  |       description       
----+--------+-------------------------
  2 | Kimchi | Korean traditional food
  1 | KK     | Rice rice rice
(2 rows)

recipify=# \q
kl012:~/workspace $ psql -d recipify
psql (9.3.14)
Type "help" for help.

recipify=# psql -d recipify < ./recipify/schema.sql
recipify-# psql -d recipify < ./recipify/schema.sql
recipify-# ;
ERROR:  syntax error at or near "psql"
LINE 1: psql -d recipify < ./recipify/schema.sql
        ^
recipify=# ;
recipify=# /q
recipify-# \q
kl012:~/workspace $ psql -d recipify < ./recipify/schema.sql
NOTICE:  relation "recipies" already exists, skipping
CREATE TABLE
NOTICE:  relation "recipies_tag" already exists, skipping
CREATE TABLE
CREATE TABLE
kl012:~/workspace $ psql -d recipify
psql (9.3.14)
Type "help" for help.

recipify=# SELECT * FROM recipie
recipify-# ;
ERROR:  relation "recipie" does not exist
LINE 1: SELECT * FROM recipie
                      ^
recipify=# SELECT * FROM recipies;
 id |  name  |       description       
----+--------+-------------------------
  2 | Kimchi | Korean traditional food
  1 | KK     | Rice rice rice
(2 rows)

recipify=# SELECT * FROM tags;
ERROR:  relation "tags" does not exist
LINE 1: SELECT * FROM tags;
                      ^
recipify=# SELECT * FROM recipies_tags;
ERROR:  relation "recipies_tags" does not exist
LINE 1: SELECT * FROM recipies_tags;
                      ^
recipify=# SELECT * FROM recipies_tag;
 id |   tag   
----+---------
  1 | #Surbhi
(1 row)

recipify=# SELECT * FROM steps;
 id | step | recipie_id 
----+------+------------
(0 rows)

recipify=# INSERT INTO recipies (name, description) VALUES('Pho', 'Viet noodle'), ('Curry', 'Hot rice'), ('Sandwich','Vegan sandwich');
INSERT 0 3
recipify=# SELECT * FROM recipies
recipify-# ;
 id |   name   |       description       
----+----------+-------------------------
  2 | Kimchi   | Korean traditional food
  1 | KK       | Rice rice rice
  4 | Pho      | Viet noodle
  5 | Curry    | Hot rice
  6 | Sandwich | Vegan sandwich
(5 rows)

recipify=# INSERT INTO steps (step, recipie_id) VALUE ('boil water', 4), ('boil egg', 4), ('add noodles', 4), ('cook rice', 5), ('put hot peppers', 5), ('add olive oil', 5), ('cut bread', 6);
ERROR:  syntax error at or near "VALUE"
LINE 1: INSERT INTO steps (step, recipie_id) VALUE ('boil water', 4)...
                                             ^
recipify=# INSERT INTO steps (step, recipie_id) VALUES ('boil water', 4), ('boil egg', 4), ('add noodles', 4), ('cook rice', 5), ('put hot peppers', 5), ('add olive oil', 5), ('cut bread', 6);
INSERT 0 7
recipify=# Select * from steps;
 id |      step       | recipie_id 
----+-----------------+------------
  1 | boil water      |          4
  2 | boil egg        |          4
  3 | add noodles     |          4
  4 | cook rice       |          5
  5 | put hot peppers |          5
  6 | add olive oil   |          5
  7 | cut bread       |          6
(7 rows)

recipify=# UPDATE steps ADD tag_id;
ERROR:  syntax error at or near "tag_id"
LINE 1: UPDATE steps ADD tag_id;
                         ^
recipify=# ALTER TABLE steps ADD COLUMN description tag_id;
ERROR:  type "tag_id" does not exist
LINE 1: ALTER TABLE steps ADD COLUMN description tag_id;
                                                 ^
recipify=# ALTER TABLE steps ADD COLUMN tag_id INTEGER REFERENCES recipies_tag;                                                                                                                
ALTER TABLE
recipify=# SELECT * FROM recipies_tag;
 id |   tag   
----+---------
  1 | #Surbhi
(1 row)

recipify=# SELECT * FROM steps;
 id |      step       | recipie_id | tag_id 
----+-----------------+------------+--------
  1 | boil water      |          4 |       
  2 | boil egg        |          4 |       
  3 | add noodles     |          4 |       
  4 | cook rice       |          5 |       
  5 | put hot peppers |          5 |       
  6 | add olive oil   |          5 |       
  7 | cut bread       |          6 |       
(7 rows)

recipify=# INSERT INTO recipies_tag (tag) VALUES ('makes it hot'), ('creates good flavor'), ('makes it soft'), ('creates chewiness');                                            
INSERT 0 4
recipify=# SELECT * FROM recipies_tag
recipify-# ;
 id |         tag         
----+---------------------
  1 | #Surbhi
  2 | makes it hot
  3 | creates good flavor
  4 | makes it soft
  5 | creates chewiness
(5 rows)

recipify=# UPDATE recipies_tag SET tag='balance flavor' WHERE id=1;
UPDATE 1
recipify=# SELECT * FROM recipies_tag
;
 id |         tag         
----+---------------------
  2 | makes it hot
  3 | creates good flavor
  4 | makes it soft
  5 | creates chewiness
  1 | balance flavor
(5 rows)

recipify=# UPDATE steps SET tag_id=2 WHERE id=1
recipify-# ;
UPDATE 1
recipify=# ALTER TABLE steps DROP COLUMN tag_id;
ALTER TABLE
recipify=# SELECT * FROM steps;
 id |      step       | recipie_id 
----+-----------------+------------
  2 | boil egg        |          4
  3 | add noodles     |          4
  4 | cook rice       |          5
  5 | put hot peppers |          5
  6 | add olive oil   |          5
  7 | cut bread       |          6
  1 | boil water      |          4
(7 rows)

recipify=# ALTER TABLE recipies_tag ADD COLUMN recipie_id;
ERROR:  syntax error at or near ";"
LINE 1: ALTER TABLE recipies_tag ADD COLUMN recipie_id;
                                                      ^
recipify=# ALTER TABLE recipies_tag ADD COLUMN recipie_id INTEGER REFERENCES recipies;
ALTER TABLE
recipify=# SELECT * FROM steps;
 id |      step       | recipie_id 
----+-----------------+------------
  2 | boil egg        |          4
  3 | add noodles     |          4
  4 | cook rice       |          5
  5 | put hot peppers |          5
  6 | add olive oil   |          5
  7 | cut bread       |          6
  1 | boil water      |          4
(7 rows)

recipify=# SELECT * FROM recipies_tag;
 id |         tag         | recipie_id 
----+---------------------+------------
  2 | makes it hot        |           
  3 | creates good flavor |           
  4 | makes it soft       |           
recipify=# UPDATE recipies_tag SET recipie_id=2 WHERE id=5;                                                                                                                                    
UPDATE 1recipify=# UPDATE recipies_tag SET recipie_id=3 WHERE id=1;                                                                                                                                    
ERROR:  insert or update on table "recipies_tag" violates foreign key constraint "recipies_tag_recipie_id_fkey"
DETAIL:  Key (recipie_id)=(3) is not present in table "recipies".
recipify=# UPDATE recipies_tag SET recipie_id=3 WHERE id=1;                                                                                                                                    ERROR:  insert or update on table "recipies_tag" violates foreign key constraint "recipies_tag_recipie_id_fkey"
DETAIL:  Key (recipie_id)=(3) is not present in table "recipies".
recipify=# SELECT * FROM recipies_tag;
 id |         tag         | recipie_id 
----+---------------------+------------
  1 | balance flavor      |           
  2 | makes it hot        |          1
  3 | creates good flavor |          1
  4 | makes it soft       |          2
  5 | creates chewiness   |          2
(5 rows)

recipify=# UPDATE recipies_tag SET recipie_id=4 WHERE id=1;                                                                                                                                    
UPDATE 1
recipify=# UPDATE recipies_tag SET recipie_id=3 WHERE id=1;                                                                                                                                    
ERROR:  insert or update on table "recipies_tag" violates foreign key constraint "recipies_tag_recipie_id_fkey"
DETAIL:  Key (recipie_id)=(3) is not present in table "recipies".
recipify=# SELEcT * FROM recipies;
 id |   name   |       description       
----+----------+-------------------------
  2 | Kimchi   | Korean traditional food
  1 | KK       | Rice rice rice
  4 | Pho      | Viet noodle
  5 | Curry    | Hot rice
  6 | Sandwich | Vegan sandwich
(5 rows)

recipify=# SELEcT * FROM recipies_tag;
 id |         tag         | recipie_id 
----+---------------------+------------
  2 | makes it hot        |          1
  3 | creates good flavor |          1
  4 | makes it soft       |          2
  5 | creates chewiness   |          2
  1 | balance flavor      |          4
(5 rows)

recipify=# SELECT * FROM steps;
 id |      step       | recipie_id 
----+-----------------+------------
  2 | boil egg        |          4
  3 | add noodles     |          4
  4 | cook rice       |          5
  5 | put hot peppers |          5
  6 | add olive oil   |          5
  7 | cut bread       |          6
  1 | boil water      |          4
(7 rows)

recipify=# SELECT recipies.name, steps.step FROM recipies INNER JOIN steps ON recipies.id=steps.recipie_id WHERE recipies.name='Pho';
 name |    step     
------+-------------
 Pho  | boil egg
 Pho  | add noodles
 Pho  | boil water
(3 rows)

recipify=# SELECT recipies.name, steps.step FROM recipies INNER JOIN steps ON recipies.id=steps.recipie_id WHERE name='Pho';
 name |    step     
------+-------------
 Pho  | boil egg
 Pho  | add noodles
 Pho  | boil water
(3 rows)

recipify=# ALTER TABLE steps RENAME COLUMN step TO name;
ALTER TABLE
recipify=# SELECT * FROM steps;
 id |      name       | recipie_id 
----+-----------------+------------
  2 | boil egg        |          4
  3 | add noodles     |          4
  4 | cook rice       |          5
  5 | put hot peppers |          5
  6 | add olive oil   |          5
  7 | cut bread       |          6
  1 | boil water      |          4
(7 rows)

recipify=# SELECT recipies.name, steps.step FROM recipies INNER JOIN steps ON recipies.id=steps.recipie_id WHERE name='Pho';
ERROR:  column steps.step does not exist
LINE 1: SELECT recipies.name, steps.step FROM recipies INNER JOIN st...
                              ^
recipify=# SELECT recipies.name, steps.name FROM recipies INNER JOIN steps ON recipies.id=steps.recipie_id WHERE name='Pho';                                        
ERROR:  column reference "name" is ambiguous
LINE 1: ... JOIN steps ON recipies.id=steps.recipie_id WHERE name='Pho'...
                                                             ^
recipify=# SELECT recipies.name, steps.name FROM recipies INNER JOIN steps ON recipies.id=steps.recipie_id WHERE steps.name='Pho';
 name | name 
------+------
(0 rows)

recipify=# SELECT recipies.name, steps.name FROM recipies INNER JOIN steps ON recipies.id=steps.recipie_id WHERE steps.name=*;
ERROR:  operator does not exist: text =*
LINE 1: ...IN steps ON recipies.id=steps.recipie_id WHERE steps.name=*;
                                                                    ^
HINT:  No operator matches the given name and argument type(s). You might need to add explicit type casts.
recipify=# SELECT recipies.name, steps.name FROM recipies INNER JOIN steps ON recipies.id=steps.recipie_id;
   name   |      name       
----------+-----------------
 Pho      | boil egg
 Pho      | add noodles
 Curry    | cook rice
 Curry    | put hot peppers
 Curry    | add olive oil
 Sandwich | cut bread
 Pho      | boil water
(7 rows)

recipify=# ALTER TABLE steps RENAME COLUMN name TO step;
ALTER TABLE
recipify=# SELECT * FROM steps;
 id |      step       | recipie_id 
----+-----------------+------------
  2 | boil egg        |          4
  3 | add noodles     |          4
  4 | cook rice       |          5
  5 | put hot peppers |          5
  6 | add olive oil   |          5
(7 rows)

recipify=# SELECT recipies.name, steps.name FROM recipies LEFT OUTER JOIN steps ON recipies.id=steps.recipie_id;                                                    
ERROR:  column steps.name does not exist
LINE 1: SELECT recipies.name, steps.name FROM recipies LEFT OUTER JO...
                              ^
recipify=# SELECT recipies.name, steps.step FROM recipies LEFT OUTER JOIN steps ON recipies.id=steps.recipie_id;                                                    
   name   |      step       
----------+-----------------
 Pho      | boil egg
 Pho      | add noodles
 Curry    | cook rice
 Curry    | put hot peppers
 Curry    | add olive oil
 Sandwich | cut bread
 Pho      | boil water
 Kimchi   | 
 KK       | 
(9 rows)

recipify=# SELECT recipies.name, steps.step FROM recipies RIGHT OUTER JOIN steps ON recipies.id=steps.recipie_id;                                                   
   name   |      step       
----------+-----------------
 Pho      | boil egg
 Pho      | add noodles
 Curry    | cook rice
 Curry    | put hot peppers
 Curry    | add olive oil
 Sandwich | cut bread
 Pho      | boil water
(7 rows)

recipify=# SELECT recipies.name, steps.step FROM recipies JOIN steps ON recipies.id=steps.recipie_id;                                                               
   name   |      step       
----------+-----------------
 Pho      | boil egg
 Pho      | add noodles
 Curry    | cook rice
 Curry    | put hot peppers
 Curry    | add olive oil
 Sandwich | cut bread
 Pho      | boil water
(7 rows)

recipify=# select * from recipies_tag;
 id |         tag         | recipie_id 
----+---------------------+------------
  2 | makes it hot        |          1
  3 | creates good flavor |          1
  4 | makes it soft       |          2
  5 | creates chewiness   |          2
  1 | balance flavor      |          4
(5 rows)

recipify=# CREATE TABLE tag_recipie (
recipify(# id SERIAL PRIMARY KEY,
recipify(# tag_id INTEGER REFERENCES recipies_tag
recipify(# ,
recipify(# recipie_id INTEGER REFERENCES recipies;
recipify(# );
ERROR:  syntax error at or near ";"
LINE 5: recipie_id INTEGER REFERENCES recipies;
                                              ^
recipify=# CREATE TABLE tag_recipie (
id SERIAL PRIMARY KEY,
tag_id INTEGER REFERENCES recipies_tag
,
recipie_id INTEGER REFERENCES recipies);
CREATE TABLE
recipify=# ALTER TABLE recipies_tag DROP COLUMN recipie_id;
ALTER TABLE
recipify=# INSERT INTO tag_recipie (tag_id, recipie_id) VALUES (2, 1), (2, 2), (2, 2), (4, 4), (4,5), (4,6), (5,5), (5,1), (6,5), (1, 6), (1,4); 
ERROR:  insert or update on table "tag_recipie" violates foreign key constraint "tag_recipie_tag_id_fkey"
DETAIL:  Key (tag_id)=(6) is not present in table "recipies_tag".
recipify=# INSERT INTO tag_recipie (tag_id, recipie_id) VALUES (2, 1), (2, 2), (2, 2), (4, 4), (4,5), (4,6), (5,5), (5,1), (4,5), (1, 6), (1,4); 
INSERT 0 11
recipify=# SELECT * FROM recipies_tag;
 id |         tag         
----+---------------------
  2 | makes it hot
  3 | creates good flavor
  4 | makes it soft
  5 | creates chewiness
  1 | balance flavor
(5 rows)

recipify=# SELECT * FROM tag_recipie;
 id | tag_id | recipie_id 
----+--------+------------
 12 |      2 |          1
 13 |      2 |          2
 14 |      2 |          2
 15 |      4 |          4
 16 |      4 |          5
 17 |      4 |          6
 18 |      5 |          5
 19 |      5 |          1
 20 |      4 |          5
 21 |      1 |          6
 22 |      1 |          4
(11 rows)

recipify=# SELECT * FROM recipies;
 id |   name   |       description       
----+----------+-------------------------
  2 | Kimchi   | Korean traditional food
  1 | KK       | Rice rice rice
  4 | Pho      | Viet noodle
  5 | Curry    | Hot rice
  6 | Sandwich | Vegan sandwich
(5 rows)

recipify=# SELECT * FROM tag_recipies;                                                                                                           
ERROR:  relation "tag_recipies" does not exist
LINE 1: SELECT * FROM tag_recipies;
                      ^
recipify=# SELECT * FROM recipies_tags;                                                                                                          
ERROR:  relation "recipies_tags" does not exist
LINE 1: SELECT * FROM recipies_tags;
                      ^
recipify=# SELECT * FROM recipies_tag;                                                                                                           
 id |         tag         
----+---------------------
  2 | makes it hot
  3 | creates good flavor
  4 | makes it soft
  5 | creates chewiness
  1 | balance flavor
(5 rows)
recipify=# SELECT recipies.name FROM recipies JOIN tag_recipie ON recipies.id=tag_recipie.recipie_id JOIN recipies_tag ON tag_recipie.recipie_id=recipies_tag.id WHERE recipies_tag.tag='makes it hot';                                                                                           
  name  
--------
 Kimchi
 Kimchi
(2 rows)
recipify=# SELECT recipies.name FROM recipies JOIN tag_recipie ON recipies.id=tag_recipie.recipie_id JOIN recipies_tag ON tag_recipie.recipie_id=recipies_tag.id WHERE recipies_tag.tag='balance flavor';                                                                                         
 name 
------
 KK
 KK
(2 rows)

recipify=# SELECT recipies.name FROM recipies INNER JOIN tag_recipie ON recipies.id=tag_recipie.recipie_id INNER JOIN recipies_tag ON tag_recipie
.recipie_id=recipies_tag.id WHERE recipies_tag.tag='balance flavor';                                                                             
 name 
------
 KK
 KK
(2 rows)
recipify=# SELECT recipies.name FROM recipies INNER JOIN tag_recipie ON recipies.id=tag_recipie.recipie_id INNER JOIN recipies_tag ON recipies_tag.id=tag_recipie.recipie_id WHERE recipies_tag.tag='balance flavor';       
 name 
------
 KK
 KK
(2 rows)

recipify=# SELECT recipies.name FROM recipies INNER JOIN tag_recipie ON recipies.id=tag_recipie.recipie_id INNER JOIN recipies_tag ON recipies_tag.id=tag_recipie.recipie_id WHERE recipies_tag.id=2;                       
  name  
--------
 Kimchi
 Kimchi
(2 rows)

recipify=# SELECT recipies.name FROM recipies INNER JOIN tag_recipie ON recipies.id=tag_recipie.recipie_id INNER JOIN recipies_tag ON recipies_tag.id=tag_recipie.recipie_id WHERE recipies_tag.id=1;                       
 name 
------
 KK
 KK
(2 rows)

recipify=# SELECT * FROM recipies_tags;
ERROR:  relation "recipies_tags" does not exist
LINE 1: SELECT * FROM recipies_tags;
                      ^
recipify=# SELECT * FROM recipie_tags;
ERROR:  relation "recipie_tags" does not exist
LINE 1: SELECT * FROM recipie_tags;
                      ^
recipify=# SELECT * FROM recipies_tag;
 id |         tag         
----+---------------------
  2 | makes it hot
  3 | creates good flavor
  4 | makes it soft
  5 | creates chewiness
  1 | balance flavor
(5 rows)

recipify=# SELECT * FROM tag_recipies;
ERROR:  relation "tag_recipies" does not exist
LINE 1: SELECT * FROM tag_recipies;
                      ^
recipify=# SELECT * FROM tag_recipie;
 id | tag_id | recipie_id 
----+--------+------------
 12 |      2 |          1
 13 |      2 |          2
 14 |      2 |          2
 15 |      4 |          4
 16 |      4 |          5
 17 |      4 |          6
 18 |      5 |          5
 19 |      5 |          1
 20 |      4 |          5
 21 |      1 |          6
 22 |      1 |          4
(11 rows)

recipify=# SELECT * FROM recipies;
 id |   name   |       description       
----+----------+-------------------------
  2 | Kimchi   | Korean traditional food
  1 | KK       | Rice rice rice
  4 | Pho      | Viet noodle
  5 | Curry    | Hot rice
  6 | Sandwich | Vegan sandwich
(5 rows)

recipify=# SELECT recipies.name FROM recipies INNER JOIN tag_recipie ON recipies.id=tag_recipie.recipie_id INNER JOIN recipies_tag ON recipies_tag.id=tag_recipie.recipie_id WHERE recipies_tag.id=4;                       
 name 
------
 Pho
 Pho
(2 rows)

recipify=# SELECT DISTINCT recipies.name FROM recipies INNER JOIN tag_recipie ON recipies.id=tag_recipie.recipie_id INNER JOIN recipies_tag ON recipies_tag.id=tag_recipie.recipie_id WHERE recipies_tag.id=4;             
 name 
------
 Pho
(1 row)

recipify=# select recipies.name from recipes join tag_recipie on recipies.id=tag_recipie.recipie_id;
ERROR:  relation "recipes" does not exist
LINE 1: select recipies.name from recipes join tag_recipie on recipi...
                                  ^
recipify=# select recipies.name from recipies join tag_recipie on recipies.id=tag_recipie.recipie_id;                                                                                                                       
   name   
----------
 KK
 Kimchi
 Kimchi
 Pho
 Curry
 Sandwich
 Curry
 KK
 Curry
 Sandwich
 Pho
(11 rows)

recipify=# select recipies.name from recipies join tag_recipie on recipies.id=tag_recipie.recipie_id where tag_recipie.tag_id=1;
   name   
----------
 Pho
 Sandwich
(2 rows)

recipify=# select recipies.name from recipies join tag_recipie on recipies.id=tag_recipie.recipie_id join recipies_tag on tag_recipie.tag_id=recipies_tag.id;
   name   
----------
 KK
 Kimchi
 Kimchi
 Pho
 Curry
 Sandwich
 Curry
 KK
 Curry
 Sandwich
 Pho
(11 rows)

recipify=# select recipies.name from recipies join tag_recipie on recipies.id=tag_recipie.recipie_id join recipies_tag on tag_recipie.tag_id=recipies_tag.id where recipies_tag.tag='balance flavor';              
   name   
----------
 Sandwich
 Pho
(2 rows)

recipify=# SELECT recipies.name FROM recipies INNER JOIN tag_recipie ON recipies.id=tag_recipie.recipie_id INNER JOIN recipies_tag ON recipies_tag.id=tag_recipie.recipie_id WHERE recipies_tag.id=4;
 name 
------
 Pho
 Pho
(2 rows)

recipify=# SELECT recipies.name FROM recipies INNER JOIN tag_recipie ON recipies.id=tag_recipie.recipie_id INNER JOIN recipies_tag ON recipies_tag.id=tag_recipie.tag_id WHERE recipies_tag.id=4;                           
   name   
----------
 Pho
 Curry
 Curry
 Sandwich
(4 rows)

recipify=# SELECT recipies.name FROM recipies INNER JOIN tag_recipie ON recipies.id=tag_recipie.recipie_id INNER JOIN recipies_tag ON recipies_tag.id=tag_recipie.tag_id WHERE recipies_tag.id=1;
   name   
----------
 Pho
 Sandwich
(2 rows)

recipify=# SELECT recipies.name FROM recipies INNER JOIN tag_recipie ON recipies.id=tag_recipie.recipie_id INNER JOIN recipies_tag ON recipies_tag.id=tag_recipie.tag_id WHERE recipies_tag.tag='balance flavor';
   name   
----------
 Sandwich
 Pho
(2 rows)

recipify=# 