import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.scss']
})
export class SedeComponent implements OnInit {

  sede: any;
  nombre: string;
  departamento: string;
  municipio: string;
  zona: string;
  direccion: string;
  telefono: string;
  correo: string;
  horario: string;
  status: string;
  grados: string;

  constructor() { }

  createSede() {
    const dataSede = {
      'nombre':       this.nombre === undefined ? 'campo vacio!' : this.nombre,
      'departamento': this.departamento,
      'municipio':    this.municipio,
      'zona':         this.zona,
      'direccion':    this.direccion,
      'telefono':     this.telefono,
      'correo':       this.correo,
      'horario':      this.horario
      //'Id_representante': id_representante1,
      //'id_colegio': id_colegio,
      //'status': this.status,
      //'Timestamp': this.timestamp
    }
    console.log(dataSede);
  }
  ngOnInit() {
  }
}
