import {inject, TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";

describe('Service: UsersService', () => {
  let userService;
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [
        HttpClientTestingModule
      ],
    }));
  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));
  beforeEach(inject([UserService], (service: UserService) => {
    userService = service;
  }));
  describe('getAllUsers', () => {
    it('should get users', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        userService.getAllUsers()
          .subscribe((data) => {
            expect(data.usersList.length).toBe(2);
          });
        const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
        expect(req.request.method).toEqual('GET');
        req.flush({usersList});
      }
      )
    );
  });
  describe('getUserDetails', () => {
    it('should get details of specific user', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        userService.getUserDetails(123)
          .subscribe((data) => {
            expect(data.usersList.id).toBe(123);
            expect(data.usersList.email).toBe('xxx@gmail.com');
          });
        const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users/123');
        expect(req.request.method).toEqual('GET');
        req.flush({usersList: usersList[0]});
      }
      )
    );
  });
  describe('getAllPosts', () => {
    it('should get all posts', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        userService.getAllPosts()
          .subscribe((data) => {
            expect(data.postsList.length).toBe(2);
          });
        const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
        expect(req.request.method).toEqual('GET');
        req.flush({postsList});
      }
      )
    );
  });
  describe('getPostDetails', () => {
    it('should get details of specific post', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        userService.getPostDetails(456)
          .subscribe((data) => {
            expect(data.postsList.id).toBe(456);
            expect(data.postsList.body).toBe('I feel so happy');
          });
        const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/456`);
        expect(req.request.method).toEqual('GET');
        req.flush({postsList: postsList[1]});
      }
      )
    );
  });
  describe('savePost', () => {
    it('should save the post', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        userService.savePost(requestBody)
          .subscribe((data) => {
            expect(data.savedPost.title).toBe('Title');
          });
        const req = httpMock.expectOne((req: HttpRequest<any>) => {
          return  req.url === `https://jsonplaceholder.typicode.com/posts/` && req.method === 'POST' &&
            req.headers.get('Content-Type') === 'application/json';
        });
        expect(req.request.method).toEqual('POST');
        req.flush({savedPost: requestBody});
      }
      )
    );
  });
});
const usersList = [
  {
    id: 123,
    name: 'xxx',
    username: 'xxxxx',
    email: 'xxx@gmail.com',
    address: 'xxxxxx',
    phone: '1234567891',
    website: 'www.xxx.com',
    company: 'company'
  },
  {
    id: 456,
    name: 'yyy',
    username: 'yyyyy',
    email: 'yyyyy@gmail.com',
    address: 'yyyy',
    phone: '1234567891',
    website: 'www.yyy.com',
    company: 'company'
  }
];

const postsList = [
    {
      userId: 123,
      id: 123,
      title: 'post title',
      body: 'post body',
    },
    {
      userId: 456,
      id: 456,
      title: 'Happy',
      body: 'I feel so happy',
    }
  ]
;

const requestBody = {
  body: 'Body',
  title: 'Title',
  userId: 1
};
