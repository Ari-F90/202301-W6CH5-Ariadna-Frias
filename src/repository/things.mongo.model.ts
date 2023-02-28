import { model, Schema, SchemaTypes } from 'mongoose';
import { Thing } from '../entities/thing.js';

const thingSchema = new Schema<Thing>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  week: {
    type: Number,
    required: true,
    min: 0,
    max: 11,
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
});

export const ThingModel = model('Thing', thingSchema, 'things');
