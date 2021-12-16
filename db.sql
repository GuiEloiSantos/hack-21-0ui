-- this is just a dump of all the sql I used to setup the db
CREATE SCHEMA IF NOT EXISTS hack_21_0ui;

CREATE TABLE test
(
    id         SERIAL NOT NULL PRIMARY KEY,
    message    TEXT   NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'utc')
)