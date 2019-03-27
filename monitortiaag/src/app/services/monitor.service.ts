import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Monitor } from './../interfaces/monitor';
import { Observable } from 'rxjs';
import { Registro } from '../interfaces/registro';
import { snapshotChanges } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { BorregasService } from './borregas.service';
import { AngularFirestoreDocument } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  private monitorDoc: Monitor={arete:0,peso:0,rfid:"",peso_rango:0,modo:""};
  private monitorDocument:AngularFirestoreDocument;
  constructor(private afs: AngularFirestore) {
    this.monitorDocument = this.afs.doc<Monitor>('monitores/1');
    this.monitorDocument.valueChanges().subscribe((m: Monitor) => { this.monitorDoc = m });


  }
  getMonitorDoc() {
    return this.monitorDocument;
  }
  getMonitor() {
    return this.monitorDoc;
  }

   

  /*loadArrays(){   
   this.arraysCollection = this.afs.collection<Arrays>('registro/1/45:a9:0c:47');  
   return this.arraysCollection.valueChanges()
   .subscribe(
     (arr:Arrays[]) =>{
       this.arrays = arr;
   });

  }
  */

}