import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PetSchema = new Schema({
  dogName: {
    type: String,
    required: true,
  },
  dogBirthday: {
    type: String,
    required: true,
  },
  dogWeight: {
    type: String,
    required: true,
  },
  breed: {
    type: Object,
    required: true,
  },
});

const Pet = mongoose.model("Pet", PetSchema);

export default Pet;
