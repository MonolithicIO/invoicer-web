import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { LoginComponent } from "./presentation/screens/auth/login/login.component";

bootstrapApplication(LoginComponent, appConfig).catch((err) =>
  console.error(err)
);
