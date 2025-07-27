import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "login-screen",
  imports: [RouterOutlet],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  title = "Login";
}
