import React from 'react'
import logo from '../assets/demonslayer.png'
import logo2 from '../assets/mortalkombat.png'
import logo3 from '../assets/godzilla.jpg'
import logo4 from '../assets/download.jpg'
import { Link } from 'react-router-dom'
import '../App.css'

const Movie = () => {
  return (
    <div className='App'>
      <header className='App-header text-center container-fluid pt-5'>
        <h4>Now Playing</h4>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <Link to='/seats'>
                <img src={logo} className='App-logo' alt='Demonslayer' />{' '}
              </Link>
            </div>
            <div className='col-md-3'>
              <Link to='/seats'>
                <img src={logo2} className='App-logo' alt='Mortal Kombat' />{' '}
              </Link>
            </div>
            <div className='col-md-3'>
              <Link to='/seats'>
                <img src={logo3} className='App-logo' alt='Godzilla vs Kong' />{' '}
              </Link>
            </div>
            <div className='col-md-3'>
              <Link to='/seats'>
                <img src={logo4} className='App-logo' alt='Godzilla vs Kong' />{' '}
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Movie
