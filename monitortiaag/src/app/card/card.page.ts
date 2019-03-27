import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js'
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { BorregasService } from '../services/borregas.service';
import { Borregas } from '../interfaces/borregas';
import { Crias } from '../interfaces/crias';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Registro } from './../interfaces/registro';



@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  myChart: Chart;
  @ViewChild('chartContainer') chartcontainer: ElementRef;
  @ViewChild('chartcanvas') chartcanvas: ElementRef;
  borrega: Borregas = {
    arete: 0,
    fecha_baja: 0,
    fecha_entrada: 0,
    fecha_nac: 0,
    fecha_salida: 0,
    ganadero: 0,
    num_partos: 0,
    peso_nacer: 0,
    peso_actual: 0,
    rfid: "",
    genero: "",
    crias: null,
  };
  registros: Registro[] = [];
  fechas: string[] = [];
  pesos: number[] = [];
  idBorrega = null;
  ngAfterViewInit() {
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

  constructor(private route: ActivatedRoute, public navCtlr: NavController, public bs: BorregasService, private lc: LoadingController, public alertCtrl: AlertController) {

  }

  ngOnInit() {
    this.idBorrega = 1;
    console.log(this.idBorrega);
    if (this.idBorrega) {
      this.loadBorrega();
    }
  }
  async loadBorrega() {
    const loading = await this.lc.create({
      message: 'Cargando...'
    })
    await loading.present();
    this.bs.getBorregaDetail(this.idBorrega).subscribe(res => {
      this.borrega = res;
      console.log("Borre", this.borrega);
    });
    var arrayFiltrado = this.bs.registrosArray.filter(n => { n.id == this.idBorrega });
    this.fechas=[];
    this.pesos=[];
    for (let reg of this.bs.registrosArray) {
      var date = new Date(reg.fecha);
      var m:number = date.getMonth()+1;
      var dateForm:string = date.getDate()+"/"+m+"/"+date.getFullYear();
      this.fechas.push(dateForm);
      this.pesos.push(reg.peso);
    }    
    this.createChart();
    console.log(this.fechas);
    console.log(this.pesos);
    loading.dismiss();

  }
}
