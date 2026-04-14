const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { 
  getDashboard, 
  getAllUsers, 
  deleteUser 
} = require("../controllers/adminController");

const router = express.Router();

// Get dashboard stats
router.get("/dashboard", auth, admin, getDashboard);

// Get list of all users
router.get("/users", auth, admin, getAllUsers);

// Delete a specific user by ID
router.delete("/users/:id", auth, admin, deleteUser);

module.exports = router;