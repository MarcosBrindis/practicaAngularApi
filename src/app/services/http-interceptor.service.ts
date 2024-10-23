import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    const clonedRequest = request.clone({
      setHeaders: {
        'Custom-Header': 'YourValue' 
      }
    });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Manejo de errores global
        console.error('Error interceptado:', error);
        return throwError(() => error); // Re-lanzar el error
      })
    );
  }
}
