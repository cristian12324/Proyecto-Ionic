import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page {
  platillosDisponibles: any[] = [];
  pedido: any = { detallePedidoList: [], total: 0, idadministrador: null }; 
  platilloSeleccionado: any = {};
  cantidadSeleccionada: number = 1;
  idAdministrador: string = ''; 
  pedidos: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarPlatillos();
  }

  cargarPlatillos() {
    this.servicioBuscarPlatillos().subscribe(
      (data: any) => {
        this.platillosDisponibles = Array.isArray(data) ? data : [];
        console.log('Platillos cargados:', this.platillosDisponibles);
      },
      (error) => console.error('Error al cargar platillos:', error)
    );
  }

  servicioBuscarPlatillos(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/platillo/buscar');
  }

  agregarPlatillo() {
    if (this.platilloSeleccionado && this.platilloSeleccionado.idplatillo) {
      const nuevoDetalle = {
        platilloIdplatillo: this.platilloSeleccionado.idplatillo,
        cantidad: this.cantidadSeleccionada,
        precio: this.platilloSeleccionado.precio
      };
      this.pedido.detallePedidoList.push(nuevoDetalle);
      this.calcularTotal();
      this.resetSeleccion();
    }
  }

  calcularTotal() {
    this.pedido.total = this.pedido.detallePedidoList.reduce((acumulado: number, detalle: any) => {
      return acumulado + (detalle.precio * detalle.cantidad);
    }, 0);
  }

  guardarPedido() {
    if (this.idAdministrador) {
      this.pedido.idadministrador = Number(this.idAdministrador);
      
      this.http.post('http://localhost:8080/pedido/guardar', this.pedido).subscribe({
        next: (response) => {
          console.log('Pedido guardado:', response);
          alert('Pedido guardado exitosamente!');
          this.resetPedido();
        },
        error: (error) => {
          console.error('Error al guardar el pedido:', error);
          alert('Error al guardar el pedido. Por favor, inténtelo de nuevo.');
        }
      });
    } else {
      alert('Por favor, ingrese un ID de administrador válido.');
    }
  }

  resetPedido() {
    this.pedido = { detallePedidoList: [], total: 0, idadministrador: null };
    this.resetSeleccion();
  }

  resetSeleccion() {
    this.platilloSeleccionado = {};
    this.cantidadSeleccionada = 1;
  }

  buscarPedidosPorIdAdministrador() {
    const idAdminNumber = Number(this.idAdministrador);
    if (!isNaN(idAdminNumber)) {
      this.http.get<any[]>(`http://localhost:8080/pedido/buscarPorAdministrador/${idAdminNumber}`).subscribe(
        (data: any[]) => {
          this.pedidos = data;
          console.log('Pedidos encontrados:', this.pedidos);
        },
        (error) => {
          console.error('Error al buscar pedidos por ID de administrador:', error);
        }
      );
    } else {
      console.error('ID de administrador no válido.');
    }
  }

  getPlatilloNombre(platilloId: number): string {
    const platillo = this.platillosDisponibles.find(p => p.idplatillo === platilloId);
    return platillo ? platillo.nombre : 'Platillo no encontrado';
  }
}
