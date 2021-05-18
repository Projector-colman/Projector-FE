import { Component, Input, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  responsive: any;
};

@Component({
  selector: "app-sprint-graph",
  templateUrl: "./sprint-graph.component.html",
  styleUrls: ["./sprint-graph.component.scss"]
})
export class SprintGraphComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() data: any[];

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      responsive: [
        {
          breakpoint: 1300,
          options: {
            chart: {
              height: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14"
        ]
      }
    };
  }

  ngOnChanges() {
    if(this.data) {
      debugger;
      this.chartOptions.series = [
        {
          name: "Planned",
          data: [78, 72, 66, 60, 54, 48, 42, 36, 30, 24, 18, 12, 6, 0]
        },
        {
          name: "Real",
          data: this.data
        }
      ]      
    }
  }
}
