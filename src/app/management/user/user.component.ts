import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../app/services/user/user.service';
import { AreaService } from 'src/app/services/area/area.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  isModalOpen = false;
  isEditing = false; // Flag to determine if we're editing
  currentUser: any = null; // Store the user being edited
  users: any[] = [];
  areas: any[] = [];

  constructor(
    private userService: UserService,
    private areaService: AreaService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) { 
    this.userForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.maxLength(50)]],
      apellidos: ['', [Validators.required, Validators.maxLength(50)]],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      numeroDocumento: ['', [Validators.required, Validators.pattern(/^\d{7}$/)]],
      area: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      salario: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      estado: ['Activo']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.cargarAreas();
  }

  initForm(user: any = null) {
    this.userForm.reset({
      nombres: user?.nombres || '',
      apellidos: user?.apellidos || '',
      fechaNacimiento: user?.fechaNacimiento || '',
      email: user?.email || '',
      numeroDocumento: user?.numeroDocumento || '',
      area: user?.area || '',
      salario: user?.salario || '',
      estado: user?.estado || 'Activo'
    });
  
    if (user && user.id) {
      this.userForm.addControl('id', this.fb.control(user.id));
    } else {
      this.userForm.removeControl('id');
    }
  }
  
  

  loadUsers() {
    this.userService.getUsers().subscribe(
      data => {
        console.log(data)
        this.users = data;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  openModal(user: any = null) {
    this.isEditing = !!user;
    this.currentUser = user ? { ...user } : null;
    if (this.currentUser) {
      this.initForm(this.currentUser);
    } else {
      this.initForm(null);
    }
    this.isModalOpen = true;
  }
  

  closeModal() {
    this.isModalOpen = false;
    this.currentUser = null;
    this.userForm.reset();
  }

  saveUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
  
    const userData = this.userForm.value;
  
    // Eliminamos el campo id si no está editando un usuario
    if (!this.isEditing) {
      delete userData.id;
    }
  
    if (this.isEditing) {
      this.userService.updateUser(userData).subscribe(
        () => {
          this.loadUsers();
          this.closeModal();
          this.notificationService.showSuccess('Usuario actualizado con éxito');
        },
        error => {
          console.error('Error updating user:', error);
          this.notificationService.showError('Error al actualizar el usuario');
        }
      );
    } else {
      this.userService.createUser(userData).subscribe(
        () => {
          this.loadUsers();
          this.closeModal();
          this.notificationService.showSuccess('Usuario creado con éxito');
        },
        error => {
          console.error('Error creating user:', error);
          this.notificationService.showError('Error al crear el usuario');
        }
      );
    }
  }

  editUser(user: any) {
    this.openModal(user);
  }

  deleteUser(user: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(user.id).subscribe(
        () => {
          this.loadUsers();
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  cargarAreas() {
    this.areaService.getAreas().subscribe(
      (data) => {
        this.areas = data;
      },
      (error) => {
        console.error('Error al obtener las áreas:', error);
      }
    );
  }
}
