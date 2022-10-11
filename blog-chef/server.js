import express from "express"; 
import { join } from "path"; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(); 

//express middleware: mounting the middleware on the /assets route 
app.use("/assets", express.static(join(__dirname, "public")));

app.listen(3000, () => console.log('express started on http://localhost:3000; press ctrl-c to terminate.')); 


// get handlers for GET requests: the function will get invoked when the router is matched 
app.get('/', function(req, res){
    res.status(200).send("<h1>Blog Chef says Hello!</h1>"); 
});

app
    .get('/admin/login', (req, res) => {
        res.sendFile(join(__dirname, "views", "login.html")); 
    })
    .post("/admin/login", (req, res) => {
        res.send("handle login here."); 
    });

// post handlers for POST requests
// POST request must comes with some request payload 
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
