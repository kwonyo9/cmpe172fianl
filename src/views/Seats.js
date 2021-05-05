import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { MdEventSeat } from 'react-icons/md'
class Seats extends Component {
  constructor () {
    super()
    this.state = {
      Selected: [],
      user: {}
    }
  }
  componentDidMount = () => {
    let loginUser = JSON.parse(localStorage.getItem('user'))
    if (!loginUser) {
      this.props.history.push('/')
    }
    this.setState({ user: loginUser })
    let seats = fetch('http://localhost:5000/seats/')
      .then(res => res.json())
      .then(data => {
        this.setState({ Selected: data })
      })
  }
  addtoSelected = e => {
    const id = e.target.id || e.target.parentNode.id
    let { Selected } = this.state
    let foundExisting = Selected.find(
      el => el.seatID === id && el.userID === this.state.user.id
    )
    if (foundExisting) {
      fetch('http://localhost:5000/seats/' + foundExisting._id, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(result => {
          Selected.splice(
            Selected.indexOf(Selected.filter(el => el._id === result._id)[0]),
            1
          )
          this.setState({ Selected })
        })
    } else {
      let foundExisting = Selected.find(el => el.seatID === id)
      if (foundExisting) {
        alert('this seat is already reserved')
      } else {
        fetch('http://localhost:5000/seats/register', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({ seatID: id, userID: this.state.user.id }) // body data type must match "Content-Type" header
        })
          .then(res => res.json())
          .then(data => {
            let { Selected } = this.state
            Selected.push(data)
            this.setState({ Selected })
          })
      }
    }
  }
  colorChecker = (seatID, userID) => {
    let { Selected } = this.state
    let found = Selected.find(seat => {
      return seat.seatID === seatID
    })
    if (found) {
      if (found.userID === userID) {
        return 'same'
      } else {
        return 'other'
      }
    }
  }
  logout = () => {
    localStorage.clear()
    this.props.history.push('/')
  }
  render () {
    return (
      <header className='container-fluid'>
        <center>
          <Link to='/'>Home</Link>
        </center>
        <div className='text-right'>
          <button className='btn btn-dander' onClick={this.logout}>
            Logout
          </button>
        </div>
        <div className='container p-5'>
          <div className='row text-center'>
            <div className='col-md-3'>
              <h5 className='text-center'>Row A</h5>
              {new Array(10).fill(0).map((item, outer) => {
                return (
                  <React.Fragment key={outer + 'index'}>
                    {outer + 1 + '-'}
                    {new Array(7).fill(0).map((item, inner) => {
                      return (
                        <MdEventSeat
                          key={`firstrow${outer}${inner}`}
                          onClick={this.addtoSelected}
                          color={
                            this.colorChecker(
                              `firstrow${outer}${inner}`,
                              this.state.user.id
                            ) === 'same'
                              ? 'green'
                              : this.colorChecker(
                                  `firstrow${outer}${inner}`,
                                  this.state.user.id
                                ) === 'other'
                              ? 'red'
                              : ''
                          }
                          id={`firstrow${outer}${inner}`}
                          className='md-18'
                          size='37px'
                        ></MdEventSeat>
                      )
                    })}
                    <br />
                  </React.Fragment>
                )
              })}
            </div>
            <div className='col-md-6'>
              <h5 className='text-center'>Row B</h5>
              {new Array(10).fill(0).map((item, outer) => {
                return (
                  <React.Fragment key={outer + 'middle'}>
                    {new Array(10).fill(0).map((item, inner) => {
                      return (
                        <MdEventSeat
                          key={`middlerow${outer}${inner}`}
                          onClick={this.addtoSelected}
                          color={
                            this.colorChecker(
                              `middlerow${outer}${inner}`,
                              this.state.user.id
                            ) === 'same'
                              ? 'green'
                              : this.colorChecker(
                                  `middlerow${outer}${inner}`,
                                  this.state.user.id
                                ) === 'other'
                              ? 'red'
                              : ''
                          }
                          id={`middlerow${outer}${inner}`}
                          className='md-18'
                          size='37px'
                        ></MdEventSeat>
                      )
                    })}
                    <br />
                  </React.Fragment>
                )
              })}
            </div>
            <div className='col-md-3'>
              <h5 className='text-center'>Row C</h5>
              {new Array(10).fill(0).map((item, outer) => {
                return (
                  <React.Fragment key={outer + 'lastrow'}>
                    {new Array(7).fill(0).map((item, inner) => {
                      return (
                        <MdEventSeat
                          key={`lastrow${outer}${inner}`}
                          onClick={this.addtoSelected}
                          color={
                            this.colorChecker(
                              `lastrow${outer}${inner}`,
                              this.state.user.id
                            ) === 'same'
                              ? 'green'
                              : this.colorChecker(
                                  `lastrow${outer}${inner}`,
                                  this.state.user.id
                                ) === 'other'
                              ? 'red'
                              : ''
                          }
                          id={`lastrow${outer}${inner}`}
                          className='md-18'
                          size='37px'
                        ></MdEventSeat>
                      )
                    })}
                    <br />
                  </React.Fragment>
                )
              })}
            </div>
            <div className='col-md-12 mt-5 screen'>
              <h4>Screen</h4>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Seats
