import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


function ChatRoom (props){
    const inputProps = {
        onKeyUp: props.handleKeyUp
    };
    const theme = createMuiTheme({
        palette: {
          primary: blue,
        }
    });
    return(
        <div className="ChatRoom">
            <Typography variant="body1">
                <ol>
                    {
                        props.mensajes.map(mensaje => {
                            return(
                                <li key={mensaje.id}>
                                    {mensaje.text}
                                </li>
                            )
                        })
                    }
                </ol>
            </Typography>
            <form 
                onSubmit={props.handleSubmit}
                style={{float:'right'}}
            >
                <TextField 
                    id="campoTextoChat" 
                    inputProps={inputProps} 
                    placeholder="Mensaje" 
                />
                 <MuiThemeProvider theme={theme}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        size="small"
                    >Enviar</Button>
                 </MuiThemeProvider>
            </form>
        </div>
    )
}

export default ChatRoom;