import {Injectable} from '@angular/core';
import {take} from "rxjs/internal/operators";
import {AngularFireDatabase} from "@angular/fire/database";
import {ActivatedRoute} from "@angular/router";
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private angularFireDb: AngularFireDatabase,
                public activatedRoute: ActivatedRoute) {
    }

    resetPassword(email: string) {
        var auth = firebase.auth();
        return auth.sendPasswordResetEmail(email)
    }

    createUser(user){
        return this.angularFireDb.object(`representante_colegio/${user.uid}`).set(user);
    }

    createMateria(obj){
        return this.angularFireDb.object(`materia/${obj.id_representante}/${obj.id}`).set(obj);
    }

    createSchool(school){
        return this.angularFireDb.object(`colegio/${school.id_representante}/${school.id}`).set(school);
    }

    createSection(obj){
        return this.angularFireDb.object(`colegio/${obj.id_school}`).set(obj);
    }

    /* REMOVED: 05/02/2019 UNNECESSARY FUNCTION */
    // createSchoolList(school){
    //     return this.angularFireDb.object(`colegioList/${school.id}`).set(school);
    // }

    getMaterias(uid){
        return this.angularFireDb.list(`materia/${uid}`);
    }

    getSchoolList(){
        return this.angularFireDb.list(`colegioList`);
    }
    getSc(id){
        return this.angularFireDb.object(`colegioList/${id}`);
    }

    createMaster(master){
        return this.angularFireDb.object(`maestro/${master.uid}`).set(master);
    }

    getColegio(uid){
        return this.angularFireDb.object(`colegio/`);
    }
    getColegioo(uid){
        ///return this.angularFireDb.object(`colegio/${uid.user}/${uid.s}`);
        return this.angularFireDb.list(`colegio/${uid}`);

        ///return this.angularFireDb.list(`colegio/${uid}`, ref => ref.orderByChild('id_representante').equalTo(uid));
    }
    getColegios(uid){
        return this.angularFireDb.list(`colegio/${uid}`);
    }
    createSolicitud(avi){
        return this.angularFireDb.object(`solicitud/${avi.id_representante}/${avi.id_user}`).set(avi);
    }

    createTarea(obj){
        return this.angularFireDb.object(`tarea/${obj.colegio}/${obj.grado}/${obj.id}`).set(obj);
    }

    getUsersById(uid){
        return this.angularFireDb.object('/representante_colegio/'+uid);
    }

    getURole(uid){
        return this.angularFireDb.object(`/usuario/${uid}`);
    }

    role(obj){
        return this.angularFireDb.object(`usuario/${obj.Id_usuario}`).set(obj);
    }

    getMaestrosA(uid){
        return this.angularFireDb.list(`/asignacion_maestro_colegio/${uid}`);
    }
    getMaestro(uid){
        return this.angularFireDb.object(`maestro/${uid.id_maestro}`);
    }
    getMm(uid){
        return this.angularFireDb.object(`maestro/${uid}`);
    }
    getTutor(uid){
        return this.angularFireDb.object(`tutor/${uid}`);
    }
    getMList(uid){
        return this.angularFireDb.list(`maestro/${uid}`);
    }
    getMaestroo(uid){
        return this.angularFireDb.object(`maestro/${uid}`);
    }
    getSede(id){
        return this.angularFireDb.list(`sede_t/${id}`);
    }
    getMaestrosC(uid){
        return this.angularFireDb.list(`/maestro/`, ref => ref.child('id_colegio').equalTo(uid));
    }
    getMaestroD(uid){
        return this.angularFireDb.list('maestro/'+uid.id_maestro);
    }

    createGrado(grd){
        return this.angularFireDb.object(`grado/${grd.id_representante}/${grd.id}`).set(grd);
    }

    getUserByIdd(uid){
        return this.angularFireDb.list(`/representante_colegio/${uid}`);
    }
    getGrado(uid){
        return this.angularFireDb.list(`grado/${uid}`);
    }
    getAlumnos(uid){
        return this.angularFireDb.list(`alumno/${uid}`);
    }
    getAlumno(u){
        return this.angularFireDb.object(`alumno/${u.idt}/${u.uid}`);
    }

    getAlm(obj){
        return this.angularFireDb.object(`alumno/${obj.id}/${obj.id_alumno}`);
    }

    updateAlm(obj){
        return this.angularFireDb.object(`alumno/${obj.id}/${obj.id_alumno}`).update({id_colegio: obj.id_colegio});
    }

    updateGAlm(obj){
        return this.angularFireDb.object(`alumno/${obj.id}/${obj.id_alumno}`).update({id_grado: obj.id_grado});
    }

    getTareas(id){
        return this.angularFireDb.list(`tarea/${id.colegio}/${id.grado}`);
    }
    getMasters(obj){
        return this.angularFireDb.list(`asignacion_maestro_colegio/${obj}`);
    }
    getSolicitudes(uid){
        return this.angularFireDb.list(`solicitud/${uid}`/*, ref => ref.orderByChild('state').equalTo('pendiente')*/);
    }

    deleteSolicitud(uid){
        return this.angularFireDb.object(`solicitud/${uid.uid}/${uid.s}`).remove();
    }

    createAsign(obj){
        return this.angularFireDb.object(`asignacion_${obj.role}_colegio/${obj.id_representante}/${obj.id_user}`).set(obj);
    }

    createTutor(obj){
        return this.angularFireDb.object(`tutor/${obj.uid}`).set(obj);
    }

    asignMGrado(obj){
        return this.angularFireDb.object(`asignacion_maestro_grado/${obj.id_representante}/${obj.id_grado}/${obj.id_maestro}`).set(obj);
    }

    asignAGrado(obj){
        return this.angularFireDb.object(`asignacion_alumno_grado/${obj.id_representante}/${obj.id_grado}/${obj.id_alumno}`).set(obj);
    }

    asignMGList(obj){
        return this.angularFireDb.object(`ListAsignM/${obj.id_maestro}/${obj.id_grado}`).set(obj);
    }

    updateAssignState(obj){
        return this.angularFireDb.object(`solicitud/${obj.uid}/${obj.id_solicitud}`).update(obj);
    }

    getMastersG(obj){
        return this.angularFireDb.list(`asignacion_maestro_grado/${obj.uid}/${obj.grd}`);
    }

    getAlumnosG(obj){
        return this.angularFireDb.list(`asignacion_alumno_grado/${obj.uid}/${obj.grd}`);
    }

    createAlumno(obj){
        return this.angularFireDb.object(`alumno/${obj.id_tutor}/${obj.id_alumno}`).set(obj);
    }

    getGM(uid){
        return this.angularFireDb.list(`ListAsignM/${uid}`);
    }

    getDiario(obj){
        return this.angularFireDb.list(`diario/${obj.colegio}/${obj.grado}`, ref => ref.orderByPriority());
    }

    createDiario(obj){
        return this.angularFireDb.object(`diario/${obj.colegio}/${obj.grado}/${obj.id}`).set(obj);
    }

    createAviso(obj){
        return this.angularFireDb.object(`aviso/${obj.colegio}/${obj.id}`).set(obj);
    }
    getAvisos(obj){
        return this.angularFireDb.list(`aviso/${obj}`);
    }

    getAllAlumnos(uid){
        return this.angularFireDb.list(`asignacion_alumno_colegio/${uid}`);
    }

    getSGrado(obj){
        return this.angularFireDb.object(`grado/${obj.uid}/${obj.grd}`);
    }

    /**/
    updateInformation (data) {
        return this.angularFireDb.object(`maestros/${data.uid}`).set(data);
    }

}
