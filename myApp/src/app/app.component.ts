import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  sesionIniciada: boolean = false;
  creacionCuenta: boolean = false;
  usuario: any = {}; 
  nuevoUsuario: any = {}; 

  constructor(private http: HttpClient) {
    let usuario = localStorage.getItem("usuario");
    if (usuario) {
      this.sesionIniciada = true;
    }
  }

  crearCuenta() {
      this.creacionCuenta = !this.creacionCuenta;
      
      if (!this.creacionCuenta) {
          this.usuario = {}; 
      }
  }

  nuevaCuenta() {
      const nuevoUsuario = {
          usuario: this.usuario.email, 
          password: this.usuario.password
      };
  
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
  
      this.http.post('http://localhost:8080/admin/guardar', nuevoUsuario, httpOptions).subscribe(
          (response) => {
              console.log('Usuario creado:', response);
              this.usuario = {}; 
              this.creacionCuenta = false; 
        alert("usuario creado exitosamente")
          }
      );
  }
  




  login() {
    if (this.usuario.password && this.usuario.email) {
      this.servicioLogin().subscribe(
        (u: any) => {
          this.validarLogin(u);
        });
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }

  validarLogin(u: any) {
    console.log("Datos del usuario:", u);
    if (u) {
      this.sesionIniciada = true;
      let t = JSON.stringify(u);
      localStorage.setItem("usuario", t);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }

  servicioLogin() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(
      `http://localhost:8080/admin/buscar/${this.usuario.email}/${this.usuario.password}`,
      this.usuario,
      httpOptions
    );
  }

  servicioCrearUsuario() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(
      `http://localhost:8080/admin/guardar`,
      this.nuevoUsuario,
      httpOptions
    );
  }
}


