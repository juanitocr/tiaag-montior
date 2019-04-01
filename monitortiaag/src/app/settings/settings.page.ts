import { Component, OnInit, NgZone } from '@angular/core';
import { MonitorService } from './../services/monitor.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  val: number;
  modo:string;

  constructor(public bs: MonitorService, private zone: NgZone, private lc: LoadingController) {


    this.getMon();

  }
  async getMon() {
    const loading = await this.lc.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.val = this.bs.getMonitor().peso_rango;
    this.modo = this.bs.getMonitor().modo;
    console.log("Borre", this.val);
    loading.dismiss();

  }
  updatePro(e) {
    /// Refresh the UI
    this.zone.run(() => {
      console.log('UI has refreshed');
      
    });
  }
  guardarPeso() {
    console.log(this.val);
    this.bs.getMonitorDoc().update({ peso_rango: this.val });
    alert("Rango cambiado");
  }
  guardarModo() {
    console.log(this.modo);
    this.bs.getMonitorDoc().update({ modo: this.modo });
    alert("Modo de operacion cambiado");
  }
  ngOnInit() {
  }

}
