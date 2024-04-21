import mongoose, { Schema } from "mongoose";
import { UserEntity } from "../entities/user.entity";

const UserSchema: Schema = new Schema<UserEntity>({
    id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role:  { type: String, required: true }
});

export default mongoose.model<UserEntity>('Users', UserSchema);