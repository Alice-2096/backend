export default (req, res) => {
    const posts = [
        {id: 1, title: "first post"}, 
        {id: 2, title: "second post"}, 
    ]; 
    res.json({posts,}); 
}