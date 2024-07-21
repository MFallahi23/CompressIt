CREATE DATABASE compressive;

CREATE TYPE user_role AS ENUM ('user','admin','premium','moderator');

CREATE TABLE usr(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL UNIQUE,
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

-- test value
INSERT INTO usr (username,email,role,password) VALUES ('Max','mohcinefallahi23@gmail.com','admin','FNWOUFNFISIWNJ');