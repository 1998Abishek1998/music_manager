
# Install NODE using nvm

NODE_VERSION=20.10.0
NPM_VERSION=10.2.3

## Running migrations

We're using [dbmate](https://github.com/amacneil/dbmate) to run db migrations.

```bash
[step1] sudo curl -fsSL -o /usr/local/bin/dbmate https://github.com/amacneil/dbmate/releases/latest/download/dbmate-linux-amd64

[step2] sudo chmod +x /usr/local/bin/dbmate
```

`dbmate` looks for a `DATABASE_URL` variable in the env.

```
DATABASE_URL=postgresql://sapta:Sapta@123@localhost:5432/testdb
```

Run migrations using `make migrate`. Note that this will dump a `schema.sql` file in the `db` folder, which should be checked into the repo. This is needed for quickly creating a new db without running each migration in order.

Note that these migrations are only for new tables and queries.


This project was created using `npm init` in npm v10.2.3. [npm] is a fast all-in-one JavaScript runtime.


## Start In development

```bash
make install
```

To run:

```bash
make run 
```

To build:

```bash
make build
```

## DockerRunner

To run docker:

```bash
docker build -t myapp.
```

To connect:

```bash
docker run -it --rm myapp /bin/bash
```

To run:

```bash
docker run -it ---rm myap
```
