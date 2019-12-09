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
    //this.itemsCollection.valueChanges();
    this.itemsCollection = this.afs.collection<Mensaje>('chats');
  }

  cargarMensaje(){

    return this.itemsCollection.valueChanges().pipe( map( (mensajes: Mensaje[]) => {
      //console.log( mensajes );
      this.chats = mensajes;
    }) );
  }

  agregarMensajes( text: string ){

    let mensaje: Mensaje = {
      nombre: 'Huguez',
      mensaje: text,
      fecha: new Date().getTime()
    }
    //console.log( typeof( mensaje ) );

    this.itemsCollection.add( mensaje ).then( (resp)=> console.log( "si se hizo" ) ).catch( () => console.error( 'Fail!!!!' ) );

  }
}


