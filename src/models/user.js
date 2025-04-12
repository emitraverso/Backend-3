import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  rol: String,
  pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }]
});

const userModel = model('User', userSchema);
export default userModel;
