import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maestro-form',
  templateUrl: './maestro-form.component.html',
  styleUrls: ['./maestro-form.component.scss']
})
export class MaestroFormComponent implements OnInit {

  nombre:     string;
  grado:      string;
  edad:       string;
  educacion:  string;

  constructor() { }

  ngOnInit() {
  }

  createMaestro() {

  }

}
