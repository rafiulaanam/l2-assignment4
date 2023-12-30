
import mongoose, { Schema } from 'mongoose';
import TUser from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema: Schema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: String, default: new Date().toISOString() },
  updatedAt: { type: String, default: new Date().toISOString() }
});


userSchema.pre('save', async function (next) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    // Hashing password and save into DB
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next();
  } catch (error) {
    next(); // Pass the error to the next middleware or save operation
  }
});

// Set '' after saving password
userSchema.post('save', async function (doc,next) {
  try {
    doc.password = '';
    await doc.save(); // Save the document with the updated password field
  } catch (error) {
    // Handle the error if saving fails
   next()
  }
});


export const UserModel = mongoose.model<TUser>('User', userSchema);


