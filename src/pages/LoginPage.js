import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:8000/api/auth", {
            username: username,
            password: password
        }).then((response) => {
            if (response.status === 200) {
            const token = response.data.token;
            sessionStorage.setItem("jwtToken", token); 
            window.location.href = "/farmer";
            }
        }).catch((error) => {
            console.error("Login failed:", error);
            alert("Неверный никнейм или пароль. Попробуйте снова.");
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <Link to="/" className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">На главную</Link>
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Войти в аккаунт</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium mb-2">
                            Никнейм
                        </label>
                        <input
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Пароль
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Войти
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Еще не создали аккаунт?{" "}
                    <a href="/register" className="text-blue-400 hover:underline">
                        Зарегестрироваться
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;