export type LoginPrevState = {
  success: boolean;
  message: string;
  email: string;
  password: string;
  code: string;
  mode: "password" | "code" | string;
};
