export interface PersonalInfo {
  fullName: string;
  email: string;
}

export interface AccountSetup {
  username: string;
  password: string;
}

export interface Preferences {
  theme: 'Light' | 'Dark';
  newsletter: boolean;
}

export interface FormData {
  personalInfo: PersonalInfo;
  accountSetup: AccountSetup;
  preferences: Preferences;
}

export interface StepProps<T> {
  data: T;
  onChange: (data: T) => void;
}

export interface ValidationErrors {
  personalInfo: Partial<PersonalInfo>;
  accountSetup: Partial<AccountSetup>;
}