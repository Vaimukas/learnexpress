import express from 'express';
import nunjucks from 'nunjucks';
import fs from 'fs';
import session from 'express-session';
const app = express();
const port = 3000;

app.use(express.urlencoded());

app.use(session({
  secret: 'kalamari',
  resave: false,
  saveUninitialized: true,
}));

const env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(async(req, res, next) => {
  if (req.session.userId) {
  res.locals.user = await prisma.user.findUnique({
    where: { id: req.session.userId }
  });
} else {
  res.locals.user = null;
}
  next();
});

import publicRoutes from './controllers/public.js';
app.use(publicRoutes);

import catsRoutes from './controllers/cats.js';
app.use(catsRoutes); 

import cats from './controllers/cats.js';
app.use('/cats', cats);

import auth from './controllers/auth.js';
import { prisma } from './lib/prisma.js';
app.use(auth);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
