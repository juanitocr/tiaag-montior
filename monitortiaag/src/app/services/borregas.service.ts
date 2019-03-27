import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'
import { Borregas } from '../interfaces/borregas';
import { Crias } from '../interfaces/crias';
import { Registro } from '../interfaces/registro';

@Injectable({
  providedIn: 'root'
})
export class BorregasService {
  private itemsCollections: AngularFirestoreDocument<Borregas>;
  private arrayCollections: AngularFirestoreCollection<Borregas>;
  private collectionsRegistros:AngularFirestoreCollection<Registro>;
  private collections5Registros:AngularFirestoreCollection<Registro>;
  public borrega: Borregas;
  public cria: Crias[] = [];
  public borregacoll: Observable<Borregas[]>;
  public regObservables: Observable<Registro[]>;
  public reg5Observables: Observable<Registro[]>;
  public borregasArray: Borregas[] = [];
  public registrosArray: Registro[] = [];
  public registros5Array: Registro[] = [];

  constructor(private afs: AngularFirestore) {
    this.arrayCollections = this.afs.collection<Borregas>('borregas', ref => ref.where('ganadero', '==', 1));
    this.borregacoll = this.arrayCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.borregacoll.subscribe(b => {
      this.borregasArray = b as Borregas[];
    });
    this.collectionsRegistros =  this.afs.collection<Registro>('registro', ref => ref.where('ganadero', '==', 1));
    this.regObservables = this.collectionsRegistros.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.regObservables.subscribe(b => {
      this.registrosArray = b as Registro[];
      console.log(this.registrosArray);
      
    });

    this.collections5Registros =  this.afs.collection<Registro>('registro', ref => ref.where('ganadero', '==', 1).limit(5));
    this.reg5Observables = this.collections5Registros.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.reg5Observables.subscribe(b => {
      this.registros5Array = b as Registro[];
      console.log(this.registros5Array);
      
    });

  }
  filterItems(searchTerm) {
    return this.borregasArray.filter((item) => {
      return item.arete == searchTerm;
    });
  }
  getBorregasArray() {
    return this.borregasArray;
  }
  getBorregas() {
    return this.borregacoll;
  }
  getBorregaDetail(id) {
    return this.arrayCollections.doc<Borregas>("" + id).valueChanges();
  }
  getRegistros(){
    return this.regObservables;

  }
  getRegistrosArray(){
    return this.registrosArray;
    }
  loadBorregas() {
    this.itemsCollections = this.afs.doc<Borregas>('borregas');
    return this.itemsCollections.valueChanges()
      .subscribe(
        (bo: Borregas) => {
          this.borrega = bo;
          this.cria = bo.crias;
        });
  }
}