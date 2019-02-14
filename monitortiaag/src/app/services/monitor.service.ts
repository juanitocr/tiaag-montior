import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Monitor } from './../interfaces/monitor';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  private itemsCollection: AngularFirestoreCollection<Monitor>;
  public monitors : Monitor[] = []
  
  
  constructor(private afs: AngularFirestore) {  
   }

   loadMonitor(){
    this.itemsCollection = this.afs.collection<Monitor>('monitores'); 
    return this.itemsCollection.valueChanges()
    .subscribe(
      (monitor:Monitor[]) =>{
        this.monitors = monitor;
    });
   }
}
 