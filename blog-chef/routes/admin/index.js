import { Router } from "express";
import router from "../home/index.js";
import home from "./home.js"
import login from "./login.js"; 
import dashboard from './dashboard.js';
import protectRoute from '../../utils/protectRoute.js'; 
import logout from './logout.js'; 
import moderatePost from "./moderate-post.js";

router.get('/', home); 

router
    .route('/login')
    .get((req, res) => res.render("login.pug"))
    .post(login); 

router.get('/dashboard', protectRoute('/admin/login'), dashboard); 
router.get('/logout', logout); 
router.post('/moderate-post', protectRoute('/admin/login'), moderatePost); 
export default router; 
