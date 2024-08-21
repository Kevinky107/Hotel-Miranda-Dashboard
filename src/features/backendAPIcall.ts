const API_BASE = import.meta.env.VITE_BACKEND_URL

export async function backendAPIcall(path: string, method = 'GET', data: any = null) {
    const token = localStorage.getItem("TOKEN_KEY")
    try{
        const response = await fetch(`${API_BASE}${path}`, {
            method,
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : undefined
        });
        if([401, 403].includes(response.status)) {
            localStorage.clear();
            location.reload();
            return;
        } else if (!response.ok) {
            throw new Error()
        }
        return await response.json();
    } catch(e) {
        throw(e);
    }
}

export async function login(user: {email: string, password: string}) {
    try {
        console.log(API_BASE)
        console.log(user)
        const response = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error("Failed to login");
        }

        const data = await response.json();
        localStorage.setItem('TOKEN_KEY', data.Token);
        localStorage.setItem('user', JSON.stringify(data.User));
        return data.User;
    } catch (error) {
        window.alert(error);
        throw error;
    }
}