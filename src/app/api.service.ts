import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost/angularapi/';
  constructor(
    private http: HttpClient
  ) { }

  getUser() {
    return this.http.get(this.baseUrl+'view_user.php');
  }

  getSingleUser(uid:any):Observable<any> {
    return this.http.get(this.baseUrl+'user_data.php?uid='+uid);
  }

  postUser(data:any) {
    // return this.http.post(this.baseUrl+'add_user.php', data);
    return this.http.post(this.baseUrl+'add_user_image.php', data);
  }

  updateUserData(data:any) {
    return this.http.put(this.baseUrl+'update_user.php', data);
  }

  deleteUserById(id:any) {
    return this.http.delete(this.baseUrl+'delete_user.php?uid='+id);
  }
}
