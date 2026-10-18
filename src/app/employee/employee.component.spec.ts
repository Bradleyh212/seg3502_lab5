import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeService } from '../service/employee.service';

describe('EmployeeComponent Firestore submission', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let service: jasmine.SpyObj<EmployeeService>;
  let navigate: jasmine.Spy;

  beforeEach(() => {
    service = jasmine.createSpyObj<EmployeeService>('EmployeeService', ['addEmployee']);
    TestBed.configureTestingModule({
      imports: [EmployeeComponent],
      providers: [provideRouter([]), { provide: EmployeeService, useValue: service }]
    });
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    navigate = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
    component.employeeForm.setValue({
      name: 'Alice', dateOfBirth: '2000-01-15', city: 'Ottawa',
      salary: 50000, gender: 'F', email: 'alice@example.com'
    });
  });

  it('waits for persistence before resetting the form and navigating', async () => {
    let complete!: () => void;
    service.addEmployee.and.returnValue(new Promise<void>(resolve => complete = resolve));
    const submission = component.onSubmit();
    expect(component.saving).toBeTrue();
    expect(component.name.value).toBe('Alice');
    expect(navigate).not.toHaveBeenCalled();
    // A second click must not create a duplicate document.
    await component.onSubmit();
    expect(service.addEmployee).toHaveBeenCalledTimes(1);
    complete();
    await submission;
    expect(component.saving).toBeFalse();
    expect(component.name.value).toBeNull();
    expect(navigate).toHaveBeenCalledWith(['/employees']);
    const saved = service.addEmployee.calls.mostRecent().args[0];
    expect(saved.dateOfBirth.getDate()).toBe(15);
  });

  it('preserves the input and displays an error when Firestore rejects the write', async () => {
    service.addEmployee.and.rejectWith(new Error('permission-denied'));
    await component.onSubmit();
    fixture.detectChanges();
    expect(component.name.value).toBe('Alice');
    expect(component.saving).toBeFalse();
    expect(navigate).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('Unable to save');
  });

  it('does not write an invalid form', async () => {
    component.name.setValue('');
    await component.onSubmit();
    expect(service.addEmployee).not.toHaveBeenCalled();
  });
});
