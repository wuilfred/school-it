import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {AngularFireDatabase} from "@angular/fire/database";
import {Maestro} from "../../interfaces/maestro";

@Component({
    selector: 'app-nuevo-diario',
    templateUrl: './nuevo-diario.component.html',
    styleUrls: ['./nuevo-diario.component.scss']
})
export class NuevoDiarioComponent implements OnInit {

    titulo;
    descripcion;
    master;

    constructor(private auth: AuthenticationService, private userService: UserService,
                @Inject(MAT_DIALOG_DATA) public data: any, private db: AngularFireDatabase,
                private dialog: MatDialog) {
        this.auth.getStatus().subscribe(
            (user) => {
                this.userService.getMm(user.uid).valueChanges().subscribe(
                    (maestro: Maestro)=>{
                        this.master = maestro;
                    }
                );
            }
        );
    }

    createDiario() {
        const data = {
            'titulo': this.titulo,
            'creator': this.master.nombre,
            'creatorid': this.master.uid,
            'descripcion': this.descripcion,
            'grado': this.data.grd,
            'colegio': this.data.uid,
            'creado': Date.now(),
            'id': this.db.createPushId()
        };
        this.userService.createDiario(data).then();
    }

    ngOnInit() {
    }

}
