SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: artists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.artists (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying(50) NOT NULL,
    dob date NOT NULL,
    first_release_year date NOT NULL,
    gender character varying(20) NOT NULL,
    address character varying(50) NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT artists_gender_check CHECK (((gender)::text = ANY ((ARRAY['m'::character varying, 'f'::character varying, 'o'::character varying])::text[])))
);


--
-- Name: artists_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.artists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: artists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.artists_id_seq OWNED BY public.artists.id;


--
-- Name: musics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.musics (
    id integer NOT NULL,
    artist_id integer NOT NULL,
    title character varying(25) NOT NULL,
    album_name character varying(30) NOT NULL,
    genre character varying(20) NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    public_id character varying(100) DEFAULT NULL::character varying,
    secure_url character varying(100) DEFAULT NULL::character varying,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT musics_genre_check CHECK (((genre)::text = ANY ((ARRAY['rnb'::character varying, 'country'::character varying, 'classic'::character varying, 'rock'::character varying, 'jazz'::character varying])::text[])))
);


--
-- Name: musics_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.musics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: musics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.musics_id_seq OWNED BY public.musics.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    role_name character varying(50) NOT NULL
);


--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(35) NOT NULL,
    password character varying(200) NOT NULL,
    phone character varying(20) NOT NULL,
    dob date NOT NULL,
    role_id integer NOT NULL,
    status character varying(10) NOT NULL,
    gender character varying(20) NOT NULL,
    address character varying(50) NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_gender_check CHECK (((gender)::text = ANY ((ARRAY['m'::character varying, 'f'::character varying, 'o'::character varying])::text[]))),
    CONSTRAINT users_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[])))
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: artists id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artists ALTER COLUMN id SET DEFAULT nextval('public.artists_id_seq'::regclass);


--
-- Name: musics id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.musics ALTER COLUMN id SET DEFAULT nextval('public.musics_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: artists artists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);


--
-- Name: musics musics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.musics
    ADD CONSTRAINT musics_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users uq_email; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uq_email UNIQUE (email);


--
-- Name: users uq_full_name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uq_full_name UNIQUE (first_name, last_name);


--
-- Name: artists uq_name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT uq_name UNIQUE (name);


--
-- Name: users uq_phone; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uq_phone UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_album_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_album_name ON public.musics USING btree (album_name);


--
-- Name: idx_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_email ON public.users USING btree (email);


--
-- Name: idx_first_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_first_name ON public.users USING btree (first_name);


--
-- Name: idx_first_release_year; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_first_release_year ON public.artists USING btree (first_release_year);


--
-- Name: idx_last_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_last_name ON public.users USING btree (last_name);


--
-- Name: idx_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_name ON public.artists USING btree (name);


--
-- Name: idx_phone; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_phone ON public.users USING btree (phone);


--
-- Name: idx_title; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_title ON public.musics USING btree (title);


--
-- Name: musics fk_artist_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.musics
    ADD CONSTRAINT fk_artist_id FOREIGN KEY (artist_id) REFERENCES public.artists(id);


--
-- Name: users fk_role; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: artists fk_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20240619190639');
