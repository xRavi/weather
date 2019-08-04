import React from 'react';
import { useHttp } from '../hooks/useHttp'
// const [isLoading, fetchedData] = useHttp('https://samples.openweathermap.org/data/2.5/forecast/hourly?q=Mumbai,india&appid=testing', []);
// ?q=London&appid=b6907d289e10d714a6e88b30761fae22

const Homepage = props => {
  const [isLoading, fetchedData] = useHttp('https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=3f2dfade3b05b90e671ea82426434282', []);
  console.log("TCL: fetchedData", fetchedData)
  return (
    <table border='1'>
      <tbody>
        {
          fetchedData && fetchedData.list.map(today =>
            <tr key={today.dt}>
              <td>
                <div className='col-xs-12'>{new Date(today.dt).toDateString()}</div>
                <div className='col-xs-12'>{today.weather && today.weather[0].description}</div>
              </td>
              <td>
                asda
            </td>
              <td>
                fafasf
            </td>

            </tr>
          )

        }
      </tbody>
    </table>
  );
};

export default Homepage;
