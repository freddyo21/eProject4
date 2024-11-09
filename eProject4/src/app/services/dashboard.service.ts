import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getDetails() {
    return this.httpClient.get(this.url + '/dashboard/details', {
      headers: GlobalConstants.headersGet,
    });
  }
}
