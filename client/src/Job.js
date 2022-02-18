import React from "react";
import Typography from "@mui/material/Typography";

export default function Job({job}) {
    return (
        <div className={"job"}>
            <div className="left">{job.title}</div>
            <div className="middle">{job.company_name}</div>
            <div className="right">{job.location}</div>
        </div>
    )
}
