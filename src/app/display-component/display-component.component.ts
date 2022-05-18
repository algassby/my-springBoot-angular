import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'display-component',
  templateUrl: './display-component.component.html',
  styleUrls: ['./display-component.component.css']
})
export class DisplayComponentComponent implements OnInit {

  public question = 'Too easy?';
      public yesAnswer = 'Yes';
      public noAnswer = 'no';
      public answer: boolean = false;
     
  constructor() { }

  ngOnInit(): void {
  }
  setVote(event:any) {
    this.answer  == event ? this.yesAnswer : this.noAnswer;
  }
}
