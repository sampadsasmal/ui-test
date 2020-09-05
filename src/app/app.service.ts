import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject, BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class AppService {

  passData$: Observable<any>;
  private mySubject = new Subject<any>();
  constructor(private http: HttpClient) {
      this.passData$ = this.mySubject.asObservable();
  }

  passData(data) {
      this.mySubject.next(data);
  }


  signinUser(data) {
    // tslint:disable-next-line:max-line-length
    const loginUrl = `https://kem.greenkoncepts.com/ems/services/ResourceService/login?username=${data.username}&credential=${data.credential}`;
    return this.http.get<any>(loginUrl).pipe(
      catchError(this.handleError)
    );
  }

  logoutUser(data) {
    // tslint:disable-next-line:max-line-length
    const logoutUrl = `https://kem.greenkoncepts.com/ems/services/ResourceService/logout?key=${data}`;
    return this.http.get<any>(logoutUrl).pipe(
      catchError(this.handleError)
    );
  }
  customerDetailsAdd(data) {
  const postData = `
  http://13.76.211.184:8300/gktest/createCustomer?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4g
RG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
  `;
  return this.http.post<any>(postData, data).pipe(
      catchError(this.handleError)
    );
  }

  getCustomerDetails() {
    // tslint:disable-next-line:max-line-length
    const URL = `http://13.76.211.184:8300/gktest/getAllOrders?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;
    return this.http.get<any>(URL).pipe(
      catchError(this.handleError)
    );
  }
  hierarchy(data) {
    const URL = `https://kem.greenkoncepts.com/ems/mvc/node-hierarchy-with-metadata?key=${data}`;
    return this.http.get<any>(URL).pipe(
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = {};
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = {
        error: error.error
      };
    } else {
      // server-side error
      errorMessage = {
        ErrorCode: error.status,
        message: error.error.data
      };
    }
    return throwError(errorMessage);
  }
}
