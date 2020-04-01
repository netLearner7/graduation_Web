import { Component, OnInit, Input } from "@angular/core";
import { environment } from "src/environments/environment";
import { menu } from "src/app/shared/entities/menu";
import { Router } from "@angular/router";
import { OidcService } from "src/app/shared/service/oidc.service";

@Component({
  selector: "app-sider",
  templateUrl: "./sider.component.html",
  styleUrls: ["./sider.component.less"]
})
export class SiderComponent implements OnInit {
  @Input() isRetraction: boolean;

  //存储列表
  public enumList: menu[] = [
    {
      text: "首页",
      url: "/main/Home",
      icon: "home"
    },
    {
      text: "我的会议",
      url: "/main/myMeeting",
      icon: "solution"
    },
    {
      text: "参加的会议",
      url: "/main/myAudience",
      icon: "robot"
    },
    {
      text: "统计",
      url: "/main/statistics",
      icon: "area-chart"
    }
  ];
  //用户名
  public name: string = "zyz";

  constructor(private router: Router, private oidcService: OidcService) {}

  ngOnInit() {
    //this.enumList = environment.menuList;
    //this.name = this.oidcService.user.profile.given_name;
  }

  //登出按钮
  SignOut() {
    this.oidcService.triggerSignOut();
  }

  //跳转方法
  public redriect(url: string): void {
    console.log("这里是url", url);
    this.router.navigate([url]);
  }
}
