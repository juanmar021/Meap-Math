import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableHead, TableRow, TableCell, TableBody, Grid, TextField, Button } from '@material-ui/core';
import { create, all } from 'mathjs'
import './biseccion.css'
import Paper from '@material-ui/core/Paper';

const config = { }
const math = create(all, config)

 
  

  const useStyles = makeStyles({
    table: {
        marginTop:20,
      minWidth: 700,
      
    },
  });
  

export default function Biseccion()
{

    // const valores=[];
   //  valores.push(biseccion)


     const [state, setState] = useState({a:"",b:"",ea:"",ecuacion:""});
     const [error, setError] = useState({a:"",b:"",ea:"",ecuacion:""});
     const [valores, setValores] = useState([]);

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


    const calcular=(a,b,ea)=>{

        let datos=[];
        let fa=getValor(a);
        let fb=getValor(b);

        let xi=(a + b)/2;
         let fxi=getValor(parseFloat(xi));
        let i=1;
        let errorAproximado=ea/100;
        
         datos.push({i, a, b, fa, fb, xi, fxi});
  
        
        do{
            
        if((getValor(xi)*getValor(a))<0)
        {
            b=xi;
        }else{
            a=xi;
        }
              
            
        fa=getValor(a);
        fb=getValor(b);
        xi=(a+b)/2;
        fxi=getValor(xi);
         ea=xi-datos[i-1].xi;
        if(ea<0)ea*=-1;
         i++;
         datos.push({i, a, b, fa, fb, xi, fxi, ea});
 
        
        }while(ea>errorAproximado);

        setValores(datos);
    }


    const getValor=(x)=>{

         // double r= (4*(Math.pow(x, 2) + 4 * (Math.pow(x, 2)) -10;
         console.log(x)

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


      const handleCalcular=()=>{

        if(validar()){

             calcular(parseFloat(state.a),parseFloat(state.b),parseFloat(state.ea));
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
          if (state.ea === "") {
            setError({ ...error, ea: "Ingrese el error relativo" });
            return false;
          }
        
          if (state.ecuacion === "") {
            setError({ ...error, ecuacion: "Ingrese la ecuacion" });
            return false;
          }
    
        return true;
      };
    





    


    return (
    
    <div>
        <h1 align="center">Bisección</h1>

        <div style={{marginLeft:30,marginRight:30,marginBottom:20}}>
            <Grid  container  justify="center">
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
        </div>

        <Grid  container direction="row" justify="center" spacing={3}>
                      <Grid item>
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
                          <Grid item>
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
                          <Grid item>
                              <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            type="number"

                            fullWidth
                            label="Error aproximado"
                            name="ea"
                            value={state.ea}
                            onChange={handleChange}
                            
                            error={error.ea !== ""}
                            helperText={error.ea}
                           />
                          </Grid>


                          <Grid item style={{marginTop:25}} >
                          <Button    color="primary" variant="contained" onClick={handleCalcular} >
                             Calcular
                          </Button>                
                              
                          </Grid>
            
        </Grid>

        <div style={{marginLeft:30,marginRight:30}}>
            <Tabla valores={valores}/>
        </div>
    </div>
        
        )
}


function Tabla(props)
{
    const classes = useStyles();

    return(

        <Paper>
        <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell style={{color:"white"}} >i</TableCell>           
            <TableCell style={{color:"white"}} align="center" >a</TableCell>
            <TableCell style={{color:"white"}} align="center" >b</TableCell>
            <TableCell style={{color:"white"}} align="center" >f(a)</TableCell>
            <TableCell style={{color:"white"}} align="center" >f(b)</TableCell>
            <TableCell style={{color:"white"}} align="center" >xi</TableCell>
            <TableCell style={{color:"white"}} align="center" >f(xi)</TableCell>
            <TableCell style={{color:"white"}} align="center" >|error aproximado|</TableCell>
 
            
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
              <TableCell align="center">{biseccion.ea}</TableCell>


                         
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
    )
}