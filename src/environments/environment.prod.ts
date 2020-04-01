import { meetingStateEnum } from "src/app/shared/enum/meeting-stats-enum";

export const environment = {
         production: true,
         //oidc配置
         oidc_Settings: {
           //认证地址
           authority: "http://192.168.43.131:5001",
           //客户端id
           client_id: "spa",
           //登入重定向地址
           redirect_uri: "http://localhost:4200/signin-oidc",
           //请求类型
           response_type: "id_token token",
           //请求范围
           scope: "openid profile api1",
           //登出地址
           post_logout_redirect_uri: "http://localhost:4200",
           //启用自动更新令牌
           automaticSilentRenew: true,
           //自动更新url
           silence_redirect_uri: "http://localhost:4200/refresh-oidc"
         },
         //菜单栏
         menuList: [
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
         ],
         //筛选列表
         serchMeetingState: [
           { text: "未开始", value: meetingStateEnum.NotStarted },
           { text: "进行中", value: meetingStateEnum.CarryOn },
           { text: "已完成", value: meetingStateEnum.Complete },
           { text: "已取消", value: meetingStateEnum.Cancel }
         ]
       };
