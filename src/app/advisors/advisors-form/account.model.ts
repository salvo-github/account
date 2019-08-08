import { Advisor } from './advisors-info/advisor/advisor.model';

enum AccountLabel {
  serial = 'Account number',
  preview = 'Preview',
  advisors = 'Advisors'
}

export class Account {
  public serial: string;
  public preview: boolean;
  public advisors: Advisor[];

  constructor(
    serial: string = '',
    preview: boolean = false,
    advisors: Advisor[] = []
  ) {
    this.serial = serial;
    this.preview = preview;
    this.advisors = advisors;
  }

  public static getLabel(property: string): string {
    return AccountLabel[property];
  }

  public static getSerialPattern(): string {
    return '^[1-9][0-9]{7}$';
  }

  public static getMaxAmountAdvisors(): number {
    return 6;
  }

  public static getMinAmountAdvisors(): number {
    return 1;
  }
}
