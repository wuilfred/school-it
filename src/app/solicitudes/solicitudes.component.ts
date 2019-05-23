import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";

@Component({
    selector: 'app-solicitudes',
    templateUrl: './solicitudes.component.html',
    styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

    title: string = 'Solicitudes';
    query: string = '';
    show: boolean;
    solicitud;
    sub;
    ss;
    uid;
    q;
    info=[];
DataDiario;
    constructor(private userService: UserService,
                private authService: AuthenticationService) {
                  const idinstitucion = localStorage.getItem('idinstitucion');
                  this.authService.getStatus().subscribe(
                    (user) => {
                        this.userService.getSolicitudes(idinstitucion).valueChanges().subscribe(
                          (diario) => {
                            this.info = diario;
                            diario.forEach(
                              (data, key) => {
                                this.DataDiario = Object.keys(this.info[key]).map(function(key2) {
                                  return diario[key][key2];
                                 });
                                 this.solicitud = this.DataDiario;
                              }
                            );
                          }
                        );
                    }
                  );

    }

    delete(dd){
        const d = {
            'uid': this.uid,
            's': dd
        };
        this.userService.deleteSolicitud(d).then(
            (d)=>{
                console.log(d);
            }
        );

    }

    assign(asi){
        asi.Status_solicitud = "aceptado";
        asi.Status = "1";
        this.userService.createAsign(asi).then(
            (s)=>{
                //console.log(s);



                if(asi.Tipo_usuario == 'alumno'){
                    const alumnoRoute = {
                        // 'Rand': this.db.createPushId(),
                        'Id': asi.Id_t,
                        'Id_colegio': this.uid,
                        'Id_alumno': asi.Id_user,
                    }
                    this.userService.updateAlm(alumnoRoute).then(
                        (alumno)=>{
                          //  console.log('updated');
                        }
                    );
                }






            }
        ).catch(
            (error)=>{
                console.log('error');
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
    ngOnDestroy(){
        console.log('destroyed');
        ///this.sub.unsubscribe();
    }

}
