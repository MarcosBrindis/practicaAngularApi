import { Component, inject, Input,SimpleChanges,OnChanges  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // 
import { TableComponent } from "../../componets/table/table.component";
import { AppComponent } from '../../app.component';
import { Diete } from '../../models/diete';
import { ButtonComponent } from '../../shared/button/button.component';
@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrl: './navegation.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    TableComponent,
    AppComponent,
    CommonModule,
    ButtonComponent
]
})
export class NavegationComponent implements OnChanges  {
  @Input() dietes: Diete[] = [];
  private breakpointObserver = inject(BreakpointObserver);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dietes']) {
      console.log('Dietes received in NavegationComponent:', this.dietes);
    }
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
