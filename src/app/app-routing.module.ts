import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUserComponent } from './users/manage-user/manage-user.component';
import { AddEditUserComponent } from './users/add-edit-user/add-edit-user.component';

const routes: Routes = [
  {path: '', component:ManageUserComponent},
  {path: 'add_user', component:AddEditUserComponent},
  {path: 'edit_user/:id', component:AddEditUserComponent},
  {path: 'view_user', component:ManageUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
