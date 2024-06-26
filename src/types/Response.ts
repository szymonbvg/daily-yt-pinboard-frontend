import { PostFormat } from "./Profile";

export type ProfileResponse = {
  status: boolean | null;
  authenticated?: boolean;
  content: PostFormat[];
  lenght?: number
};
