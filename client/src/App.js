import React from 'react';
import './App.css';

import Jobs from './Jobs';

const mockJobs = [
    {title: 'SWE I', company: 'Google'},
    {title: 'SWE I', company: 'Netflix'},
    {title: 'SWE I', company: 'Apple'},
    {title: 'SWE I', company: 'Facebook'},
]

function App() {
  return (
    <div className="App">
        <Jobs jobs={mockJobs}/>
    </div>
  );
}

export default App;
