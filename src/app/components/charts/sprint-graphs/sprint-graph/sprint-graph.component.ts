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
  @Input() chartId: string;

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        id: this.chartId,
        type: "line",
        width: '100%',
        height: '400px',
        zoom: {
          enabled: false
        }
      },
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

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.chartData) {
      this.chartOptions = {...this.chartOptions, ...{
        series: [
          {
            name: "Real",
            data: this.chartData.length !== 0 ? this.chartData.map(x => x.real) : []
          }, 
          {
            name: "Planned",
            data: this.chartData.length !== 0 ? this.chartData.map(x => x.planned) : []
          }
        ],
        xaxis: {
          categories: this.chartData.length !== 0 ? this.chartData.map(x => x.date) : []
        },
      }}
    }
    if(this.chartId) {
      this.chartOptions.chart.id = this.chartId;
    }
  }
}
