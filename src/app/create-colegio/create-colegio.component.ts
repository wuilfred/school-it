import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {AngularFireDatabase} from "@angular/fire/database";

@Component({
    selector: 'app-create-colegio',
    templateUrl: './create-colegio.component.html',
    styleUrls: ['./create-colegio.component.scss']
})
export class CreateColegioComponent implements OnInit {

    Nombre_comercial: string;
    Nombre_legal: string;
    Web: string;
    Correo: string;
    Mision: string;
    Vision: string;
    Direccion_central: string;
    Telefono: string;
    Horario_central: string;
    Departamento: string;
    Municipio: string;
    u;
    sub;
    Foto;
    status;
    Zona;
    timestamp;

    constructor( private db: AngularFireDatabase,
                 public us: UserService, public auth: AuthenticationService, public router: Router) {
        this.sub = this.auth.getStatus().subscribe(
            (user) => {
                this.u = user.uid;
            }
        );
    }

    createColegio(){
        const colegio = {
            Id: this.db.createPushId(),
            Id_representante: this.u,
            Nombre_legal: this.Nombre_legal,
            Nombre_comercial: this.Nombre_comercial,
            Correo: this.Correo,
            Telefono: this.Telefono,
            Direccion_central: this.Direccion_central,
            Zona: this.Zona,
            Departamento: this.Departamento,
            Municipio: this.Municipio,
            Mision: this.Mision,
            Horario_central: this.Horario_central,
            Vision: this.Vision,
            Web: this.Web,
            Url_foto: this.Foto,
            status: this.status,
            Timestamp: this.timestamp
        };
        this.us.createSchool(colegio).then(
            (data) => {
                console.log(data);
                // this.us.createSchoolList(colegio).then(
                //     list=>{
                        // console.log(`agregado a la lista ${list}`);
                //     }
                // ).catch(
                //     (err)=>{
                //         console.log(err);
                //     }
                // );
                this.router.navigate(['inicio']);
            }
        ).catch(
            error =>{
                console.log(`error al crear colegio ${error}`);
            }
        );
    }

    ngOnInit() {
    }
    ngOnDestroy(){
        this.sub.unsubscribe();
    }

}
