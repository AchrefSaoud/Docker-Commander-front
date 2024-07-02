import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImageComponent } from './image/image.component';
import { ContainersComponent } from './containers/containers.component';

const routes: Routes = [
  { path:"",redirectTo:'dashboard',pathMatch:"full"},//default
  { path: 'dashboard', component: DashboardComponent },
  { path: 'image', component: ImageComponent },
  { path: 'containers', component: ContainersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
