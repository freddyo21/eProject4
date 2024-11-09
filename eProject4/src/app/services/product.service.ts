import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  add(data: any) {
    return this.httpClient.post(this.url + '/product/add', data, {
      headers: GlobalConstants.headersPost,
    });
  }

  update(data: any) {
    return this.httpClient.post(this.url + '/product/update', data, {
      headers: GlobalConstants.headersPost,
    });
  }

  getProducts() {
    return this.httpClient.get(this.url + '/product/get', {
      headers: GlobalConstants.headersGet,
    });
  }

  updateStatus(data: any) {
    return this.httpClient.post(this.url + '/product/updateProductStatus', data, {
      headers: GlobalConstants.headersPost,
    }
    );
  }

  delete(id: any) {
    return this.httpClient.post(this.url + '/product/delete/' + id, {
      headers: GlobalConstants.headersPost,
    });
  }

  getProductByCategory(id: any) {
    return this.httpClient.get(this.url + '/product/getByCategory/' + id, {
      headers: GlobalConstants.headersGet,
    });
  }

  getById(id: any) {
    return this.httpClient.get(this.url + '/product/getProductById/' + id, {
      headers: GlobalConstants.headersGet,
    });
  }
}
