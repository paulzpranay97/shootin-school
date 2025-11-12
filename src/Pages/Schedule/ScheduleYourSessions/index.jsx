import BackArrow from "../../../Assets/Icons/BackArrow";
import { Checkbox } from 'primereact/checkbox';
import "./schedulesession.css"
import { useState } from "react";

const ScheduleYourSessions = () => {
    const [checked, setChecked] = useState(false);
    return (
        <>
            <div className="schedule-your-sessions-page">
                <div className="schedule-header">
                    <span><BackArrow /></span>
                    <h2>Choose Your Preferred Location, Date & Time </h2>
                </div>
                <div className="gi-sessions">
                    <div className="gi-sessions-header">
                        <h4>Group Instructions</h4>
                        <select>
                            <option value="location1">Filter By</option>
                            <option value="location2">Location 2</option>
                        </select>
                    </div>
                    <div className="gi-sessions-list">
                        <div className="gi-session-item">
                            <div className="gi-session-item-left">
                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                <p>ABC Sports Complex, New York</p>
                            </div>
                            <span className="gi-session-item-day">Saturday</span>
                            <span className="gi-session-item-date">29/03/2024</span>
                            <span className="gi-session-item-time">8:00 AM</span>
                        </div>
                        <div className="gi-session-item">
                            <div className="gi-session-item-left">
                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                <p>ABC Sports Complex, New York</p>
                            </div>
                            <span className="gi-session-item-day">Saturday</span>
                            <span className="gi-session-item-date">29/03/2024</span>
                            <span className="gi-session-item-time">8:00 AM</span>
                        </div>
                        <div className="gi-session-item">
                            <div className="gi-session-item-left">
                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                <p>ABC Sports Complex, New York</p>
                            </div>
                            <span className="gi-session-item-day">Saturday</span>
                            <span className="gi-session-item-date">29/03/2024</span>
                            <span className="gi-session-item-time">8:00 AM</span>
                        </div>
                        <div className="gi-session-item">
                            <div className="gi-session-item-left">
                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                <p>ABC Sports Complex, New York</p>
                            </div>
                            <span className="gi-session-item-day">Saturday</span>
                            <span className="gi-session-item-date">29/03/2024</span>
                            <span className="gi-session-item-time">8:00 AM</span>
                        </div>
                        <div className="gi-session-item">
                            <div className="gi-session-item-left">
                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                <p>ABC Sports Complex, New York</p>
                            </div>
                            <span className="gi-session-item-day">Saturday</span>
                            <span className="gi-session-item-date">29/03/2024</span>
                            <span className="gi-session-item-time">8:00 AM</span>
                        </div>
                    </div>
                    <div className="gi-session-proceed-btn">
                        <button className="btn-primary btn-lg btn">Proceed</button>
                    </div>
                </div>
            </div>
        </>
    )
};
export default ScheduleYourSessions;