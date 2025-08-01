import React, { useState } from "react";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const registerUser = async () => {
            try {
                const response = await fetch("https://whatsapp-clone-tzf0.onrender.com/user/createuser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userName: form.name,
                        userEmail: form.email,
                        userPassword: form.password,
                    }),
                });
                const data = await response.json();
                if (!response.ok) {
                    setError(data.error || "Registration failed.");
                    return;
                }
                window.location.href = "/";
                setForm({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            } catch (err) {
                setError("Network error. Please try again.");
            }
        };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (form.name.length > 20) {
            setError("name must sould be less than 20 char characters long.");
            return;
        }
        // Submit registration logic here
        

        registerUser();
    };

    return (
        <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                
                <div style={{ marginBottom: 12 }}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
                <button type="submit" style={{ width: "100%", padding: 10, background: "#25D366", color: "#fff", border: "none", borderRadius: 4 }}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;