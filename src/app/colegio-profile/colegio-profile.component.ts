import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {User} from "../interfaces/user";
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-colegio-profile',
    templateUrl: './colegio-profile.component.html',
    styleUrls: ['./colegio-profile.component.scss'],
    providers: [DataService]
})
export class SchoolProfileComponent implements OnInit {

    title: string = 'Perfil de colegio';
    user: User[];

    constructor(private authService: AuthenticationService,
                private userService: UserService,
                public dataService: DataService,
                private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(paramsId => {
                console.log('Paramas parameters get', paramsId);
                this.userService.getInstiById(paramsId.uid).valueChanges().subscribe(
                    (data: User[])=>{
                        this.user = data;
                    }

                );
            }
        );
    }

    getIdInstitucion () {
        // console.log('Data service is: ' , local.storage.get('datauser'));
        let myItem = localStorage.getItem('idinstitucion');
        console.log('Id Institu: ', myItem);
        return this.dataService.institucionId;
    }

    ngOnInit() {
    }

}
