
import React from 'react'


import Typography from '@material-ui/core/Typography';

import Link from '@material-ui/core/Link';


export default function Copyright() {
    return (
      <Typography variant="h6" color="textSecondary" align="center">
        {'© Universidad Córdoba - Colombia '} {new Date().getFullYear()}{'    '}
    
        <Link color="primary" href="https://github.com/juanmar021">
         Repositorio oficial
        </Link>{' '}
        
      </Typography>
    );
  }