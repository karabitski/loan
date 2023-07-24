import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable()
export class AppApiService {
  constructor(private http: HttpClient) {}
  public baseUrl = 'http://localhost:9292/api';

  public calcScore(data: any = {}): Observable<any> {
    return this.http.post(this.fullPath('/calculate'), data);
  }

  public fullPath(path: string): string {
    return this.baseUrl + path;
  }

}
