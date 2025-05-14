import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema({
  achievementId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  criteria: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { timestamps: true });

const Achievement = mongoose.model('Achievement', AchievementSchema);

export default Achievement;