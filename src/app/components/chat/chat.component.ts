import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {
  
  mensaje:string = "";
  elemento: any;

  constructor( public _cs: ChatService){
    this._cs.cargarMensaje().subscribe( () => {
      setTimeout( () => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20 );
    } );
  }

  ngOnInit() {
    this.elemento = document.getElementById( 'app-mensajes' );
  }
  
  enviar_mensaje(){

    if( this.mensaje.length === 0 ){
      return;
    }

    this._cs.agregarMensajes( this.mensaje ).then( (resp)=> this.mensaje = "" ).catch( () => console.error( 'Fail!!!!' ) );
  }
}