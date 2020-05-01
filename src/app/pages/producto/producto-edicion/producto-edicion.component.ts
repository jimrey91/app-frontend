import { switchMap } from 'rxjs/operators';
import { Producto } from './../../../_model/producto';
import { ProductoService } from './../../../_service/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-edicion.component.html',
  styleUrls: ['./producto-edicion.component.css']
})
export class ProductoEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'marca': new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.productoService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idProducto),
          'nombre': new FormControl(data.nombre),
          'marca': new FormControl(data.marca)
        });
      });
    }
  }

  operar(){
    let producto = new Producto();
    producto.idProducto = this.form.value['id'];
    producto.nombre = this.form.value['nombre'];
    producto.marca = this.form.value['marca'];

    if (this.edicion) {
      this.productoService.modificar(producto).pipe(switchMap( () => {
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.productoCambio.next(data);
        this.productoService.mensajeCambio.next('SE MODIFICO');
      });
    } else {
      this.productoService.resgistrar(producto).pipe(switchMap( () => {
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.productoCambio.next(data);
        this.productoService.mensajeCambio.next('SE REGISTRO');
      });
    }
    this.router.navigate(['producto']);
  }

}
