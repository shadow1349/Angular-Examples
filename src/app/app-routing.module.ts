import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main/page-one',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./main/main.module').then((mod) => mod.MainModule),
  },
  {
    path: '404',
    loadChildren: () =>
      import('./not-found/not-found.module').then((mod) => mod.NotFoundModule),
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
