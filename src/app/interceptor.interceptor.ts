import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const key=localStorage.getItem("accesstoken")

    if(key)
    {
      const httpreq=request.clone({setHeaders:{Authorization:"Contacts "+key}})
      return next.handle(httpreq);
    }
    else
    {
      return next.handle(request);
    }
  }
}
