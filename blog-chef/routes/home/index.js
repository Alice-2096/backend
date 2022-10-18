import { Router } from "express";
import home from "./home.js"; 

const router = Router(); 

//using router to define a root route 
router.get("/", home);

export default router; 
