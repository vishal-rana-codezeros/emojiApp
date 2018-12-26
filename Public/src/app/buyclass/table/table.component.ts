import { Component, OnInit } from '@angular/core';
import { Service1Service } from '../../service1.service';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],

})

export class TableComponent implements OnInit {
  // characters: Observable<any[]>;
  // columns: string[];
  constructor(private service1Service: Service1Service) { }

  ngOnInit() {
    // this.columns = this.service1Service.getColumns(); 
    // //["name", "age", "species", "occupation"]
  
    // this.characters = this.service1Service.getCharacters();
    // //all data in mock-data.ts
  
  }

}
