import { find, findOne, create, deleteOne } from '../models/User';


export function getUsers(req, res) {
    find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
}
export function getSingleUser(req, res) {
    findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) => !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
}
export function createUser(req, res) {
    create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
}
export function deleteUser(req, res) {
    deleteOne(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
}