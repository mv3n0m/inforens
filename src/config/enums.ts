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
