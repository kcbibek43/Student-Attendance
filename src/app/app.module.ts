import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotfoundComponent } from './Shared/notfound/notfound.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { DashboardComponent } from './Features/dashboard/dashboard.component';
import { AddstudentsComponent } from './Features/addstudents/addstudents.component';
import { MarkattendanceComponent } from './Features/markattendance/markattendance.component';
import { MainComponent } from './Shared/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Shared/material/material.module';
import { EditComponent } from './Functions/edit/edit.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewComponent } from './Functions/view/view.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartsComponent } from './Features/charts/charts.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NotfoundComponent,
    NavbarComponent,
    DashboardComponent,
    AddstudentsComponent,
    MarkattendanceComponent,
    MainComponent,
    EditComponent,
    ViewComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
