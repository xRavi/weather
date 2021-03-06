import React, { useState } from 'react';
import { useHttp } from '../hooks/useHttp'
import Temperature from '../components/Temperature';
import CustomDate from '../components/CustomDate';
import logo from '../logo.svg';
import { cities } from '../constants'
import './Homepage.css'

const Homepage = props => {

  const [city, setCity] = useState('');
  const [cityReadyToSearch, setCityReadyToSearch] = useState(null);
  const [weatherTimeSlot, setWeatherTimeSlot] = useState('');
  const [isLoading, fetchedData] = useHttp([city, weatherTimeSlot], [cityReadyToSearch, weatherTimeSlot]);


  const renderSearchIcon = () => (
    <div className='input-field third-wrap'>
      <button className='btn-search' type='button' onClick={e => setCityReadyToSearch(city)}>
        <svg className='svg-inline--fa fa-search fa-w-16' aria-hidden='true' data-prefix='fas' data-icon='search' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
          <path fill='currentColor' d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'></path>
        </svg>
      </button>
    </div>
  )

  const sideNavComp = () => (
    <div id='menu' className='mMenu overlayId'>
      <label htmlFor='hambu' className='sideMenuHolder'>
        Welcome To Weather App!!
      </label>
      <ul className='cities-sidemenu-list'>
        {
          cities.map((c, i) => <li key={i} onClick={e => { setCity(c); setCityReadyToSearch(c); }}>{c}</li>)
        }
      </ul>
    </div>
  )

  const renderMenuIcon = () => (
    <>
      <style>
        {`
          #hambu { display: none; }
          #hambu:not(:checked) ~ #menu { left: -100%; transition: left 0.2s cubic-bezier(0.77, 0.2, 0.05, 1.0); }
          #hambu:not(:checked) + .overlayId { visibility: hidden; }
        `}
      </style>
      <div className='input-field third-wrap'>
        <label htmlFor='hambu' className='btn-search' type='button' onClick={e => setCityReadyToSearch(city)}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" className="svg-inline--fa fa-bars fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
          </svg>
        </label>
      </div>
      <input type='checkbox' id='hambu' />
      <label htmlFor='hambu' className='sideMenuOverlay overlayId'></label>
      {sideNavComp()}
    </>
  )

  const renderSearchDropDown = () => (
    city && (
      !cityReadyToSearch ||
      (
        cityReadyToSearch &&
        cityReadyToSearch.toLowerCase() &&
        city.toLowerCase() != cityReadyToSearch.toLowerCase()
      )
    ) &&
    <ul className='citi-search-list'>
      {
        cities.map((c, i) => {
          return c.toLowerCase().indexOf(city.toLowerCase()) == 0
            ? <li key={i} onClick={e => { setCity(c); setCityReadyToSearch(c); }}>{c}</li>
            : ''
        })
      }
    </ul>
  )

  const renderSearchInput = () => (
    <div className='input-field second-wrap'>
      <input
        tabIndex={1}
        id='search'
        type='text'
        value={city}
        onChange={e => setCity(e.target.value)}
        onKeyUp={e => e.keyCode === 13 && setCityReadyToSearch(city)}
        placeholder='Enter City & Weather Forecast !!'
      />
      {renderSearchDropDown()}
    </div>
  )

  const renderNavPills = () => (
    <ul className="nav nav-pills">
      <li className={fetchedData && (!weatherTimeSlot || weatherTimeSlot === 'today') ? "active" : ""} onClick={() => setWeatherTimeSlot('today')}>TODAY</li>
      <li className={weatherTimeSlot === 'tomorrow' ? "active" : ""} onClick={() => setWeatherTimeSlot('tomorrow')}>TOMORROW</li>
      <li className={weatherTimeSlot === 'tendays' ? "active" : ""} onClick={() => setWeatherTimeSlot('tendays')}>10 DAYS</li>
    </ul>
  )

  const renderWeatherSummary = () => (
    fetchedData &&
    fetchedData.cod == 200 &&
    <div className='tableWrapper'>
      <table>
        <tbody>
          {
            fetchedData && fetchedData.list.map(today => today
              ? <tr key={today.dt}>

                <td className='textLeft'>
                  {today.dt ? <div style={{ color: '#444' }}><CustomDate timestamp={today.dt} /></div> : ''}
                  {today.weather && today.weather[0] ? <div className='desc col-xs-12'>{today.weather[0].description}</div> : ''}
                </td>


                <td style={{ width: 80 }}>
                  <span className='humidity'>{today.main.humidity}%</span>
                  <img height='50' src='http://openweathermap.org/img/wn/10d@2x.png' alt={today.dt} />
                </td>

                {
                  today.main
                    ? <td className='textRight' style={{ width: 40 }}>
                      {today.main.temp_max ? <Temperature kelvin={today.main.temp_max} opacity={1} /> : ''}
                      {today.main.temp_min ? <Temperature kelvin={today.main.temp_min} opacity={.5} /> : ''}
                    </td>
                    : ''
                }

              </tr>
              : ''
            )
          }
        </tbody>
      </table>
    </div>
  )

  const renderWeatherFullPage = () => (
    <div className='s003'>
      <form onSubmit={e => e.preventDefault()} autoComplete='off'>
        <div className='inner-form'>
          {renderMenuIcon()}
          {renderSearchInput()}
          {renderSearchIcon()}
        </div>
        {renderNavPills()}
      </form>
      {renderWeatherSummary()}
      {<div className='tableWrapper'>{fetchedData ? `Took ${fetchedData.message}` : `Please pick a city!`}</div>}
    </div>
  )

  return isLoading
    ? <img src={logo} className="App-logo" alt="logo" />
    : renderWeatherFullPage()

};

export default Homepage;