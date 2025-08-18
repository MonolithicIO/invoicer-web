import { Routes } from "@angular/router";
import { LoginComponent } from "../../screens/login/login.component";
import { NotFoundComponent } from "../../screens/notFound/notFound.component";
import { SignUpComponent } from "../../screens/signup/signup.component";
import { HomeComponent } from "../../screens/home/home.component";
import { AuthGuard } from "../guards/AuthGuard";
import { NoAuthGuard } from "../guards/NoAuthGuard";
import { SelectCompanyComponent } from "../../screens/selectCompany/selectCompany.component";
import { CompanySelectedGuard } from "../guards/CompanySelectedGuard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "signup",
    component: SignUpComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard, CompanySelectedGuard],
  },
  {
    path: "select-company",
    component: SelectCompanyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "Page not found",
  },
];
