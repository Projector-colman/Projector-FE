import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsComponent } from './components/user-setting-component/user-settings/user-settings.component';

const routes: Routes = [
  { path: 'user-settings/:id', component: UserSettingsComponent },
  { path: '', redirectTo: 'user-settings/1', pathMatch: 'full' },
  { path: '**', component: UserSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
