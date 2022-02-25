import React from "react";
import Paper from '@material-ui/core/Paper';
import Typography from "@mui/material/Typography";

export default function Job({job, onClick}) {
    return (
        <Paper onClick={onClick} className="job">
            <div className="flex-align-mid">
                <div className='job-title-location'>
                    <Typography variant='h6'>{job.title}</Typography>
                    <Typography variant='h5'>{job.company_name}</Typography>
                    <Typography variant='h7'>{job.location}</Typography>
                </div>
            </div>
            <div className="flex-align-mid">
                <Typography>{job.detected_extensions.posted_at}</Typography>
            </div>
        </Paper>
    )
}
