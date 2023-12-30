// src/models/course.model.ts

import { Schema, model } from 'mongoose';
import { CourseDetails, TCourse, Tag } from './course.interface';



const tagSchema = new Schema<Tag>({
  name: String,
  isDeleted: Boolean,
});

const courseDetailsSchema = new Schema<CourseDetails>({
  level: String,
  description: String,
});

const courseSchema = new Schema<TCourse>({
  title: { type: String, unique: true, required: true },
  instructor: String,
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: Number,
  tags: [tagSchema],
  startDate: String,
  endDate: String,
  language: String,
  provider: String,
  durationInWeeks: Number,
  details: courseDetailsSchema,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: String, default: new Date().toISOString() },
  updatedAt: { type: String, default: new Date().toISOString() }
});



export const CourseModel = model<TCourse>('Course', courseSchema);


