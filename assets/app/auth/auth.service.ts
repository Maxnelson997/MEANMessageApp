import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { Http, Response, Headers} from "@angular/http/";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AuthService {
    constructor(private http: Http, private errorService: ErrorService) {}

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'})
        return this.http.post('http://git.heroku.com/udemycourse-max.com/users', body, {headers: headers})
            .map((response: Response) => {
                return response.json()
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json())
                return Observable.throw(error.json())
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'})
        return this.http.post('http://git.heroku.com/udemycourse-max.com/users/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json())
                return Observable.throw(error.json())
            });    
    }
    

    logout() {
        //clears token and user id from local storage. clears all local storage
        localStorage.clear()
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

}
