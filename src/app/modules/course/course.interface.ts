import { Types } from "mongoose";

export interface Tag {
  name: string;
  isDeleted: boolean;
}

export interface CourseDetails {
  level: string;
  description: string;
}

export interface TCourse {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: Tag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: CourseDetails;
  createdBy : Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}