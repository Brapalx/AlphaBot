CREATE DATABASE AlphaDB;

CREATE TABLE Users (
    ID varchar(100) NOT NULL PRIMARY KEY,
    LVL int NOT NULL,
    XP int NOT NULL,
    CURR int NOT NULL,
    CLOWNED int NOT NULL,
    FOOLED int NOT NULL,
    WON int NOT NULL,
    USER varchar(100) NOT NULL
);

CREATE TABLE Pokemon (
    STRING varchar(100) NOT NULL PRIMARY KEY,
    WINS int NOT NULL,
    LOSSES int NOT NULL,
    DRAWS int NOT NULL
);
