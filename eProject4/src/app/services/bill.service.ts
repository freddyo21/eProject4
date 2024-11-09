import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  generateReport(data: any) {
    return this.httpClient.post(this.url + '/bill/generateReport', data, {
      headers: GlobalConstants.headersPost,
    });
  }

  getPdf(data: any): Observable<Blob> {
    return this.httpClient.post(this.url + '/bill/getPdf', data, {
      headers: GlobalConstants.headersPost,
      responseType: 'blob',
    });
  }

  getBills() {
    return this.httpClient.get(this.url + '/bill/getBills', {
      headers: GlobalConstants.headersGet,
    });
  }
  delete(id: any) {
    return this.httpClient.post(this.url + '/bill/delete/' + id, {
      headers: GlobalConstants.headersPost,
    });
  }
}
