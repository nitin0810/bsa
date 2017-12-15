import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

/**components */
import { MyApp } from './app.component';
import { WelcomePage } from '../pages/non-lazy/welcome/welcome';
import { MyCoursesPage } from '../pages/non-lazy/myCourses/myCourses';

/**services */
import { NetworkService } from '../services/network.service';
import { GeneralService } from '../services/general.service';
import { CustomHttpService } from '../services/custom-http.service';
import { CustomService } from '../services/custom.service';
import { AuthService } from '../services/auth.service';
import { BackBtnService } from '../services/backBtn.service';
import { Network } from '@ionic-native/network';
import { NoInternet } from '../pages/non-lazy/no-internet/no-internet.component';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    MyCoursesPage,
    NoInternet
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage ,
    MyCoursesPage,
    NoInternet
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    NetworkService,
    GeneralService,
    BackBtnService,
    CustomHttpService,
    CustomService,
    AuthService
  ]
})
export class AppModule {}
