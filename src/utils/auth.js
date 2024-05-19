import api from "../service/api";

class Auth {
    static loggedIn() {
        return !!localStorage.getItem("token") || !!sessionStorage.getItem("token");
    }



    static isAdmin() {
        return localStorage.getItem("user_roles") === "ROLE_ADMIN" || false;
    }

    static userId() {
        return localStorage.getItem("user_id");
    }

    static async login(username, password, remember) {
        const body = {
            username,
            password,
        };
        try {
            //   const user = null;
            const res = await api.post("/auth/login", body)
            console.log(res)

            if (remember) {
                localStorage.setItem("token", res.data.accessToken);
            }
            else {
                sessionStorage.setItem("token", res.data.accessToken);
            }

            localStorage.setItem("user_roles", res.data.tipos.join(","));
            localStorage.setItem("user_id", res.data.id);

            api.token = res.data.token;
            api.defaults.headers["Authorization"] = "Bearer " + res.data.accessToken;


            return res

        } catch (e) {
            return e?.response?.status;
        }
    }

    static token() {
        return localStorage.getItem("token") || sessionStorage.getItem("token");
    }

    static logout() {
        localStorage.removeItem("logged");
        localStorage.removeItem("token");
    }
}

export default Auth;
