import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  public duplicatedUsers: Set<string> = new Set([]);
  public succesfullyInvitedUsersCount = 0;
  public errors: Set<string> = new Set([]);
  private readonly url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  invite(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
}
