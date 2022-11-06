const {
  login,
  register,
  deleteAllUsers,
  deleteAllTokens,
  logout,
} = require("../controllers/auth");
const express = require("express");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

//for testing only
router.post("/delu", deleteAllUsers);
router.post("/delt", deleteAllTokens);

module.exports = router;
