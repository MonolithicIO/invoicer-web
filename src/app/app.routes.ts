import { Routes } from "@angular/router";
import { LoginComponent } from "../presentation/screens/auth/login/login.component";
import { NotFoundComponent } from "../presentation/screens/notFound/notFound.component";
import { SignUpComponent } from "../presentation/screens/auth/signup/signup.component";

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
