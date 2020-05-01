import { HttpClientModule } from '@angular/common/http';
import { PersonaComponent } from './pages/persona/persona.component';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ProductoComponent } from './pages/producto/producto.component';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonaDialogoComponent } from './pages/persona/persona-dialogo/persona-dialogo.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    ProductoComponent,
    ProductoEdicionComponent,
    PersonaDialogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
