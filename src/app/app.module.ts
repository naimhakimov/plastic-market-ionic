import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { HttpInterceptorCustom } from './services/http.interceptor'
import { AuthGuard } from './guards/auth.guard'
import { AuthService } from './services/auth.service'
import { HTTP } from '@awesome-cordova-plugins/http/ngx'
import { ControlsModule } from './shared/controls/controls.module'
import { CustomSelectModule } from './shared'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ControlsModule,
    CustomSelectModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorCustom,
      multi: true
    },
    AuthGuard,
    AuthService,
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
