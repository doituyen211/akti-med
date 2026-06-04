"use client";
import React, { createContext, useState } from "react";

/**
 * A context to hold authentication state for the application. Components can
 * access the current user and update it via the provided setter. When the
 * user object is null, pages requiring authentication will redirect to
 * the login page.
 */
export const UserContext = createContext({ user: null, setUser: () => {} });

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
