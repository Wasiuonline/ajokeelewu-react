const setLocal = (name, data) => localStorage.setItem(name, JSON.stringify(data));

const getLocal = (name) => JSON.parse(localStorage.getItem(name));

const deleteLocal = (name) => localStorage.removeItem(name);

const setSession = (name, data) => sessionStorage.setItem(name, JSON.stringify(data));

const getSession = (name) => JSON.parse(sessionStorage.getItem(name));

const deleteSession = (name) => sessionStorage.removeItem(name);

export {setLocal, getLocal, deleteLocal, setSession, getSession, deleteSession}