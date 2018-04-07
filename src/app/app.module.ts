import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { AuthService } from "./service/auth-service.service";
import { ApiService } from "./service/api.service"
import { CallbackComponent } from './callback/callback.component'
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProjectPageComponent } from './pages/project-page/project-page.component'
import { ActivitiesPageComponent } from './pages/activities-page/activities-page.component'
import { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component'
import { ApplicationPageComponent } from './pages/application-page/application-page.component'
import { SettingsPageComponent } from './pages/settings-page/settings-page.component'
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AvatarModule } from 'ngx-avatar';
import { ReflectionsPageComponent } from "./pages/reflections-page/reflections-page.component";
import { QuillModule } from 'ngx-quill'




@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        CallbackComponent,
        ProjectPageComponent,
        ActivitiesPageComponent,
        AnalyticsPageComponent,
        ApplicationPageComponent,
        SettingsPageComponent,
        ReflectionsPageComponent
    ],
    imports: [
        
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({appId:'hub-clarity'}),
        FormsModule,
        HttpModule,
        ClarityModule,
        ROUTING,
        ChartsModule,
        AvatarModule,
        QuillModule
    ],
    providers: [AuthService , ApiService],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string) {
        const platform = isPlatformBrowser(platformId) ?
          'in the browser' : 'on the server';
        console.log(`Running ${platform} with appId=${appId}`);
      }
}
