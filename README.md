# Eligix - by Team Bug-Busters 🐛

An intelligent, modular and scalable eligibility engine designed to solve the complexity of accepting directed payments online. This project is our submission for the **WGS-Google Hackathon**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/)

---

## 🎯 The Problem Statement

Many public or employer-sponsored programs provide **directed payments**, such as meal vouchers, that can only be used for specific purchases. While popular, these payment methods are rarely accepted online due to a significant technical challenge: merchants lack a simple, reusable solution to automatically identify which items in a shopping basket are eligible based on a complex, often country-specific, set of rules. This leads to costly custom integrations or merchants simply rejecting these payments, creating a frustrating experience for millions of users.

## ✨ Our Solution: Eligix

**Eligix** is a smart filtering platform that acts as a universal "brain" for any e-commerce checkout. We provide a single, robust API that merchants can integrate to seamlessly handle any directed payment program.

Our key innovation is using Google Cloud's AI suite- Vertex AI to analyze shopping baskets in real-time, **eliminating the need for merchants to provide a pre-defined product catalog**. Our dynamic rule engine, powered by Firestore, allows for on-the-fly adjustments for different countries and programs without a single line of code change, transforming a complex integration nightmare into a simple API call.


---

## 🚀 Key Features

- **🤖 AI-Powered Product Classification:** Uses **Vertex AI** to intelligently categorize any product from its name, removing the need for merchants to maintain their own catalogs.
- **🔐 Secure User Authentication:** Complete login, signup, and profile management flow handled by **Firebase Auth**.
- **🛒 Seamless Checkout Flow:** A clean, user-friendly React frontend that handles complex payment scenarios (like daily limits) with a simple and intuitive interface.

---

## 🛠️ Technology Stack

Our platform is built with the best of Google Cloud and modern web technologies.

| Area           | Technology                                                                                             |
| :------------- | :----------------------------------------------------------------------------------------------------- |
| **Frontend** | React, TypeScript, Tailwind CSS, Framer Motion, React Toastify                                         |
| **Backend** | Node.js, Express                                                                                       |
| **Hosting** | Google Cloud Run                                                                                       |
| **Database** | **Cloud Firestore** (for dynamic rules)                     |
| **AI/ML** | **Vertex AI** (Product Categorization)
| **Auth/Storage**| **Firebase Authentication**, **Firebase Storage** (for image uploads)                                  |
| **Ops** | **Cloud Monitoring** |

---

## 🏗️ Architecture

The system is designed as a serverless, event-driven platform for maximum scalability and low maintenance.