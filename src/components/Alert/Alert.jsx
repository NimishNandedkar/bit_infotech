import React from 'react'
import { Alert } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'

function Alertjsx({open, handleClose, severity, message }) {
   
    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',

                }}
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}>

                <Alert className='mt-14' variant='filled' color={severity}  onClose={handleClose} severity={severity} >
                    <p> {message}</p>
                </Alert>

            </Snackbar>
        </>
    )
}

export default Alertjsx