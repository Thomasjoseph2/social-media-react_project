import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  profile,
  updateUserProfile,
} from "../controllers/userController.js";


import { protect } from "../middleware/authMiddleware.js";

const storage = multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null, 'Frontend/Public/Images')
  },
  filename:(req,file,cb) => {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false); 
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter, 
});

router.post("/", registerUser); 
router.post("/auth", authUser);
router.post("/logout",logoutUser);
router.route('/profile').get(protect,profile).put(protect,upload.single('file'),updateUserProfile);


export default router;
