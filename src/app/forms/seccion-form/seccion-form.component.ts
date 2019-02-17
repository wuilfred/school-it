import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {MatDialog} from "@angular/material";
import {Colegio} from "../../interfaces/colegio";

@Component({
  selector: 'app-seccion-form',
  templateUrl: './seccion-form.component.html',
  styleUrls: ['./seccion-form.component.scss']
})
export class SeccionFormComponent implements OnInit {

    nombre: string;
    descripcion : string;
    r;
    status = 1;
    colegio;
    sub;

    constructor(private db: AngularFireDatabase, 
                private auth: AuthenticationService, 
                private userService: UserService,
                public dialog: MatDialog) {
        this.auth.getStatus().subscribe(
            (user)=>{
                this.r = user.uid;

            }
        );
    }

    crearSeccion(){
        //create object for send it 
        const section = {
            Descripcion:this.descripcion
            ,Id_colegio:''
            ,Id_representante:this.r
            ,Id_usuario:this.r
            ,Nombre:this.nombre
            ,Status:this.status
            ,Timestamp: ''
        }

        this.userService.createSection(section).then(
            (data) => {
                
                //this.router.navigate(['inicio']);
            }
        ).catch(
            error =>{
                console.log(`error al crear colegio ${error}`);
            }
        );

        
        
    }
    close(){
        this.dialog.closeAll();
    }
    ngOnInit() {
    }

}
