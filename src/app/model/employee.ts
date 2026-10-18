export class Employee {
  public id?: string;
  constructor(
    public name: string,
    public dateOfBirth: Date,
    public city: string,
    public salary: number,
    public gender?: string,
    public email?: string
  ) {}
}
