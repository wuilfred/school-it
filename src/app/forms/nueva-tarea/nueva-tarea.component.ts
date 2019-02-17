import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {Maestro} from "../../interfaces/maestro";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {AngularFireDatabase} from "@angular/fire/database";

@Component({
    selector: 'app-nueva-tarea',
    templateUrl: './nueva-tarea.component.html',
    styleUrls: ['./nueva-tarea.component.scss']
})
export class NuevaTareaComponent implements OnInit {

    titulo;
    descripcion;
    materia;
    fechaEntrega;
    master;
    materias;
    sub;
    subm;
    subu;
    punteo;

    constructor(private auth: AuthenticationService, private userService: UserService,
                @Inject(MAT_DIALOG_DATA) public data:any,
                private db: AngularFireDatabase,
                private dialog: MatDialog) {
        this.subu = this.auth.getStatus().subscribe(
            (user)=>{
                this.sub = this.userService.getMm(user.uid).valueChanges().subscribe(
                    (maestro: Maestro)=>{
                        this.master = maestro;
                    }
                );
                this.subm = this.userService.getMaterias(this.data.uid).valueChanges().subscribe(
                    (materias) => {
                        console.log(materias);
                        this.materias = materias;
                    }
                );
            }
        );
    }

    createTarea() {
        const tarea = {
            'titulo': this.titulo,
            'materia': this.materia,
            'id': this.db.createPushId(),
            'punteo': this.punteo,
            'fechaEntrega' : this.fechaEntrega,
            'creator': this.master.nombre,
            'colegio': this.data.uid,
            'grado': this.data.grd,
            'descripcion' : this.descripcion,
            'timestamp' : Date.now()
        };
        this.userService.createTarea(tarea).then(
            (tarea) => {
                console.log('tarea hecha');
                this.dialog.closeAll();
            }
        );
    }

    ngOnInit() {
    }
    ngOnDestroy(){
        this.sub.unsubscribe();
        this.subm.unsubscribe();
        this.subu.unsubscribe();
    }

}
