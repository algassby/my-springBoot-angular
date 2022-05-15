import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input('parentData')  friendAge: any  ;
  @Input('phoneNumber') phoneNumber :string = '';
  @Output() public friendName = new EventEmitter();
  @Output() public sexe = new EventEmitter();

  sexeForm = new FormControl('');
  constructor() { }

  ngOnInit(): void {
   // console.log(this.friendAge);
  }
  eventName(){
    this.friendName.emit("Justine");
  }
  emitSexe(){
    alert("test"+this.sexeForm.value);
    console.log(this.sexeForm.value);
  
   // this.sexeForm.setValue('')
    this.sexe.emit(this.sexeForm.value);
  }

}
