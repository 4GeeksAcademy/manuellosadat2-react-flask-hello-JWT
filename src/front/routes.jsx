import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./layout";

import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { Private } from "./pages/private";

import { Home } from "./pages/home";

export const AppRoutes = () => {
	return (
		<BrowserRouter>

			<Routes>

				<Route path="/" element={<Layout />}>

					<Route index element={<Home />} />

					<Route path="/signup" element={<Signup />} />

					<Route path="/login" element={<Login />} />

					<Route path="/private" element={<Private />} />

				</Route>

			</Routes>

		</BrowserRouter>
	);
};