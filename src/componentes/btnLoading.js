import React from 'react';
 import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
 
import './BtnLoading.css'
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin:0,
    width:"100%",
     position: 'relative',
  },
 
  btn:{
    margin: theme.spacing(3, 0, 2),
  },
 
  buttonProgress: {
    color: red[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function ButtonLoading(props) {
  const classes = useStyles();
 

  const handleButtonClick = () => {
    if (!props.loading) {
        props.onClick();
  
    }
  };

  return (
    <div  >      
      <div className={classes.wrapper}>
        <Button 
           fullWidth
           variant="contained"
           color="primary"
           className="MuiButton-label"
           disabled={props.loading}
           onClick={handleButtonClick}
          >
          {props.title}
        </Button>
        {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}