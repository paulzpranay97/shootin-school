// src/Components/NotificationBell.js
import React, { useState } from "react";
import { useNotifications } from "../../APIContext/NotificationContext";
import "./style.css";

function NotificationBell() {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className="notification-wrapper">
      <button className="notification-button" onClick={toggleDropdown}>
        🔔
        {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
      </button>

      {open && (
        <div className="notification-dropdown">
          {notifications.length === 0 ? (
            <div className="notification-empty">No notifications</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`notification-item ${n.is_read ? "read" : "unread"}`}
                onClick={() => markAsRead(n.id)}
              >
                <div className="notification-title">
                  {n.notification?.title || "Notification"}
                </div>
                <div className="notification-message">
                  {n.notification?.message || ""}
                </div>
                <div className="notification-time">
                  {new Date(n.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
