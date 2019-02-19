import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.scss']
})
export class DiarioComponent implements OnInit {

  grado: string;
  seccion: string;
  sede: string;
  materia: string;
  titulo: string;
  contenido: string;
  dataDiario: object;

  constructor() { }

  ngOnInit() {
  }

  createDiario()  {
    this.dataDiario = {
      'grado':      this.grado,
      'seccion':    this.seccion,
      'sede':       this.sede,
      'materia':    this.materia,
      'titulo':     this.titulo,
      'contenido':  this.contenido
    };
  }

}
