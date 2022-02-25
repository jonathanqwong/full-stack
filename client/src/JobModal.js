import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function JobModal({job, open, handleClose}) {

    if(!job.title) {
        return <div></div>
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="alert-dialog-slide-title">
                    <div><img className="company-logo" src={job.thumbnail}/>&nbsp;&nbsp;</div>
                    <div>{job.title} - {job.company_name}</div>
                </DialogTitle>
                <DialogContent className="alert-dialog-slide-description">
                    <div>{job.detected_extensions.schedule_type}</div>
                    <div>{job.location}</div>
                    <DialogContentText dangerouslySetInnerHTML={{__html: job.description}}>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <a href="https://www.google.com/search?q=software+engineers+job&hl=en" target="_blank">
                        <Button>Apply</Button>
                    </a>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
