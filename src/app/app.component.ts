import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavegationComponent } from './pages/navegation/navegation.component';
import { DieteServiceService } from './services/diete-service.service';
import { Diete } from './models/diete';
import { CreateMealComponent } from './pages/create-meal/create-meal.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavegationComponent,CreateMealComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dieta_aplication';
  dietes: Diete[] = []; // Ajusta el nombre a 'dietes' para consistencia
  selectedDiete: Diete | null = null; 

  constructor(private dieteService: DieteServiceService) {}

  ngOnInit(): void {
    this.getDietes();
  }

  getDietes(): void {
    this.dieteService.getDietes().subscribe(
      data => {
        this.dietes = data;
        console.log(this.dietes);
      },
      error => {
        console.error('Error fetching diet data', error);
      }
    );
  }


  searchDieteById(id: number): void {
    this.dieteService.getDieteById(id).subscribe(
      data => {
        this.selectedDiete = data;
        this.dietes = data ? [data] : [];
        console.log(this.selectedDiete);
      },
      error => {
        console.error(`Error fetching diet with ID ${id}`, error);
      }
    );
  }
}
 
