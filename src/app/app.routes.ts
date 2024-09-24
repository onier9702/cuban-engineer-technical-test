import { Routes } from '@angular/router';

import { FilesComponent } from './pages/files/files.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewFileComponent } from './pages/new-file/new-file.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { UpdateFileComponent } from './pages/update-file/update-file.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'pages',
        children: [
            { path: 'home', component: HomeComponent },

            // Authentication
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },

            // Files
            {
                path: 'files',
                component: FilesComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            { path: 'new-file', component: NewFileComponent },
            { path: 'update-file/:id', component: UpdateFileComponent },
        ]
    },
    { path: '', redirectTo: 'pages/home', pathMatch: 'full' }, // Default route
];
