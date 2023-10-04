
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home";
import { LoginComponent, RegisterComponent } from "./account";
import { NgModule } from "@angular/core";



const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'account/login', component: LoginComponent},
    {path: 'account/register', component: RegisterComponent},

    //otherwise redirect to home
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}