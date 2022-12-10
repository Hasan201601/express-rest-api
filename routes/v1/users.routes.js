const express = require("express");
const usersController = require("../../controllers/users.controllers");
const router = express.Router();

router.get("/random", usersController.randomUserHandler);
router.get("/all", usersController.getAllUsers);
router.post("/save", usersController.saveUserHandler);
router.patch("/update", usersController.updateUserHandler);
router.patch("/bulk-update", usersController.bulkUpdateHander);
router.delete("/delete", usersController.deleteUserHandler);

module.exports = router;
