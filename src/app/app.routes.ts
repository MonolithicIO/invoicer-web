import { Routes } from "@angular/router";
import { NotFoundComponent } from "./presentation/screens/notFound/notFound.component";
import { HomeComponent } from "./presentation/screens/home/home.component";
import { SelectCompanyComponent } from "./feature/company/screen/select-company/select-company.component";
import { NoAuthGuard } from "../core/navigation/guards/NoAuthGuard";
import { AuthGuard } from "../core/navigation/guards/AuthGuard";
import { CompanySelectedGuard } from "../core/navigation/guards/CompanySelectedGuard";
import { SignUpComponent } from "./feature/auth/screen/signup/signup.component";
import { LoginComponent } from "./feature/auth/screen/login/login.component";

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
