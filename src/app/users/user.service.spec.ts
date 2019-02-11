import {inject, TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {User} from './user';

describe('Service: UsersService', () => {

    let userService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService],
            imports: [HttpClientTestingModule, HttpClientModule]
        });
    });

    beforeEach(inject([UserService], s => {
        userService = s;
    }));

    it('should get all users', () => {
        userService.getUserDetails(1).subscribe((user: User) => {
            expect(user[0].email).toBe('aaa');
        });
    });
});
