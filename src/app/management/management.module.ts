import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AreaComponent } from './area/area.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    AreaComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ManagementModule { }
