import express from "express";
import {
  fetch,
  create,
  update,
  deleteUser,
} from "../controller/userController.js";

const route = express.Router();

// USER ROUTES
route.post("/create", create);
route.get("/getAllUsers", fetch);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);

export default route;