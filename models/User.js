import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
    name: {

    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email',
        },
        unique: true,
    },
    password: {

    },
    lastName: {

    },
    location: {

    },
});

UserSchema.pre('save', async function () {
    // Pre save hook in the User Model
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
}

UserSchema.methods.comparePassword = async function (candidatePassord) {
    const isMatch = await bcrypt.compare(candidatePassord, this.password);
    return isMatch;
}

export default mongoose.model('User', UserSchema );