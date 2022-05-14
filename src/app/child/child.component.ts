import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input('parentData')  friendAge: any  ;
  @Output() public friendName = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
   // console.log(this.friendAge);
  }
  eventName(){
    this.friendName.emit("Justine");
  }

}
