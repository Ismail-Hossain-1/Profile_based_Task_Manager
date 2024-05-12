const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {

    const token = req.header('Authorization');
    if (!token) return res.status(401).send("Unauthorized")

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    console.log(decoded);

    if (decoded.role !== 'admin') {
        return res.status(401).send("Not Admin");
    }

    next();

}

const verifyUser = (req, res, next) => {

    const token = req.header('Authorization');
    if (!token) return res.status(401).send("Unauthorized")

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (decoded.role !== 'user') {
        return res.status(401).send("Not a user");
    }
    req.user = decoded.email;
    next();
}




module.exports = { verifyAdmin, verifyUser };
