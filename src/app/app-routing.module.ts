import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/page-one',
    pathMatch: 'full',
  },
  {
    path: 'page-one',
    loadChildren: () =>
      import('./page-one/page-one.module').then((mod) => mod.PageOneModule),
  },
  {
    path: 'page-two',
    loadChildren: () =>
      import('./page-two/page-two.module').then((mod) => mod.PageTwoModule),
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
