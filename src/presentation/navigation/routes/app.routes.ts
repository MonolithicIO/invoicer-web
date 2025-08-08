import { Routes } from "@angular/router";
import { LoginComponent } from "../../screens/login/login.component";
import { NotFoundComponent } from "../../screens/notFound/notFound.component";
import { SignUpComponent } from "../../screens/signup/signup.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "signup",
    component: SignUpComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "Page not found",
  },
];
