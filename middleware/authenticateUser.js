import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const authenticateUser = async (req, res, next) => {
    // Check header
    const authHeader = req?.headers?.authorization;
    console.log('Auth Header:', authHeader);
    const headerToken =
        authHeader && authHeader.startsWith("Bearer")
            ? authHeader.split(" ")[1]
            : "";
    console.log("Header Token:", headerToken);

    // Check cookies
    const cookiesToken = req?.cookies?.token;
    console.log("Cookies Token:", cookiesToken);

    const token = headerToken || cookiesToken;

    if (!token) {
        throw new UnAuthenticatedError("Authentication failed! Please try again!");
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        console.log("Error!!!!!!!!!!!!!!!!!!!!!!!!!! in the catch:", error);
        throw new UnAuthenticatedError("Authentication Invalid!");
    }
};

export default authenticateUser;
