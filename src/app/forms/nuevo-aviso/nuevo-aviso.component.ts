import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {MatDialog} from "@angular/material";

@Component({
    selector: 'app-nuevo-aviso',
    templateUrl: './nuevo-aviso.component.html',
    styleUrls: ['./nuevo-aviso.component.scss']
})
export class NuevoAvisoComponent implements OnInit {

    titulo;
    user;
    descripcion;
    colegio;

    constructor(private authService: AuthenticationService, private userService: UserService,
                private db: AngularFireDatabase,
                public dialog: MatDialog) {
        this.authService.getStatus().subscribe(
            (user)=>{
                this.user = user;
                this.userService.getColegioo(this.user.uid).valueChanges().subscribe(
                    (colegio: any[])=>{
                        colegio.forEach(
                            (data)=>{
                                this.colegio = data;
                            }
                        );
                    }
                );
            }
        );
    }

    createAviso(){
        const aviso = {
            'created': Date.now(),
            'id': this.db.createPushId(),
            'titulo': this.titulo,
            'descripcion': this.descripcion,
            'colegio': this.colegio.id,
            'creator': this.user.uid
        }
        this.userService.createAviso(aviso).then(
            (success)=>{
                this.dialog.closeAll();
            }
        );
    }

    close(){
        this.dialog.closeAll();
    }

    ngOnInit() {
    }

}
