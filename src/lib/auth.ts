export const authStorage = {
  getAccessToken: () =>
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null,

  setAccessToken: (token: string) => {
    localStorage.setItem("access_token", token);
    if (typeof window !== "undefined") {
      document.cookie = `access_token=${token}; path=/; max-age=86400; SameSite=Lax`;
    }
  },

  removeAccessToken: () => {
    localStorage.removeItem("access_token");
    if (typeof window !== "undefined") {
      document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  },

  getRefreshToken: () =>
    typeof window !== "undefined"
      ? localStorage.getItem("refresh_token")
      : null,

  setRefreshToken: (token: string) => {
    localStorage.setItem("refresh_token", token);
    if (typeof window !== "undefined") {
      document.cookie = `refresh_token=${token}; path=/; max-age=604800; SameSite=Lax`;
    }
  },

  removeRefreshToken: () => {
    localStorage.removeItem("refresh_token");
    if (typeof window !== "undefined") {
      document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  },

  getRole: () =>
    typeof window !== "undefined" ? localStorage.getItem("role") : null,

  setRole: (role: string) => localStorage.setItem("role", role),

  clear: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    if (typeof window !== "undefined") {
      document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  },
};
