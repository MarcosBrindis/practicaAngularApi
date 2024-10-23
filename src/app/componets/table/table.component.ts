import { Component, AfterViewInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { TableDataSource } from './table-datasource';
import { Diete } from '../../models/diete';
import { TranslatorPipe } from './translator.pipe';
import { DecimalPipe, CommonModule } from '@angular/common';
import { DialogAnimationsExampleDialog } from '../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogupdateComponent } from '../../shared/dialogupdate/dialogupdate.component';


@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, CommonModule, TranslatorPipe, DecimalPipe,MatIcon,]
})
export class TableComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Diete>;
  dataSource!: TableDataSource; 
  @Input() dietes: Diete[] = [];


  displayedColumns: string[] = ['diete_id', 'foods', 'calorias', 'food_type', 'meal_time', 'portion_size', 'diet_rating','action'];

  constructor(private dialog: MatDialog) {} 

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dietes'] && this.dietes) {
      console.log('Dietes received in TableComponent:', this.dietes);
      
      // Inicializamos dataSource cada vez que llegan nuevos datos
      this.dataSource = new TableDataSource(this.dietes);

      // Actualizamos la paginación y ordenación
      if (this.paginator && this.sort) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      
      // Aseguramos que la tabla se renderiza correctamente
      if (this.table) {
        this.table.dataSource = this.dataSource;
        this.table.renderRows();
      }
    }
  }

  openDeleteDialog(diete: Diete): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: diete
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.dietes = this.dietes.filter(d => d.diete_id !== diete.diete_id); 
        this.dataSource = new TableDataSource(this.dietes); 
        this.table.renderRows(); 
      }
    });
  }

  
  openEditDialog(diete: Diete): void {
    const dialogRef = this.dialog.open(DialogupdateComponent, {
      width: '250px',
      data: { diete } // Pasamos el diete que se va a editar
    });
  
    dialogRef.afterClosed().subscribe((updatedDiete: Diete) => {
      if (updatedDiete) {
        console.log('Updated diet received from dialog:', updatedDiete);
        const index = this.dietes.findIndex(d => d.diete_id === updatedDiete.diete_id);
        if (index !== -1) {
          this.dietes[index] = updatedDiete;
          this.dataSource = new TableDataSource(this.dietes); // Refrescamos la tabla
          this.table.renderRows();
        }
      } else {
        console.log('No changes made.');
      }
    });
  }
  
}