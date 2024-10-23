import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DieteServiceService } from '../../services/diete-service.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';


export class DialogComponent {
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'dialog-animation',
  templateUrl: 'dialog-animation.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dieteService: DieteServiceService
  ) {}

  deleteDiete(): void {
    this.dieteService.deleteDiete(this.data.diete_id).subscribe(() => {
      this.dialogRef.close(true); // Cierra el diálogo y envía un resultado de éxito
    }, error => {
      console.error('Error deleting diet:', error);
    });
  }
}