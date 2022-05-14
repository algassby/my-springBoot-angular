import { Component, OnInit, Directive } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor() { }
  title = 'Algass white project';
  public friendAge = 25;
  public friend = '';
  ngOnInit(): void {
  }

}
