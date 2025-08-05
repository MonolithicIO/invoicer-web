import { Routes } from "@angular/router";
import { LoginComponent } from "../presentation/login/login.component";
import { NotFoundComponent } from "../presentation/notFound/notFound.component";
import { SignUpComponent } from "../presentation/signup/signup.component";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    title: "Invoicer",
  },
  {
    path: "signup",
    component: SignUpComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "Page not found",
  },
];
