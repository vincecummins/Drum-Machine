import './App.css';
import Pad from './components/Pad'
import { useState } from 'react'
import Switch from "react-switch";


const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

function App() {
  const [volume, setVolume] = useState(1);
  const [history, sethistory] = useState('');
  const [bank, setbank] = useState(bankOne)
  const [checked, setchecked] = useState(true)
  const [console, setconsole] = useState('')


  const playHistory = () => {
    let index = 0;
    let historyArr = history.split(' ');
    const interval = setInterval(() => {
      const audioTag = document.getElementById(historyArr[index]);
      audioTag.volume = (volume);
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, 300)
    setTimeout(() => {
      clearInterval(interval)
    }, 300 * historyArr.length - 1)
  }

  const checkedUpd = () => {
    setchecked(!checked)
    if (!checked) {
      setconsole('power on')
    } else {
      setconsole('power off')
      setTimeout(() => setconsole(''), 2000)
    }
  }

  return (
    <div className="bg-info min-vh-100 text-white text-center" id="drum-machine">
      <div id="display">
        {console}
        <div className="text-center p-4">
          <h1>Drum Machine</h1>
          <div>
            {bank.map((x) => checked &&
              <Pad className="drum-pad" key={x.id} clip={x} volume={volume} setconsole={setconsole} sethistory={sethistory} bank={bank} />
            )}
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="pr-4 pl-4 d-flex">
          <span className="pr-4">Volume</span>
          <input type="range" step="0.01" onChange={(e) => { setVolume(e.currentTarget.value); console.log(volume) }} min="0" max="1" value={volume} className="w-30" />
        </div>
        <div>
          <label className="d-flex align-items-center">
            <span className="pr-4">Power</span>
            <Switch onChange={checkedUpd} checked={checked} />
          </label>
        </div>
      </div>
      <br />
      <div>
        <span className="pr-4">
          <label for="bank1rad" className="pr-2">Bank 1</label><input type="radio" value="" onClick={() => {setbank(bankOne); setconsole('drum bank')}} id="bank1rad" name="banks" />
        </span>
        <span className="pr-4">
          <label for="bank2rad" className="pr-2">Bank 2</label><input type="radio" value="" onClick={() => {setbank(bankTwo); setconsole('piano bank')}} id="bank2rad" name="banks" />
        </span>
      </div>
      <br />
      <div class="btn btn-primary p-4 w-50">{console}</div>
      <br /><br />
      <h2>{history}</h2><br />
      {history && (
        <>
          <button className="btn btn-success btn-sm" onClick={playHistory}>Play</button>
          <button className="btn btn-danger btn-sm" onClick={() => sethistory('')}>Clear</button>
        </>
      )}
    </div>

  );
}

export default App;
