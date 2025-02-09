import Cookies from "js-cookie";

// Define a function to add a cookie with a 24-hour expiry time
export function AddCookie(key: string, value: string): void {
  const cookieExpiryTime = new Date();
  cookieExpiryTime.setTime(cookieExpiryTime.getTime() + 24 * 3600 * 1000); // expires in 24 hours
  Cookies.set(key, value, {
    expires: cookieExpiryTime,
  });
}

// Define a function to retrieve a value from a cookie
export function getValueFromCookie(key: string): string | undefined {
  return Cookies.get(key); // It can return undefined if the cookie is not found
}

// Define a function to remove a cookie
export function removeCookie(key: string): void {
  Cookies.remove(key);
}

// Define a function to delete all cookies except for 'search_context'
export function deleteAllCookies(): void {
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    if (name.trim() !== "search_context") {
      Cookies.remove(name.trim());
    }
  });
}
