import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnComponent } from '../learn/learn.component';
import { UserApplicationComponent } from './user-application.component';
import { CreateComponent } from '../create/create.component';

const routes: Routes = [
  {
    path: '',
    component: UserApplicationComponent,
    children: [
      {
        path: 'learn',
        component: LearnComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class UserApplicationRoutingModule {
}
