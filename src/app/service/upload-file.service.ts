import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = `${environment.baseUrl}/files`;
  errorHandl!: (err: any, caught: Observable<Blob>) => ObservableInput<any> | any;
  constructor(private http: HttpClient) {
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${environment.baseUrl}/files/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getData(fileId: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${fileId}`);
    
  }
  loadAll(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/all`);
    
  }
  getImageData(fileId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${fileId}`, { responseType: 'blob' })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
    getImage(fileName: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/image/${fileName}`, { responseType: 'blob' })
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )}
}
