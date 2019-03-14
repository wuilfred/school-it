import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import { TareasComponent } from '../forms/tareas/tareas.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {

  title: String = 'Tareas';
  user;
  tarea;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private userService: UserService
  ) {
      const idinstitucion = localStorage.getItem('idinstitucion');
      this.authService.getStatus().subscribe(
        (user) => {
          this.userService.getTareas(idinstitucion).valueChanges().subscribe(
            (tarea: any[]) => {
              console.log(tarea);
              this.tarea = tarea;
            }
          );
        }
      );
  }

  ngOnInit() {
  }

  openDialogTarea(): void {
    const dialogRef = this.dialog.open(TareasComponent, {
        panelClass: ['modal-color1']
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('closed');
    });

}

}
