# Twube Backend API

A feature-rich backend API for a video sharing platform, similar to YouTube, built with Node.js, Express, and MongoDB.

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [Models](#models)
- [Utilities](#utilities)
- [Middlewares](#middlewares)
- [Controllers](#controllers)

## Overview

VideoTube is a comprehensive backend solution for video-sharing platforms. It provides robust APIs for user management, video uploads, comments, likes, subscriptions, playlists, and more.

## Features

- **User Management**: Register, login, logout, profile management
- **Video Management**: Upload, update, delete, and toggle publish status
- **Comments**: Add, update, delete comments on videos
- **Likes**: Like/unlike videos, comments, and tweets
- **Subscriptions**: Subscribe/unsubscribe to channels
- **Playlists**: Create, update, delete playlists, add/remove videos
- **Tweets**: Post, update, delete tweets
- **Watch History**: Track user's watch history
- **Dashboard**: View channel statistics and videos
- **Authentication**: JWT-based authentication with refresh tokens
- **File Uploads**: Support for uploading media files with Cloudinary integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **File Upload**: Multer for handling multipart/form-data
- **Cloud Storage**: Cloudinary for storing images and videos
- **Environment Variables**: dotenv
- **CORS Support**: cors package
- **Cookie Parsing**: cookie-parser

## Project Structure

```
src/
├── app.js                  # Express app configuration
├── constants.js            # Application constants
├── controllers/            # Controller files for all resources
├── db/                     # Database connection setup
├── index.js                # Application entry point
├── middlewares/            # Custom middleware functions
├── models/                 # Mongoose models
├── routes/                 # API routes
└── utils/                  # Utility functions and classes
```

## API Endpoints

### User Routes

- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout user
- `POST /api/v1/users/refresh-token` - Refresh access token
- `POST /api/v1/users/change-password` - Change password
- `GET /api/v1/users/current-user` - Get current user details
- `PATCH /api/v1/users/update-account` - Update account details
- `PATCH /api/v1/users/avatar` - Update avatar
- `PATCH /api/v1/users/cover-image` - Update cover image
- `GET /api/v1/users/c/:username` - Get channel profile
- `GET /api/v1/users/history` - Get watch history

### Video Routes

- `GET /api/v1/videos` - Get all videos
- `POST /api/v1/videos` - Publish a new video
- `GET /api/v1/videos/:videoId` - Get video by ID
- `DELETE /api/v1/videos/:videoId` - Delete video
- `PATCH /api/v1/videos/:videoId` - Update video
- `PATCH /api/v1/videos/toggle/publish/:videoId` - Toggle publish status

### Comment Routes

- `GET /api/v1/comments/:videoId` - Get all comments for a video
- `POST /api/v1/comments/:videoId` - Add a comment to a video
- `PATCH /api/v1/comments/c/:commentId` - Update a comment
- `DELETE /api/v1/comments/c/:commentId` - Delete a comment

### Like Routes

- `POST /api/v1/likes/toggle/v/:videoId` - Toggle like on a video
- `POST /api/v1/likes/toggle/c/:commentId` - Toggle like on a comment
- `POST /api/v1/likes/toggle/t/:tweetId` - Toggle like on a tweet
- `GET /api/v1/likes/videos` - Get all liked videos

### Subscription Routes

- `GET /api/v1/subscriptions/c/:channelId` - Get channels subscribed by user
- `POST /api/v1/subscriptions/c/:channelId` - Toggle subscription
- `GET /api/v1/subscriptions/u/:subscriberId` - Get subscribers of a channel

### Tweet Routes

- `POST /api/v1/tweets` - Create a tweet
- `GET /api/v1/tweets/user/:userId` - Get user tweets
- `PATCH /api/v1/tweets/:tweetId` - Update a tweet
- `DELETE /api/v1/tweets/:tweetId` - Delete a tweet

### Playlist Routes

- `POST /api/v1/playlist` - Create a playlist
- `GET /api/v1/playlist/:playlistId` - Get playlist by ID
- `PATCH /api/v1/playlist/:playlistId` - Update playlist
- `DELETE /api/v1/playlist/:playlistId` - Delete playlist
- `PATCH /api/v1/playlist/add/:videoId/:playlistId` - Add video to playlist
- `PATCH /api/v1/playlist/remove/:videoId/:playlistId` - Remove video from playlist
- `GET /api/v1/playlist/user/:userId` - Get user playlists

### Dashboard Routes

- `GET /api/v1/dashboard/stats` - Get channel statistics
- `GET /api/v1/dashboard/videos` - Get channel videos

### Healthcheck Route

- `GET /api/v1/healthcheck` - API health check

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn
- MongoDB instance (local or cloud-based)
- Cloudinary account (for storing media files)



### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=8000
MONGODB_URI=mongodb://localhost:27017
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Running the Server

For development with auto-reload:
```bash
npm run dev
```



