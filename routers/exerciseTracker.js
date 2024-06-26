const { Router } = require("express");
const { getUsers, createUser, addExercise, getExerciseLog } = require("../controllers/exerciseTrackerController");

const router = Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:_id/exercises").post(addExercise);
router.route("/:_id/logs").get(getExerciseLog);

module.exports = router;