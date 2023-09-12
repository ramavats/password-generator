import React, { Component, Fragment } from 'react';
import { FiRefreshCw } from 'react-icons/fi'
import { FiCopy } from 'react-icons/fi'

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
      <>
      <nav>
        <div className='bg-black flex justify-center items-center p-2'>
          <h1 className='text-2xl text-white'>GenPass</h1>
        </div>
      </nav>
      <section className='flex flex-col justify-center items-center mt-10'>
        <div className='flex bg-green-800 lg:w-1/3 w-2/3 justify-between px-5 py-2 rounded-full flex-nowrap'>
        <div className='flex justify-center items-center overflow-hidden '>
          <p className='text-xl text-white' type="text" value={this.state.password} readOnly >{this.state.password}</p>
        </div>
        <div className='flex items-center gap-3 text-white'>
        < FiCopy className='h-5 w-5 lg:h-6 lg:w-6' onClick={this.handleCopyClick} />
        < FiRefreshCw className=' h-5 w-5 lg:h-6 lg:w-6' onClick={this.generatePassword} />
        </div>
        </div>

        {/* Second Section  */}
        <div className='flex justify-center items-center gap-5 m-3 border-2 p-5 rounded-xl border-black'>
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
        <div className='flex flex-col justify-start items-start'>
        <div className='flex gap-2'>
        <input
            type="checkbox"
            name="includeUppercase"
            checked={this.state.includeUppercase}
            onChange={this.handleInputChange}
          />
          <label>Include Uppercase:</label>
        </div>
        <div className='flex gap-2'>
        <input
            type="checkbox"
            name="includeLowercase"
            checked={this.state.includeLowercase}
            onChange={this.handleInputChange}
          />
          <label>Include Lowercase:</label>
          
        </div>
        <div className='flex gap-2'>
        <input
            type="checkbox"
            name="includeNumbers"
            checked={this.state.includeNumbers}
            onChange={this.handleInputChange}
          />
          <label>Include Numbers:</label>
          
        </div>
        <div className='flex gap-2'>
        <input
            type="checkbox"
            name="includeSymbols"
            checked={this.state.includeSymbols}
            onChange={this.handleInputChange}
          />
          <label>Include Symbols:</label>
        </div>
        </div>
        </div>
        <button onClick={this.generatePassword}>Generate Password</button>
        <div>
          <label>Password:</label>
          <input type="text" value={this.state.password} readOnly />
        </div>
        <button onClick={this.handleCopyClick}>Copy Password</button>
        </section>
      </>
    );
  }
}

export default PasswordGenerator;
