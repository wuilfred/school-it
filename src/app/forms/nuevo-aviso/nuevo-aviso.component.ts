import {Component, OnInit,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {MatDialog} from "@angular/material";
import {FormControl, Validators} from '@angular/forms';
import { Grados } from "../../interfaces/grado";

@Component({
    selector: 'app-nuevo-aviso',
    templateUrl: './nuevo-aviso.component.html',
    styleUrls: ['./nuevo-aviso.component.scss']
})
export class NuevoAvisoComponent implements OnInit {

    titulo;
    user;
    descripcion;
    colegio;
    sede;
    object;
    info = [];
    DataAsigMaestro;
    grado : string;
    idGrado : string;
    teachers;
    degrees : Grados[];
    headquarters : any[];
    matters : any[];
    sections:  any[];
    status : number = 1;
    colid;

    gradeControl = new FormControl('', [Validators.required]);
    teacherControl = new FormControl('', [Validators.required]);
    matterControl = new FormControl('', [Validators.required]);
    sectionControl = new FormControl('', [Validators.required]);
    headquartersControl = new FormControl('', [Validators.required]);

    getIdColegio = localStorage.getItem('idinstitucion');

    constructor(private authService: AuthenticationService, private userService: UserService,
                private db: AngularFireDatabase,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any) {
                                                                                 
                this.authService.getStatus().subscribe(
                    (user)=>{
                        this.user = user;
                        this.userService.getColegioo(this.user.uid).valueChanges().subscribe(
                            (colegio: any[])=>{
                                colegio.forEach(
                                    (data)=>{
                                        this.colegio = data;
                                    }
                                );
                            }
                        );
                        
                        this.userService.checkIdSchool().then(response => {
                                
                                this.colid = this.userService.getGrado(response).valueChanges().subscribe(
                                    (grado: Grados[]) => {
                                        this.degrees = grado;
                                    }
                                );
                            }
                        );  

                        this.userService.getMaestrosA(this.getIdColegio).valueChanges().subscribe(
                            (asigMaestroColegio) => {
                              this.info = asigMaestroColegio;
                              this.info.forEach(
                                (data, key2) => {
                                  this.DataAsigMaestro = Object.keys(this.info[key2]).map(function(key) {
                                   return asigMaestroColegio[key2][key];
                                  });
                                  this.DataAsigMaestro.forEach(
                                    (rs) => {
                                      this.userService.getMaterias(rs.Id_colegio).valueChanges().subscribe(
                                        (materia) => {
                                          //console.log(materia)
                                          this.matters = materia;
                                        }
                                      );
                  
                                      this.userService.getMaestro(rs.Id_maestro).valueChanges().subscribe(
                                        (maestro) => {
                                            //console.log(maestro)
                                          this.teachers = [maestro];
                                        }
                                      );
                  
                                      this.userService.getSection(rs.Id_colegio).valueChanges().subscribe(
                                        (secciones) => {
                                          this.sections = secciones;
                                        }
                                      );
                  
                                      this.userService.getSede(rs.Id_colegio).valueChanges().subscribe(
                                        (sede) => {
                                           this.headquarters = sede;
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );    

                    }
                );
    }

    createAviso(){
        
        const aviso = {
                id:this.db.createPushId(),
                Content:this.descripcion,
                Grado:this.gradeControl.value.nombre,
                Id_colegio:this.colegio.id,
                Id_grado:this.gradeControl.value.id,
                Id_maestro:this.teacherControl.value.Id_maestro,
                Id_materia:'GENERAL',
                Id_representante:this.user.uid,
                Id_seccion:this.sectionControl.value.Id,
                Id_sede:this.headquartersControl.value.Id_colegio,
                Id_usuario:this.user.uid,
                IsVisible:false,
                Maestro:this.teacherControl.value.Nombre+" "+this.teacherControl.value.Apellido,
                Materia:'General',
                Seccion:this.sectionControl.value.Nombre,
                Sede:this.headquartersControl.value.Nombre,
                Status:this.status,
                Timestamp:Date.now(),
                Titulo: this.titulo
        }
        this.userService.createAviso(aviso).then(
            (success)=>{
                this.dialog.closeAll();
            }
        );
    }

    close(){
        this.dialog.closeAll();
    }

    ngOnInit() {
    }

}
