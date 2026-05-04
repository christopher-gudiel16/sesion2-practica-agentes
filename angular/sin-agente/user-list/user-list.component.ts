import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  private readonly userService = inject(UserService);

  readonly PAGE_SIZE = 10;

  // State signals
  allUsers = signal<User[]>([]);
  filterText = signal('');
  currentPage = signal(1);
  loading = signal(false);
  error = signal<string | null>(null);

  // Derived: users filtered by any field
  filteredUsers = computed(() => {
    const term = this.filterText().toLowerCase().trim();
    if (!term) return this.allUsers();
    return this.allUsers().filter((user) =>
      [
        user.name,
        user.username,
        user.email,
        user.phone,
        user.website,
        user.address.city,
        user.company.name,
      ]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  });

  // Derived: total pages
  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredUsers().length / this.PAGE_SIZE))
  );

  // Derived: current page slice
  pagedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.PAGE_SIZE;
    return this.filteredUsers().slice(start, start + this.PAGE_SIZE);
  });

  // Derived: page number array for template
  pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.allUsers.set(users);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(
          err?.message ?? 'Error al cargar los usuarios. Intente nuevamente.'
        );
        this.loading.set(false);
      },
    });
  }

  onFilterChange(value: string): void {
    this.filterText.set(value);
    this.currentPage.set(1); // reset to first page on filter change
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}
