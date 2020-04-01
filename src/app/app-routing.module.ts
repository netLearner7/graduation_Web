import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInComponent } from "./shared/component/sign-in/sign-in.component";
import { RefreshOidcComponent } from "./shared/component/refresh-oidc/refresh-oidc.component";
import { AuthGuard } from "./shared/incercept/auth.guard";

const routes: Routes = [
  {
    //token相关
    path: "signin-oidc",
    component: SignInComponent
  },
  {
    //token相关
    path: "refresh-oidc",
    component: RefreshOidcComponent
  },
  {
    path: "",
    //添加认证守卫
    canActivate: [AuthGuard],
    loadChildren: "./main/main.module#MainModule"
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
