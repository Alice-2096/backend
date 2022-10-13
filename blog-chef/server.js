import express from "express"; 
import { join } from "path"; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(); 

//add request parsing to the application, 
// this function acts on all requests from all routes 
app.use(express.urlencoded({ extended: false})); 
app.use(express.json()); 
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
    .get('/admin/login', (req, res) => res.render("login"))
    //Express by default expects the template to reside in the views folder
    .post("/admin/login", (req, res) => {
        const { email, password } = req.body; 
        console.log("Email: ", email);
        console.log("Password: ", password); 
        res.redirect("/admin/dashboard"); 
    });

//serving server-generated content to the user 
app.get('/admin/dashboard', (req, res) => 
    res.render('dashboard', {
        // can pass object as the second argument 
        //property-value pair -- representing the data to be injected to the pug template
        user: "Joe Doe", 
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
app.get('/admin/logout', (req,res) => res.redirect('/admin/login')); 

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
