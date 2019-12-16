import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';

import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  chats: Mensaje[] = [];
  public usuario: any = {};

  constructor( private afs: AngularFirestore, public afAuth: AngularFireAuth ) {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc' ).limit( 15 ) );

    this.afAuth.authState.subscribe( user => {
      console.log( user );
      if( !user ){
        return; 
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
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
    return this.itemsCollection.add( mensaje );
  }

  login(proveedor : string ) {

    if( proveedor === 'google' ){
      this.afAuth.auth.signInWithPopup( new auth.GoogleAuthProvider() );
    }else{
      this.afAuth.auth.signInWithPopup( new auth.TwitterAuthProvider() );
    }
    
  }

  logout() {
    this.usuario = {};

    this.afAuth.auth.signOut();
  }
}

