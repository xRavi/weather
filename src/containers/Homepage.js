import React, { useState } from 'react';
import { useHttp } from '../hooks/useHttp'
import Temperature from '../components/Temperature';
import CustomDate from '../components/CustomDate';
import './Homepage.css'

const Homepage = props => {
  const [city, setCity] = useState('mumbai');
  const [cityReadyToSearch, setCityReadyToSearch] = useState(null);
  const [isLoading, fetchedData] = useHttp(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=3f2dfade3b05b90e671ea82426434282`, [cityReadyToSearch]);
  console.log("TCL: city", fetchedData)
  return fetchedData
    ? <>
      <div className='col-xs-12'><input value={city} onChange={e => setCity(e.target.value)} onKeyUp={e => e.keyCode === 13 && setCityReadyToSearch(city)} /></div>
      {
        fetchedData.cod == 200
          ? <table border='1'>
            <tbody>
              {
                fetchedData && fetchedData.list.map(today => today
                  ? <tr key={today.dt}>

                    <td>
                      {today.dt ? <div className='col-xs-12'><CustomDate timestamp={today.dt} /></div> : ''}
                      {today.weather && today.weather[0] ? <div className='desc col-xs-12'>{today.weather[0].description}</div> : ''}
                    </td>

                    <td>
                      {today.main.humidity}%
                </td>

                    <td>
                      <img src="http://openweathermap.org/img/wn/10d@2x.png" />
                    </td>

                    {
                      today.main
                        ? <td>
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
          : <div>{fetchedData.message}</div>
      }
    </>
    : ''
};

export default Homepage;
