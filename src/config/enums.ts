// maybe store an enum for Origin type to make a closed system - include test/demo for devs
export enum TOKEN_TYPE {
  Access = 'access',
}

export enum TEXT_TYPE {
  Alphabetic,
  Numeric,
  Symbolic,
  Alphanumeric,
  All,
}

export enum TEXT_CASING {
  Upper,
  Lower,
  Mixed,
}

export enum SERVICE {
  Core = 'CORE',
}

export enum RESPONSE_TYPE {
  Success,
  Error,
  Info,
}

export enum USER_ROLE {
  Student = 'student',
  Guide = 'guide',
  Staff = 'staff',
  Admin = 'admin',
}

export enum USER_STAGE {
  PreApplication = 'Pre application',
  AlreadyApplied = 'Already applied',
  GotAdmission = 'Got admission',
  AlreadyAtUniversity = 'Already at university',
}

export enum RECOMMENDATION_KEYS {
  Guides = 'guides',
  Disciplines = 'disciplines',
  Products = 'products',
}

export enum ADDRESS_TAG {
  Permanent = 'permanent',
  Current = 'current',
  Correspondence = 'correspondence',
}

export enum EXPERIENCE_TAG {
  Internship = 'internship',
  FullTime = 'full-time',
  PartTime = 'part-time',
  Contract = 'contract',
  Freelance = 'freelance',
}

export enum FILE_TAG {
  Identity = 'identity',
  Resume = 'resume',
  ProfileImg = 'profileImg',
}

export enum PAYMENT_STATUS {
  Success = '1',
  Pending = '0',
  Aborted = '-1',
}

export enum TRANSACTION_TYPE {
  Package = 'package',
}
