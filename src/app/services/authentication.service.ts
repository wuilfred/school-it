import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable} from "rxjs/index";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {User} from "../interfaces/user";
import {Colegio} from "../interfaces/colegio";
import {switchMap} from "rxjs/internal/operators";
import * as firebase from "firebase";
import {AsignacionAlumno} from "../interfaces/asignacionAlumno";
import {Grados} from "../interfaces/grado";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private angularFireAuth: AngularFireAuth) {

    }
    loginWithEmail(email: string, password: string) {
        return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
    }

    verify(){
        return this.angularFireAuth.auth.currentUser.sendEmailVerification();
    }

    register(email: string, password: string) {
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    getStatus() {
        return this.angularFireAuth.authState;
    }

    logout() {
        return this.angularFireAuth.auth.signOut();
    }
}
