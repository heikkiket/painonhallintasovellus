# Lose!t
Painonhallintasovellus

## Asennus

Luo tietokantakäyttäjä nimeltä `expressmysql` ja anna sille oikeudet painonhallinta_db -kantaan.

    CREATE USER 'expressmysql'@'%';
    CREATE DATABASE painonhallinta_db;
    GRANT ALL PRIVILEGES ON painonhallinta_db.* TO 'expressmysql'@'%' IDENTIFIED BY 'UomaWoo4';

