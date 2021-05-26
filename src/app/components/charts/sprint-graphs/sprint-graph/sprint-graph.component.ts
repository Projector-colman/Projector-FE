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
  @Input() chartData: any[];

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
        categories: []
      }
    };
  }

  ngOnChanges() {
    if(this.chartData) {
      this.chartOptions = {...this.chartOptions, ...{
        series: [
          {
            name: "Real",
            data: this.chartData.map(x => x.real)
          }, 
          {
            name: "Planned",
            data: this.chartData.map(x => x.planned)
          }
        ],
        xaxis: {
          categories: this.chartData.map(x => x.date)
        },
      }}
    }
  }
}
