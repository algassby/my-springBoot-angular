import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'voter-component',
  templateUrl: './voter-component.component.html',
  styleUrls: ['./voter-component.component.css']
})
export class VoterComponentComponent implements OnInit {
 
  @Input ()
  public question: string ='';

 @Input ()
  public yesAnswer: string = '';

 @Input ()
  public noAnswer: string = '';

@Output ()
 public output = new EventEmitter <boolean> ();


  constructor() { }

  ngOnInit(): void {
  }
  public vote (vote: boolean): void {
    this.output.emit(vote);
    }

}
