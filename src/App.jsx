import { useState, useEffect, useRef } from "react";

const content = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 250,
}

const span = {
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#fff',
  fontFamily: 'monospace',
  marginBottom: 10,
  paddingTop: 25,
  width: 200,
  height: 50,
  borderRadius: 50,
  fontSize: 20,
}

const input = {
  textAlign: 'center',
  border: 'none',
  width: 200,
  height: 60,
  borderRadius: 50,
  marginBottom: 10,
}

const button = {
  textAlign: 'center',
  border: 'none',
  width: 200,
  height: 70,
  borderRadius: 50,
  marginBottom: 10,
}

const mapParent = {
  textAlign: "center",
  marginTop:100,
}

const result = {
  color: '#fff',
}
function App() {
  var [array, setArray] = useState([]);
  var [sortHistory, setSortHistory] = useState([[...array]]);
  var [looping, setLooping] = useState(0);
  const [playing, setPlaying] = useState(false);
  var size = array.length;
  const timeoutRef = useRef();
  console.log(array, sortHistory);
  useEffect(() => {
    setArray(sortHistory[looping]);
  }, [looping, sortHistory]);

  useEffect(() => {
    if (looping < sortHistory.length - 1 && playing) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setLooping(looping + 1);
      }, 500);
    } else {
      setPlaying(false);
    }
  }, [looping, playing]);

  const play = () => {
    setPlaying(true);
  };

  const handleChange = (e) => {
    var val = e.target.value;
    setArray(val.split(",").map((i) => Number(i)));
  };

  const bubblesort = () => {
    var historyArray = [[...array]];
    for (let i = 0; i < size - 1; i++) {
      for (let j = 0; j < size - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          var swap = array[j];
          array[j] = array[j + 1];
          array[j + 1] = swap;
          historyArray.push([...array]);
        }
      }
    }
    setSortHistory(historyArray);
    play();
  };

  return (
    <div>
      <div style={content}>
        <span style={span}>Type some number</span>
        <input style={input} type="text" onChange={handleChange}/>
        <button style={button} onClick={bubblesort}>Bubble Sort!</button>
      </div>
      <div style={mapParent}>
        {array.map((element) => (
          <div style={result}>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
