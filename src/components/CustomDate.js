import { useState, useEffect } from 'react';

const CustomDate = props => {

    const [day, setDay] = useState('');
    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');

    useEffect(() => {
        
        const dateObject = new Date(props.timestamp)
        
        const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        setDay(dayName[dateObject.getDay()])
        
        setDate(dateObject.getDate())
        
        const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        setMonth(monthName[dateObject.getMonth()])

    }, []);

    return `${day}, ${date} ${month}`
};

export default CustomDate;
