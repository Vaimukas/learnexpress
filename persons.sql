SELECT id, age, gender FROM persons;

SELECT * FROM persons;

SELECT * FROM persons WHERE age=20;

SELECT * FROM persons WHERE gender='Male';

SELECT * FROM persons WHERE gender='Male' AND age=20;

SELECT * FROM persons WHERE gender='Male' OR age=20;

SELECT * FROM persons WHERE gender='!Male';

SELECT * FROM persons WHERE age<10;

SELECT * FROM persons WHERE age BETWEEN 20 AND 29;

SELECT * FROM persons WHERE first_name= 'Bear';

SELECT * FROM persons WHERE first_name LIkE 'A%';

SELECT * FROM persons WHERE first_name LIkE '%A';

SELECT * FROM persons WHERE first_name LIkE '%X%';

SELECT * FROM persons LIMIT 10;

SELECT * FROM persons LIMIT 10 OFFSET 20;

SELECT * FROM persons ORDER BY age;

SELECT * FROM persons ORDER BY age DESC;

SELECT * FROM persons ORDER BY age DESC, id;

SELECT MIN(age) from persons;

SELECT MIN(age), max(age) FROM persons;

SELECT sum(age) FROM persons;

SELECT COUNT(*) FROM persons;

SELECT min(age), max(age), avg(age), sum(age), count(*) FROM persons;