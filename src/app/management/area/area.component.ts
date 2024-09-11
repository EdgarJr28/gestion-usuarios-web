import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area/area.service';
import { NotificationService } from 'src/app/services/notification/notification.service'; // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-areas',
  templateUrl: './area.component.html'
})
export class AreaComponent implements OnInit {
  areas: any[] = [];
  currentArea: any = {};
  isModalOpen = false;
  isEditing = false;

  constructor(private areaService: AreaService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(): void {
    this.areaService.getAreas().subscribe(
      (areas: any[]) => {
        this.areas = areas;
      },
      (error) => {
        this.notificationService.showError('Error fetching areas');
      }
    );
  }

  openModal(): void {
    this.isModalOpen = true;
    this.isEditing = false;
    this.currentArea = {};
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveArea(): void {
    if (this.isEditing) {
      this.areaService.updateArea(this.currentArea).subscribe(
        () => {
          this.notificationService.showSuccess('Área actualizada con éxito');
          this.getAreas();
          this.closeModal();
        },
        (error) => {
          this.notificationService.showError('Error updating area');
        }
      );
    } else {
      this.areaService.createArea(this.currentArea).subscribe(
        () => {
          this.notificationService.showSuccess('Área creada con éxito');
          this.getAreas();
          this.closeModal();
        },
        (error) => {
          this.notificationService.showError('Error creating area');
        }
      );
    }
  }

  editArea(area: any): void {
    this.currentArea = { ...area };
    this.isEditing = true;
    this.isModalOpen = true;
  }

  deleteArea(area: any): void {
    if (confirm('¿Estás seguro de eliminar esta área?')) {
      this.areaService.deleteArea(area.id).subscribe(
        () => {
          this.notificationService.showSuccess('Área eliminada con éxito');
          this.getAreas();
        },
        (error) => {
          this.notificationService.showError('Error deleting area');
        }
      );
    }
  }
}
