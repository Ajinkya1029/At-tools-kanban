import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true
    }
});

userSchema.methods.generateToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email
    },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })
}

mongoose.plugin(mongooseAggregatePaginate);
export const User = mongoose.model("User", userSchema);