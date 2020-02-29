
const emptyFields = (req, res, next) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({message: "complete all fields to login"});
    }
    return next()
}


module.exports = {
    emptyFields
}