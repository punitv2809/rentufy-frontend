export function isLoggedIn() {
    const token = localStorage.getItem('accessToken');
    return token && token !== '';
}

export function role() {
    return localStorage.getItem('userRole');
}
