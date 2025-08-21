import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/screen/login/login.component";
import { NotFoundComponent } from "./presentation/screens/notFound/notFound.component";
import { SignUpComponent } from "./auth/screen/signup/signup.component";
import { HomeComponent } from "./presentation/screens/home/home.component";
import { AuthGuard } from "./presentation/navigation/guards/AuthGuard";
import { NoAuthGuard } from "./presentation/navigation/guards/NoAuthGuard";
import { SelectCompanyComponent } from "./company/screen/selectCompany/selectCompany.component";
import { CompanySelectedGuard } from "./presentation/navigation/guards/CompanySelectedGuard";

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
