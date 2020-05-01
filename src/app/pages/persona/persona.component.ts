import { switchMap } from 'rxjs/operators';
import { PersonaDialogoComponent } from './persona-dialogo/persona-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { PersonaService } from './../../_service/persona.service';
import { Persona } from './../../_model/persona';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  displayedColumns = ['idpersona', 'nombres', 'apellidos', 'acciones'];
  dataSource: MatTableDataSource<Persona>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private personaService: PersonaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.personaService.personaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.personaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.personaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();

  }

  abrirDialogo(persona?: Persona){
    let per = persona != null ? persona : new Persona();
    this.dialog.open(PersonaDialogoComponent, {
      width: '250px',
      data: per
    });

  }

  eliminar(persona: Persona){
    this.personaService.eliminar(persona.idPersona).pipe(switchMap( () => {
      return this.personaService.listar();
    })).subscribe(data => {
      this.personaService.personaCambio.next(data);
      this.personaService.mensajeCambio.next('SE ELIMINO');
    });

  }

}
