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

  componentDidMount() {
    // Generate the initial password when the component mounts.
    this.generatePassword();
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
    this.setState({ [name]: newValue }, () => {
      // Regenerate the password whenever input values change.
      this.generatePassword();
    });
  };

  handleLengthChange = (event) => {
    this.setState({ length: event.target.value }, () => {
      // Regenerate the password whenever the length changes.
      this.generatePassword();
    });

  };

  handleCopyClick = () => {
    const { password } = this.state;

    if (password) {
      // Create a textarea element to facilitate copying.
      const textarea = document.createElement('textarea');
      textarea.value = password;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      alert('Password copied to clipboard');
    }
  };


  render() {
    return (
      <div>
        <h1 className='bg-black text-white text-center text-2xl p-2'>Password Generator</h1>
        <div className='flex justify-center items-center p-2'>
          <div className='flex justify-center items-center bg-green-700 rounded-full px-2'>
          <input type="text" value={this.state.password} readOnly />
          </div>
          
        </div>
        <div>
          <label>Password Length: {this.state.length}</label>
          <input
            type="range"
            name="length"
            min="8"
            max="30"
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
        <button onClick={this.handleCopyClick}>Copy Password</button>
      </div>
    );
  }
}

export default PasswordGenerator;
