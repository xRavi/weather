import React, { useState } from 'react';
import { useHttp } from '../hooks/useHttp'
import Temperature from '../components/Temperature';
import CustomDate from '../components/CustomDate';
import logo from '../logo.svg';
import './Homepage.css'

const Homepage = props => {
  const [city, setCity] = useState('mumbai');
  const [cityReadyToSearch, setCityReadyToSearch] = useState(null);
  const [isLoading, fetchedData] = useHttp(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=3f2dfade3b05b90e671ea82426434282`, [cityReadyToSearch]);
  console.log('TCL: city', fetchedData)
  const renderWeather = () => {
    return fetchedData
      ?
      <div className='s003'>
        <form>
          <div className='inner-form'>
            <div className='input-field second-wrap'>
              <input
                id='search'
                type='text'
                value={city}
                onChange={e => setCity(e.target.value)}
                onKeyUp={e => e.keyCode === 13 && setCityReadyToSearch(city)}
                placeholder='Please Enter City Name.'
              />
            </div>
            <div className='input-field third-wrap'>
              <button className='btn-search' type='button' onClick={e => { e.preventDefault(); setCityReadyToSearch(city); }}>
                <svg className='svg-inline--fa fa-search fa-w-16' aria-hidden='true' data-prefix='fas' data-icon='search' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                  <path fill='currentColor' d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
        {
          fetchedData.cod == 200
            ? <div className='tableWrapper'>
              <table>
                <tbody>
                  {
                    fetchedData && fetchedData.list.map(today => today
                      ? <tr key={today.dt}>

                        <td className='textLeft'>
                          {today.dt ? <div className='col-xs-12'><CustomDate timestamp={today.dt} /></div> : ''}
                          {today.weather && today.weather[0] ? <div className='desc col-xs-12'>{today.weather[0].description}</div> : ''}
                        </td>

                        <td>
                          {today.main.humidity}%
                    </td>

                        <td>
                          <img height='50' src='http://openweathermap.org/img/wn/10d@2x.png' />
                        </td>

                        {
                          today.main
                            ? <td className='textRight'>
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
            : <div className='tableWrapper'>{fetchedData.message}</div>
        }
      </div>
      : ''
  }

  return isLoading
    ? <header className="App-header"><img src={logo} className="App-logo" alt="logo" /></header>
    : renderWeather()
};

export default Homepage;