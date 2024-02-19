import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HighlightedText from './components/HighlightedText/HighlightedText';


function App() {

  const [input, setInput] = useState<string | null>(null);
  const [compare, setCompare] = useState<string | null>(null);
  const [lcs, setLcs] = useState<string | null>(null);
  const handleClick = () => {
    const data = (input && compare) ? { input, compare } : { error: "Invalid" };
    fetch("https://diff-utility.vercel.app/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        setLcs(data.lcsStr as string);
      })
      .catch((err: any) => {
        console.log(err);
      })
  };
  return (
    <div className="App">
      <Navbar />
      {
        lcs && compare && input &&
        <div className='text'>
          <HighlightedText original={input} lcs={lcs} />
          <HighlightedText original={compare} lcs={lcs} />
        </div>
      }

      <div className="inputs">
        <textarea className="input-text" placeholder="Write some text..." onChange={(e) => { setInput(e.target.value) }} />
        {<textarea className="input-text" placeholder='Write the text you want to compare...' onChange={(e) => { setCompare(e.target.value) }} />}
      </div>
      <div className='btn'>
        <button type="submit" className="btn" onClick={handleClick}>Compare</button>
      </div>
    </div>
  );
}

export default App;
