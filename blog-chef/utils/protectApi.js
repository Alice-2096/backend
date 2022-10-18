const protectApi = (req, res, next) => {
  const authorization = req.header("authorization"); //extract the value of a header named 'authorization'
  if (authorization) {
    // verify the JWT token here
    return next();
  }
  return res.status(403).json({ message: "Unauthorized Access!" }); //403 -- access forbidden
};

export default protectApi;
