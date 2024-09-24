import jwt from "jsonwebtoken"; // import jwt

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, { // What does it consist of (userId), the secret used to protect the token
        expiresIn: "30d", // time of token
    })// Make a token

    // Set JWT as HTTP-Only Cookie
    res.cookie("jwt", token, { // name of the cookie, the token has to be created || value of the cookie
        httpOnly: true, // Allow cookies to override the default value for the token
        secure: process.env.NODE_ENV !== "development", // use security
        sameSite: 'strict', // default value for secure cookies in production environments only
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    })

    return token; // return the token
}

export default generateToken; // export generateToken