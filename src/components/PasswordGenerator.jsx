import React, { Component, Fragment } from 'react';
import { FiRefreshCw, FiCopy, FiCheck } from 'react-icons/fi'

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
      isCopied: false, // Added state to track whether password is copied
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

    this.setState({ password: newPassword }, () => {
      this.checkPasswordStrength();
    });
  };

  checkPasswordStrength = () => {
    const { password } = this.state;

    const minLength = 8;
    const minUpperCase = 1;
    const minLowerCase = 1;
    const minNumbers = 1;
    const minSymbols = 1;

    const isLengthValid = password.length >= minLength;
    const isUpperCaseValid = /[A-Z]/.test(password) && password.match(/[A-Z]/g).length >= minUpperCase;
    const isLowerCaseValid = /[a-z]/.test(password) && password.match(/[a-z]/g).length >= minLowerCase;
    const isNumbersValid = /[0-9]/.test(password) && password.match(/[0-9]/g).length >= minNumbers;
    const isSymbolsValid = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password) && password.match(/[!@#$%^&*()_+[\]{}|;:,.<>?]/g).length >= minSymbols;

    if (isLengthValid && isUpperCaseValid && isLowerCaseValid && isNumbersValid && isSymbolsValid) {
      this.setState({ passwordStrength: 'strong' });
    } else if (isLengthValid && ((isUpperCaseValid && isLowerCaseValid) || (isLowerCaseValid && isNumbersValid) || (isNumbersValid && isSymbolsValid))) {
      this.setState({ passwordStrength: 'medium' });
    } else {
      this.setState({ passwordStrength: 'weak' });
    }
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

      // Set the state to indicate that the password is copied.
      this.setState({ isCopied: true });

      // Reset the copied state after a short delay (e.g., 3 seconds).
      setTimeout(() => {
        this.setState({ isCopied: false });
      }, 3000);
    }
  };

  renderPasswordStrengthMessage = () => {
    const { passwordStrength } = this.state;

    let message = '';

    switch (passwordStrength) {
      case 'weak':
        message = 'Weak password! Try to make it stronger.';
        break;
      case 'medium':
        message = 'Medium strength password. You can improve it.';
        break;
      case 'strong':
        message = 'Strong password! Well done.';
        break;
      default:
        message = '';
    }

    return message;
  };


  render() {
    return (
      <>
      <nav>
        <div className='bg-black flex justify-center items-center p-2'>
          <h1 className='text-2xl text-white'>GenPass</h1>
        </div>
      </nav>
      <section className='flex flex-col justify-center items-center bg-gray-800 h-[80vh]'>
        <div className='text-8xl text-center font-bold bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 text-transparent bg-clip-text'>Stronger Passwords, One Click Away!</div>
        <button className='bg-white p-2 rounded-lg mt-10 font-bold'>Use GenPass</button>
      </section>
      <section className='flex flex-col justify-center items-center mt-10'>
        <div className='flex bg-green-800 lg:w-1/3 w-2/3 justify-between px-5 py-2 rounded-full flex-nowrap'>
        <div className='flex justify-center items-center overflow-hidden '>
          <input className='text-xl' type="text" value={this.state.password} readOnly />
        </div>
        <div className='flex items-center gap-3 text-white'>
        {this.state.isCopied ? (
                < FiCheck className='h-5 w-5 lg:h-6 lg:w-6' onClick={this.handleCopyClick} />
              ) : (
                < FiCopy className='h-5 w-5 lg:h-6 lg:w-6' onClick={this.handleCopyClick} />
              )}
        
        < FiRefreshCw className=' h-5 w-5 lg:h-6 lg:w-6' onClick={this.generatePassword} />
        </div>
        </div>

        {/* Second Section  */}
        <div className='flex justify-center items-center gap-5 m-3 border-2 p-5 rounded-xl border-black flex-col lg:flex-row'>
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
        <div className={`password-strength ${this.state.passwordStrength}`}>
            {this.renderPasswordStrengthMessage()}
          </div>
        <button onClick={this.handleCopyClick}>Copy</button>
        </section>
      </>
    );
  }
}

export default PasswordGenerator;
