import { Button } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import StaticDatePicker from "@material-ui/lab/StaticDatePicker";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";


const AgeCalculator = () => {
    const [birth, setBirth] = useState(moment().format('YYYY-MM-DD'))
    const [today, setToday] = useState(moment().format('YYYY-MM-DD'))
    const [show, setShow] = useState(false)
    const [totalYears, setTotalYears] = useState(0)
    const [totalMonths, setTotalMonths] = useState(0)
    const [totalDays, setTotalDays] = useState(0)
    const [durations, setDurations] = useState({
        hours: "",
        asDays: "",
        asMonths: "",
        weeks: "",
        secounds: "",
        milliseconds: "",
        minuts: ""
    })
    console.log(birth.length);

    const changeBirthHandler = (e) => {
        const target = e.target.value
        const dateLength = e.target.value.length
        if (dateLength <= 10) {
            return setBirth(target)
        }
    }

    const changeTodayHandler = (e) => {
        const target = e.target.value
        const dateLength = e.target.value.length
        if (dateLength <= 10) {
            return setToday(target)
        }

    }

    const hanldeCalculate = (date1, date2) => {
        setShow(true)

        const a = moment(date1)
        const b = moment(date2)


        const duration = moment.duration(b.diff(a));
        const hours = duration.asHours();
        const asDays = duration.asDays();
        const asMonths = duration.asMonths();
        const weeks = duration.asWeeks();
        const secounds = duration.asSeconds();
        const milliseconds = duration.asMilliseconds();
        const minuts = duration.asMinutes();
        setDurations({
            hours: hours,
            asMonths: asMonths,
            asDays: asDays,
            weeks: weeks,
            secounds: secounds,
            milliseconds: milliseconds,
            minuts: minuts,
        })
        var years = a.diff(b, 'year');
        b.add(years, 'years');

        const noOfDaysInb = b.daysInMonth();
        const noOfDaysIna = a.daysInMonth();
        let months = 0;
        if (noOfDaysInb > noOfDaysIna) {
            months = b.diff(a, "months");
            a.add(months, "months");
        } else {
            months = a.diff(b, 'months');
            b.add(months, 'months');
        }

        var days = a.diff(b, 'days');

        setTotalYears(Math.abs(years));
        setTotalMonths(Math.abs(months));
        setTotalDays(Math.abs(days));

    }

    const hanldeReset = () => {
        setTotalYears('')
        setTotalMonths('')
        setTotalDays('')
        setShow(false)
    }

    return (
        <div className="Age">
            <div className="calculator_header">
                <h1 className='calculator_net'>Calculator.net</h1>
            </div>
            <h1 className="header">Age Calculator</h1>
            {
                show ? <div className='result'>
                    <h2>Age:</h2>
                    <h4>{!totalYears ? 0 : totalYears} Years {!totalMonths ? 0 : totalMonths} Months {!totalDays ? 0 : totalDays} Days</h4>
                    <h4>or {parseInt(durations.asMonths)} Months {!totalDays ? 0 : totalDays} Days</h4>
                    <h4>or {parseInt(durations.weeks)} Weeks</h4>
                    <h4>or {durations.asDays} Days</h4>
                    <h4>or {durations.hours} Hours</h4>
                    <h4>or {durations.minuts} Minutes  </h4>
                    <h4>or {durations.secounds} Seconds</h4>
                    <h4>or {durations.milliseconds} Milliseconds</h4>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div className='calander'>
                            <StaticDatePicker
                                value={birth}
                                openTo="day"

                                showToolbar={false}
                                displayStaticWrapperAs="desktop"

                                onChange={(newValue) => {

                                    setBirth(newValue);

                                }}
                                disabled={true}
                            />
                            <StaticDatePicker
                                value={today}
                                openTo="day"
                                showToolbar={false}
                                displayStaticWrapperAs="desktop"

                                onChange={(newValue) => {
                                    setToday(newValue);
                                }}
                                disabled={true}
                            />
                        </div>
                    </LocalizationProvider>
                </div> : null
            }
            <div className="Age_Child">
                <div className="Birthday_">
                    <label className="label_" htmlFor="birth">
                        Enter Birthday
                    </label>
                    <input
                        value={birth.length > 0 ? birth : today}
                        onChange={changeBirthHandler}
                        type="date"
                        name="birth"
                        id="birth"
                        className="Birthday_input"
                        placeholder="Birthday"
                    />
                </div>
                <div className='Birthday_'>
                    <label className="label_" htmlFor="today">
                        Today
                    </label>
                    <input
                        value={today}
                        onChange={changeTodayHandler}
                        type="date"
                        name="today"
                        id="today"
                        className="Birthday_input"
                        placeholder="Today"
                    />

                </div>
                <div className='button_parent'>
                    <Button
                        className='buttons'
                        variant='outlined'
                        style={{ backgroundColor: "#28A745" }}
                        onClick={() => hanldeCalculate(birth, today)}
                    >
                        Calculate
                    </Button>
                    <Button
                        className='buttons'
                        variant='outlined'
                        style={{ backgroundColor: "#DC3545" }}
                        onClick={hanldeReset}
                    >
                        Reset
                    </Button>
                </div>


            </div>

        </div >
    )
}

export default AgeCalculator
