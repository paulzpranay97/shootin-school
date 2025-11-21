import { Link } from "react-router-dom";
import StaticPageHeaders from "../../../Components/StaticPageHeaders";
import TeamImg from '../../../Assets/Images/TeamQuote.png'
import './sessionscheduled.css';

const SessionScheduled = () => {
    return (
        <>
            <StaticPageHeaders title="Session Scheduled" />
            <div className="session-scheduled-page">
                <div className="scp-title">
                    <h2>You’re All Set! Your Basketball Journey Begins Now</h2>
                    <p>Get ready for an awesome session filled with fun, focus, and skill-building!</p>
                </div>

                <div className="scp-gi">
                    <div className="scp-gi-cnt">
                        <h3>Group Instructions</h3>
                        <div className="scp-gi-dtls">
                            <div className="gi-dtl-items">
                                <span>Location</span>
                                <p>ABC Sports Complex, New York</p>
                            </div>
                            <div className="gi-dtl-items">
                                <span>Day</span>
                                <p>Monday</p>
                            </div>
                            <div className="gi-dtl-items">
                                <span>Date</span>
                                <p>29/03/2024</p>
                            </div>
                            <div className="gi-dtl-items">
                                <span>Time</span>
                                <p>8:00 AM</p>
                            </div>
                        </div>
                        <hr />
                        <div className="scp-gi-ftr">
                            <p>2 Sessions from your Group Instructions Package has been Deducted.</p>
                            <p>You have 3 Sessions Remaining in your Group Instructions Package.</p>
                        </div>

                    </div>
                    <div className="scp-gi-btns">
                        <Link to="/" className="bg-orange btn">View My Sessions</Link>
                        <Link to="/" className="bg-transparent btn">Return To Home</Link>
                    </div>
                </div>

                <div className="gi-team-quote">
                    <div className="gi-tq-cnt">
                        <p>“We can’t wait to help your child take their basketball skills to the next level. Every shot, every drill, every smile — that’s what Shootin’ School is all about.”</p>
                        <span>– Team Shootin’ School 🧡</span>
                    </div>
                    <div className="gi-tq-img">
                        <img src={TeamImg} alt="Team Shootin School" />
                    </div>
                </div>
            </div>
        </>
    );
};
export default SessionScheduled;