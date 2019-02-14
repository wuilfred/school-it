import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {AngularFireDatabase} from "@angular/fire/database";

@Component({
    selector: 'app-materia',
    templateUrl: './materia.component.html',
    styleUrls: ['./materia.component.scss']
})
export class MateriaComponent implements OnInit {

    materia: string;
    descripcion: string;
    user;

    constructor(private db: AngularFireDatabase, private authService: AuthenticationService, private userService: UserService) {
        this.authService.getStatus().subscribe(
            (user) => {
                this.user = user.uid;
            }
        );
    }

    createM(){
        const mater = {
            'nombre': this.materia,
            'descripcion' : this.descripcion,
            'id_representante' : this.user,
            'id' : this.db.createPushId()
        };
        this.userService.createMateria(JSON.parse( JSON.stringify(mater))).then(
            (data)=>{
                console.log(`success ${data}`);
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        );
    }

    ngOnInit() {
    }

}
