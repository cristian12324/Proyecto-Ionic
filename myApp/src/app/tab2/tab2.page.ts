import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  usuario: any = {};
  password: any = { newPassword: '' };

  constructor(private http: HttpClient) {
    let u: any = localStorage.getItem("usuario");
    this.usuario = JSON.parse(u) || {};
  }

  logOut() {
    localStorage.clear();
    location.reload();
  }

  cambiarPassword() {
    if (this.usuario.idadministrador && this.password.newPassword) {
      const body = {
        ...this.usuario,
        password: this.password.newPassword
      };

      this.http.put(`http://localhost:8080/admin/actualizar/${this.usuario.idadministrador}`, body)
        .subscribe({
          next: () => {
            console.log('Contraseña cambiada exitosamente.');
            alert("Contraseña cambiada exitosamente");
            this.password.newPassword = ''; 
          },
          error: (error) => {
            console.error('Error al cambiar la contraseña:', error);
            alert("Error al cambiar la contraseña");
          }
        });
    } else {
      console.log('Por favor, introduce una nueva contraseña.');
    }
  }
}
