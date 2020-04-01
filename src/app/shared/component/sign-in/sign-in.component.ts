import { Component, OnInit } from "@angular/core";
import { OidcService } from "../../service/oidc.service";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.less"]
})
export class SignInComponent implements OnInit {
  constructor(private oidc: OidcService, private router: Router) {}

  ngOnInit() {
    this.oidc.userLoaded$.subscribe(x => {
      if (x) {
        this.router.navigate(["./"]);
      } else {
      }
    });
    this.oidc.signInCallBack();
  }
}
