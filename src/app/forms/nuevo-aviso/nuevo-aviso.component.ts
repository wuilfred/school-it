import {Component, OnInit,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
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
    sede;
    object;
    grado : string;
    idGrado : string;

    constructor(private authService: AuthenticationService, private userService: UserService,
                private db: AngularFireDatabase,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any) {
                
                // information of the object sent             
                console.log('object data', data);                                              
                this.object = data;     
                this.grado = data.Grado;
                this.idGrado = data.idGrado;
                this.sede = data.sede                                                                                                   
                
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
        this.sede = "-LZL2jsoMImuW9oxLIXS";
        const aviso = {
                'Id':this.db.createPushId(),
                'Content':this.descripcion,
                'Grado':this.grado,
                'Id_colegio':this.colegio.id,
                'Id_grado':this.idGrado,
                'Id_maestro':'',
                'Id_materia':'GENERAL',
                'Id_representante':this.user.uid,
                'Id_seccion':'',
                'Id_sede':this.sede,
                'Id_usuario':this.user.uid,
                'IsVisible':false,
                'Maestro':'',
                'Materia':'General',
                'Seccion':'',
                'Sede':'',
                'Status':"1",
                'Timestamp':Date.now(),
                'Titulo': this.titulo
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
