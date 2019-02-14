import React, { Component } from 'react';
import './Main.css';
import ChatRoom from './ChatRoom'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class Main extends Component {
  constructor(){
    super()
    this.state = {
      mensajeActual: '',
      mensajes:  []
    }
  }

  componentDidMount(){
    // Creo una referencia llamada mensajes
    // .on -> Cada vez que cambien los datos 'value' vamos a recibir un snapshot
    window.firebase.database().ref('mensajes/').on('value', snapshot =>{
      // aquí me traigo los mensajes que están en la base de datos
      const currentMensaje = snapshot.val()
      if(currentMensaje !== null){
        this.setState({
          mensajes: currentMensaje
        })
      }
    })
  }

  handleSubmit = (event) =>{
    event.preventDefault()
    if(this.state.mensajeActual.trim().length > 0){
      const newMensaje = {
        id: this.state.mensajes.length,
        text: this.state.mensajeActual
      }

      window.firebase.database().ref(`mensajes/${newMensaje.id}`).set(newMensaje)
      
      this.setState({
        //mensajes: [...this.state.mensajes, newMensaje],
        mensajeActual: ''
      })

      document.getElementById('campoTextoChat').value = ''
      console.log('Enviando mensaje...')
    }else{
      console.log('No se puede enviar una cadena vacía')
    }
  }

  /**
   * Manejo del imput text. Los códigos de las teclas se
   * pueden encontrar en:
   * https://keycode.info/
   */
  handleKeyUp = (event) =>{
    this.setState({
      mensajeActual: event.target.value
    })
    if(event && event.keyCode === 13){
      console.log('Mensaje: ' + this.state.mensajeActual)
      event.target.value = ''
    }
  }

  render() {
    return (
      <div className="Main">
        <Grid 
          container  
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
          style={{ minHeight: '100vh' }}
        >
          <Paper 
            className="paper"
            lg={12}
            style={{padding: '16px'}}
          >
            <Grid 
              container
              lg={12} 
              spacing={8} 
              direction="row" 
              justify="flex-start"
            >
              <Grid item xl={2} lg={2} >
                <img 
                  src="./img/ico.png" 
                  style={{marginTop: '6px'}}
                />
              </Grid>
              <Grid item xl={10} lg={10} >
                <Typography variant="h4">
                  Chat con React y Firebase
                </Typography>
                <Typography variant="subtitle1">
                  Déjame un saludo:
                </Typography>
              </Grid>
            </Grid>
            <ChatRoom 
              mensajes={this.state.mensajes}
              handleSubmit={this.handleSubmit}
              handleKeyUp={this.handleKeyUp}
            />
          </Paper >
        </Grid>
      </div>
    );
  }
}

export default Main;
