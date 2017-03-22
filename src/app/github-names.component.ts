import {Component, OnInit} from '@angular/core';
import {GithubUser} from './GithubUser';
import {GithubUsersService} from './githubUsers.service';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

//observable class extintion
import 'rxjs/add/observable/of';

//Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'github-names',
  templateUrl: './github-names.component.html',
  providers: [GithubUsersService]
})

export class GithubNamesComponent implements OnInit {

  users: Observable<GithubUser[]>;

  private searchKeyword = new Subject<string>();

  constructor(private searchService: GithubUsersService) {
  }

  search(term: string): void{
    this.searchKeyword.next(term);
  }

  ngOnInit(): void {
    this.users = this.searchKeyword
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => {
        return term
        ? this.searchService.search(term)
        : Observable.of<GithubUser[]>([])})
      .catch(error => {
        console.log('error on search');
        return Observable.of<GithubUser[]>([]);
      });
  }
}
