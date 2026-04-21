import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexMarkers,
  ApexStroke,
  ApexTheme,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
  NgApexchartsModule
} from 'ng-apexcharts';
import { ZardButtonComponent } from '@/shared/components/button/button.component';

type RangeKey = '1M' | '6M' | '1Y' | 'YTD' | 'ALL';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  fill: ApexFill;
  stroke: ApexStroke;
  grid: ApexGrid;
  theme: ApexTheme;
  colors: string[];
};

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [NgApexchartsModule,
    ZardButtonComponent
  ],
  template: `
    <div class="flex flex-col h-full w-full gap-4">
      <div class="flex gap-2 flex-wrap">
        <z-button variant="outline" (click)="setRange('1M')" [class.font-bold]="selectedRange === '1M'">1M</z-button>
        <z-button variant="outline" (click)="setRange('6M')" [class.font-bold]="selectedRange === '6M'">6M</z-button>
        <z-button variant="outline" (click)="setRange('1Y')" [class.font-bold]="selectedRange === '1Y'">1Y</z-button>
        <z-button variant="outline" (click)="setRange('YTD')" [class.font-bold]="selectedRange === 'YTD'">YTD</z-button>
        <z-button variant="outline" (click)="setRange('ALL')" [class.font-bold]="selectedRange === 'ALL'">ALL</z-button>
      </div>

      <div class="chart-area">
        <apx-chart
          #chart
          class="apex-chart"
          [series]="chartOptions.series"
          [chart]="chartOptions.chart"
          [dataLabels]="chartOptions.dataLabels"
          [markers]="chartOptions.markers"
          [xaxis]="chartOptions.xaxis"
          [yaxis]="chartOptions.yaxis"
          [tooltip]="chartOptions.tooltip"
          [fill]="chartOptions.fill"
          [stroke]="chartOptions.stroke"
          [grid]="chartOptions.grid"
          [theme]="chartOptions.theme"
          [colors]="chartOptions.colors"
        ></apx-chart>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
    }

    .chart-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      gap: 12px;
    }

    .toolbar {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      flex: 0 0 auto;
    }

    .toolbar button {
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: rgba(255, 255, 255, 0.06);
      color: #e5e7eb;
      padding: 8px 12px;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 500;
      transition: 0.2s ease;
    }

    .toolbar button:hover {
      background: rgba(255, 255, 255, 0.12);
    }

    .toolbar button.active {
      background: #bac5db;
      border-color: #b2bed8;
      color: white;
    }

    .chart-area {
      flex: 1 1 auto;
      min-height: 0;
      width: 100%;
    }

    .apex-chart {
      display: block;
      width: 100%;
      height: 100%;
    }

    .apex-chart ::ng-deep .apexcharts-canvas,
    .apex-chart ::ng-deep .apexcharts-svg,
    .apex-chart ::ng-deep .apexcharts-inner {
      width: 100% !important;
      height: 100% !important;
    }
  `]
})
export class LineChartComponent {
  @ViewChild('chart') chart!: ChartComponent;

  selectedRange: RangeKey = 'ALL';

  private readonly seriesData: [number, number][] = [
    [new Date('2024-01-01').getTime(), 30.95],
    [new Date('2024-01-15').getTime(), 31.34],
    [new Date('2024-02-01').getTime(), 31.18],
    [new Date('2024-02-15').getTime(), 31.05],
    [new Date('2024-03-01').getTime(), 31.00],
    [new Date('2024-03-15').getTime(), 30.95],
    [new Date('2024-04-01').getTime(), 31.24],
    [new Date('2024-04-15').getTime(), 31.29],
    [new Date('2024-05-01').getTime(), 31.85],
    [new Date('2024-05-15').getTime(), 31.86],
    [new Date('2024-06-01').getTime(), 32.28],
    [new Date('2024-06-15').getTime(), 32.10],
    [new Date('2024-07-01').getTime(), 32.65],
    [new Date('2024-07-15').getTime(), 32.21],
    [new Date('2024-08-01').getTime(), 32.35],
    [new Date('2024-08-15').getTime(), 32.44],
    [new Date('2024-09-01').getTime(), 33.10],
    [new Date('2024-09-15').getTime(), 33.80],
    [new Date('2024-10-01').getTime(), 34.20],
    [new Date('2024-10-15').getTime(), 35.10],
    [new Date('2024-11-01').getTime(), 36.40],
    [new Date('2024-11-15').getTime(), 37.20],
    [new Date('2024-12-01').getTime(), 38.10],
    [new Date('2024-12-15').getTime(), 38.90]
  ];

  public chartOptions: ChartOptions = {
    series: [
      {
        name: 'Valeur',
        data: this.seriesData
      }
    ],
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: '100%',
      background: 'transparent',
      foreColor: '#516686',
      fontFamily: 'inherit',
      toolbar: {
        show: true,
        tools: {
          download: false
        }
      },
      zoom: {
        autoScaleYaxis: true
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'MM/yyyy',
        style: {
          colors: '#ffffff',
          fontWeight: 'bold'
        }
      },
      axisBorder: {
        color: 'rgba(255,255,255,0.12)'
      },
      axisTicks: {
        color: 'rgba(255,255,255,0.12)'
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#ffffff',
          fontWeight: 'bold'
        }
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'dd/MM/yyyy'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 1,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    grid: {
      borderColor: 'rgba(255,255,255,0.10)',
      strokeDashArray: 4
    },
    theme: {
      mode: 'dark'
    },
    colors: ['#16A34A']
  };

  setRange(range: RangeKey): void {
    this.selectedRange = range;

    const end = this.seriesData[this.seriesData.length - 1][0];

    switch (range) {
      case '1M':
        this.chart.zoomX(
          new Date(end).setMonth(new Date(end).getMonth() - 1),
          end
        );
        break;

      case '6M':
        this.chart.zoomX(
          new Date(end).setMonth(new Date(end).getMonth() - 6),
          end
        );
        break;

      case '1Y':
        this.chart.zoomX(
          new Date(end).setFullYear(new Date(end).getFullYear() - 1),
          end
        );
        break;

      case 'YTD':
        this.chart.zoomX(
          new Date(new Date(end).getFullYear(), 0, 1).getTime(),
          end
        );
        break;

      case 'ALL':
        this.chart.zoomX(
          this.seriesData[0][0],
          end
        );
        break;
    }
  }
}