import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  private readonly url: string = 'https://api.imgbb.com/1/upload';

  private readonly apiKey: string = '03b8b46397353b4369d3cdf8b50399f3'; // api key for the hosting website

  constructor(private http: HttpClient) {}
  formData: FormData = new FormData();

  // returns a string which is a url
  uploadFile(file: File): Observable<string> {
    this.formData.append('image', file);
    return this.http
      .post<any>(this.url, this.formData, { params: { key: this.apiKey } })
      .pipe(map((response) => response['data']['url']));
  }
}
