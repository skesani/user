import {inject, TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

fdescribe('Service: UsersService', () => {
    let service;

    beforeEach(() => TestBed.configureTestingModule({
        providers: [ UserService],
        imports: [HttpClientTestingModule],
    }));

    beforeEach(inject([UserService], s => {
        service = s;
    }));

    it('should get all users', () => {
        service.getAllUsers().subscribe(user => {
            console.log('user' + user.length);
            expect(user).toEqual(10);
        });

    });
});
