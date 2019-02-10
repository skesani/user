import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
    private httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    protected options = {headers: this.httpHeaders,
        search: {}
    };

    constructor(private http: HttpClient) {
    }

    private baseURI = 'https://jsonplaceholder.typicode.com/';

    /**
     *
     * @returns {Observable<any>}
     */
    getAllUsers(): any {
       return this.http.get(this.baseURI + 'users');
    }

    getUserDetails(id: boolean): any {
        return this.http.get(this.baseURI + 'users/' + id);
    }

    getAllPosts(): any {
        return this.http.get(this.baseURI + 'posts');
    }

    getPostDetails(id: number): any {
        return this.http.get(this.baseURI + 'posts/' + id);
    }

    savePost(postObj): Observable<any> {
        console.log(JSON.stringify(postObj));
        return this.http.post(this.baseURI + 'posts/', postObj, this.options);
    }
}
