import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js'
import { MonitorService } from './../services/monitor.service';
import { Monitor } from './../interfaces/monitor';
import { AlertController } from '@ionic/angular';
import { Registro } from './../interfaces/registro';
import { BorregasService } from './../services/borregas.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {
  myChart: Chart;
  fechas:string[]=[];
  pesos:number[]=[];
  @ViewChild('chartContainer') chartcontainer: ElementRef;
  @ViewChild('chartcanvas') chartcanvas: ElementRef;
  monitors: Observable<Monitor[]>;

  ngAfterViewInit() {
   // this.createChart();

  }
  createChart() {
    this.myChart = new Chart(this.chartcanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.fechas,
        datasets: [{
          label: 'Pesos en KG',
          data: this.pesos,
          borderWidth: 1,
          backgroundColor: ['#E78839'],
          pointBackgroundColor: ['#6E4217', '#6E4217', '#6E4217', '#6E4217', '#6E4217', '#6E4217']
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

  constructor(public navCtrl: NavController, public ms: MonitorService,public bs: BorregasService, public alertCtrl: AlertController, private lc: LoadingController) {
    
  }

  async doPrompt() {
    const prompt = await this.alertCtrl.create({
      header: "Comentar",
      inputs: [
        {
          name: 'title',
          placeholder: 'Observación'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    await prompt.present();
  }

  ngOnInit() {
    this.iniciar();
  }
  async iniciar(){
    const loading = await this.lc.create({
      message: 'Cargando...'
    });
    await loading.present();
    
    let array:Registro[] = await this.bs.getRegistrosArray();
    var arrayFiltrado:Registro[]=[];
    for (const iterator of array) {
      console.log(iterator);      
      if(iterator.rfid == this.ms.getMonitor().rfid){
             arrayFiltrado.push(iterator);
      }
    }   
    this.fechas = [];
    this.pesos = [];
    for (const reg of arrayFiltrado) {
      var date = new Date(reg.fecha);
      var m:number = date.getMonth()+1;
      var dateForm:string = date.getDate()+"/"+m+"/"+date.getFullYear();
      this.fechas.push(dateForm);
      this.pesos.push(reg.peso);
    }
    this.createChart();
    //Array de tabla
    loading.dismiss();
  }
}
