import { Component, ViewChild } from "@angular/core";
import { ApexDataLabels, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: any;
  fill: any;
};

@Component({
  selector: 'app-issues-by-status-chart',
  templateUrl: './issues-by-status-chart.component.html',
  styleUrls: ['./issues-by-status-chart.component.scss']
})

export class IssuesByStatusChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public title: String;

  constructor() {
    this.title = 'Current Sprint Issues';
    this.chartOptions = {
      series: [44, 55, 13, 43],
      chart: {
        width: 446,
        type: "pie"
      },
      labels: ["To Do", "In Progress", "Stuck", "Done"],
      colors: ['#0a75ad', '#fff68f', '#ff4040', '#5ac18e'],
      fill: {
        colors: ['#0a75ad', '#fff68f', '#ff4040', '#5ac18e']
      },
      responsive: [
        {
          breakpoint: 1300,
          options: {
            chart: {
              width: 333
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}


