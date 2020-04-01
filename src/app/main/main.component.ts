import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import {
  trigger,
  style,
  animate,
  transition,
  stagger,
  query
} from "@angular/animations";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.less"],
  animations: [
    trigger("transition", [
      transition("*<=>*", [
        query(".container_head, .container_box , .container_footer", [
          style({ opacity: 0 }),
          animate(1000),
          style({ opacity: 1 })
        ])
      ])
    ])
  ]
})
export class MainComponent implements OnInit {
  public isRetraction: boolean = true;
  public title: string = "";
  constructor() {}

  ngOnInit() {}
  getbg(outlet: RouterOutlet): boolean {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animationData"] == "home"
    );
  }

  transition(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animationData"]
    );
  }
}
