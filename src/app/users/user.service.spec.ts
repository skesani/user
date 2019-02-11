import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpEvent, HttpEventType} from '@angular/common/http';

describe('UserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });
    });
    it(
        'should get the list of all users',
        inject (
            [HttpTestingController, UserService],
            (
                httpMock: HttpTestingController,
                userService: UserService
            ) => {
                userService.getAllUsers().subscribe( event => {
                    console.log(event);
                    switch (event.type) {
                        case HttpEventType.Response:
                            expect(event.body.length).toBeGreaterThanOrEqual(1);
                    }
                });
                const mockReq = httpMock.expectOne(userService.baseURI + 'users');
                expect(mockReq.cancelled).toBeFalsy();
                mockReq.flush({});
            }
        )
    );
    afterEach(
        inject(
            [HttpTestingController],
            (
                httpMock: HttpTestingController
            ) => {
                httpMock.verify();
            }));
});
