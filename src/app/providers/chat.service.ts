import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  chats: Mensaje[] = [];
  
  constructor( private afs: AngularFirestore ) {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc' ).limit( 15 ) );
  }

  cargarMensaje(){

    return this.itemsCollection.valueChanges().pipe( map( (mensajes: Mensaje[]) => {
      this.chats = [];
      for( let mensaje of mensajes ){
        this.chats.unshift( mensaje );
      }
      return this.chats;
    }) );
  }

  agregarMensajes( text: string ){

    let mensaje: Mensaje = {
      nombre: 'Huguez',
      mensaje: text,
      fecha: new Date().getTime()
    }
    //console.log( typeof( mensaje ) );

    return this.itemsCollection.add( mensaje );
  }
}


