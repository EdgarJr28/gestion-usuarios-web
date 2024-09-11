import { Component } from '@angular/core';
import { AreaService } from 'src/app/services/area/area.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isSidebarOpen = false;
  activeUsersCount: number = 0;
  activeAreasCount: number = 0;

  constructor(private authService: AuthService, private usuarioService: UserService, private areaService: AreaService) { }

  ngOnInit(): void {
    this.getActiveUsersCount();
    this.getActiveAreasCount();
  }

  getActiveUsersCount(): void {
    this.usuarioService.countActiveUsers().subscribe(
      (response) => {
        console.log(response);
        this.activeUsersCount = response.count;
      },
      (error) => {
        console.error('Error fetching active users count:', error);
      }
    );
  }

  getActiveAreasCount(): void {
    this.areaService.countActiveAreas().subscribe(
      (response) => {
        this.activeAreasCount = response.count;
      },
      (error) => {
        console.error('Error fetching active areas count:', error);
      }
    );
  }

  logout() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
