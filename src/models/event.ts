import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: false}
});

export const Event = mongoose.model("Event", eventSchema);
