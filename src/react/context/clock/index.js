import React, { createContext, useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';

const MClockContext = createContext(null);

export const useClock = () => useContext(MClockContext);

export const MClockProvider = ({ children }) => {
	const [sdate, setSdate] = useState(null);
    const [inactiveApp, setInactiveApp] = useState(false);

    const timeSecundsInactiveLimite = 90 * 1000;
    let dateLimitInactive ;
    let inactive = false;

	const data = {
		sdate, inactiveApp
	};

	const handleDate = (date) => {
		setSdate(format(date, 'dd/MM/yyyy HH:mm'));
	};

    const handleUpdateActivity = () =>{
        let date = new Date();
        dateLimitInactive = new Date(date.getTime() + timeSecundsInactiveLimite);
        if(inactive){
            inactive = false
            setInactiveApp(false);
            handleDate(date);
        }
    }

	useEffect(() => {

		const interval = setInterval(() => {
			const date = new Date();
			if (date.getSeconds() === 0) {
				handleDate(date);
			}

            if (dateLimitInactive < date && !inactive){
                inactive = true
                setInactiveApp(true);
            }

		}, 1000);

        //-----
        document.addEventListener('mousemove', handleUpdateActivity);
        document.addEventListener('keydown', handleUpdateActivity);
        
		handleDate(new Date());
        handleUpdateActivity();
        
		return () => {
            clearInterval(interval);
            document.removeEventListener('mousemove', handleUpdateActivity);
            document.removeEventListener('keydown', handleUpdateActivity);
		};
	}, []);

	return <MClockContext.Provider value={data}>{children}</MClockContext.Provider>;
};
