import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [{ path: '', component: MainComponent, children: [
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
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
