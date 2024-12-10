import React, { useReducer } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Booking from './Booking';
import ConfirmedBooking from './ConfirmedBooking';

const Main = () => {
    
    const seedRandom = function(seed) {
        const m = 2 ** 35 - 31; // Large prime modulus
        const a = 185852;       // Multiplier
        let s = seed % m;       // Seed
        return function() {
            s = (s * a) % m;    // Update seed
            return s / m;       // Return normalized [0, 1)
        };
    };

    const fetchAPI = function(date) {
        const result = [];
        const random = seedRandom(date.getDate());

        for (let i = 17; i <= 23; i++) {

            const randValue = random();

            if (randValue < 0.5) {
                result.push(`${i}:00`);
            } else {
                result.push(`${i}:30`);
            }
        }
        return result;
    };


    const submitAPI = function(formData) {
        return true;
    }

    const initialStates = {availableTimes: fetchAPI(new Date())};
    const [state, dispatch] = useReducer(updateTimes, initialStates);

    function updateTimes(state, date) {
        return {availableTimes: fetchAPI(new Date())}
    }

    const navigate = useNavigate();
    function submitForm (formData) {
        if(submitAPI(formData)){
            navigate("/confirmed")
        }
    }

    return (
        <main>
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/booking" element={<Booking availableTimes={state} dispatch={dispatch} submitForm={submitForm} />} />
                <Route path="/confirmed" element={<ConfirmedBooking />} />
            </Routes>
        </main>
    );
};

export default Main;