let sessions = {};

export const addNewSession = (ip) => {
  const timestamp = Date.now();
  if (sessions[ip]) { return false; }

  sessions[ip] = timestamp;

  return true;
}

export const checkSession = () => {
  const session = true;

  return true
};