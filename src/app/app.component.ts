import { Component } from '@angular/core';
import { ChatService } from './providers/chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'fireChat';
  
  constructor(  public _cs: ChatService ){}
  
  show(){
    return this._cs.usuario.uid == null ? true : false ;
  }

}
