import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user';

const data: User[] = [
  {
    id: 1,
    startDate: 'xx/xx/xxxx',
    personId: 'x-xxxx-xxxxx-xx-x',
    passportId: 'ABCxxxxxxxx',
    nationality: 'thai',
    titleTh: 'นาย',
    firstNameTh: 'อดิศร',
    lastNameTh: 'อัศวิน',
    titleEn: 'Mrs.',
    firstNameEn: 'adisorn',
    middleNameEn: 'xxx',
    lastNameEn: 'assawin',
    phone: '098-xxx-xxxx',
    birthDate: 'xx/xx/xxxx',
    address: '',
    approveTime: 1,
    graduateDate: 'xx/xx/xxxx',
    approveDate: 'xx/xx/xxxx',
    trainingAddress: '',
  },
  {
    id: 2,
    startDate: 'xx/xx/xxxx',
    personId: 'x-xxxx-xxxxx-xx-x',
    passportId: 'ABCxxxxxxxx',
    nationality: 'thai',
    titleTh: 'นาย',
    firstNameTh: 'อดิศร',
    lastNameTh: 'อัศวิน',
    titleEn: 'Mrs.',
    firstNameEn: 'adisorn',
    middleNameEn: 'xxx',
    lastNameEn: 'assawin',
    phone: '098-xxx-xxxx',
    birthDate: 'xx/xx/xxxx',
    address: '',
    approveTime: 1,
    graduateDate: 'xx/xx/xxxx',
    approveDate: 'xx/xx/xxxx',
    trainingAddress: '',
  },
  {
    id: 3,
    startDate: 'xx/xx/xxxx',
    personId: 'x-xxxx-xxxxx-xx-x',
    passportId: 'ABCxxxxxxxx',
    nationality: 'thai',
    titleTh: 'นาย',
    firstNameTh: 'อดิศร',
    lastNameTh: 'อัศวิน',
    titleEn: 'Mrs.',
    firstNameEn: 'adisorn',
    middleNameEn: 'xxx',
    lastNameEn: 'assawin',
    phone: '098-xxx-xxxx',
    birthDate: 'xx/xx/xxxx',
    address: '',
    approveTime: 1,
    graduateDate: 'xx/xx/xxxx',
    approveDate: 'xx/xx/xxxx',
    trainingAddress: '',
  },
  {
    id: 4,
    startDate: 'xx/xx/xxxx',
    personId: 'x-xxxx-xxxxx-xx-x',
    passportId: 'ABCxxxxxxxx',
    nationality: 'thai',
    titleTh: 'นาย',
    firstNameTh: 'อดิศร',
    lastNameTh: 'อัศวิน',
    titleEn: 'Mrs.',
    firstNameEn: 'adisorn',
    middleNameEn: 'xxx',
    lastNameEn: 'assawin',
    phone: '098-xxx-xxxx',
    birthDate: 'xx/xx/xxxx',
    address: '',
    approveTime: 1,
    graduateDate: 'xx/xx/xxxx',
    approveDate: 'xx/xx/xxxx',
    trainingAddress: '',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  getUsers(): Observable<User[]> {
    return of(data);
  }

  /* updateUser(user: StudentImport): Observable<StudentImport> {
    return this.http.patch<StudentImport>(
      `${this.serviceUrl}/${user.id}`,
      user
    );
  }

  addUser(user: StudentImport): Observable<StudentImport> {
    return this.http.post<StudentImport>(`${this.serviceUrl}/add`, user);
  }

  deleteUser(id: number): Observable<StudentImport> {
    return this.http.delete<StudentImport>(`${this.serviceUrl}/${id}`);
  }

  deleteUsers(users: StudentImport[]): Observable<StudentImport[]> {
    return forkJoin(
      users.map((user) =>
        this.http.delete<StudentImport>(`${this.serviceUrl}/${user.id}`)
      )
    );
  } */
}
