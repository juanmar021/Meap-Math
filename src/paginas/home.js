import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Biseccion from '../componentes/metodos/biseccion/biseccion';
import ReglaFalsa from '../componentes/metodos/regla-falsa/ReglaFalsa';
import Raphson from '../componentes/metodos/raphson/Raphson';
import Copyright from '../componentes/Copyright';
import Secante from '../componentes/metodos/secante/Secante';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Home() {
  const classes = useStyles();

  const [metodo, setmetodo] = useState(0);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
           Metodos de aproximación
          </Typography>

          <a className="Header-link" href="https://github.com/juanmar021/Meap-Math" data-hotkey="g d" >
          <svg  height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>

        </a>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {['Bisección', 'Regla falsa', 'Secante', 'Newton Raphson','Punto fijo','Jacobi','Gauss Seidel'].map((text, index) => (
            <ListItem button key={text}  onClick={()=>{setmetodo(index)}}>
              <ListItemIcon><i className="material-icons">pie_chart</i></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
    
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

       {
           metodo===0 && <Biseccion/> 
       } 

        {
           metodo===1 && <ReglaFalsa/> 
        } 
        
        {
           metodo===2 && <Secante/> 
        } 
        {
           metodo===3 && <Raphson/> 
        } 
          
          <div className="footer">
            <Copyright/>
          </div>
     
      </main>
     
    </div>
  );
}