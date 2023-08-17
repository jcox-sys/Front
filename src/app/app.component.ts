
import { Component, ViewChild,OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataService } from '../service/app.service';
import { ListadoUsuario } from "../models/usuario.clase";
import { ModalService } from './modal.service';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ListadoDepar } from 'src/models/departamento.clase';
import { ListadoCargos } from 'src/models/cargos.clase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  
  dataUsuario: ListadoUsuario[] = [];
  dataDepar: ListadoDepar[] = [];
  dataCargo: ListadoCargos[] = [];
  User:ListadoUsuario= new ListadoUsuario();
  UserU:ListadoUsuario= new ListadoUsuario()
  onTipoDepa: number = 0;
  onTipoCargo: number = 0;
  onTipoSeleccionadoD: number = 0;
  onTipoSeleccionadoC: number = 0;

  usuario: string = "";
  email: string = "";
  primerNombre: string = "";
  segundoNombre: string = "";
  primerApellido: string = "";
  segundoApellido: string = "";
  idDepartamento: number = 0;
  idCArgo: number = 0;
  

  @ViewChild("myModalUsuarioN", { static: false }) myModalUsuarioN: TemplateRef<any> | undefined;
  @ViewChild("myModalUsuarioM", { static: false }) myModalUsuarioM: TemplateRef<any> | undefined;

  constructor(private user: DataService, public  modalService: NgbModal) {}
 
 
  mostrarModalCrearUser( ){ 
    this.ObtieneDepartamento().then((response) => {});
    this.ObtieneCargo().then((response) => {});
    
    this.modalService.open(this.myModalUsuarioN,{
      
      centered: true,
      size: <any>"xl",
      scrollable: true,
      beforeDismiss: () => {
        
        return true;
        
      },
      
    });
    
    
  }

  mostrarModalEditarUser(usuario : string , email: string, pNombre: string, sNombre: string, pApellido: string, sApellido: string,idDepartamento: number, idCArgo:number ){ 
  
    this.usuario = usuario;
    this.email=  email;
    this.primerNombre = pNombre;
    this.segundoNombre = sNombre;
    this.primerApellido= pApellido;
    this.segundoApellido= sApellido;
    this.onTipoSeleccionadoD = idDepartamento;
    this.onTipoSeleccionadoC = idCArgo;
  
    this.modalService.open(this.myModalUsuarioM,{
      
      centered: true,
      size: <any>"xl",
      scrollable: true,
      beforeDismiss: () => {
        
        return true;
        
      },
      
    });
    
    
  }

  async ngOnInit() {
   try {
     await this.ObtieneDatos();
     await this.ObtieneDepartamento();
     await this.ObtieneCargo();
   } catch (error) {
     console.error('Error:', error);
   }

  } 

  codigoExists(usuario: string): boolean {
  return this.dataUsuario.some(data => data.usuario === usuario );
  }

  async ObtieneDatos(){
  const consultarProductos = () => {
    return new Promise((resolve) => {
      this.user.obtenerRequerimiento().subscribe(
        (response) => {
          this.dataUsuario = response;
         
        
          resolve(true);
       
        }
      )
    })
  }
  return consultarProductos();
  }

  onDepa(event: any) {
  this.onTipoDepa =event.target.value; 
  }

  onCargo(event: any) {
    this.onTipoCargo =event.target.value; 
    }

  async ObtieneDepartamento(){
  const consultarProductos = () => {
    return new Promise((resolve) => {
      this.user.obtenerDepa().subscribe(
        (response) => {
          this.dataDepar = response;
         console.log(this.dataDepar);
        
          resolve(true);
       
        }
      )
    })
  }
  return consultarProductos();
  }

  async ObtieneCargo(){
    const consultarProductos = () => {
      return new Promise((resolve) => {
        this.user.obtenerCargo().subscribe(
          (response) => {
            this.dataCargo = response;
           console.log(this.dataCargo);
          
            resolve(true);
         
          }
        )
      })
    }
    return consultarProductos();
    }

  onGuardarRol() {
    const usuario = (document.getElementById('usuario') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const pNombre = (document.getElementById('pNombre') as HTMLInputElement).value;
    const sNombre = (document.getElementById('sNombre') as HTMLInputElement).value;
    const pApellido = (document.getElementById('pApellido') as HTMLInputElement).value;
    const sApellido = (document.getElementById('sApellido') as HTMLInputElement).value;
    
      
      if (this.codigoExists(usuario)) {
        Swal.fire({
          icon: 'error',
          text: 'El Codigo ingresado ya existe. Por favor, ingrese otro Codigo.',
          confirmButtonColor: '#b22222',
        });
        return; 
      }else{

    
      Swal.fire({
        text: '¿Desea Crear el usuario?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#b22222',
        cancelButtonColor: '#77797a',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this.User.usuario = usuario;
          this.User.email= email;
          this.User.primerNombre = pNombre;
          this.User.segundoNombre = sNombre;
          this.User.primerApellido = pApellido;
          this.User.segundoApellido = sApellido;
          this.User.idDepartamento=this.onTipoDepa;
          this.User.idCArgo=this.onTipoCargo;
                
          this.user.GuardarUser(this.User).subscribe((newTipoArchivo) => {
            // Actualiza la lista de tipos de archivo
            this.dataUsuario[0] = newTipoArchivo;
            this.ObtieneDatos().then((response) => { });
            this.modalService.dismissAll();
            Swal.fire({
              text: 'usuario Creado.',
              icon: 'success',
              confirmButtonColor: '#b22222',
            });

          });
        }
      })
    }
  }

  onEditarUser(){
    const usuario = (document.getElementById('usuarioE') as HTMLInputElement).value;
    const email = (document.getElementById('emailE') as HTMLInputElement).value;
    const pNombre = (document.getElementById('pNombreE') as HTMLInputElement).value;
    const sNombre = (document.getElementById('sNombreE') as HTMLInputElement).value;
    const pApellido = (document.getElementById('pApellidoE') as HTMLInputElement).value;
    const sApellido = (document.getElementById('sApellidoE') as HTMLInputElement).value;

    Swal.fire({
      text: '¿Desea Editar ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#b22222',
      cancelButtonColor: '#77797a',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

        this.UserU.usuario = usuario;
        this.UserU.email= email;
        this.UserU.primerNombre = pNombre;
        this.UserU.segundoNombre = sNombre;
        this.UserU.primerApellido = pApellido;
        this.UserU.segundoApellido = sApellido;
        this.UserU.idDepartamento=this.onTipoDepa;
        this.UserU.idCArgo=this.onTipoCargo;

        

        if (this.UserU.usuario) {
          // Si existe el ID, actualizar el registro existente
          this.user.EditarUser(this.UserU).subscribe((updatedRol) => {
            // Actualiza la lista de tipos de archivo
            
            this.ObtieneDatos().then((response) => { });
            this.modalService.dismissAll();
            Swal.fire({
              text: 'Usuario Editado.',
              icon: 'success',
              confirmButtonColor: '#b22222',
            });
          });
        }
      }
    })  
        
      
    
  }
  
  onDelete(usuario: string): void {
    
    Swal.fire({
      text: '¿Desea eliminar el Usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#77797a',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

        this.user.delete(usuario).subscribe((response) => {
          this.ObtieneDatos().then((response) => {});
          Swal.fire({
            text: 'Eliminado Correctamente.',
            icon: 'success',
            confirmButtonColor: '#b22222',
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            text: error.error,
            confirmButtonColor: '#b22222',
          });
        });
        
      }
    })
  }
}
