import {useEffect, useState, useCallback} from 'react';
import {AppBar,Grid,fade, makeStyles, Toolbar,Card, CardContent,TextField, CircularProgress,CardMedia, Typography, Button} from "@material-ui/core"
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";


const font = createMuiTheme({
  typography: {
    fontFamily: [
      'Chilanka',
      'cursive',
    ].join(','),
  },
    
});

const styles = makeStyles(theme => ({
mainlist:{
  paddingTop: "20px",
  paddingRight: "50px",
  paddingLeft: " 50px",
  
  
},
cards:{
    backgroundColor: "white",
    color: "black",
},
cardMedia:{
  margin: "auto",
},
cardContent:{
  textAlign: "center",
  backgroundcolor: "black",
},
search:{
  display: "flex",
  backgroundColor: fade(theme.palette.common.white, 0.2),
  marginRight: theme.spacing(3),
  marginLeft: theme.spacing(3),
  width : "100%",
  paddingLeft: "20px",
  paddingright : "20px",
  marginTop : "5px",
  marginBottom : "5px",
  alignItems:'center', justifyContent:'center'
},
searchIcon: {
  alignSelf: "flex-end",
  marginTop: "5px",
 
},
searchbox: {
  width: "300%",
  margin : "2px",
  
},
btn: {
  marginTop: "5px",
  display: 'block',
  margin: "auto",
  border: "2px solid"
 
},
}));



function firstUppercase(name){
  
return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function Pokedex(props) {
  const classes = styles();
  const [pokeData, setPokeData] = useState({});
  const [filter, setFilter] = useState("");
  const [visible, setVisible] = useState(20);
  const {history} =props;

  

  
 const loadMore = () =>{
   setVisible((prevValue) => prevValue + 10)
 }



  const handleSearch = (event) =>{
    setFilter(event.target.value);
  }


  useEffect(() =>{
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100`)
    .then(function(response){
      const {data} = response;
      const {results} = data;
      const ColPokeData = {};
      results.forEach((pokemon,indx) => {
              
        ColPokeData [indx+1]= {

        id: indx + 1,
        name: pokemon.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${indx+1}.png`,
        
        };

      });
      setPokeData(ColPokeData);

    });
    


  }, []);

  
  const Pokecard = (pokemonId) => {
    const {id,name,sprite} = pokeData[pokemonId];
    
   
    
   
   
    
      return(
        <ThemeProvider theme = {font} >
          
            <Grid item xs = {4} key = {pokemonId}>
                 <Card className = {classes.cards} onClick ={() => history.push(`/${pokemonId}`) } > 
                   <CardMedia 
                    className = {classes.cardMedia}
                    image = {sprite} 
                    style= {{width: "130px", height: "130px" }} />
                   <CardContent
                      className = {classes.cardContent} >
                     
                      
                      <Typography>{`${id}. ${firstUppercase(name)}`}</Typography>
                      

                        
                    </CardContent>
                 </Card>
            </Grid>
          
            </ThemeProvider>
      ) ;
      
  }
    
 

    return (
      <>
      
      <AppBar position="static"  style={{ background: 'transparent', boxShadow: 'none'}}>
          <Toolbar>
                <div className = {classes.search}>

                  <SearchIcon className = {classes.searchIcon}/>
                  <TextField
                   onChange = {handleSearch} 
                  className ={classes.searchbox}
                  label= "Search for pokemon"
                        
                  >
                  </TextField>
          


                </div>
            </Toolbar>
        </AppBar>
        <div className= {classes.wrap}>
        {pokeData ? (
          <>
          <Grid container spacing ={2} className = {classes.mainlist} >
          {Object.keys(pokeData).slice(0,visible).map((pokemonId) => 
            pokeData[pokemonId].name.includes(filter) &&
            Pokecard(pokemonId)
            
           )}

            
          </Grid>
          
          <Button  onClick = {loadMore} className = {classes.btn} variant = "contained">Load more</Button>
            </>
        ): (
          <CircularProgress />

        )}
        </div>
     
       
        
          

      </>
       
  )
}
