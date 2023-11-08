import User from "../models/User.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import attachCookie from "../utils/attachCookie.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError("Please provide all values");
    }
    console.log("In register controller");
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError("Email already in use");
    }

    const user = await User.create({ name, email, password });

    const token = user.createJWT();
    attachCookie({ res, token });
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            name: user.name,
        },
        location: user.location,
        token,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if ((!email, !password)) {
        throw new BadRequestError("Please provide all values");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new UnAuthenticatedError("Invalid Credential");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError("Invalid Credential");
    }
    const token = user.createJWT();
    attachCookie({ res, token });
    res.status(StatusCodes.OK).json({ user, location: user.location, token });
};

const updateCurrentUser = async (req, res) => {
    const { email, name, lastName, location } = req.body;
    if ((!email, !name, !lastName, !location)) {
        throw new BadRequestError("Please provide all values");
    }
    const currentUser = await User.findById(req.user.userId);
    if (!currentUser) {
        throw new UnAuthenticatedError("Invalid Credential");
    }
    currentUser.name = name;
    currentUser.lastName = lastName;
    currentUser.email = email;
    currentUser.location = location;
    currentUser.save();
    res.status(200).json(currentUser);
};

const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user.userId);
    res.status(200).json({ user: user, location: user.location });
};

const logout = async (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    res.status(200).json({ msg: "User logged out" });
};

export { register, login, updateCurrentUser, getCurrentUser, logout };
