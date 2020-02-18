import { Schema, Document, model } from "mongoose";

const userSchema = new Schema({
    username: String,
    name: String,
    passHash: String,
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Blog",
        }
    ]
});

userSchema.set(
    "toJSON",
    {
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret._v;
            delete ret.passHash;
        }
    }
);

export const User = model("User", userSchema);