import React, { createContext, useContext, useState, useRef, useCallback } from "react";
import axiosInstance from "../Config/axios";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

const PlayerAccountContext = createContext();
export const usePlayerAccount = () => useContext(PlayerAccountContext);

export const PlayerAccountProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toastRef = useRef(null);
  const navigate = useNavigate();

  const clearPlayers = () => setPlayers([]);

  const handleUnauthorized = () => {
    toastRef.current?.show({
      severity: "error",
      summary: "Unauthorized",
      detail: "Access token missing. Please log in again.",
      life: 4000,
    });
    clearPlayers();
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  /** ✅ Fetch all players */
  const fetchPlayers = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return handleUnauthorized();

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/customer/player-account/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPlayers(response.data || []);
    } catch (err) {
      const errorDetail = err.response?.data?.detail || "Failed to fetch players";
      setError(errorDetail);
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: errorDetail,
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /** ✅ Fetch parent players via sale_id */
  const fetchParentPlayers = useCallback(async (saleId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return handleUnauthorized();

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/scheduler/list-parent-players/", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { sale_id: saleId },
      });
      return response.data?.players || [];
    } catch (err) {
      const errorDetail = err.response?.data?.detail || "Failed to fetch parent players";
      setError(errorDetail);
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: errorDetail,
        life: 3000,
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /** ✅ Create player */
  const createPlayer = async (playerData) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return handleUnauthorized();

    setLoading(true);
    setError(null);

    const headers = { Authorization: `Bearer ${accessToken}` };
    if (!(playerData instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    try {
      const response = await axiosInstance.post("/customer/player-account/", playerData, { headers });
      await fetchPlayers();
      toastRef.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Player created successfully",
        life: 3000,
      });
      return { success: true, data: response.data };
    } catch (err) {
      const errorDetail = err.response?.data || { detail: "Failed to create player" };
      setError(errorDetail.detail);
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: errorDetail.detail,
        life: 4000,
      });
      return { success: false, error: errorDetail };
    } finally {
      setLoading(false);
    }
  };

  /** ✅ Edit player */
  const editPlayer = async (playerId, playerData) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return handleUnauthorized();

    setLoading(true);
    setError(null);

    const headers = { Authorization: `Bearer ${accessToken}` };
    if (!(playerData instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    try {
      const response = await axiosInstance.patch(
        `/customer/player-account/?id=${playerId}`,
        playerData,
        { headers }
      );
      await fetchPlayers();
      toastRef.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Player updated successfully",
        life: 3000,
      });
      return { success: true, data: response.data };
    } catch (err) {
      const errorDetail = err.response?.data || { detail: "Failed to update player" };
      setError(errorDetail.detail);
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: errorDetail.detail,
        life: 4000,
      });
      return { success: false, error: errorDetail };
    } finally {
      setLoading(false);
    }
  };

   /** ✅ Edit player */
  const deletePlayer = async (playerId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return handleUnauthorized();

    setLoading(true);
    setError(null);

    const headers = { Authorization: `Bearer ${accessToken}` };
    

    try {
      const response = await axiosInstance.delete(
        `/customer/player-account/?id=${playerId}`,
        { headers }
      );
      // await fetchPlayers();
      toastRef.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Player deleted successfully",
        life: 3000,
      });
      return { success: true, data: response.data };
    } catch (err) {
      const errorDetail = err.response?.data || { detail: "Failed to delete player" };
      setError(errorDetail.detail);
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: errorDetail.detail,
        life: 4000,
      });
      return { success: false, error: errorDetail };
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlayerAccountContext.Provider
      value={{
        players,
        loading,
        error,
        fetchPlayers,
        fetchParentPlayers,
        createPlayer,
        editPlayer,
        deletePlayer
      }}
    >
      <Toast ref={toastRef} />
      {children}
    </PlayerAccountContext.Provider>
  );
};
