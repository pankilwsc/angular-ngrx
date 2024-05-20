import {
  HttpContextToken,
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorMessages } from '../const';
import { MessageService } from 'primeng/api';
import { ToastService } from '../services/toast.service';

export const BYPASS_NORMAL = new HttpContextToken(() => false);

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastService : ToastService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            if (err?.error?.code === 401.1) {
              this.toastService.showMessage({severity:'error', summary:'Error', detail:ErrorMessages.MissingTenantId});
            }
          } else if (err.status === 403) {
            this.toastService.showMessage({severity:'error', summary:'Error', detail:ErrorMessages.DisabledAccount});
          } else if (request.context.get(BYPASS_NORMAL)) {
            return throwError(() => err);
          } else if (err.status === 404) {
          // responseMessage = ErrorMessages.PageNotFound;
          } else if (err.status === 409 || err.status === 400) {
            this.toastService.showMessage({severity:'error', summary:'Error', detail:err.error.message});
          } else if (err.status === 422) {
            this.toastService.showMessage({severity:'error', summary:'Error', detail:err.error.code});
            // this.toastService.error(err.error.code);
          } else if (err.status === 500) {
            this.toastService.showMessage({severity:'error', summary:'Error', detail:err.error.message});
          } else {
            this.toastService.showMessage({severity:'error', summary:'Error', detail:ErrorMessages.OtherError});
          }
          throwError(err).subscribe();
          return [];
        }),
      );
  }
}
