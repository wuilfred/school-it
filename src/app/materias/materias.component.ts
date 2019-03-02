import {Component, OnInit} from '@angular/core';
import {GradoFormComponent} from "../forms/grado-form/grado-form.component";
import {MatDialog} from "@angular/material";
import {MateriaComponent} from "../forms/materia/materia.component";
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";

@Component({
    selector: 'app-materias',
    templateUrl: './materias.component.html',
    styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {

    title: string = 'Materias';
    materias;
    query: string = '';
    show: boolean;

    constructor(private authService: AuthenticationService, private userService: UserService, public dialog: MatDialog) {
        this.authService.getStatus().subscribe(
            (user)=>{
                this.userService.checkIdSchool().then(response => {
                    this.userService.getMaterias(response).valueChanges().subscribe(
                        (materias)=>{
                            console.log(materias);
                            this.materias = materias;
                        }
                    );
                });
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

    openDialog(): void {
        const dialogRef = this.dialog.open(MateriaComponent, {
            panelClass: ['modal-color1', 'modal-border'],
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('closed');
        });
    }

}
