import express from "express";

const router = express.Router();

router.use(express.static(".//static/public"));

router.get("/", (req, res) => {
  res.render("index", {
    platform: req.headers["sec-ch-ua-platform"].split('"')[1],
  });
});

router.get("/app/:platform", (req, res) => {
  res.download("./static/" + "public/vite.svg");
});

router.get("/thanks", (req, res) => {
  res.render("app", {});
});

export default router;
