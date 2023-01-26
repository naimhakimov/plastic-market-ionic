import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from '@angular/common/http'
import { Observable, tap } from 'rxjs'

import { environment } from '../../environments/environment'

@Injectable()
export class HttpInterceptorCustom implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const request = req.clone({
      url: environment.apiUrl + req.url,
      ...!(req.body instanceof FormData) && {
        body: {
          ...req.body,
          token: localStorage.getItem('token') || ''
        }
      }
    })

    return next.handle(request).pipe(
      tap({
          next: (event) => {
            if (event instanceof HttpResponse) {
              if(event.status == 401) {
                alert('Unauthorize access!!!')
              }
            }
            return event;
          },
          error: (error) => {
            if(error.status == 401) {
              alert('Unauthorize access!!!')
            }
            if(error.status == 404) {
              alert('Page Not Found!!!')
            }
          }

        }
      )
    );
  }
}
