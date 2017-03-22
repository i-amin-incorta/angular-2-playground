import {Injectable} from '@angular/core';
import {GithubUser} from './GithubUser';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GithubUsersService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersSearchUrl = 'https://api.github.com/search/users';

  constructor(private http: Http) {
  }

  public search(name: string): Observable<GithubUser[]> {
    return this.http
      .get(`${this.usersSearchUrl}?q=${name}`)
      .map(response => response.json().items as GithubUser[]);
  }

}
