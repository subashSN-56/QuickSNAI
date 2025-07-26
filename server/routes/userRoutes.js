import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  getPublishedCreations,
  getUserCreations,
  toggleLikeCreations
} from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get('/get-user-creations', auth, getUserCreations);
userRouter.get('/get-published-creations', auth, getPublishedCreations);
userRouter.post('/toggle-like-creations', auth, toggleLikeCreations);



// userRouter.get('/get-user-creations', auth, getUserCreations);              // ✅ no ()
// userRouter.get('/get-Published-creations', auth, getPublishedCreations);    // ✅ no ()
// userRouter.post('/toggle-like-creations/:id', auth, toggleLikeCreations);   // ✅ no ()

export default userRouter;
