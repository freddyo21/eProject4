import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  signup(data: any) {
    return this.httpClient.post(this.url + '/api/register', data, {
      headers: GlobalConstants.headersPost,
    });
  }

  forgotPassword(data: any) {
    return this.httpClient.post(this.url + '/user/forgotPassword', data, {
      headers: GlobalConstants.headersPost,
    });
  }

  login(data: any) {
    return this.httpClient.post(this.url + '/api/login', data, {
      headers: GlobalConstants.headersPost,
    });
  }

  checkToken() {
    return this.httpClient.get(this.url + '/user/checkToken', {
      headers: GlobalConstants.headersGet,
    });
  }

  changePassword(data: any) {
    return this.httpClient.post(this.url + '/user/changePassword', data, {
      headers: GlobalConstants.headersPost,
    });
  }

  getUsers() {
    return this.httpClient.get(this.url + '/user/get', {
      headers: GlobalConstants.headersGet,
    });
  }

  update(data: any) {
    return this.httpClient.post(this.url + '/user/update', data, {
      headers: GlobalConstants.headersPost,
    });
  }
}
