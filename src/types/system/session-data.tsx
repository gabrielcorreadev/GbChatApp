import { User } from "./user";

export interface SessionData {
   user: User,
   access_token: string,
}