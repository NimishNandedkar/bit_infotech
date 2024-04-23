import React from 'react'
import { Alert, duration } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'

function Alertjsx({open, handleClose, severity, message, duration}) {
   
    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',

                }}
                open={open}
                autoHideDuration= {8000}
                onClose={handleClose}>

                <Alert className='mt-14' variant='filled' color={severity}  onClose={handleClose} severity={severity} >
                    <p> {message}</p>
                </Alert>

            </Snackbar>
        </>
    )
}

export default Alertjsx