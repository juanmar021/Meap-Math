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

export default function Raphson()
{

 
 


     const [valores, setValores] = useState([]);
     const [state, setState] = useState({x0:"",ecuacion:""});
     const [error, setError] = useState({x0:"",ecuacion:""});

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

      const calcular=(x0)=>{

        let datos=[];

        let i=0;
        let xi=x0;
        let restaxi="";
        let fxi=getValor(xi);
        let fdxi=getDerivada(xi);
        datos.push({i,xi, fxi,fdxi,restaxi});
        //x ^3  + 4 * x ^2 -10

 
     do{
     
         i++;  
        // xi=getXi(i);  
         xi=datos[i-1].xi - (datos[i-1].fxi/datos[i-1].fdxi);     
         
         fxi=getValor(xi);
         fdxi=getDerivada(xi);         
         restaxi=xi-datos[i-1].xi;    
         if(restaxi<0)restaxi*=-1; 
         

         datos.push({i,xi, fxi,fdxi,restaxi});
 
 
   
      
      }while(!compararIgualdad(xi, datos[i-1].xi));

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

 
         let  ecuacion=state.ecuacion.replace(/x/gi,x);
         let r;
         try {
            r= math.eval(ecuacion)
         }
         catch(error) {
           setError({ ...error, ecuacion: "Revise la ecuación" });
           
         }
        
   
        
       return r;
   }

   
   const getDerivada=(x)=>{

 
    let  ecuacion=state.ecuacion;

    
    let r ;
    try {
       r= math.derivative(ecuacion, 'x').evaluate({x:x })
    }
    catch(error) {
      setError({ ...error, ecuacion: "Revise la ecuación" });
      
    }
   

   
  return r;
}



      const handleCalcular=()=>{


       // console.log(math.derivative('x^2', 'x').evaluate({x: 4})   )
        if(validar()){

           calcular(state.x0)
        }

      }
     
      const validar = () => {

        if (state.ecuacion === "") {
          setError({ ...error, ecuacion: "Ingrese la ecuación" });
          return false;
        }
      

          if (state.a === "") {
            setError({ ...error, a: "Ingrese el valor de Xo" });
            return false;
          }
          
         
        
        
    
        return true;
      };
    





    


    return (
    
    <div>
        <h1 align="center">Newton Raphson</h1>

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

                      <Grid item>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            type="number"
                            fullWidth
                            label="Ingrese el valor de Xo"
                            name="x0"
                            value={state.x0}
                            onChange={handleChange}
                            error={error.x0 !== ""}
                            helperText={error.x0}
                           />
                      </Grid>
                    
                    
                          <Grid item style={{marginTop:25}} >
                          <Button   onClick={handleCalcular} color="primary" variant="contained"  >
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
            <TableCell style={{color:"white"}}>i</TableCell>           
            <TableCell style={{color:"white"}} align="center" >xi</TableCell>
            <TableCell style={{color:"white"}}align="center" >f(xi)</TableCell>
            <TableCell style={{color:"white"}}align="center" >f'(xi)</TableCell>
            <TableCell style={{color:"white"}}align="center" >|xi-(xi-1)|</TableCell>
 
            
          </TableRow>
        </TableHead>
        <TableBody>
              {props.valores.map(biseccion => (
              <TableRow key={biseccion.i}>
              <TableCell component="th" scope="row"> {biseccion.i} </TableCell>
              <TableCell align="center">{biseccion.xi}</TableCell>
              <TableCell align="center">{biseccion.fxi}</TableCell>
              <TableCell align="center">{biseccion.fdxi}</TableCell>

              <TableCell align="center">{biseccion.restaxi}</TableCell>


                         
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}