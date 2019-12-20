import React, { useState } from 'react';
import { TableHead, TableRow, TableCell, TableBody, Grid, TextField, Button, Table } from '@material-ui/core';
import { create, all } from 'mathjs'
import { makeStyles } from '@material-ui/core/styles';


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


export default function Seidel() {


    const [matrix, setMatrix] = useState(
        [[8,-4,-3]
        ,[2,-5,3]
        ,[-3,1,9]]);
    const [resultados, setResultados] = useState([14,-1,9]);
    const [state, setstate] = useState({});

    const [valores, setvalores] = useState([])


    const handleChangeMatrix=(f,c,evt)=>
    {
 
        let m= matrix;
      
        
        if(evt.target.value!=="" && evt.target.value!=="-" ){
            m[f][c]=parseInt(evt.target.value);
        }else{
            m[f][c]=0; 

        }
     
        setMatrix(m)
        setstate({...state,value:"change"})
       

      

    }

    const handleChangeResultado=(c,evt)=>
    {

        let r= resultados;

 
        if(evt.target.value!=="" && evt.target.value!=="-" ){
         
            r[c]=parseInt(evt.target.value);  
        }else{
            r[c]=0;

        }
        
        
        
     
     
        setResultados(r)
        setstate({...state,value:"change"})
       

      

    }

    const calcular=()=>{

        // let A=matrix;
        let b=resultados;
        let D,L,U;
        D=getDiag(matrix);
        L=getDiagInf(matrix);
        U=getDiagSup(matrix);


        //D^-1 * b    + D^-1 (L+U)
        //p=D^-1 * b
        //h=D^-1 (L+U);
        //r= p   +  h
     
        let p=math.multiply(math.inv(D),b);
     

       
        let h=math.multiply(math.inv(D),getSum(L,U));
        let r=adicionar(p,quitar(h));
        // console.log(p)
        // console.log(h)
        // console.log(r)


        let x
        let y
        let z;
        x=p[0];
        y=p[1];
        z=p[2];
         //OPTENGO LAS ECUACIONES

        let e1=getEcuacion(r[0],0);
        let e2=getEcuacion(r[1],1);
        let e3=getEcuacion(r[2],2);


         
        let datos=[];

        console.log(x,y,z)

        datos.push({i:0,x,y,z})


        let x1,y1,z1;
        for(let i =1;i<4;i++){

            x1=getResult(e1,0,y,z);
            y1=getResult(e2,x,0,z);
            z1=getResult(e3,x,y,0);
            x=x1;
            y=y1;
            z=z1;
           // console.log(x,y,z)
            datos.push({i,x,y,z})
           
        }
    
        setvalores(datos)


      
        
       
 
    }

    const getResult=(ecuacion,x,y,z)=>{
       
        let e=ecuacion;
        e=e.replace('x',x)
        e=e.replace('y',y)       
        e=e.replace('z',z)

        return math.evaluate(e);
     

    }

    const getEcuacion=(v,index)=>{

       switch(index)
       {
           case 0:
               return `${v[0]} + ${v[1]} * y + ${v[2]} * z`
           case 1:
                return `${v[0]} + ${v[1]} * x + ${v[2]} * z`
           case 2:
                 return `${v[0]} + ${v[1]} * x + ${v[2]} * y`
          
       }
    }

    const adicionar=(x,y)=>{

        let m=[];

        for(let i=0;i<3;i++)
        {
            m[i]= new Array(3);
            for(let j=0;j<3;j++)
            {
                if(j===0)m[i][j]=x[i];
                else
                m[i][j]=y[i][j-1]
            }
           
        }
       

        return m;
    }

    const quitar=(matrix)=>{

        let m=[];
        for(let i=0;i<3;i++)
        {
            m[i]= new Array(2);
            for(let j=0;j<3;j++)
            {
               

                if(i===0 && j>0) m[i][j-1]=matrix[i][j]; 
                if(i===1 && (j===0 || j===2)) {

                    if(j===2)
                    m[i][1]=matrix[i][j];   
                    else
                    m[i][j]=matrix[i][j];   

                }               
                if(i===2 &&  j<2) m[i][j]=matrix[i][j];    


            }

           

        }
        return(m)
    }
    const getSum=(a,b)=>{

        let m=[];
        for(let i=0;i<3;i++)
        {
            m[i]= new Array(3);
            
            for(let j=0;j<3;j++)
            {
                m[i][j]=a[i][j]+b[i][j];           

            }

           

        }
        return(m)
    }

    const getDiag=(matrix)=>{

        let m=[];
        for(let i=0;i<3;i++)
        {
            m[i]= new Array(3);
            for(let j=0;j<3;j++)
            {
                m[i][j]=0;

                if(i===0 && j===0) m[i][j]=matrix[i][j]; 
                if(i===1 && j===1) m[i][j]=matrix[i][j];                  
                if(i===2 && j===2) m[i][j]=matrix[i][j];    


            }

           

        }
        return(m)
    }
  
       const getDiagInf=(matrix)=>{

        let m=[];
        for(let i=0;i<3;i++)
        {
            m[i]= new Array(3);
            for(let j=0;j<3;j++)
            {
                m[i][j]=0;

                if(i===1 && j===0) m[i][j]=matrix[i][j]*-1; 
                if(i===2 && j===0) m[i][j]=matrix[i][j]*-1;                  
                if(i===2 && j===1) m[i][j]=matrix[i][j]*-1;    


            }

           

        }
        return(m)
    }

    const getDiagSup=(matrix)=>{

        let m=[];
        for(let i=0;i<3;i++)
        {
            m[i]= new Array(3);
            for(let j=0;j<3;j++)
            {
                m[i][j]=0;

                if(i===0 && j===1) m[i][j]=matrix[i][j]*-1; 
                if(i===0 && j===2) m[i][j]=matrix[i][j]*-1;                  
                if(i===1 && j===2) m[i][j]=matrix[i][j]*-1;    


            }

           

        }
        return(m)
    }

    return (
    <div>
        <Grid container justify="center" spacing={3}>
        <h1>Gauss seidel</h1>
       

              <Grid item container xs={12} sm={12} direction="row" justify="center">
                    {matrix[0].map((m, index)=>{
                       return( 
    
                        <div   key={0+index} className="cont-input">
                            <TextField name={`0${index}`} onChange={(evt)=>{handleChangeMatrix(0,index,evt)}} className="input-o"  align="center"  label="" variant="outlined"  value={m} />
                        </div>)
                    })}

                         <h1>=</h1>

                        <div  className="cont-input">
                            <TextField  onChange={(evt)=>{handleChangeResultado(0,evt)}} className="input-o"  align="center"  label="" variant="outlined"  value={resultados[0]} />
                        </div>
 
                </Grid>
      
                <Grid item container xs={12} sm={12} direction="row" justify="center">
                    {matrix[1].map((m, index)=>{
                       return( 
    
                        <div   key={1+index} className="cont-input">
                            <TextField onChange={(evt)=>{handleChangeMatrix(1,index,evt)}}  className="input-o"  align="center"  label="" variant="outlined"   value={m} />
                        </div>)
                    })}

                    <h1>=</h1>

                    <div  className="cont-input">
                        <TextField   onChange={(evt)=>{handleChangeResultado(1,evt)}} className="input-o"  align="center"  label="" variant="outlined"  value={resultados[1]}/>
                    </div>
                </Grid>

                <Grid item container xs={12} sm={12} direction="row" justify="center">
                    {matrix[2].map((m, index)=>{
                       return( 
    
                        <div   key={2+index} className="cont-input">
                            <TextField  onChange={(evt)=>{handleChangeMatrix(2,index,evt)}} className="input-o"  align="center"  label="" variant="outlined"  value={m}  />
                        </div>)
                    })}

                <h1>=</h1>

                <div  className="cont-input">
                    <TextField   onChange={(evt)=>{handleChangeResultado(2,evt)}} className="input-o"  align="center"  label="" variant="outlined"  value={resultados[2]} />
                </div>
                </Grid>

                
        <Button    color="primary" variant="contained" onClick={calcular} style={{marginBottom:20}} >
                             Calcular
      </Button>    

      <br/>

      <Tabla valores={valores}/>
           
        </Grid>


    </div>)
    
}


function Tabla(props)
{
    const classes = useStyles();

    return(
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{color:"white"}} >i</TableCell>           
             <TableCell style={{color:"white"}} align="center" >x</TableCell>
            <TableCell style={{color:"white"}} align="center" >y</TableCell>
            <TableCell style={{color:"white"}} align="center" >z</TableCell>
           

 
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.valores.map(jacobi => (
            <TableRow key={jacobi.i}>
              <TableCell component="th" scope="row"> {jacobi.i} </TableCell>
              <TableCell align="center">{jacobi.x}</TableCell>
              <TableCell align="center">{jacobi.y}</TableCell>
              <TableCell align="center">{jacobi.z}</TableCell>
          

                         
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}