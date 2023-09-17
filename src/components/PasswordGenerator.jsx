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
      isCopied: false,
      isSpinning: false,
    };
  }

  componentDidMount() {
    // Generate the initial password when the component mounts.
    this.generatePassword();
  }

  generatePassword = () => {
    this.setState({ isSpinning: true });
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
    setTimeout(() => {
      this.setState({ isSpinning: false }, () => {
        this.checkPasswordStrength();
      });
    }, 500);
  };

  checkPasswordStrength = () => {
    const { password } = this.state;

    const minLength = 10;
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
        message = 'Weak';
        break;
      case 'medium':
        message = 'Medium';
        break;
      case 'strong':
        message = 'Strong';
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
      <section className='flex flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black h-[80vh] lg:p-56 p-10'>
        <div className='lg:text-7xl font-inter tracking-tight text-5xl text-center font-bold bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 text-transparent bg-clip-text'>Stronger Passwords, One Click Away!</div>
        <button className='bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 py-3 px-6 font-inter rounded-lg mt-20 font-extrabold text-gray-800'>Use GenPass</button>
      </section>
      <section className='flex flex-col gap-5 justify-center items-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 h-auto pt-10'>
        <h1 className='text-white p-5 font-extrabold lg:text-4xl md:text-3xl leading-tight text-2xl text-center font-inter px-10 lg:px-48 drop-shadow-md'>
        Effortlessly create a robust, randomly generated password using the user-friendly GenPass online tool.
        </h1>
        <div className='flex justify-between items-center rounded-lg drop-shadow-lg md:w-[60%] w-[90%] lg:py-5 py-4 px-5 bg-white'>
        <input type="text" placeholder="Type here" className="input p-2 bg-transparent w-full font-mono md:text-3xl text-xl" value={this.state.password} readOnly />
        <div className='flex items-center gap-3 text-black pl-4'>
        {this.state.isCopied ? (
                < FiCheck className='h-5 w-5 lg:h-6 lg:w-7' onClick={this.handleCopyClick} />
              ) : (
                < FiCopy className='h-5 w-5 lg:h-6 lg:w-7' onClick={this.handleCopyClick} />
              )
        }
        
        < FiRefreshCw className={`h-5 w-5 lg:h-6 lg:w-6 ${this.state.isSpinning ? 'animate-spin' : ''}`} onClick={this.generatePassword} />
        </div>
        </div>

        {/* Second Section  */}
        <div className='flex flex-col md:w-[60%] w-[90%] lg:py-4 py-8 px-5 bg-white rounded-xl drop-shadow-xl'>
          <h1 className='text-2xl font-extrabold font-inter'>Customize Password</h1>
          <hr className='mt-2 border-1' />
        <div className='flex justify-start md:gap-10 gap-5 mt-5'>
          <div className='flex flex-col gap-1'>
          <label className='text-lg font-inter'>Password Length</label>
          <div className='flex gap-2'>
          <input type='number' className='w-10 text-center text-lg' value={this.state.length} />
          <input
            type="range"
            name="length"
            min="8"
            max="50"
            value={this.state.length}
            onChange={this.handleLengthChange}
            className='lg:w-96 w-48'
          />
          </div>
          <p className={`uppercase password-strength ${this.state.passwordStrength} font-bold font-inter text-lg`}>
          {`${this.renderPasswordStrengthMessage()} Password`}
          </p>
          </div>
        
        <div className='flex flex-col text-lg font-inter justify-start items-start'>
        <div className='flex gap-2'>
        <input
            type="checkbox"
            name="includeUppercase"
            checked={this.state.includeUppercase}
            onChange={this.handleInputChange}
          />
          <label>Uppercase</label>
        </div>
        <div className='flex gap-2'>
        <input
            type="checkbox"
            name="includeLowercase"
            checked={this.state.includeLowercase}
            onChange={this.handleInputChange}
          />
          <label>Lowercase</label>
          
        </div>
        <div className='flex gap-2'>
        <input
            type="checkbox"
            name="includeNumbers"
            checked={this.state.includeNumbers}
            onChange={this.handleInputChange}
          />
          <label>Numbers</label>
          
        </div>
        <div className='flex gap-2'>
        <input
            type="checkbox"
            name="includeSymbols"
            checked={this.state.includeSymbols}
            onChange={this.handleInputChange}
          />
          <label>Symbols</label>
        </div>
        </div>
        </div>
        </div>

        <div className='flex gap-5 pb-3'>
        <button className='bg-black px-6 py-3 rounded-xl text-white font-inter font-medium' onClick={this.generatePassword}>Generate</button>
        <button className='bg-green-600 px-6 py-3 rounded-xl text-white font-inter font-medium' onClick={this.handleCopyClick}>{this.state.isCopied ? 'Copied' : 'Copy' }</button>
        </div>
        </section>
      </>
    );
  }
}

export default PasswordGenerator;
