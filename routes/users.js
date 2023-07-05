const express = require("express");
const usersController = require("../controllers/users");
const router = express.Router();

router.get("/", usersController.getUsers);

router.post("/add-user", usersController.addUser);

router.delete("/delete-user/:id", usersController.deleteUser);

router.get("/edit-user/:id", usersController.getUserById);

router.post("/edit-user/:id", usersController.postEditUser);

module.exports = router;
