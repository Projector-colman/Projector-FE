import { Component, Input, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
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
  @Input() statuses: String[];
  @Input() issues: any[][];
;
  constructor() {
    const colors = ['#7bc043', '#fdf498', '#0392cf', '#ee4035' ,'#f37736'];
    this.title = 'Current Sprint Issues';
    this.chartOptions = {
      series: [],
      chart: {
        width: 446,
        type: "pie"
      },
      labels: [],
      colors: colors,
      fill: {
        colors: colors
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

  ngOnChanges() {
    if(this.statuses) {
      this.chartOptions.labels = this.statuses;      
    }
    if(this.issues) {
      this.chartOptions.series = this.issues.map(group => group.length);
    }
  }
}


