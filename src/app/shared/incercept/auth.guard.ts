import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate
} from "@angular/router";
import { Observable } from "rxjs";
import { OidcService } from "../service/oidc.service";

@Injectable({
  providedIn: "root"
})
//路由守卫 负责认证
export class AuthGuard implements CanActivate {
  constructor(private oidc: OidcService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.oidc.userAvailable) {
      return true;
    } else {
      this.oidc.triggerSignIn();
      return false;
    }
    return true;
  }
}
