import React from 'react';
import './App.css';
import Jobs from './Jobs';

const port = process.env.PORT || 3001;
const GET_JOB_URL = 'http://0.0.0.0:' + port + '/api/jobs';

async function fetchJobs(updateCallBack) {
    const res = await fetch(GET_JOB_URL);
    const json = await res.json();
    updateCallBack(json);
}

function App() {
  const [jobList, updateJobs] = React.useState([]);

  React.useEffect(() => {
      fetchJobs(updateJobs);
  }, [])

  return (
    <div className="App">
        <Jobs jobs={jobList}/>
    </div>
  );
}

export default App;
