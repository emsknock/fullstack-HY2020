import { Schema, Document, model } from "mongoose";

interface User extends Document {
    passHash: string,
}

const userSchema = new Schema<User>({
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
            delete ret.__v;
            delete ret.passHash;
        }
    }
);

export const User = model<User>("User", userSchema);