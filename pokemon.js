import React, { useEffect, useState } from 'react'
import axios from "axios";
import { CircularProgress, Typography, Button } from '@material-ui/core';
import { ThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';



const font = createMuiTheme({
  typography: {
    fontFamily: [
      'Chilanka',
      'cursive',
    ].join(','),
    
  },
    
});
  const styles = {
    h1: {
      marginTop: "auto",
      color: '#dcdcdc',
      textAlign: 'center'
    },
    h3: {
      color: '#dcdcdc',
      textAlign: 'center'
    },
    h6: {
      color: '#dcdcdc',
      textAlign: 'center'
    },
    body1: {
      color: '#dcdcdc',
      textAlign: 'center'
    },
    body2: {
      color: '#dcdcdc',
      textAlign: 'center'
    },

  };


  const CustomTypography = withStyles(styles)(Typography);


function firstUppercase(name){
  
  return name.charAt(0).toUpperCase() + name.slice(1);
  }
  
export default function Pokemon(props) {
  const {history, match} = props;
  const {params} = match;
  const {pokemonId} = params;
  const [pokedata, setdata] = useState(undefined);

  useEffect(() => {

    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
    .then(function(response){
      const {data} = response;
       setdata(data);
  })
  .catch(function(error){
    setdata(false);
  })
  }, [pokemonId])


  function pokemonStats(pokedata){
     const {id, name, height, species,weight, types,sprites} = pokedata;
    
     console.log(id)
     const images = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
     const {front_default} = sprites;

     return(
       <ThemeProvider theme = {font}>
       <>
        
       <CustomTypography variant = "h1">
           {`${firstUppercase(name)}`}
      
       </CustomTypography>
       <img src={images} style={{width : "100%", height: "500px"  }}  />
        <CustomTypography variant='h3'>Info</CustomTypography>
        <CustomTypography variant = 'body1' >Weight : {weight}</CustomTypography>
        <CustomTypography variant = 'body1' >Height : {height}</CustomTypography>
        <CustomTypography variant='h6'>Types:</CustomTypography>
        {types.map((info) => {
          const {type} = info;
            const {name} = type;
            return <CustomTypography variant = 'body2' key= {name}>{`${name}`}</CustomTypography>})}
      
      </>
      </ThemeProvider>

     )
  }



  return (
   <>
   {pokedata == undefined && <CircularProgress /> }
   {pokedata !== undefined && pokemonStats(pokedata) }
   {pokedata == false && <Typography>Not found </Typography> }
   {pokedata !== undefined && (
     <Button  style = {{display: "block", margin:"auto", marginTop: "5px"}} variant = "contained" onClick={() => history.push("/")}>
       Back to pokemon list
     </Button>
   ) }
     
   </>
  );
}
