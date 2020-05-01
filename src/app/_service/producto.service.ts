import { Subject } from 'rxjs';
import { Producto } from './../_model/producto';
import { GenericService } from './generic.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<Producto>{

  productoCambio = new Subject<Producto[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/productos`
    );
   }
}
