import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LocationStrategy} from "@angular/common";
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-end-component',
    templateUrl: './end-component.component.html',
    styleUrls: ['./end-component.component.scss']
})
export class EndComponentComponent implements OnInit {
    title: string = 'Avisos';
    alumnoId;
    aviso : any[];
    sub;
    colegio;

    constructor(private url: LocationStrategy,
                private activatedRoute: ActivatedRoute,
                private authService: AuthenticationService,
                private userService: UserService) {
        this.sub = this.authService.getStatus().subscribe(
            (user) => {
                this.userService.getColegioo(user.uid).valueChanges().subscribe(
                    (colegio: any[])=>{
                        colegio.forEach(
                            (data)=>{
                                this.userService.getAvisos(data.id).valueChanges().subscribe(
                                    (aviso) => {
                                        aviso.forEach(function(value,key){
                                            this.aviso = this.returnArray(value);
                                          }.bind(this));
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        console.log('grados destoryed');
        this.sub.unsubscribe();
    }

    returnArray(array){
        var temp = [];
          for (let prop in array) {
            temp.push(array[prop]);
          };
          console.log(temp);
          return temp;
    } 

}
