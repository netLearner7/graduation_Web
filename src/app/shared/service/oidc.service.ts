import { Injectable } from "@angular/core";
import { UserManager, User } from "oidc-client";
import { environment } from "src/environments/environment";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class OidcService {
  //用户管理器
  private userManage: UserManager = new UserManager(environment.oidc_Settings);
  private currentUser: User;
  userLoaded$ = new ReplaySubject<boolean>(1);

  //检查是否有用户登录
  get userAvailable(): boolean {
    return this.currentUser != null;
  }

  //获取当前用户
  get user(): User {
    return this.currentUser;
  }

  constructor() {
    this.userManage.clearStaleState();

    //在登陆时发生
    this.userManage.events.addUserLoaded(user => {
      this.currentUser = user;
      this.userLoaded$.next(true);
    });

    //在登出时发生
    this.userManage.events.addUserUnloaded(() => {
      this.currentUser = null;
      this.userLoaded$.next(false);
    });
  }

  //登入函数
  triggerSignIn() {
    this.userManage.signinRedirect().catch(e => {
      console.log("网页跳转失败", e);
    });
  }

  //登入回调
  signInCallBack() {
    this.userManage.signinCallback().then(() => {
      console.log("123123");
    });
  }

  //登出函数
  triggerSignOut() {
    this.userManage.signoutRedirect().then(() => {});
  }
}
