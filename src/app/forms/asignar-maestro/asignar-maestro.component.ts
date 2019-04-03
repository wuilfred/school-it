import {Component, Inject, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Grados} from "../../interfaces/grado";
import {Maestro} from "../../interfaces/maestro";
import {User} from "../../interfaces/user";

@Component({
    selector: 'app-asignar-maestro',
    templateUrl: './asignar-maestro.component.html',
    styleUrls: ['./asignar-maestro.component.scss']
})
export class AsignarMaestroComponent implements OnInit {
    idm: Maestro;
    ty;
    user;
    grados: Grados[];
    iddd;
    asd;

    constructor(private routeD: ActivatedRoute,
                @Inject(MAT_DIALOG_DATA) public data:Maestro,
                private authService: AuthenticationService,
                private userService: UserService) {
        console.log(data);
        this.idm = data;
        this.authService.getStatus().subscribe(
            (user)=>{
                this.user = user;
                this.userService.getGrado(user.uid).valueChanges().subscribe(
                    (grados: Grados[])=>{
                        this.grados = grados;
                    }
                );
                this.userService.getUsersById(user.uid).valueChanges().subscribe(
                    (b: User)=>{
                        this.ty = b;
                    }
                );
            }
        );
    }

    ert(d){
        console.log(JSON.stringify(d));
        this.iddd = d;
        const g = {
            'uid': this.user.uid,
            'grd': this.iddd
        };
        this.userService.getSGrado(g).valueChanges().subscribe(
            (data: Grados)=>{
                console.log(data);
                this.asd = data.Nombre;
            }
        );
    }

    AssignMG(dd){
        if(dd != null){
            const name = [this.data.Nombre, this.data.Apellido];
            const ll = name.join(' ');
            const asignacion = {
                'id_maestro' : this.data.uid,
                'id_grado' : dd,
                'nombre' : ll,
                'nombreGrado': this.asd,
                'id_representante': this.user.uid
            }
            this.userService.asignMGrado(asignacion).then(
                (data)=>{
                    this.userService.asignMGList(asignacion).then(
                        a => {
                            console.log('exito');
                        }
                    )
                }
            );
        }
    }

    ngOnInit() {
    }

}
