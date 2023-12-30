
import { USER_ROLE } from "./user.constant";

interface TUser {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
  passwordChangeHistory:Array<{ password: string; timestamp: Date }>;
}

export default TUser;


export type TUserRole = keyof typeof USER_ROLE;