const express = require("express");
const {
  randomUserHandler,
  getAllUsers,
  saveUserHandler,
  updateUserHandler,
  bulkUpdateHander,
  deleteUserHandler,
} = require("../../middlewares/users.middlewares");
const router = express.Router();

router.get("/random", randomUserHandler);
router.get("/all", getAllUsers);
router.post("/save", saveUserHandler);
router.patch("/update", updateUserHandler);
router.patch("/bulk-update", bulkUpdateHander);
router.delete("/delete", deleteUserHandler);

module.exports = router;
