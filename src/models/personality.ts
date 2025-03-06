import mongoose from 'mongoose';

const PersonalitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthYear: { type: Number, required: true },
  deathYear: { type: Number, required: false },
  description: { type: String, required: true },
  notableWorks: [{ type: String }], // Optional list of works
});

export const Personality = mongoose.model('Personality', PersonalitySchema);
