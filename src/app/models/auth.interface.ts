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
  meterial_types(meterial_types: any): string;
  size_types(size_types: any): string;
  types(types: any): string;
  error_code: number;
  message: string;
  data: T;
  post_data: any;
}
