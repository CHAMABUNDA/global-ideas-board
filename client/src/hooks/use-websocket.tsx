import { useState, useEffect, useRef } from "react";

interface UseWebSocketReturn {
  isConnected: boolean;
  lastMessage: string | null;
  sendMessage: (message: string) => void;
}

export function useWebSocket(path: string): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = 3000;

  const connect = () => {
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}${path}`;
      
      socketRef.current = new WebSocket(wsUrl);

      socketRef.current.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
        reconnectAttempts.current = 0;
      };

      socketRef.current.onmessage = (event) => {
        setLastMessage(event.data);
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
        
        // Attempt to reconnect
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          console.log(`Attempting to reconnect (${reconnectAttempts.current}/${maxReconnectAttempts})...`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        }
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
      };
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      setIsConnected(false);
    }
  };

  const sendMessage = (message: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.warn("WebSocket is not connected");
    }
  };

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [path]);

  return {
    isConnected,
    lastMessage,
    sendMessage,
  };
}
