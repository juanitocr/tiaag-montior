import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { BorregasService } from '../services/borregas.service';
import { Borregas } from './../interfaces/borregas';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  borregas: Borregas[] = [];
  sexos: number[] = [];
  pesosTotales:number[]=[];
  fechaTotales:number[]=[]; 
  fechaFinales:string[]=[]; 
  pesoGanado:number;
  corderos:number=0;
  constructor(private route: ActivatedRoute, public navCtlr: NavController, public bs: BorregasService, private lc: LoadingController) {

  }
  async ngOnInit() {
    const loading = await this.lc.create({
      message: 'Cargando...'
    })
    await loading.present();
    this.borregas = await this.bs.getBorregasArray();
    var hembras: number = 0;
    var machos: number = 0;
     
    for (const b of this.borregas) {
      if (b.genero == "Hembra") { hembras++; }
      if (b.genero == "Macho") { machos++; }
      if (b.genero == "Cordero") { this.corderos++; }
    }
    this.sexos = await [hembras, machos, this.corderos];
    console.log(this.sexos);
    var fechaI:number=0;
    var pesosI:number=0;
    
    for(const a of this.bs.getRegistrosArray()){
      console.log(a);      
       if(fechaI!=a.fecha){
         fechaI=a.fecha;  
         this.pesosTotales.push(pesosI);
         this.fechaTotales.push(fechaI);       
         pesosI=0;
       }
       if(fechaI==a.fecha){
         console.log("Igual");         
          pesosI+=a.peso;
       }
    }
    this.pesosTotales.push(pesosI);
    this.fechaTotales.push(fechaI); 
    this.pesosTotales.shift();
    this.fechaTotales.shift();
    for (let reg of this.fechaTotales) {
      var date = new Date(reg);
      var m:number = date.getMonth()+1;
      var dateForm:string = date.getDate()+"/"+m+"/"+date.getFullYear();
      this.fechaFinales.push(dateForm);      
    }
    console.log("Pesos ",this.pesosTotales);
    console.log("Fechas ",this.fechaTotales);    
    if(this.pesosTotales.length<=1){
       this.pesoGanado =this.pesosTotales[0];
    }else{
      this.pesoGanado = this.pesosTotales[this.pesosTotales.length-2]+this.pesosTotales[this.pesosTotales.length-1];
    }
    this.createChart();
    
    loading.dismiss();
  }
  myChart1: Chart;
  myChart2: Chart;
  @ViewChild('chartContainer') chartcontainer: ElementRef;
  @ViewChild('chartContainer1') chartcontainer1: ElementRef;
  @ViewChild('chartcanvas') chartcanvas: ElementRef;
  @ViewChild('chartcanvas1') chartcanvas1: ElementRef;


  ngAfterViewInit() {

    //this.createChart();

  }
  createChart() {
    this.myChart2 = new Chart(this.chartcanvas1.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Machos', 'Hembras', 'Coorderos'],
        datasets: [{
          label: 'Sexos',
          data: this.sexos,
          backgroundColor: [
            '#6E4217', '#C87BBA', '#888889'
          ],
          borderWidth: 1
        }]
      },
      options: {

      }
    });

    this.myChart1 = new Chart(this.chartcanvas.nativeElement, {
      type: 'line',
      data: {
        labels:this.fechaFinales,
        datasets: [{
          label: 'Pesos en KG',
          data: this.pesosTotales,
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
}

