import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableHead, TableRow, TableCell, TableBody, Grid, TextField, Button } from '@material-ui/core';
import './ReglaFalsa.css'
import { create, all } from 'mathjs'


const config = { }
const math = create(all, config) 

const useStyles = makeStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 290,
    },
  });

export default function ReglaFalsa()
{
  

     const [valores, setValores] = useState([]);

     const [state, setState] = useState({a:"",b:"",ecuacion:""});
     const [error, setError] = useState({a:"",b:"",ecuacion:""});

     const handleChange = evt => {
        setState({
          ...state,
          [evt.target.name]: evt.target.value
        });
        setError({
          ...error,
          [evt.target.name]: ""
        });
      };


      const calcular=(a,b)=>{
        let datos=[];

          
      let i=1;
      let fa=getValor(state.a);
      let fb=getValor(state.b);
      let xi=getXi(a, b, fa, fb);
      let fxi=getValor(xi);
      
       datos.push({i, a, b, fa, fb, xi, fxi});
 
     
      do{
       i++;  
      if((getValor(xi)*getValor(a))<0)
      {
          b=xi;
      }else{
          a=xi;
      }
      fa=getValor(a);
      fb=getValor(b);
      xi=getXi(a, b, fa, fb);
      fxi=getValor(xi);
      
      datos.push({i, a, b, fa, fb, xi, fxi});
  
     
       
      }while(!compararIgualdad(xi, datos[i-2].xi));

      setValores(datos);
      }

      const  compararIgualdad =( x1, x2)=>{
       
       
        
        if(x1===x2)return true;
  
        let b=""+x2;
        let a=""+x1;       
       
  

        if(a.split(".")&&b.split(".")){
         if(a.split(".").length>1 && b.split(".").length >1 ){
         a=a.split(".")[1];
         b=b.split(".")[1];
   
        if(a.length<2)return false;
  
        if(b.length<2)return false;
  
        if(a.length>=2){
        a=a.substring(0, 2);
        b=b.substring(0, 2);
        
          
         return (a===b);      
 
        }
        }
      }
  
        
        return false;
     }


      const getValor=(x)=>{

        // double r= (4*(Math.pow(x, 2) + 4 * (Math.pow(x, 2)) -10;

         let  ecuacion=state.ecuacion.replace(/x/gi,x);
         let r;
         try {
            r= math.eval(ecuacion)
         }
         catch(error) {
           setError({ ...error, ecuacion: "Revise la ecuación" });
           
         }
        
   
        //let r=(Math.pow(x, 2)) + 4 * (Math.pow(x, 2)) -10;
       
       return r;
   }

      const getXi=( a,  b, fa, fb)=>{

        return (a*(fb)-(b)*(fa))/(fb-fa);
      }
      
      const handleCalcular=()=>{

        if(validar()){

             calcular(state.a,state.b,state.ea);
        }

      }
     
      const validar = () => {

          if (state.a === "") {
            setError({ ...error, a: "Ingrese el valor de a" });
            return false;
          }
          if (state.b === "") {
            setError({ ...error, b: "Ingrese el valor de b" });
            return false;
          }

          if (state.ecuacion === "") {
            setError({ ...error, ecuacion: "Ingrese la ecuación" });
            return false;
          }
        
        
    
        return true;
      };
    





    


    return (
    
    <div>
        <h1 align="center">Regla falsa</h1>

        <Grid  container direction="row" justify="center" spacing={3} style={{marginBottom:20}}>
                <Grid  item sm={4}>
                                        <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Ecuación"
                                        name="ecuacion"
                                        value={state.ecuacion}
                                        onChange={handleChange}
                                        autoFocus                            
                                        error={error.ecuacion !== ""}
                                        helperText={error.ecuacion}
                                      />
                    </Grid>
                      <Grid item sm={2}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            type="number"
                            fullWidth
                            label="Ingrese el valor de a"
                            name="a"
                            value={state.a}
                            onChange={handleChange}
                            error={error.a !== ""}
                            helperText={error.a}
                           />
                      </Grid>
                          <Grid item sm={2}>
                              <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            type="number"
                            fullWidth
                            label="Ingrese el valor de b"
                            name="b"
                            value={state.b}
                            onChange={handleChange}
                            error={error.b !== ""}
                            helperText={error.b}
                           />
                          </Grid>
                    
                          <Grid item  sm={2} style={{marginTop:25}} >
                          <Button    color="primary" variant="contained" onClick={handleCalcular} >
                             Calcular
                          </Button>                
                              
                          </Grid>
            
        </Grid>

        <Tabla valores={valores}/>
    </div>
        
        )
}


function Tabla(props)
{
    const classes = useStyles();

    return(
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{color:"white"}} >i</TableCell>           
            <TableCell style={{color:"white"}} align="center" >a</TableCell>
            <TableCell style={{color:"white"}} align="center" >b</TableCell>
            <TableCell style={{color:"white"}} align="center" >f(a)</TableCell>
            <TableCell style={{color:"white"}} align="center" >f(b)</TableCell>
            <TableCell style={{color:"white"}} align="center" >xi</TableCell>
            <TableCell style={{color:"white"}} align="center" >f(xi)</TableCell>
 
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.valores.map(biseccion => (
            <TableRow key={biseccion.i}>
              <TableCell component="th" scope="row"> {biseccion.i} </TableCell>
              <TableCell align="center">{biseccion.a}</TableCell>
              <TableCell align="center">{biseccion.b}</TableCell>
              <TableCell align="center">{biseccion.fa}</TableCell>
              <TableCell align="center">{biseccion.fb}</TableCell>
              <TableCell align="center">{biseccion.xi}</TableCell>
              <TableCell align="center">{biseccion.fxi}</TableCell>

                         
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}