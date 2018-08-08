/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import {CallbackComponent} from './callback/callback.component'
import { ProjectPageComponent } from './pages/project-page/project-page.component'
import { ActivitiesPageComponent } from './pages/activities-page/activities-page.component'
import { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component'
import { ApplicationPageComponent } from './pages/application-page/application-page.component'
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ReflectionsPageComponent } from "./pages/reflections-page/reflections-page.component";
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';


export const ROUTES: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    // {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'callback', component: CallbackComponent},
    {path: 'page', component: PageComponent,
    children: [
        {path: 'project', component: ProjectPageComponent},
        {path: 'activities', component: ActivitiesPageComponent},
        {path: 'analytics', component: AnalyticsPageComponent},
        {path: 'application', component: ApplicationPageComponent},
        {path: 'settings', component: SettingsPageComponent},
        {path: 'reflections', component: ReflectionsPageComponent},
    ]},


    

];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
