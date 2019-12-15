import  React  from 'react'
 
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { Button } from '@material-ui/core';


function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export default function SnackBar (props){

          return (             
           
         
               <div>
                   <Snackbar
                    open={(props.mensaje!=="")}
                    onClose={props.handleClose}
                    TransitionComponent={SlideTransition}
                    autoHideDuration={3000}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}

                    message={<span id="message-id">{props.mensaje}</span>}

                    action={
                      <Button color="inherit" size="small" onClick={props.handleClose}>
                        Aceptar
                      </Button>
                    }
                     />
           
               </div>
          
        );

}

