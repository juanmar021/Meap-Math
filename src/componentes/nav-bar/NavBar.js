import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
 
import InputBase from '@material-ui/core/InputBase';
import {  makeStyles } from '@material-ui/core/styles';
 import   './NavBar.css'
import Button from '@material-ui/core/Button';
import logo from "../../assets/logob.png";
 import { Grid } from '@material-ui/core';
import FiltrosBusqueda from '../filtros-busqueda/FiltrosBusqueda';
 
 
export default function NavBar(props) {
  const classes = useStyles();
  

 const [showFiltros, setshowFiltros] = useState(false)
 
 const handleClose=()=>{
   setshowFiltros(false);
 }
  return (
    <div className="container-nav">
      <AppBar position="static"   color="primary">
        <Toolbar className="tool-bar"  >
       
                    <Grid container spacing={2}>
                    <Grid item  sm={3}>
                    <div className="cont-logo">

                    <img src={logo} alt="Logo">
            
                    </img>
          

                    </div>
                    </Grid>
                    <Grid item   sm={6}>
                  
                        
                        <Grid container  direction="column" spacing={1}>
                            <Grid item sm={"auto"}>
                            
                                  <div className="cont-buscar">
                                    <div className={classes.search}>
                                   
                                  {  props.filtroSelected&&<div className={classes.searchIconFilter}  >        
                                          <i className="material-icons icon" 
                                          onClick={()=>{setshowFiltros(true)}}>
                                          filter_list
                                          </i> 
                                    </div> }  
                                            {/* <div className={classes.searchIcon}>        
                                            <SearchIcon />
                                             </div>                      */}
                                            
                                            
                                            <InputBase
                                            onClick={props.onBuscar}
                                            onChange={ props.textChange }
                                             placeholder="Buscar motos por marca, modelo, ciudad..."
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search' }}
                                            />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item>
                           { props.isLogin&&    <Grid container  justify="center"  alignItems="center">
                                    <Grid item>
                                        <Button color="inherit" className={classes.buttonLogin} onClick={event => props.handleNavigate("ver_ofertas")}>VER Ofertas</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button color="inherit" className={classes.buttonLogin}  onClick={event => props.handleNavigate("mis_ofertas")}>Mis ofertas</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button color="inherit" className={classes.buttonLogin}  onClick={event => props.handleNavigate("mis_rentas")}>Mis Rentas</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button color="inherit" className={classes.buttonLogin}  onClick={event => props.handleNavigate("mis_vehiculos")}>Mis vehiculos</Button>
                                    </Grid>
                                </Grid>}
                            </Grid>

                        </Grid>
                       
           
                     </Grid>
                    <Grid item  sm={3}  >
                 
                        <Grid container justify="flex-end">
                            {
                              (!props.isLogin)&&(
                              <div>
                                <Button color="inherit" className={classes.buttonLogin}  onClick={event => props.handleNavigate("login")}>Ingresar</Button>
                                <Button color="inherit" className={classes.buttonLogin}  onClick={event => props.handleNavigate("registro")}>Registrarme</Button>
                              </div>
                              )
                            }


                           { (props.isLogin)&&<div>
                              <Button color="inherit" className={classes.buttonLogin}  onClick={event => props.handleNavigate("salir")}>CERRAR SESIÓN</Button>
  
                              <Button color="inherit" className={classes.buttonLogin}  onClick={event => props.handleNavigate("mis_datos")}> <i className="material-icons">
                              person
                              </i></Button>
                            </div>}
                        </Grid>

                    </Grid>
                    </Grid>
         
        
          
      
          
    
 
         {showFiltros&& <FiltrosBusqueda handleClose={handleClose} onSeletedItem={props.filtroSelected}/>}
        </Toolbar>
      </AppBar>
    </div>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
      position:"relative",
      display:"flex",
     borderRadius: theme.shape.borderRadius,
    backgroundColor: '#ffff',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
 
  searchIconFilter: {
    paddingTop:5,
     width: theme.spacing(7),
    height: '100%',
      display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#B6B6B6'
  },
  inputRoot: {
    color: 'primary',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 400,
      '&:focus': {
        width: 500,
      },
    },
  },
  buttonLogin:{
    marginLeft: '10px'
  }
}));