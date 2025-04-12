import { Schema, model } from "mongoose";

const petSchema = new Schema({
  name: String,
  species: String,
  age: Number,
  adopted: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, ref: 'User', default: null }
});

const petModel = model('Pet', petSchema);
export default petModel;