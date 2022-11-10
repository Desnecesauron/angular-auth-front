import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  public sign(payLoad: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.url}/sign`, payLoad).pipe(
      map((data) => {
        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', JSON.stringify(data.token));
        return this.router.navigate(['admin']);
      }),
      catchError((err) => {
        // console.log(err);
        if (err.error.message) return throwError(() => err.error.message);
        return throwError(
          () =>
            'No momento não estamos conseguindo validar estes dados, tente novamente mais tarde!'
        );
      })
    );
  }

  public logout() {
    localStorage.removeItem('accessToken');
    return this.router.navigate(['']);
  }
}
