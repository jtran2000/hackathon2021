import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
//
// import { points } from './data';
declare var require: any;
const data: any = require('./data.json');
const chartNum = 5;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  points: any[] = [];


  columns = [{ name:'Rank',  prop: 'id', width:"10" },{ /*name:'', */ prop: 'firstName' }, { /*name:'', */ prop: 'lastName' }, { /*name: 'Points',*/ prop:'points' }];
  rows: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Student';
  showYAxisLabel = true;
  yAxisLabel = 'Points';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    for (let i = 0; i < chartNum; i++) {
      let currentStudent:any = data[i];
      this.points.push({name:currentStudent.firstName + " " + currentStudent.lastName, value: currentStudent.points});
    }
    this.rows = [...data];
    //console.log(this.points);
   //Object.assign(this, { points })
  }

  onSelect(event) {
    console.log(event);
  }

  updateFilter(event) {
    const val:string = event.target.value.toLowerCase();
    const words:string[] = val.split(" ");
    this.rows = [...data];
    if (words.length===0) {
      return;
    }
    const temp:any[] = data.filter(row => {
        let match:boolean = true;
        words.forEach(word=>{
          if (row.firstName.toLowerCase().indexOf(word)<0 && row.lastName.toLowerCase().indexOf(word)<0) {
            match = false;
          }
        });
        return match;
    });
    this.rows = [...temp];
  }
}
