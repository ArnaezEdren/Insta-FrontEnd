// Angular Service

// Auth Service Responsibility

// - Provide Basic Auth Header
// - Save Basic Auth Header

// 1. register
// -> UserService#register

// 2. login
// -> Append Basic Auth Header
// -> On Success, save Auth Header

// 3. logout
// -> Remove Basic Auth Header

import { inject, Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { AuthToken } from '../model/auth.model';
import { appendAuthHeader, generateAuthToken } from '../utils/auth.util';
import {
	UserHttpService,
	UserLoginCommand,
	UserRegistrationCommand,
	User,
	UserLoginResponse,
} from '@insta/data/user';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';

// import { UserRegistrationCommand, UserHttpService } from '@insta/data/user';

// Basic Auth
@Injectable({ providedIn: 'root' })
export class BasicAuthService {
	// Should be only set if the credentials are valid if invalid keep null
	private authToken: AuthToken | null = null;

	private userHttpService = inject(UserHttpService);

	get isAuthenticated() {
		return this.authToken !== null;
	}

	register(command: UserRegistrationCommand): Promise<User> {
		console.log('BasicAuthService#register', command);

		return this.userHttpService.register(command);
	}

	// async login(command: UserLoginCommand): Promise<User> {
	// 	console.log('BasicAuthService#login', command);
	//
	// 	// 1. Generate Auth Token
	// 	this.authToken = generateAuthToken(command.email, command.password);
	//
	// 	// 2. Auth Header will be appended by the interceptor on the http login request
	// 	try {
	// 		return await this.userHttpService.login();
	// 	} catch (error) {
	// 		// 3. On Failure, null Auth Token
	// 		this.authToken = null;
	// 		throw error;
	// 	}
	// }

	login(command: UserLoginCommand): Observable<UserLoginResponse> {
		// console.log('BasicAuthService#login', command);

		// 1. Generate Auth Token
		this.authToken = generateAuthToken(command.email, command.password);

		// 2. Auth Header will be appended by the interceptor on the http login request

		// rxjs pipeline (tap, filter, map, catchError, switchMap, mergeMap, concatMap, exhaustMap)
		return this.userHttpService.login().pipe(
			// tap((_) => console.log('basic auth service login')),
			catchError((error) => {
				this.authToken = null;
				return throwError(() => new Error('Login failed ' + error));
			})
		);
	}

	logout() {
		this.authToken = null;
		document.location.reload();
	}

	appendAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
		if (this.authToken == null) return req;

		return req.clone({
			headers: appendAuthHeader(req.headers, this.authToken),
		});
	}
}
