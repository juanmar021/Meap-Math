import  React, {Component } from 'react'
 import { connect } from 'react-redux';
 import './Header.css'
import NavBar from '../nav-bar/NavBar';
import NavBarMovil from '../nav-bar-movil/NavBarMovil';
import { logout, isLogin } from '../../utils/Servicios';
import AlertDialog from '../alert-dialog/AlertDialog';
class Header extends Component {


    state={
        mostrar_dialog:false,
        login:true,
        optionsMenu:[] 
        
    }

    componentDidMount()
    {

        let login=true;
         if(!isLogin() )
        {
            if(!this.props.usuario.nombres){
                login=false;
             } 
            
          

        }
        
        if(this.props.usuario.rol==="ADMIN"){
          this.setState({...this.state,
            isLogin:login,
            optionsMenu : [
            {ruta:'panel', show:true,label:'Inicio'},
             {ruta:'mis_datos', show:login,label:'Mis datos'},
            {ruta:'login', show:!login,label:'Ingresar',icon:"fas fa-sign-in-alt"},
            {ruta:'salir', show:login,label:'Salir',icon:'far fa-arrow-alt-circle-left'}
         
          ]});
        }else{
            this.setState({...this.state,
                isLogin:login,
                optionsMenu : [
                {ruta:'ver_ofertas', show:true,label:'Ver Ofertas'},
                {ruta:'mis_ofertas', show:true,label:'Mis Ofertas'},
                {ruta:'mis_vehiculos', show:true,label:'Mis Vehiculos'},
                {ruta:'mis_rentas', show:true,label:'Mis Rentas'},
                {ruta:'registro', show:!login,label:'Registrarme'},
                {ruta:'mis_datos', show:login,label:'Mis datos'},
                {ruta:'login', show:!login,label:'Ingresar',icon:"fas fa-sign-in-alt"},
                {ruta:'salir', show:login,label:'Salir',icon:'far fa-arrow-alt-circle-left'}
            ]});
        }
       

        
        
    }

    render() {
       

        return (             
            <div className="Header"> 
              {this.props.usuario.rol!=="ADMIN"?
              <div>
                  <div className = "nav-bar-escritorio" >
                       
                   <NavBar handleNavigate={this.handleNavigate} onBuscar = { this.onBuscar } 
                   onClickBtnFiltros={this.onClickBtnFiltros} clickHandler={this.handleClickOpen}
                   filtroSelected={this.props.filtroSelected}
                   textChange={this.textChange}
                   isLogin={this.state.isLogin}
                   isAdmin={this.props.isAdmin}
                   />  
                   </div>
                   <div className = "nav-bar-movil" >
                    <NavBarMovil handleNavigate={this.handleNavigate} isLogin={this.state.isLogin}
                     options={this.state.optionsMenu} filtroSelected={this.props.filtroSelected}
                     textChange={this.textChange}
                     title="Buscar moto"/>
                    </div>
              </div>
              :
              <NavBarMovil handleNavigate={this.handleNavigate} isLogin={this.state.isLogin}
              options={this.state.optionsMenu} filtroSelected={this.props.filtroSelected}
              title="Buscar rentas por cliente, vehiculo"
              textChange={this.textChange}/>}

                {
                    this.state.mostrar_dialog&&
                    <AlertDialog title="¿Seguro que desea cerrar sesión?"mensaje="" handleClose={this.handleCloseDialog}/>
                }
            </div>
        );
    }

    textChange=(event)=>{
 

        if(this.props.textChange) this.props.textChange(event.target.value);
    }

   handleCloseDialog=(resp)=>
   {
    this.setState({
        ...this.state,
        mostrar_dialog:false
    })

    if(resp==="ACEPTAR")logout();

   
   }

    handleNavigate=(ruta)=>{

        if(ruta!=="salir"){
            this.props.history.push(`/${ruta}`);
        }else{

            this.setState({
                mostrar_dialog:true
            })
          //  logout();

        }

    }
 

}


function stateToProps(state, props) {
   
    return {
        usuario: state.usuariosState.usuario
    }
}
export default connect(stateToProps)(Header);
