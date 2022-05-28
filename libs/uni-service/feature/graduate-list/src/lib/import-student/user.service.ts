import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { User } from './user';

export interface StudentImport {
  id: number;
  order: number;
  startDate: string;
  personId: string;
  titleTh: string;
  firstNameTh: string;
  lastNameTh: string;
  titleEn: string;
  firstNameEn: string;
  middleNameEn?: string;
  lastNameEn: string;
  phone: string;
  birthDate: string;
  address: string;

  approveTime?: number;
  graduateDate?: string;
  approveDate?: string;
  trainingAddress?: string;
}

const data: StudentImport[] = [
  {
    id: 1,
    order: 1,
    startDate: 'fafafa',
    personId: 'afafa',
    titleTh: 'นาย',
    firstNameTh: 'อดิศร',
    lastNameTh: 'อัศวิน',
    titleEn: 'mr',
    firstNameEn: 'adisorn',
    lastNameEn: 'assawin',
    phone: '124547878',
    birthDate: 'fslgjs',
    address: 'afafafa',
  },
  {
    id: 2,
    order: 1,
    startDate: 'fafafa',
    personId: 'afafa',
    titleTh: 'นาย',
    firstNameTh: 'อดิศร',
    lastNameTh: 'อัศวิน',
    titleEn: 'mr',
    firstNameEn: 'adisorn',
    lastNameEn: 'assawin',
    phone: '124547878',
    birthDate: 'fslgjs',
    address: 'afafafa',
  },
  {
    id: 3,
    order: 1,
    startDate: 'fafafa',
    personId: 'afafa',
    titleTh: 'นาย',
    firstNameTh: 'อดิศร',
    lastNameTh: 'อัศวิน',
    titleEn: 'mr',
    firstNameEn: 'adisorn',
    lastNameEn: 'assawin',
    phone: '124547878',
    birthDate: 'fslgjs',
    address: 'afafafa',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //students: StudentImport[] = [];
  private serviceUrl = 'https://dummyjson.com/users';
  constructor(private http: HttpClient) {
    /*     let temp: StudentImport[] = [];
    for (let index = 0; index < 30; index++) {
      temp = [...temp, data];
    }
    this.students = temp; */
  }

  /* getUsers(): Observable<User[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<User[]>(map((data: any) => data.users));
  }
 */

  getUsers(): Observable<StudentImport[]> {
    return of(data);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.serviceUrl}/${user.id}`, user);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.serviceUrl}/add`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.serviceUrl}/${id}`);
  }

  deleteUsers(users: User[]): Observable<User[]> {
    return forkJoin(
      users.map((user) =>
        this.http.delete<User>(`${this.serviceUrl}/${user.id}`)
      )
    );
  }
}
