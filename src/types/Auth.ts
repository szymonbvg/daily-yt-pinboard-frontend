export type AuthFuncProps = {
  type: "login" | "register";
  username?: string;
  pass?: string;
  passCheck?: string;
  captcha?: string;
  tokenLogin?: boolean;
};

export type AuthData = {
  status: boolean | null;
  username?: string;
  message?: string;
  token?: string | null;
} | null;
