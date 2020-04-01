import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StatisticsComponent } from "./statistics.component";
import { StatisticsRoutingModule } from "./statistics-routing.module";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { NgxEchartsModule } from "ngx-echarts";

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    NgZorroAntdModule,
    NgxEchartsModule
  ]
})
export class StatisticsModule {}
