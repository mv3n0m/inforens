import { SERVICE } from './enums'

export type Common = {
  id: number | string
  createdAt?: number
  createdBy?: SERVICE
  updatedAt?: number
  updatedBy?: SERVICE
}

export type NameField = {
  firstName: string
  middleName?: string
  lastName: string
}
export type EmailField = {
  email: string
}
export type MobileNumberField = {
  mobileNumber: string
}
export type PasswordField = {
  password: string
}
export type Origin = {
  origin?: string
}

export type User = {
  pinCode?: string
  country?: string
  bio?: string
  isActive?: boolean
  activeHours?: any
  isWorking?: boolean
} & NameField &
  EmailField &
  MobileNumberField &
  PasswordField

export type UserQuery = Common & User

export type LoginCredentials = (EmailField | MobileNumberField) &
  PasswordField &
  Origin

export type Role = {
  name: string
  description?: string
  isActive?: boolean
  createdBy?: User
  updatedBy?: User
}

export type RoleQuery = Common & Role

export type UserRole = {
  userId: string
  roleId: number
  isActive?: boolean
  approvedBy?: string
  approvedAt?: number
  createdBy?: User
  updatedBy?: User
}

export type UserRoleQuery = Common & UserRole
