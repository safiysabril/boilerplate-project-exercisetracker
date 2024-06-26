const { Router } = require("express");
const exerciseTrackerRoute = require("./exerciseTracker");
const router = Router();

router.use("/", exerciseTrackerRoute);

module.exports = { router };