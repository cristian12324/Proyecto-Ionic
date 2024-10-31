import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  noticia: any[] = [];

  constructor(private http: HttpClient) {
    this.buscarAnuncios();
  }

  buscarAnuncios() {
    this.servicioBuscarAnuncios().subscribe(
      (u: any) => {
        console.log('Datos recibidos:', u);
        if (Array.isArray(u)) {
         
          this.noticia = u.map(anuncio => {
            return {
              ...anuncio,
              imagen: `data:image/jpeg;base64,${anuncio.imagen}`
            };
          });
        } else {
          console.error('La respuesta no es un array:', u);
          this.noticia = [];
        }
      }
    );
  }
  
  
  servicioBuscarAnuncios(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/anuncios/buscar');
  }
}
