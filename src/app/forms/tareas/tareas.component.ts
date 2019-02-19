import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {

  grado:        string;
  seccion:      string;
  sede:         string;
  materia:      string;
  titulo:       string;
  contenido: string;
  valor:        string;
  fecha_start:  string;
  fecha_end:    string;
  maestro:      string;
  estado:       string;
  dataTarea: object;

  constructor() { }

  ngOnInit() {
  }

  createTarea() {
    this.dataTarea = {
      'grado': this.grado,
      'seccion': this.seccion,
      'materia': this.materia,
      'titulo': this.titulo,
      'contenido': this.contenido,
      'valor': this.valor,
      'fecha_start': this.fecha_start,
      'fecha_end': this.fecha_end,
      'maestro': this.maestro,
      'estado': this.estado
    };
    console.log(this.dataTarea);
  }
}
