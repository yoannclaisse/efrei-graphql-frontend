"use client";
import React, { useState } from "react";
import { AddUser } from "../lib/user/user.method"; // Assurez-vous que le chemin est correct
import Link from "next/link";

interface UserCreateInput {
  username: string;
  email: string;
  password: string;
}

const AddUserForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const inputCreateUser: UserCreateInput = { username, email, password };

    try {
      const { user } = await AddUser(inputCreateUser);
      console.log("User added:", user);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
      <Link href="/">
        <button>
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default AddUserForm;
