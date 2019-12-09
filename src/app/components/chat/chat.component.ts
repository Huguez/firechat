import { Component } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent {
  
  mensaje:string = "";

  constructor( public _cs: ChatService){
    this._cs.cargarMensaje().subscribe();
  }

  ngOnInit() {
  }
  
  enviar_mensaje(){
    
    if( this.mensaje.length === 0 ){
      return;
    }

    this._cs.agregarMensajes( this.mensaje );
    this.mensaje = "";
  }
}
