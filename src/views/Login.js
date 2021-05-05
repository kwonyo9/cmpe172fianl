import React, { Component } from 'react'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      login: {},
      register: {
        password: '',
        repeatPassword: ''
      },
      side: 'login'
    }
  }
  changeHandler = e => {
    let formType = this.state[e.target.getAttribute('data-form-type')]
    formType[e.target.name] = e.target.value
    this.setState({ [e.target.getAttribute('data-form-type')]: formType })
  }
  login = e => {
    e.preventDefault()
    fetch('http://localhost:5000/user/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(this.state.login) // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .then(data => {
        if (!data.emailnotfound && !data.passwordincorrect) {
          localStorage.setItem('user', JSON.stringify(data))
          this.props.history.push('/dashboard')
        } else {
          alert(data.emailnotfound || data.passwordincorrect)
        }
      })
  }
  register = e => {
    e.preventDefault()
    if (
      this.state.register.password &&
      this.state.register.password != '' &&
      this.state.register.repeatPassword &&
      this.state.register.repeatPassword != ''
    )
      fetch('http://localhost:5000/user/register', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(this.state.register) // body data type must match "Content-Type" header
      })
        .then(res => res.json())
        .then(data => {
          this.setState({ side: 'login' })
        })
  }
  flipcard = e => {
    let side = this.state.side
    side = e.target.value
    this.setState({ side })
  }
  render () {
    return (
      <div className='container p-5'>
        <div className='row'>
          <div className='col-md-6 mx-auto p-0'>
            <div className='card'>
              <div className='login-box'>
                <div className='login-snip'>
                  <input
                    id='tab-1'
                    type='radio'
                    name='tab'
                    className='sign-in'
                    value='login'
                    checked={this.state.side === 'login'}
                    onChange={this.flipcard}
                  />
                  <label htmlFor='tab-1' className='tab'>
                    Login
                  </label>{' '}
                  <input
                    id='tab-2'
                    type='radio'
                    name='tab'
                    className='sign-up'
                    value='register'
                    checked={this.state.side === 'register'}
                    onChange={this.flipcard}
                  />
                  <label htmlFor='tab-2' className='tab'>
                    Register
                  </label>
                  <div className='login-space'>
                    <div className='login'>
                      <div className='group'>
                        {' '}
                        <label htmlFor='user' className='label'>
                          Email
                        </label>{' '}
                        <input
                          id='user'
                          type='text'
                          className='input'
                          placeholder='Enter your username'
                          data-form-type='login'
                          name='email'
                          onChange={this.changeHandler}
                        />{' '}
                      </div>
                      <div className='group'>
                        {' '}
                        <label htmlFor='pass' className='label'>
                          Password
                        </label>{' '}
                        <input
                          id='pass'
                          type='password'
                          className='input'
                          data-type='password'
                          placeholder='Enter your password'
                          data-form-type='login'
                          name='password'
                          onChange={this.changeHandler}
                        />{' '}
                      </div>
                      <div className='group'>
                        {' '}
                        <input
                          type='submit'
                          className='button'
                          value='Sign In'
                          onClick={this.login}
                        />{' '}
                      </div>
                      <div className='hr'></div>
                      <div className='foot'>
                        {' '}
                        <a href='#'>Forgot Password?</a>{' '}
                      </div>
                    </div>
                    <div className='sign-up-form'>
                      <div className='group'>
                        {' '}
                        <label htmlFor='user' className='label'>
                          Username
                        </label>{' '}
                        <input
                          id='user'
                          type='text'
                          className='input'
                          placeholder='Create your Username'
                          data-form-type='register'
                          name='username'
                          onChange={this.changeHandler}
                        />{' '}
                      </div>
                      <div className='group'>
                        {' '}
                        <label htmlFor='pass' className='label'>
                          Password
                        </label>{' '}
                        <input
                          id='pass'
                          type='password'
                          className='input'
                          data-type='password'
                          placeholder='Create your password'
                          data-form-type='register'
                          name='password'
                          onChange={this.changeHandler}
                        />{' '}
                      </div>
                      <div className='group'>
                        {' '}
                        <label htmlFor='pass' className='label'>
                          Repeat Password
                        </label>{' '}
                        <input
                          id='pass'
                          type='password'
                          className='input'
                          data-type='password'
                          placeholder='Repeat your password'
                          data-form-type='register'
                          name='repeatPassword'
                          onChange={this.changeHandler}
                        />{' '}
                      </div>
                      <div className='group'>
                        {' '}
                        <label htmlFor='pass' className='label'>
                          Email Address
                        </label>{' '}
                        <input
                          id='pass'
                          type='email'
                          className='input'
                          placeholder='Enter your email address'
                          data-form-type='register'
                          name='email'
                          onChange={this.changeHandler}
                          required={true}
                        />{' '}
                      </div>
                      <div className='group'>
                        {' '}
                        <input
                          type='submit'
                          className='button'
                          value='Sign Up'
                          onClick={this.register}
                        />{' '}
                      </div>
                      <div className='hr'></div>
                      <div className='foot'>
                        {' '}
                        <label htmlFor='tab-1'>Already Member?</label>{' '}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
