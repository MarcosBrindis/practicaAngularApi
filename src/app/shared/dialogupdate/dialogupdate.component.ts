import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { Diete } from '../../models/diete';
import { DieteServiceService } from '../../services/diete-service.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


export interface DialogData {
  diete: Diete;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'Dialogupdate.Component',
  templateUrl: 'dialogupdate.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule
  ],
})
export class DialogupdateComponent {
  readonly dialogRef = inject(MatDialogRef<DialogupdateComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  // Aquí obtienes los datos actuales de la dieta que estás editando
  foods = this.data.diete.foods;
  calories = this.data.diete.calorias;
  food_type = this.data.diete.food_type;
  meal_time = this.data.diete.meal_time;
  portion_size = this.data.diete.portion_size;
  diet_rating = this.data.diete.diet_rating;
  created_by= 2;                    
  updated_by= 2 ;                  
  deleted= false;
  constructor(private dieteService: DieteServiceService) {}

  updateDiete(): void {
    const updatedDiete: Diete = {
      ...this.data.diete,
      foods: this.foods,
      calorias: this.calories,
      food_type: this.food_type,
      meal_time: this.meal_time,
      portion_size: this.portion_size,
      diet_rating: this.diet_rating,
      created_by: 2,    
      updated_by: 2,                  
      deleted: false
    };

  // Verificamos qué datos se están enviando para la actualización
  console.log('Updating diet with:', updatedDiete);

  this.dieteService.updateDiete(this.data.diete.diete_id!, updatedDiete).subscribe(
    (response) => {
      console.log('Diet updated successfully:', response);
      this.dialogRef.close(true); 
      this.dialogRef.close(updatedDiete); 
    },
    (error) => {
      console.error('Error updating diet:', error);
    }
  );

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}