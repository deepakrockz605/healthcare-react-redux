const TOKEN_KEY = 'jwt';

export const loginUtil = () => {
    localStorage.setItem(TOKEN_KEY, 'login');
}

export const logoutUtil = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}