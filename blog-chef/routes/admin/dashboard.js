export default (req, res) => {
    res.render('dashboard', {
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
}; 