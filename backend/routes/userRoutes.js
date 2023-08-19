import express from "express";

const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  profile,
  updateUserProfile,
} from "../controllers/userController.js";

router.post("/", registerUser); 
router.post("/auth", authUser);
router.post("/logout",logoutUser);
router.route('/profile').get(profile).put(updateUserProfile);


export default router;
