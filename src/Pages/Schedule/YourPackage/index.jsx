import './yourpackage.css'

const YourPackage = () => {
    return (
        <div className="your-package-page">
            <table>
                <thead>
                    <tr>
                        <th>
                            Package Name
                        </th>
                        <th>
                            Player
                        </th>
                        <th>
                            Purchased
                        </th>
                        <th>
                            Remaining Sessions
                        </th>
                        <th>
                            Type
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Group Instructions</td>
                        <td>Ethan</td>
                        <td>04/11/2025</td>
                        <td>10 out of 10</td>
                        <td>Group</td>
                        <td className='action-td'>
                            <button className="btn-primary-outline btn-sm">
                                Book a Session
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Group Instructions</td>
                        <td>Ethan</td>
                        <td>04/11/2025</td>
                        <td>10 out of 10</td>
                        <td>Group</td>
                        <td className='action-td'>
                            <button className="btn-primary-outline btn-sm">
                                Book a Session
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Group Instructions</td>
                        <td>Ethan</td>
                        <td>04/11/2025</td>
                        <td>10 out of 10</td>
                        <td>Group</td>
                        <td className='action-td'>
                            <button className="btn-primary-outline btn-sm">
                                Book a Session
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Group Instructions</td>
                        <td>Ethan</td>
                        <td>04/11/2025</td>
                        <td>10 out of 10</td>
                        <td>Group</td>
                        <td className='action-td'>
                            <button className="btn-primary-outline btn-sm">
                                Book a Session
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Group Instructions</td>
                        <td>Ethan</td>
                        <td>04/11/2025</td>
                        <td>10 out of 10</td>
                        <td>Group</td>
                        <td className='action-td'>
                            <button className="btn-primary-outline btn-sm">
                                Book a Session
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default YourPackage;