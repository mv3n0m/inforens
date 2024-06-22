import { ADDRESS_TAG, FILE_TAG, SERVICE } from './enums'

export type Common = {
  id?: number | string
  createdAt?: number
  createdBy?: SERVICE | string
  updatedAt?: number
  updatedBy?: SERVICE | string
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
  isActive?: boolean
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
}

export type RoleQuery = Common & Role

export type UserRole = {
  userId: string
  roleId: number
  isActive?: boolean
  approvedBy?: string | User
  approvedAt?: number
}

export type UserRoleQuery = Common & UserRole

export type UserProfile = {
  gender?: string
  dateOfBirth?: string
  countryOfBirth?: string
  nationality?: string
  nativeLanguage?: string
  bio?: string
  stage?: string
  otherContacts?: any
  emergencyContactDetails?: {
    name: string
    mobileNumber: string
    email: string
    relation: string
  }
}

export type UserProfileQuery = Common & UserProfile

export type GuideProfile = {
  userId: string
  universityEmail: string
  countryCode: string
  universityId: number
  levelId: number
  disciplineId: number
  courseName?: string
  yearOfCompletion: number
  introVidUrl?: string
  aboutMe?: string
  skillIds?: Array<number>
  languageIds?: Array<number>
  interestIds?: Array<number>
}

export type GuideProfileQuery = Common & GuideProfile

export type Country = {
  name: string
  code: string
  isActive?: boolean
}

export type CountryQuery = Common & Country

export type Region = {
  name: string
  countryCode: string
  isActive?: boolean
}

export type RegionQuery = Common & Region

export type University = {
  name: string
  regionId: number
  address?: string
  phone?: string
  email?: string
  bio?: string
  estd?: string
  isActive?: boolean
}

export type UniversityQuery = Common & University

export type Level = {
  name: string
  isActive?: boolean
}

export type LevelQuery = Common & Level

export type Discipline = {
  name: string
  description?: string
  isActive?: boolean
}

export type DisciplineQuery = Common & Discipline

export type UniversityCourse = {
  disciplineId: number
  name: string
  code: string
  levelId: number
  universityId: number
  description?: string
  isActive?: boolean
}

export type UniversityCourseQuery = Common & UniversityCourse

export type UserPreferences = {
  userId: string
  countryCode: string
  regionIds?: Array<number>
  levelIds?: Array<number>
  disciplineIds?: Array<number>
  universityIds?: Array<number>
  isActive?: boolean
}

export type UserPreferencesQuery = Common & UserPreferences

export type Address = {
  userId: string
  address1: string
  address2?: string
  countryCode: string
  state: string
  postCode: string
  city: string
  tag: ADDRESS_TAG
}

export type AddressQuery = Common & Address

export type Skill = {
  name: string
  description?: string
  isActive?: boolean
}

export type SkillQuery = Common & Skill

export type Language = {
  name: string
  description?: string
  isActive?: boolean
}

export type LanguageQuery = Common & Language

export type Interest = {
  name: string
  description?: string
  isActive?: boolean
}

export type InterestQuery = Common & Interest

export type UserFile = {
  userId: string
  fileKey: string
  tag: FILE_TAG
}

export type UserFileQuery = Common & UserFile
