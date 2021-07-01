import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualComponent } from './manual/manual.component';

const routes: Routes = [{
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
}, {
  path: 'home',
  loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule),
}, {
  path: 'upload',
  loadChildren: () => import('./principal/principal.module')
},
{
  path: 'manual',
  component: ManualComponent
},
{
  path: '**',
  redirectTo: 'home'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

