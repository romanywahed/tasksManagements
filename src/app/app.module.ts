import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { NgbHighlight, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbPaginationModule,
    FormsModule,NgbModule,NgbHighlight
  ],
  providers: [  CookieService,
    provideHttpClient(withInterceptors([authInterceptor]))
],
  bootstrap: [AppComponent]
})
export class AppModule { }
