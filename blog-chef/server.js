import express from "express"; 
import compression from "compression"; 
import { join } from "path"; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import morgan from "morgan"; 
import session, { Cookie } from "express-session"; 
import protectRoute from "./utils/protectRoute.js"; 

const app = express(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middleware for data compression 
app.use(compression()); 

// add morgan to log our HTTP requests in the desired format
app.use(morgan(":method - :url - :date - :response-time ms"));

//add request parsing to the application, 
// this function acts on all requests from all routes 
app.use(express.urlencoded({ extended: false})); 
app.use(express.json());

// middleware for request data persistent. 
// we specify the route here because /admin is the only place we need server-side sessions
app.use("/admin", session({
    name: "sessId",  //cookie name to be set in the user's browser
    resave: false,   // 
    saveUninitialized: true, 
    secret: 
        app.get("env") === "production"
            ? process.env.sessionSecret
            : "2bb375d5abe58776bbf28695", 
    cookie: {
        httpOnly: true, 
        maxAge: 18000000, 
        secure: app.get("env") === "production" ? true : false, 
    },
})); 

//express middleware: mounting the middleware on the /assets route 
app.use("/assets", express.static(join(__dirname, "public")));
//configure the template engine by setting the 'view engine' property to the engine name  
app.set('view engine', 'pug'); 

app.listen(3000, () => console.log('express started on http://localhost:3000; press ctrl-c to terminate.')); 


// get handlers for GET requests: the function will get invoked when the router is matched 
app.get('/', function(req, res){
    res.status(200).send("<h1>Blog Chef says Hello!</h1>"); 
});

app
    // .get('/admin/login', (req, res) => {
    //     res.sendFile(join(__dirname, "views", "login.html")); 
    // })
    .get('/admin', (req, res) => 
    req.session.user 
        ? res.redirect('/admin/dashboard') 
        : res.redirect('/admin/login')
    )
    .get('/admin/login', (req, res) => res.render("login"))
    //Express by default expects the template to reside in the views folder
    .post("/admin/login", (req, res) => {
        const { email, password } = req.body; 
        if (email === "xj2096@nyu.edu" && password === "123456") {
            req.session.user = "Alice Jiang"; // storing data in the session. could be a string or an object. 
            return res.redirect("/admin/dashboard"); 
        }
        res.redirect('/admin/login'); 
    });

//serving server-generated content to the user 
app.get('/admin/dashboard', protectRoute("/admin/login"), (req, res) => 
    res.render('dashboard', {
        // can pass object as the second argument 
        //property-value pair -- representing the data to be injected to the pug template
        user: req.session.user, 
        posts: [{
            id: 1, 
            author: "Joe D", 
            title: "Trying out Express", 
            content: "Express is a wonderful tool for building node.js app.", 
        }, 
        {
            id: 2, 
            author: "Mike M", 
            title: "Have you tried Pug?", 
            content: "Pug is new fav tool.", 
        }]
    })
);



//redirect the user to the /admin/login page when they log out 
app.get('/admin/logout', (req,res) => {
    delete req.session.user; 
    res.redirect('/admin/login'); 
}); 

// post handlers for POST requests
// POST request must comes with some request payload -- for example, user data or information to be updated 
// need to parse and extract data from the request for processing (e.g., authentication)
app.post('/admin/approve', (req, res) => res.redirect('/admin/dashboard')); 

app.post('/api/posts', (req, res) => {
    console.log(req.body); 
    res.json({ message: "Got it!"}); 
}); 




app.post("/palindrome", (req, res) => {
    let body = "";
    // creating a DATA and an END event 
    req.on("data", data => (body += data));
    req.on("end", () => {
        // need to PARSE the request payload. 
        console.log(parse(body)); 
        res.send ({
            message: "no word supplied!"
        });
    });
}); 



//should be written at the bottom of the script... 
//custom 404 page 
// app.use(function(req, res, next){
//     res.type('text/plain');
//     res.status(500);
//     res.send('404 - not found'); 
// })

// app.use(function(req, res){
//     res.type('text/plain'); 
//     res.status(404); 
//     res.send('404 - Not Found'); 
// });

// app.use(function(err, req, res, next){
//     console.error(err.stack);
//     res.type('text/plain');
//     res.status(500);
//     res.send('500 - server error'); 
// });

