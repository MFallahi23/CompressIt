CREATE DATABASE compressive;

CREATE TYPE user_role AS ENUM ('user','starter','admin','premium','vip');

CREATE TABLE usr(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role user_role DEFAULT 'user',
    password VARCHAR(255) NOT NULL,
    occupation VARCHAR(255) DEFAULT 'none',
    refresh_token VARCHAR(255),
    resetpasswordtoken VARCHAR(255),
    resetpasswordtokenexpiry TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    profile_picture_filename VARCHAR(255) DEFAULT 'default_profile_pic.jpg',
    usage_count INTEGER DEFAULT 0
);


CREATE TABLE notifications (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    roles TEXT[] NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feedbacks (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);