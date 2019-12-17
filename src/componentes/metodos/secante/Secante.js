import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableHead, TableRow, TableCell, TableBody, Grid, TextField, Button } from '@material-ui/core';
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

export default function Secante()
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

        a=parseFloat(a);
        b=parseFloat(b);

          
      let i=2;
      let fa=getValor(a);
      let fb=getValor(b);
      let xi=getXi(a, b, fa, fb);
      let fxi=getValor(xi);
      let dif=xi-b;
      if(dif<0)dif*=-1;
       datos.push({i, a, b, fa, fb, xi, fxi,dif});
 
     
      do{
       i++;  

       a=b;
       b=xi;
     
      
      fa=getValor(a);
      fb=getValor(b);
      xi=getXi(a, b, fa, fb);
      dif=xi-datos[i-3].xi;
      if(dif<0)dif*=-1;
      fxi=getValor(xi);
      
      
      datos.push({i, a, b, fa, fb, xi, fxi,dif});
  
     
       
      }while(!compararIgualdad(xi, datos[i-3].xi));

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

         return (b-((b-a)/(fb-(fa)))*(fb));

      }
      
      const handleCalcular=()=>{

        if(validar()){

             calcular(state.a,state.b,state.ea);
        }

      }
     
      const validar = () => {

          if (state.a === "") {
            setError({ ...error, a: "Ingrese el valor de x0" });
            return false;
          }
          if (state.b === "") {
            setError({ ...error, b: "Ingrese el valor de x1" });
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
        <h1 align="center">Secante</h1>

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
                      <Grid item sm={3}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            type="number"
                            fullWidth
                            label="Ingrese el valor de x0"
                            name="a"
                            value={state.a}
                            onChange={handleChange}
                            error={error.a !== ""}
                            helperText={error.a}
                           />
                      </Grid>
                          <Grid item sm={3}>
                              <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            type="number"
                            fullWidth
                            label="Ingrese el valor de x1"
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
            <TableCell style={{color:"white"}} align="center" >x0</TableCell>
            <TableCell style={{color:"white"}} align="center" >x1</TableCell>
            <TableCell style={{color:"white"}} align="center" >f(x0)</TableCell>
            <TableCell style={{color:"white"}} align="center" >f(x1)</TableCell>
            <TableCell style={{color:"white"}} align="center" >xi</TableCell>
            <TableCell style={{color:"white"}} align="center" >f(xi)</TableCell>
            <TableCell style={{color:"white"}} align="center" >|xi-xi-1|</TableCell>

 
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.valores.map(secante => (
            <TableRow key={secante.i}>
              <TableCell component="th" scope="row"> {secante.i} </TableCell>
              <TableCell align="center">{secante.a}</TableCell>
              <TableCell align="center">{secante.b}</TableCell>
              <TableCell align="center">{secante.fa}</TableCell>
              <TableCell align="center">{secante.fb}</TableCell>
              <TableCell align="center">{secante.xi}</TableCell>
              <TableCell align="center">{secante.fxi}</TableCell>
              <TableCell align="center">{secante.dif}</TableCell>

                         
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}