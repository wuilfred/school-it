import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {MatDialog} from "@angular/material";
import { ColegioSolicitudComponent } from '../colegio-solicitud/colegio-solicitud.component';

@Component({
  selector: 'app-seccion-form',
  templateUrl: './seccion-form.component.html',
  styleUrls: ['./seccion-form.component.scss']
})
export class SeccionFormComponent implements OnInit {

    nombre: string;
    descripcion : string;
    r;
    status : number = 1;
    colegio;
    sub;

    constructor(private db: AngularFireDatabase,
                private auth: AuthenticationService,
                private userService: UserService,
                public dialog: MatDialog) {
        this.auth.getStatus().subscribe(
            (user)=>{
                this.r = user;
                /*this.userService.getColegioo(this.r.uid).valueChanges().subscribe(
                    (colegio: any[])=>{
                        colegio.forEach(
                            (data)=>{
                                this.colegio = data;
                            }
                        );
                    }
                );*/
                this.userService.checkIdSchool().then(response => {
                    this.colegio = response;
                });
            }
        );
    }

    createSection(){
        //create object for send it
        const section = {
            Id:this.db.createPushId(),
            Descripcion:this.descripcion
            ,Id_colegio: this.colegio
            ,Id_representante:this.r.uid
            ,Id_usuario:this.r.uid
            ,Nombre:this.nombre
            ,Status:"1"
            ,Timestamp: Date.now()
        }

        this.userService.createSection(section).then(
            (data) => {
                this.dialog.closeAll();
            }
        ).catch(
            error =>{
                console.log(`error al crear secciones ${error}`);
            }
        );



    }
    close(){
        this.dialog.closeAll();
    }
    ngOnInit() {
    }

}
