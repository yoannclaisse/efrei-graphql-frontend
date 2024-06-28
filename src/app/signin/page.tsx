"use client";
import React, { useState } from "react";
import { AddUser } from "../lib/user/user.method"; // Assurez-vous que le chemin est correct
import Link from "next/link";
import styles from "./page.module.css";
import BackToHomeButton from "../component/backToHomeButton";

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
      console.log("USER ADDED:", user);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={`${styles.h1} text-3xl font-bold text-zinc-50`}>Enter your credentials</h1>
        <div className={styles.containerInput}>
          <form className={`${styles.formContainer}`} onSubmit={handleSubmit}>
            <div className={`${styles.test}`}>
              <label htmlFor="username">Username: </label>
              <input
                className={styles.input}
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.test}`}>
              <label htmlFor="email">Email: </label>
              <input
                className={styles.input}
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.test}`}>
              <label htmlFor="password">Password: </label>
              <input
                className={styles.input}
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.containerButton} mt-20`}>
              <button className={`${styles.button} font-bold bg-blue-200`} type="submit">Add User</button>
              <Link href="/" className={`${styles.button} font-bold bg-green-200`}>
                Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddUserForm;
