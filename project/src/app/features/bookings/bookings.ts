

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './bookings.html',
  styleUrls: ['./bookings.css']
})
export class Bookings implements OnInit {
  bookingService = inject(BookingService);
  router = inject(Router);

  bookings: any[] = [];

  // UI states
  currentPage: number = 1;
  itemsPerPage: number = 5;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';
  statusFilter: string = 'All';   // ✅ New filter

  ngOnInit() {
    this.fetchBookings();
  }

  fetchBookings() {
    this.bookingService.getClients().subscribe(data => {
      this.bookings = data;
    });
  }

  updateClient(id: string) {
    this.router.navigate(['/bookings', id]);
  }
    updateStatus(client: any) {
  this.bookingService.updateClient(client._id, { status: client.status }).subscribe({
    next: (updated) => {
      console.log('Status updated:', updated);
    },
    error: (err) => {
      console.error('Error updating status:', err);
    }
  });
}

  // Delete a booking and refresh table
  deleteBooking(id: string) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteClient(id).subscribe({
        next: () => {
          this.bookings = this.bookings.filter(b => b._id !== id);
        },
        error: (err) => console.error('Error deleting booking:', err)
      });
    }
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  // ✅ Combined filter + search + sort + paginate
  get sortedPaginatedBookings() {
    // Step 1: Search filter
    let filtered = this.bookings.filter(client => {
      const term = this.searchTerm.toLowerCase();
      return (
        client.name?.toLowerCase().includes(term) ||
        client.email?.toLowerCase().includes(term)
      );
    });

    // Step 2: Status filter
    if (this.statusFilter !== 'All') {
      filtered = filtered.filter(c => c.status === this.statusFilter);
    }

    // Step 3: Sort
    if (this.sortColumn) {
      filtered.sort((a, b) => {
        const valueA = a[this.sortColumn]?.toString().toLowerCase() || '';
        const valueB = b[this.sortColumn]?.toString().toLowerCase() || '';
        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Step 4: Paginate
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(
      this.bookings.filter(client => {
        const term = this.searchTerm.toLowerCase();
        const matchesSearch =
          client.name?.toLowerCase().includes(term) ||
          client.email?.toLowerCase().includes(term);

        const matchesStatus =
          this.statusFilter === 'All' || client.status === this.statusFilter;

        return matchesSearch && matchesStatus;
      }).length / this.itemsPerPage
    );
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // ✅ method for dropdown change
  changeStatusFilter(value: string) {
    this.statusFilter = value;
    this.currentPage = 1; // reset to first page when filter changes
  }
}
