export type PostFormat = {
  id: number;
  date: string;
  heading: string;
  url: string;
};

export type ProfileParams = {
  profile: string;
  id?: string;
};

export type ProfileSearch = {
  username: string;
  posts: number;
}; 
