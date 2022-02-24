import React from 'react';
import Typography from '@mui/material/Typography';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Slide from '@mui/material/Slide';

import Job from './Job';

export default function Jobs({jobs}) {
    /* pagination
       step == 0, show 0-10
       step == 1, show 11-20
    */
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 10);
    const [activeStep, setActiveStep] = React.useState(0);
    const jobsOnPage = jobs.slice(activeStep * 10, (activeStep * 10) + 10);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className="jobs">
            <Typography variant="h4" component="h1">
                Entry Level Software Jobs
            </Typography>
            <Typography variant="h6" component="h2">
                Found {numJobs} Jobs
            </Typography>
            {
                jobsOnPage.map(
                    (job, i) => <Job key={i} job={job}
                    />
                )
            }
            <div className="pagination">
                Page {activeStep + 1} of {numPages}
            </div>

            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === numPages - 1}>
                        Next
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        Back
                    </Button>
                }
            />

            <></>
        </div>
    )
}
