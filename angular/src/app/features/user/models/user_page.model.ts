import { User } from "./user.model";

export interface UserPageResponse {
  users: User[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}