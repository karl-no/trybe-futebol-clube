export interface iLogin {
  email: string;
  password: string;
}

export default interface iUser extends iLogin {
  id?: number;
  username: string;
  role: string;
}
