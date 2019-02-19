import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import {Chart} from 'chart.js'
import {MonitorService} from './../services/monitor.service';
import { Monitor } from './../interfaces/monitor';
import { Arrays } from '../interfaces/arrays';

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {
  myChart: Chart;

  @ViewChild('chartContainer') chartcontainer: ElementRef;
  @ViewChild('chartcanvas') chartcanvas: ElementRef;
  monitors: Observable<Monitor[]>;
  arrays: Observable<Arrays[]>;
  ngAfterViewInit() {
    this.createChart();

  }
  createChart() {   
    this.myChart = new Chart(this.chartcanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.ms.arrays[0].fecha_peso,
        datasets: [{
          label: 'Pesos en KG',
          data: this.ms.arrays[0].registro_peso,
          borderWidth: 1,
          backgroundColor: ['#E78839'],
          pointBackgroundColor: ['#6E4217','#6E4217','#6E4217','#6E4217','#6E4217','#6E4217']
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  constructor(public navCtrl: NavController,public ms: MonitorService) {
    this.ms.loadMonitor();
    this.ms.loadArrays();
    console.log(this.monitors);    
   }
  ngOnInit() {
        //console.log(this.todos);
  }
}
