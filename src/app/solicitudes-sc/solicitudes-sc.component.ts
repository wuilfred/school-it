import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";
import {Colegio} from "../interfaces/colegio";
import {Role} from "../interfaces/role";
import {Maestro} from "../interfaces/maestro";

@Component({
    selector: 'app-solicitudes-sc',
    templateUrl: './solicitudes-sc.component.html',
    styleUrls: ['./solicitudes-sc.component.scss']
})
export class SolicitudesScComponent implements OnInit {



    colegio: Colegio[];
    nombreM;
    show;
    title;
    roleM;
    idM;
    query: string = '';


    constructor(private sService: UserService, private auth: AuthenticationService) {
        this.sService.getSchoolList().valueChanges().subscribe(
            (colegio: Colegio[])=>{
                this.colegio = colegio;
                console.log(colegio);
            }
        );
    }

    Solicitud(s){
        this.auth.getStatus().subscribe(
            (user)=>{
                this.sService.getURole(user.uid).valueChanges().subscribe(
                    (role: Role)=>{
                        if(role.Tipo = 'maestro'){
                            this.sService.getMm(user.uid).valueChanges().subscribe(
                                (userr: Maestro) => {
                                    console.log(`role`, userr);
                                    this.idM = userr.uid;
                                    this.roleM = role.Tipo; //userr.Role;
                                    const nom = [userr.nombre, userr.apellido];
                                    this.nombreM = nom.join(' ');
                                    const solicitud = {
                                        'id_user' : user.uid,
                                        'nombre' : this.nombreM,
                                        'id_colegio' : s.Id,
                                        'id_representante': s.Id_representante,
                                        'role' : this.roleM
                                    }
                                    console.log('Data solicitud', solicitud);
                                    this.sService.createSolicitud(solicitud).then(
                                        (solicitudd)=>{
                                            console.log('todo bien todo correcto');
                                        }
                                    )
                                }
                            );
                        }
                    }
                );
            }
        );
    }

    searchT() {
        this.show = !this.show;
        if (this.show) {
            this.show = true;
        } else {
            this.show = false;
        }
    }

    ngOnInit() {
    }

}
