import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import {IonItemSliding} from '@ionic/angular';
import {Borregas} from './../interfaces/borregas'
import { FormBuilder, FormGroup , Validators , FormControl } from '@angular/forms';
import { BorregasService } from './../services/borregas.service';


@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {
  searchTerm: string = '';
  items:Borregas[] = [];
  item:Borregas;
  searchControl: FormControl;
  searching: any = false;
  constructor(public bs: BorregasService) {
    this.searchControl = new FormControl();
       console.log("Array",bs.borregacoll);
   }
   ionViewDidLoad() {
    this.setFilteredItems();
    this.searchControl.valueChanges.subscribe(search => {
    this.searching = false;
    this.setFilteredItems();
    });
   }
  ngOnInit() {
  }
  onSearchInput(){
    this.searching = true;
  }
  setFilteredItems() {
    this.items = this.bs.filterItems(this.searchTerm);
   }
}
