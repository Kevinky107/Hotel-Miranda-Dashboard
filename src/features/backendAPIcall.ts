const API_BASE = import.meta.env.BACKEND_URL

async function backendAPIcall(path: string, method = 'GET', data = null) {
    const token = localStorage.getItem("TOKEN_KEY")
    try{
        const response = await fetch(`${API_BASE}/${path}`, {
            method,
            headers: {
                'Authorization': `Token ${token}`,
            },
            body: data ? JSON.stringify(data) : undefined
        });
        if([401, 403].includes(response.status)) {
            localStorage.clear();
            location.reload();
        } else if (!response.ok) {
            throw new Error()
        }
        const json = await response.json();
    } catch(e) {
        throw(e);
    }
}