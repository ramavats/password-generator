import React, { Component } from 'react';

class PasswordGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      length: 12,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
    };
  }

  generatePassword = () => {
    const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = this.state;
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let validChars = '';

    if (includeUppercase) validChars += uppercaseChars;
    if (includeLowercase) validChars += lowercaseChars;
    if (includeNumbers) validChars += numberChars;
    if (includeSymbols) validChars += symbolChars;

    let newPassword = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      newPassword += validChars[randomIndex];
    }

    this.setState({ password: newPassword });
  };

  handleInputChange = (event) => {
    const { name, type, value, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    this.setState({ [name]: newValue });
  };

  handleLengthChange = (event) => {
    this.setState({ length: event.target.value });
  };


  render() {
    return (
      <div>
        <h1 className='bg-black text-white text-center text-2xl p-2 mb-2'>Password Generator</h1>
        <div>
          <label>Password Length: {this.state.length}</label>
          <input
            type="range"
            name="length"
            min="8"
            max="32"
            value={this.state.length}
            onChange={this.handleLengthChange}
          />
        </div>
        <div>
          <label>Include Uppercase:</label>
          <input
            type="checkbox"
            name="includeUppercase"
            checked={this.state.includeUppercase}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Include Lowercase:</label>
          <input
            type="checkbox"
            name="includeLowercase"
            checked={this.state.includeLowercase}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Include Numbers:</label>
          <input
            type="checkbox"
            name="includeNumbers"
            checked={this.state.includeNumbers}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Include Symbols:</label>
          <input
            type="checkbox"
            name="includeSymbols"
            checked={this.state.includeSymbols}
            onChange={this.handleInputChange}
          />
        </div>
        <button onClick={this.generatePassword}>Generate Password</button>
        <div>
          <label>Password:</label>
          <input type="text" value={this.state.password} readOnly />
        </div>
      </div>
    );
  }
}

export default PasswordGenerator;
