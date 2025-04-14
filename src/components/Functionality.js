import React, { useState, useEffect } from 'react';

export default function Functionality() {

  let [sliderValue, setSliderValue] = useState(15);
  let [password, setPassword] = useState("");
  let [strength, setStrength] = useState("Weak");

  const handleSliderChange = (e) => {
    setSliderValue(Number(e.target.value));
    generatePass(e.target.value);
  };

  const Copy = () =>{
    navigator.clipboard.writeText(password);
  }

  const changeValue = (step) => {
    setSliderValue((prev) => {
      const newValue = prev + step;
      generatePass(newValue);
      if (newValue >= 1 && newValue <= 50) return newValue;
      return prev;
    });
  };

  const [charOptions, setCharOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  useEffect(() => {
    generatePass(sliderValue);
  }, [charOptions]);

  const generatePass = (value) => {

    if(value <= 1){
      value = 1;
    }
    if(value >= 50){
      value = 50;
    }
    let finalCharacters = '';

    if (charOptions.uppercase) finalCharacters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (charOptions.lowercase) finalCharacters += 'abcdefghijklmnopqrstuvwxyz';
    if (charOptions.numbers) finalCharacters += '0123456789';
    if (charOptions.symbols) finalCharacters += '!@#$%^&*()_+{}[]<>?';

    if (finalCharacters === '') {
      setPassword('');
      setStrength("Weak");
      return;
    }

    let generated = '';
    for (let i = 0; i < value; i++) {
      const randomIndex = Math.floor(Math.random() * finalCharacters.length);
      generated += finalCharacters[randomIndex];
    }

    setPassword(generated);

    // Update strength based on slider value
    if (sliderValue < 8) setStrength("Weak");
    else if (sliderValue < 15) setStrength("Medium");
    else setStrength("Strong");
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const checkedCount = Object.values(charOptions).filter(Boolean).length;
    if (!checked && checkedCount === 1) return;

    setCharOptions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className='functionality'>
      <div>
        <div className='pass'>
          <div>
            <input type="text" className='pass-here' placeholder='Password Here!' value={password} disabled />
            <label htmlFor="" className={`strength ${strength.toLowerCase()}`}>{strength}</label>
          </div>
          <button className='btn' onClick={Copy}>Copy</button>
        </div>
      </div>

      <div className='section'>
        <div className='label-text'>
          <p>Password</p>
          <p>Length: <span>{sliderValue}</span></p>
        </div>
        <div className="slider-container">
          <div className="circle-button" onClick={() => changeValue(-1)}>−</div>
          <input
            type="range"
            min="1"
            max="50"
            value={sliderValue}
            onChange={handleSliderChange}
            style={{
              background: `linear-gradient(to right, #fff 0%, #fff ${(sliderValue - 1) * 2}%, #0070f6 ${(sliderValue - 1) * 2}%, #0070f6 100%)`
            }}
          />
          <div className="circle-button" onClick={() => changeValue(1)}>+</div>
        </div>
      </div>

      <div className="section">
        <div className='label-text'>
          <p>Characters</p>
          <p>Used:</p>
        </div>
        <div className="options-container">
          <div className="option">
            <input
              type="checkbox"
              id="uppercase"
              name="uppercase"
              checked={charOptions.uppercase}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="uppercase">ABC</label>
          </div>
          <div className="option">
            <input
              type="checkbox"
              id="lowercase"
              name="lowercase"
              checked={charOptions.lowercase}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="lowercase">abc</label>
          </div>
          <div className="option">
            <input
              type="checkbox"
              id="numbers"
              name="numbers"
              checked={charOptions.numbers}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="numbers">123</label>
          </div>
          <div className="option">
            <input
              type="checkbox"
              id="symbols"
              name="symbols"
              checked={charOptions.symbols}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="symbols">#&$</label>
          </div>
        </div>
      </div>
    </div>
  );
}