import mongoose, { Model, Schema, Document } from "mongoose";

// Define an interface representing the user document structure
interface UserDocument extends Document {
  names: string;
  email: string;
  phone?: string;
  image?: string;
  role: USER_ROLES;
}

enum USER_ROLES {
  PUBLISHER = "PUBLISHER",
  ADMIN = "ADMIN",
}

const usersSchema = new Schema(
  {
    names: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    image: { type: String },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.PUBLISHER,
    },
  },
  { timestamps: true }
);

// Define the Users model with the explicit type
let Users: Model<UserDocument>;

try {
  Users = mongoose.model<UserDocument>("Users", usersSchema);
} catch (error) {
  Users = mongoose.model<UserDocument>("Users");
}

export default Users;
