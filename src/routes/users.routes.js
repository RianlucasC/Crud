const { Router } = require("express");
const UserController = require("../controllers/UsersController");

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', userController.index)
userRoutes.get('/:id', userController.show);
userRoutes.post('/', userController.create);
userRoutes.delete('/:id', userController.delete);
userRoutes.put('/:id', userController.update);

module.exports = userRoutes;