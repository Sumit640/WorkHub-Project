
export interface AuthData {
  name: string,
  employeeId: string,
  designation: string,
  email: string,
  password: string
}

export interface AuthLogin {
  employeeId: string,
  password: string
}