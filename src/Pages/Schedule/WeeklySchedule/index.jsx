const WeeklySchedule = () => {
    return (
        <div className="cart-page weekly-schedule">
            <div className="cart-table">
                <table className="font-antonio">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-1">
                            <td className="pdt-name-first">Monday, September 22 2025</td>
                            <td>
                                <div className="location-desc-col">
                                    <p>Holy Family (366 Watchogue Road)</p>
                                </div>
                            </td>
                            <td>4:00 PM to 6:00 PM</td>
                        </tr>
                        <tr className="border-1">
                            <td className="pdt-name-first">Tuesday, September 23 2025</td>
                            <td>
                                <div className="location-desc-col">
                                    <p>Jump Shotz (120 Androvette Street)</p>
                                    <p>Holy Family (366 Watchogue Road)</p>
                                </div>
                            </td>
                            <td>
                                <div className="location-desc-col">
                                    <p>4:00 PM to 6:00 PM</p>
                                    <p>6:30 PM to 8:30 PM</p>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-1">
                            <td className="pdt-name-first">Tuesday, September 23 2025</td>
                            <td>
                                <div className="location-desc-col">
                                    <p>Jump Shotz (120 Androvette Street)</p>
                                    <p>Holy Family (366 Watchogue Road)</p>
                                </div>
                            </td>
                            <td>
                                <div className="location-desc-col">
                                    <p>4:00 PM to 6:00 PM</p>
                                    <p>6:30 PM to 8:30 PM</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default WeeklySchedule;