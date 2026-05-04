import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  private readonly userService = inject(UserService);

  readonly PAGE_SIZE = 10;

  users = signal<User[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  filterText = signal('');
  currentPage = signal(1);

  filteredUsers = computed(() => {
    const text = this.filterText().toLowerCase().trim();
    if (!text) return this.users();

    return this.users().filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      return (
        fullName.includes(text) ||
        user.email.toLowerCase().includes(text) ||
        user.phone.toLowerCase().includes(text) ||
        user.cell.toLowerCase().includes(text) ||
        user.location.city.toLowerCase().includes(text) ||
        user.location.state.toLowerCase().includes(text) ||
        user.location.country.toLowerCase().includes(text)
      );
    });
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredUsers().length / this.PAGE_SIZE))
  );

  pagedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.PAGE_SIZE;
    return this.filteredUsers().slice(start, start + this.PAGE_SIZE);
  });

  pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  startIndex = computed(() => (this.currentPage() - 1) * this.PAGE_SIZE + 1);

  endIndex = computed(() =>
    Math.min(this.currentPage() * this.PAGE_SIZE, this.filteredUsers().length)
  );

  async ngOnInit(): Promise<void> {
    await this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const data = await firstValueFrom(this.userService.getUsers());
      this.users.set(data);
      this.currentPage.set(1);
    } catch {
      this.error.set('No se pudo cargar la lista de usuarios. Intente de nuevo.');
    } finally {
      this.isLoading.set(false);
    }
  }

  onFilterChange(value: string): void {
    this.filterText.set(value);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  rowNumber(index: number): number {
    return (this.currentPage() - 1) * this.PAGE_SIZE + index + 1;
  }
}
