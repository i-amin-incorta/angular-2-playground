import {HttpModule, Http} from '@angular/http';
import {GithubUsersService} from './githubUsers.service';
import {async, TestBed, inject} from "@angular/core/testing";
import 'rxjs/add/operator/toPromise';

describe('test github user search', () => {
  let service: GithubUsersService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpModule],
    providers: [GithubUsersService]
  }));

  beforeEach(inject([GithubUsersService], s => {
    service = s;
  }))

  it('#Search should search github users', () =>
      //   async(()=>{
      //   service.search('i-amin').subscribe(x=>{
      //     console.log(x);
      //   })
      // })
    {
      // service.search('i-amin').toPromise().then((x) => {
      //   debugger;
      //   console.log(x)
      // }, (err) => {
      //   debugger;
      // });
      service.search('i-amin').subscribe(items => console.log(items));
    }
  )
});
