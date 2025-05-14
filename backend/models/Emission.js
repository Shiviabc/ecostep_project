import mongoose from 'mongoose';

const EmissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['transport', 'diet', 'energy', 'waste'],
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  co2Value: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { timestamps: true });

// Index for querying by user and date ranges
EmissionSchema.index({ user: 1, date: -1 });
EmissionSchema.index({ user: 1, category: 1, date: -1 });

const Emission = mongoose.model('Emission', EmissionSchema);

export default Emission;