import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import axiosInstance from "../Config/axios";
import BASE_API_URL from "../Config/Config";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socket, setSocket] = useState(null);

  const reconnectTimeoutIdRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const heartbeatIntervalIdRef = useRef(null);
  const fetchNotifications = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/notif/`);
      setNotifications(response.data);
      setUnreadCount(response.data.filter((n) => !n.is_read).length);
    } catch (error) {
      console.error("❌ Error fetching notifications:", error);
    }
  }, []);
  const markAsRead = async (id) => {
    try {
      await axiosInstance.patch(`/notif/${id}/read/`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error("❌ Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unread = notifications.filter((n) => !n.is_read);
      await Promise.all(unread.map((n) => axiosInstance.patch(`/notif/${n.id}/read/`)));
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("❌ Error marking all as read:", error);
    }
  };
  useEffect(() => {
    let ws;

    const openWebSocket = () => {
      try {
        const baseUrl = new URL(BASE_API_URL);
        const scheme = baseUrl.protocol === "https:" ? "wss" : "ws";
        const host = baseUrl.host;
        const token = localStorage.getItem("accessToken");
        const tokenQuery = token ? `?token=${encodeURIComponent(token)}` : "";
        const wsUrl = `${scheme}://${host}/ws/notifications/${tokenQuery}`;

        ws = new WebSocket(wsUrl);
        setSocket(ws);

        ws.onopen = () => {
          console.log("✅ WebSocket connected");

          reconnectAttemptsRef.current = 0;

          if (heartbeatIntervalIdRef.current) clearInterval(heartbeatIntervalIdRef.current);
          heartbeatIntervalIdRef.current = setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
              try {
                ws.send(JSON.stringify({ type: "ping", ts: Date.now() }));
              } catch (_) {}
            }
          }, 25000);
        };

        ws.onmessage = (event) => {
          try {
            if (!event?.data) return;
            const data = JSON.parse(event.data);
            if (data?.type === "pong") return;

            console.log("📩 New notification received:", data);
            const normalized = {
              ...data,
              notification: {
                title: data.title,
                message: data.message,
              },
            };

            setNotifications((prev) => [normalized, ...prev]);
            setUnreadCount((prev) => prev + 1);
          } catch (err) {
            console.error("Error parsing WebSocket message:", err);
          }
        };

        const scheduleReconnect = () => {
          if (heartbeatIntervalIdRef.current) {
            clearInterval(heartbeatIntervalIdRef.current);
            heartbeatIntervalIdRef.current = null;
          }

          const attempt = reconnectAttemptsRef.current + 1;
          reconnectAttemptsRef.current = attempt;
          const backoffMs = Math.min(30000, 1000 * Math.pow(2, attempt));
          if (reconnectTimeoutIdRef.current) clearTimeout(reconnectTimeoutIdRef.current);
          reconnectTimeoutIdRef.current = setTimeout(openWebSocket, backoffMs);
        };

        ws.onclose = () => {
          console.warn("❌ WebSocket disconnected; scheduling reconnect");
          scheduleReconnect();
        };
        ws.onerror = () => {
          console.warn("⚠️ WebSocket error; closing and reconnecting");
          try { ws.close(); } catch (_) {}
        };
      } catch (error) {
        console.error("Failed to initialize WebSocket:", error);
      }
    };

    openWebSocket();

    return () => {
      try { if (ws && ws.readyState === WebSocket.OPEN) ws.close(); } catch (_) {}
      if (heartbeatIntervalIdRef.current) clearInterval(heartbeatIntervalIdRef.current);
      if (reconnectTimeoutIdRef.current) clearTimeout(reconnectTimeoutIdRef.current);
    };
  }, []);
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        socket,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
