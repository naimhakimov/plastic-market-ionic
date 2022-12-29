export interface RegisterInterface {
  phone: string;
  email: string;
  name: string;
  password: string;
}

export interface LoginInterface {
  login: string;
  password: string;
}

export interface iResponse<T> {
  error_code: number;
  message: string;
  data: T;
  post_data: any;
}
