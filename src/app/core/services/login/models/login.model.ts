
export  interface LoginResponse {
  success: boolean;
  data?: {
  sessionID?: string;
  }
  message?: string;
  error?: string;
}

export interface UserParams {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    admin: boolean
}

export interface RegisterResponse {
  success: boolean;
  data?: {
    message: string;
  };
  
}

