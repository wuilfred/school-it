import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Grados} from "../interfaces/grado";
import {MatDialog} from "@angular/material";
import {GradoFormComponent} from "../forms/grado-form/grado-form.component";
import {User} from "../interfaces/user";
import {Colegio} from "../interfaces/colegio";
import {AuthenticationService} from "../services/authentication.service";

@Component({
    selector: 'app-grados',
    templateUrl: './grados.component.html',
    styleUrls: ['./grados.component.scss']
})
export class GradosComponent implements OnInit {
    grados: Grados[];
    title: string = 'Grados';
    colid;
    show: boolean;
    query;
    d;

    constructor(public userService: UserService,
                private authService: AuthenticationService,
                public dialog: MatDialog) {
        this.userService.checkIdSchool().then(response => {
                this.colid = this.userService.getGrado(response).valueChanges().subscribe(
                    (grado: Grados[]) => {
                        this.grados = grado;
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

    openDialog(): void {
        const dialogRef = this.dialog.open(GradoFormComponent, {
            panelClass: ['modal-border', 'modal-color1'],
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('closed');
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        ///console.log('grados destoryed');
        ///this.colid.unsubscribe();
    }

}
