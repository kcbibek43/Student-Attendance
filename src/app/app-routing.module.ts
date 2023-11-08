import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './Shared/notfound/notfound.component';
import { MainComponent } from './Shared/main/main.component';
import { DashboardComponent } from './Features/dashboard/dashboard.component';
import { AddstudentsComponent } from './Features/addstudents/addstudents.component';
import { MarkattendanceComponent } from './Features/markattendance/markattendance.component';
import { EditComponent } from './Functions/edit/edit.component';
import { ViewComponent } from './Functions/view/view.component';
import { ChartsComponent } from './Features/charts/charts.component';

const routes: Routes = [
  {
    path : "",
    component : MainComponent
  },
  {
    path : "dashboard",
    component : DashboardComponent
  },
  {
    path : "addstudent",
    component : AddstudentsComponent
  },
  {
    path : "markattendence",
    component : MarkattendanceComponent
  },
  {
    path : "edit/:id",
    component : EditComponent
  },
  {
    path : "view/:id",
    component : ViewComponent
  },
  {
    path : "markattendence",
    component : MarkattendanceComponent
  },
  {
    path : "chart",
    component : ChartsComponent
  },
  {
    path : "**",
    component : NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
