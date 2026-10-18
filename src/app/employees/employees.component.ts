import {Component, inject} from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { catchError, of, tap } from 'rxjs';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    standalone: true,
    imports: [RouterLink, NgFor, AsyncPipe, DatePipe]
})
export class EmployeesComponent {
  loading = true;
  errorMessage = '';
  readonly employees$ = inject(EmployeeService).$.pipe(
    tap(() => this.loading = false),
    catchError(() => {
      this.loading = false;
      this.errorMessage = 'Unable to load employees. Check the Firebase configuration, Firestore permissions and your connection.';
      return of([]);
    })
  );
}
