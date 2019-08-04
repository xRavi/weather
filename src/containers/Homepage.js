import React from 'react';
import { useHttp } from '../hooks/useHttp'
import Temperature from '../components/Temperature';
import CustomDate from '../components/CustomDate';

const Homepage = props => {
  const [isLoading, fetchedData] = useHttp('https://api.openweathermap.org/data/2.5/forecast?q=mumbai&APPID=3f2dfade3b05b90e671ea82426434282', []);
  return (
    <>
      <div className='col-xs-12'><input /></div>
      <table border='1'>
        <tbody>
          {
            fetchedData && fetchedData.list.map(today => today
              ? <tr key={today.dt}>

                <td>
                  {today.dt ? <div className='col-xs-12'><CustomDate timestamp={today.dt} /></div> : ''}
                  <div className='col-xs-12' style={{ opacity: .5, textTransform: 'capitalize' }}>{today.weather && today.weather[0].description}</div>
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
    </>
  );
};

export default Homepage;
