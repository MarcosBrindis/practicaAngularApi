import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router'; 
import { DieteServiceService } from '../../services/diete-service.service'; 
import { Diete } from '../../models/diete';

@Component({
  selector: 'app-create-meal',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.scss'],
})
export class CreateMealComponent {
  mealForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private dieteService: DieteServiceService) {
    this.mealForm = this.fb.group({
      foods: ['', Validators.required],
      food_type: ['', Validators.required],
      meal_time: ['', Validators.required],
      portion_size: ['', [Validators.required, Validators.min(1)]],
      calorias: ['', [Validators.required, Validators.min(0)]],
      diet_rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]]
    });
  }

  createMeal() {
    if (this.mealForm.valid) {
      const newDiete: Diete = {
        ...this.mealForm.value,   
        created_by: 2,            
        updated_by: 2,            
        deleted: false            
      };
      console.log('Datos a enviar:', newDiete);
      this.dieteService.createDiete(newDiete).subscribe(
        (response) => {
          console.log('Dieta creada exitosamente:', response);
          this.goHome(); // Navega a la página principal después de crear la dieta
        },
        (error) => {
          console.error('Error al crear la dieta:', error);
        }
      );
    } else {
      console.warn('El formulario no es válido');
    }
  }

  goHome() {
    this.router.navigate(['']);
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
