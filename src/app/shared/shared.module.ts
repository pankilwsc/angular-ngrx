import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptor/http-error.interceptor';
import { ToastModule as ToastModulePrimeng } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { ToastService } from './services/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    ToastModulePrimeng,    
    MessagesModule,
    MessageModule,
  ],
  exports: [
    ToastModulePrimeng,
    MessagesModule,
    MessageModule,
    ToastModulePrimeng
  ],
  declarations: [
  ],
  providers: [
    MessageService,
    ToastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
