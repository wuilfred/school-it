import {Component, OnInit} from '@angular/core';
import {Colegio} from "../interfaces/colegio";
import {UserService} from "../services/user.service";
import {NuevoAlumnoComponent} from "../forms/nuevo-alumno/nuevo-alumno.component";
import {MatDialog} from "@angular/material";
import {ColegioSolicitudComponent} from "../forms/colegio-solicitud/colegio-solicitud.component";

@Component({
    selector: 'app-colegios-lista',
    templateUrl: './colegios-lista.component.html',
    styleUrls: ['./colegios-lista.component.scss']
})
export class ColegiosListaComponent implements OnInit {

    colegio;
    query: string = '';
    show: boolean;

    constructor(private sService: UserService, private dialog: MatDialog) {
        this.sService.getSchoolList().valueChanges().subscribe(
            (colegio: Colegio[])=>{
                this.colegio = colegio;
                console.log(colegio);
            }
        );
    }

    verColegio(colegio): void {
        const dialogRef = this.dialog.open(ColegioSolicitudComponent, {
            panelClass: ['modal-color1'],
            data: colegio
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('closed');
        });
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
