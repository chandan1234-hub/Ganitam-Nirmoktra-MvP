import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email address is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[a-zA-A0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address']
            // ^ start string , $ end string  
        },
        fullname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        coverImage: {
            type: String
        },
        password: {
            type: String,
            required: [true, 'password is required']
        },
        watchHistory: {
            type: mongooose.model.Types.ObjectId,
            ref: "history" / "problem"
        },
        refreshtoken: {
            type: String,
        }
    },
    {
        timeStamps: true,
    }
)

export const User = mongoose.model('User', userSchema)


userSchema.pre('isModified', async function (next) {
    if (!this.isModified('password')) return next();
    // here this condition is applied because if it not apply well , whenever user make some changes in his account the password is modeifies automatically

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// password comparison is password is correct 

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// jwt token integration

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        }
    )
}

