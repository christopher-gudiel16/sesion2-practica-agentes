import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User, UserApiResponse } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'https://randomuser.me/api/?results=100&seed=angular18';

  getUsers(): Observable<User[]> {
    return this.http
      .get<UserApiResponse>(this.API_URL)
      .pipe(map((response) => response.results));
  }
}
