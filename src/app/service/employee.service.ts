import { Injectable, inject } from '@angular/core';
import {
  Firestore, Timestamp, addDoc, collection, collectionData
} from '@angular/fire/firestore';
import { Observable, map, throwError } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private firestore = inject(Firestore, { optional: true });

  get $(): Observable<readonly Employee[]> {
    if (!this.firestore) {
      return throwError(() => new Error('Firebase is not configured yet.'));
    }
    // Écoute la collection et actualise le tableau à chaque changement.
    return collectionData(collection(this.firestore, 'employees'), { idField: 'id' }).pipe(
      map(documents => documents.map(data => ({
        id: data['id'] as string,
        name: data['name'] as string,
        dateOfBirth: (data['dateOfBirth'] as Timestamp).toDate(),
        city: data['city'] as string,
        salary: data['salary'] as number,
        gender: data['gender'] as string,
        email: data['email'] as string
      })))
    );
  }

  async addEmployee(employee: Employee): Promise<void> {
    if (!this.firestore) {
      throw new Error('Firebase is not configured yet.');
    }
    // Firestore attend un objet simple et transforme Date en Timestamp.
    await addDoc(collection(this.firestore, 'employees'), {
      name: employee.name,
      dateOfBirth: employee.dateOfBirth,
      city: employee.city,
      salary: employee.salary,
      gender: employee.gender ?? '',
      email: employee.email ?? ''
    });
  }
}
