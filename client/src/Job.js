import React from "react";
import Typography from "@mui/material/Typography";

export default function Job({job}) {
    return (
        <div className={"job"}>
            {job.title}
            {job.company}
        </div>
    )
}
