enum AdvisorLabel {
  email = 'Email Address',
  fullName = 'Full Name',
  accessCode = 'Access code'
}

export class Advisor {
  public email: string;
  public fullName: string;
  public accessCode: string;

  public constructor(
    email: string = '',
    fullname: string = '',
    accessCode: string = ''
  ) {
    this.email = email;
    this.fullName = fullname;
    this.accessCode = accessCode;
  }

  public static getLabel(property: string): string {
    return AdvisorLabel[property];
  }

  public static getPropertyOrder(): string[] {
    return ['email', 'fullName', 'accessCode'];
  }
}
