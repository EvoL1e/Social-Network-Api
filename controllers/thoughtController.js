import { User, Thought } from "../models";

export function createThought(req, res) {
    Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: thought._id } },
                { new: true }
            ).then((userData) => {
                res.json(userData);
            });
        })
        .catch((err) => res.status(500).json(err));
}
export function getThoughts(req, res) {
    Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => {
            res.status(500).json(err);
        });
}
export function  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-_v")
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "Nothing with that id" })
          : res.json({thought,})
      )
      .catch((err) => {
        return res.status(500).json(err);
      });
}
export function updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
    .then((updatedThought) =>
    !updatedThought
      ? res.status(400).json({ message: "Nothing with that id" })
      : res.json(updatedThought)
  )
  .catch((err) => res.status(500).json(err));
}
export function deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((deletedThought) =>
        !deletedThought
          ? res.status(404).json({
             message: "No thought found with that id",
          })
          : res.json({ message: "Thought successfully deleted" })
          )
  .catch((err) => res.status(500).json(err));
}
export function addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
    )
    .then((newReaction) =>
    !newReaction
      ? res.status(400).json({ message: "No reaction found with that id " })
      : res.json(newReaction)
  )
  .catch((err) => res.status(500).json(err));
}
export function removeReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
    )
        .then((removeReaction) =>
            !removeReaction
            ? res.status(400).json({ message: "No reaction found with that id" })
            : res.json(removeReaction)
         )
        .catch((err) => res.status(500).json(err));

}