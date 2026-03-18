import express from "express";
import fs from "fs";
import { prisma } from "../lib/prisma.js";

const router = express.Router();

router.get("", async (req, res) => {
  console.log(req.session.userId);
  let count = await prisma.cat.count();
  let perPage = 10;
  let pages = Math.ceil(count / perPage);
  let currentPage = parseInt(req.query.page ?? 1);
  let skip = perPage * (currentPage-1);
  let cats = await prisma.cat.findMany({
    take: perPage,
    skip: skip,
  });
  res.render("cats/index.njk", { cats, pages, currentPage });
});

router.get("/create", (req, res) => {
  res.render("cats/create.njk");
});

router.post("", async (req, res) => {
  await prisma.cat.create({
    data: {
      name: req.body.name,
      birthyear: parseInt(req.body.birthyear),
      gender: req.body.gender,
      color: req.body.color,
      eyes: req.body.eyes,
      spayed: req.body.spayed === "on" ? true : false,
    },
  });
  res.redirect("/cats");
});

router.get("/view", async (req, res) => {
  const cat = await prisma.cat.findUnique({
    where: { id: parseInt(req.query.id) },
  });
  res.render("cats/view.njk", { cat });
});

router.get("/edit", async (req, res) => {
  const cat = await prisma.cat.findUnique({
    where: { id: parseInt(req.query.id) },
  });
  res.render("cats/edit.njk", { cat });
});

router.post("/edit",async (req, res) => {
  await prisma.cat.update({
    where: { id: parseInt(req.query.id) },
    data: {
      name: req.body.name,
      birthyear: parseInt(req.body.birthyear),
      gender: req.body.gender,
      color: req.body.color,
      eyes: req.body.eyes,
      spayed: req.body.spayed === "on" ? true : false,
    },
  });
  res.redirect("/cats");
});

router.get("/delete",async (req, res) => {
  await prisma.cat.delete({
    where: { id: parseInt(req.query.id) },
  });
  res.redirect("/cats");
});

export default router;