-- migrate:up

CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL
);

INSERT INTO roles(id, role_name) 
VALUES
(1, 'super_admin'),
(2, 'artist_manager'),
(3, 'artist');

/*********************************************/

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(35) NOT NULL,
  password VARCHAR(200) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  dob DATE NOT NULL,
  role_id INT NOT NULL,
  status VARCHAR(10) NOT NULL CHECK (status IN ('active', 'inactive')),
  gender VARCHAR(20) NOT NULL CHECK (gender IN ('m', 'f', 'o')),
  address VARCHAR(50) NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_email UNIQUE (email),
  CONSTRAINT uq_phone UNIQUE (phone),
  CONSTRAINT uq_full_name UNIQUE (first_name, last_name),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE INDEX idx_first_name ON users(first_name);
CREATE UNIQUE INDEX idx_phone ON users(phone);
CREATE INDEX idx_last_name ON users(last_name);
CREATE UNIQUE INDEX idx_email ON users(email);

/*****************************************/

CREATE TABLE IF NOT EXISTS artists (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  dob DATE NOT NULL,
  first_release_year DATE NOT NULL,
  gender VARCHAR(20) NOT NULL CHECK (gender IN ('m', 'f', 'o')),
  address VARCHAR(50) NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT uq_name UNIQUE (name)
);

CREATE UNIQUE INDEX idx_name ON artists(name);
CREATE INDEX idx_first_release_year ON artists(first_release_year);

/****************************************/

CREATE TABLE IF NOT EXISTS musics (
  id SERIAL PRIMARY KEY,
  artist_id INT NOT NULL,
  title VARCHAR(25) NOT NULL,
  album_name VARCHAR(30) NOT NULL,
  genre VARCHAR(20) NOT NULL CHECK (genre IN ('rnb', 'country', 'classic','rock','jazz')),
  created_at DATE NOT NULL DEFAULT CURRENT_DATE,
  public_id VARCHAR(100) DEFAULT NULL,
  secure_url VARCHAR(100) DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_artist_id FOREIGN KEY (artist_id) REFERENCES artists(id)
);

CREATE INDEX idx_album_name ON musics(album_name);
CREATE INDEX idx_title ON musics(title);

-- migrate:down


-- Truncate tables
TRUNCATE TABLE users RESTART IDENTITY CASCADE;
TRUNCATE TABLE musics RESTART IDENTITY CASCADE;
TRUNCATE TABLE artists RESTART IDENTITY CASCADE;
TRUNCATE TABLE roles RESTART IDENTITY CASCADE;

-- Drop tables if they exist
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS musics CASCADE;
DROP TABLE IF EXISTS artists CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

