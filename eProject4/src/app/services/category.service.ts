import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  add(data: any) {
    return this.httpClient.post(this.url + '/category/add', data, {
      headers: GlobalConstants.headersPost,
    });
  }

  update(data: any) {
    return this.httpClient.post(this.url + '/category/update', data, {
      headers: GlobalConstants.headersPost,
    });
  }

  getCategories() {
    return this.httpClient.get(this.url + '/category/get', {
      headers: GlobalConstants.headersGet,
    });
  }

  getFilteredCategories() {
    return this.httpClient.get(this.url + '/category/get?filterValue=true', {
      headers: GlobalConstants.headersGet,
    });
  }
}
