const router = require("express").Router();

import { createThought, getThoughts, getSingleThought, updateThought, deleteThought, addReaction, removeReaction } from "../../controllers/thoughtController";

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought)
  .delete(removeReaction);

router.route("/:thoughtId/reactions").post(addReaction);

router
    .delete(removeReaction);

export default router;