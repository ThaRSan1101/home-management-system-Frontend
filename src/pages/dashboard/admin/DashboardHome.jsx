import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardHome.css';

const DashboardHome = () => {
  const navigate = useNavigate();

  // Real-time stats
  const [stats, setStats] = React.useState({ customers: 0, providers: 0, completedBookings: 0, totalBookings: 0 });
  const [loading, setLoading] = React.useState(true);
  const [lists, setLists] = React.useState({ customers: [], providers: [], serviceBookings: [], subscriptionBookings: [] });
  const [listsLoading, setListsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;
    const fetchStats = () => {
      fetch('http://localhost/project-root/backend/home-management-system-Backend/api/admin_stats.php', {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          if (isMounted && data.status === 'success') {
            setStats({
              customers: data.customers,
              providers: data.providers,
              completedBookings: data.completedBookings,
              totalBookings: data.totalBookings
            });
          }
          if (isMounted) setLoading(false);
        })
        .catch(() => isMounted && setLoading(false));
    };
    const fetchLists = () => {
      fetch('http://localhost/project-root/backend/home-management-system-Backend/api/admin_dashboard_lists.php', {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          if (isMounted && data.status === 'success') {
            setLists(data);
          }
          if (isMounted) setListsLoading(false);
        })
        .catch(() => isMounted && setListsLoading(false));
    };
    fetchStats();
    fetchLists();
    const interval = setInterval(() => {
      fetchStats();
      fetchLists();
    }, 10000); // 10 seconds
    return () => { isMounted = false; clearInterval(interval); };
  }, []);

  const customers = lists.customers || [];
  const providers = lists.providers || [];
  const bookings = lists.serviceBookings || [];
  const subscriptions = lists.subscriptionBookings || [];

  return (
    <div className="dashboard-home-wrapper">
      <h2 className="dashboard-overview-heading">Overview</h2>
      <div className="dashboard-stats-row">
        <div className="dashboard-stat-box">Customers<br /><span className="dashboard-stat-count">{loading ? '...' : stats.customers}</span></div>
        <div className="dashboard-stat-box">Service Providers<br /><span className="dashboard-stat-count">{loading ? '...' : stats.providers}</span></div>
        <div className="dashboard-stat-box">Completed Bookings<br /><span className="dashboard-stat-count">{loading ? '...' : stats.completedBookings}</span></div>
        <div className="dashboard-stat-box">Total Booking<br /><span className="dashboard-stat-count">{loading ? '...' : stats.totalBookings}</span></div>
      </div>
      <div className="dashboard-fullwidth-row">
        <div className="dashboard-fullwidth-box">
          <div className="dashboard-fullwidth-title">New Customers</div>
          <ul className="dashboard-list">
            {listsLoading ? <li>Loading...</li> : customers.length === 0 ? <li>No new customers</li> : customers.map((c, i) => (
              <li key={c.user_id || i} className="dashboard-list-item">
                <span>{c.name}</span>
                <button className="dashboard-view-btn" onClick={() => navigate(`/admin/dashboard/customer/${c.user_id}`)}>View</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-fullwidth-box">
          <div className="dashboard-fullwidth-title">New Service Providers</div>
          <ul className="dashboard-list">
            {listsLoading ? <li>Loading...</li> : providers.length === 0 ? <li>No new providers</li> : providers.map((p, i) => (
              <li key={p.user_id || i} className="dashboard-list-item">
                <span>{p.name}</span>
                <button className="dashboard-view-btn" onClick={() => navigate(`/admin/dashboard/provider/${p.user_id}`)}>View</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-fullwidth-box">
          <div className="dashboard-fullwidth-title">Latest Service Bookings</div>
          <ul className="dashboard-list">
            {listsLoading ? <li>Loading...</li> : bookings.length === 0 ? <li>No service bookings</li> : bookings.map((b, i) => (
              <li key={b.service_book_id || i} className="dashboard-list-item">
                <span>{b.customer_name} ({b.service_date})</span>
                <button className="dashboard-view-btn" onClick={() => navigate(`/admin/dashboard/service-booking/${b.service_book_id}`)}>View</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-fullwidth-box">
          <div className="dashboard-fullwidth-title">Latest Package Bookings</div>
          <ul className="dashboard-list">
            {listsLoading ? <li>Loading...</li> : subscriptions.length === 0 ? <li>No subscription bookings</li> : subscriptions.map((s, i) => (
              <li key={s.subbook_id || i} className="dashboard-list-item">
                <span>{s.customer_name} ({s.sub_date})</span>
                <button className="dashboard-view-btn" onClick={() => navigate(`/admin/dashboard/subscription-booking/${s.subbook_id}`)}>View</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 