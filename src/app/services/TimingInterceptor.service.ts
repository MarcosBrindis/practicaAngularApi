import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

@Injectable()
export class TimingInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('TimingInterceptorService intercepting:', request.url);

    const startTime = performance.now();
    const clonedRequest = request.clone({
      setHeaders: {
        'Custom-Header': 'YourValue',
      },
    });

    return next.handle(clonedRequest).pipe(
      finalize(() => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`Solicitud a ${request.url} tomó ${duration} ms`);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error interceptado:', error);
        return throwError(() => error);
      })
    );
  }
}
