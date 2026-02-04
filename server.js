import express from 'express';
import nunjucks from 'nunjucks';
import fs from 'fs';
const app = express();
const port = 3000;

app.use(express.urlencoded());

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', (req, res) => {
  let name = 'John';
  let age = 33;
  let fruits = [
    'Banana',
    'Mango',
    'Apple',
    'Pear',
    'Cherry',
  ];
  res.render('index.njk', {name, age, fruits});
});

app.get('/about', (req, res) => {
  res.render('about.njk');
});

app.get('/contact', (req, res) => {
  res.render('contact.njk');
});

app.get('/form', (req, res) => {
  res.render('form.njk');
});

app.get('/answers', (req, res) => {
  console.log(req.body);
  let answers = req.query;
  answers.cool = answers.cool === 'on' ? true : false;
  answers.age = parseInt(answers.age);
  answers.like = parseInt(answers.like);
  res.render('answers.njk', answers);
});


app.post('/answers', (req, res) => {
  console.log(req.body);
  let answers = req.body;
  answers.cool = answers.cool === 'on' ? true : false;
  answers.age = parseInt(answers.age);
  answers.like = parseInt(answers.like);
  res.render('answers.njk', answers);
});





app.get('/cats', (req, res) => {
  let data = fs.readFileSync('cats.json', {encoding: 'utf-8'});
  let cats = JSON.parse(data);
  res.render('cats/index.njk', {cats});
});

app.get('/cats/create', (req, res) => {
  res.render('cats/create.njk');
});

app.post('/cats', (req, res) => {
  let data = fs.readFileSync('cats.json', {encoding: 'utf-8'});
  let cats = JSON.parse(data);
  let lastId = cats[cats.length-1].id;
  let newCat = req.body;
  newCat.id = lastId + 1;
  newCat.spayed = newCat.spayed === "on" ? true : false;
  newCat.birthyear = parseInt(newCat.birthyear);
  cats.push (newCat);
  fs.writeFileSync('cats.json', JSON.stringify(cats, null, 2));
  res.render('cats/index.njk', {cats});
  res.redirect('/cats');
});

app.get('/cats/view', (req, res) => {
  let data = fs.readFileSync('cats.json', {encoding: 'utf-8'});
  let cats = JSON.parse(data);
  let cat = cats.find(cat => cat.id == req.query.id);
  res.render('cats/view.njk', {cat});
});

app.get('/cats/edit', (req, res) => {
  let data = fs.readFileSync('cats.json', {encoding: 'utf-8'});
  let cats = JSON.parse(data);
  let cat = cats.find(cat => cat.id == req.query.id);
  res.render('cats/edit.njk', {cat});
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});