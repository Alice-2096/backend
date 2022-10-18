export default (req, res) => {
    const { email, password } = req.body; 
        if (email === "xj2096@nyu.edu" && password === "123456") {
            req.session.user = "Alice Jiang"; 
            return res.redirect("/admin/dashboard"); 
        }
        res.redirect('/admin/login'); 
}; 