import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Person } from '../model/person';
import { User } from '../model/user';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  @Output() public user = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  emitUser(){
    this.user.emit(new FormData());
  }

}
