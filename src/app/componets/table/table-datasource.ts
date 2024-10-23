import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, of as observableOf, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { Diete } from '../../models/diete';

export class TableDataSource extends DataSource<Diete> {
    data: Diete[] = [];
    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;
  
    constructor(initialData: Diete[]) {
      super();
      this.data = initialData;
    }
  
    connect(): Observable<Diete[]> {
      if (this.paginator && this.sort) {
        return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
          .pipe(map(() => this.getPagedData(this.getSortedData([...this.data]))));
      } else {
        return observableOf(this.data); 
      }
    }
  
    disconnect(): void {}
  
    private getPagedData(data: Diete[]): Diete[] {
      if (this.paginator) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.slice(startIndex, startIndex + this.paginator.pageSize);
      } else {
        return data;
      }
    }
  
    private getSortedData(data: Diete[]): Diete[] {
      if (!this.sort || !this.sort.active || this.sort.direction === '') {
        return data;
      }
      return data.sort((a, b) => {
        const isAsc = this.sort?.direction === 'asc';
        switch (this.sort?.active) {
          case 'foods': return compare(a.foods, b.foods, isAsc);
          case 'calorias': return compare(a.calorias!, b.calorias!, isAsc);
          case 'portion_size': return compare(a.portion_size, b.portion_size, isAsc);
          default: return 0;
        }
      });
    }
  }
  
  function compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }