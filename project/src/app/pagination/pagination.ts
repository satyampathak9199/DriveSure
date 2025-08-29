

// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// @Component({
//   selector: 'app-pagination',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './pagination.html',
//   styleUrls: ['./pagination.css']
// })
// export class Pagination implements OnInit {
//   @Input() totalItems= 0;
//   @Input() itemsPerPage=5;
//   @Input() currentPage =1;
// @Output() changePage:EventEmitter<number>=new EventEmitter<number>() ;
// totalPages=10;
// pages: number[] = [];
//   clientList: any[] = [];
// constructor() {}

//   ngOnInit(): void {
//     if (this.totalItems ) {
//       this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
//       this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
//     }
//   }
// pageClicked(page:number):void{
//    if(this.currentPage){
//     this.currentPage= page
//     this.changePage.emit(this.currentPage);
//   }
// }

// }

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, SimpleChanges, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css']
})
export class Pagination implements OnChanges {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 5;
  @Input() currentPage = 1;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();

  totalPages = 0;
  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.updatePagination();
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) || 1;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  pageClicked(page: number): void {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.changePage.emit(page);
    }
  }

}

