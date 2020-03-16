# Lose!t
Painonhallintasovellus

## Tietokannan asennus

### Täysin automatisoitu luksusasennus
Mikäli sinulla on docker asennettuna, voit käyttää hyväksesi projektiin lisättyä Docker-skriptiä. Dockerin saat asennettua oheisien ohjeiden avulla:

https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository
https://docs.docker.com/docker-for-mac/install/
https://docs.docker.com/docker-for-windows/install/

Tämän jälkeen kloonaa tämä git-repo, siirry projektin sisältävään kansioon, ja aja seuraavat skriptit:
```
./mariadb-docker.sh install
./mariadb-docker.sh start
./mariadb-docker.sh setup
```
Ensimmäinen näistä asentaa Mariadb:n Docker-ympäristöön, toinen käynnistää MariaDB:n ja kolmas taas konfiguroi tietokannan valmiiksi sovellusta varten. Siirry kohtaan buildaaminen.

Kun olet lopettanut sovelluksen testaamisen, voit poistaa ympäristön koneeltasi komennolla
```
./mariadb-docker.sh remove
```

### Asennus käsipelissä vanhan liiton ihmisille
Asenna Mysql ja konfiguroi se.

Kokeile ajaa misc-kansiosta skripti `painonhallintasovellus.sql`, joka luo tietokantakäyttäjän, tietokannan, asettaa oikeudet ynnä muuta. Jos kaikki toimii, siirry kohtaan buildaaminen.

**Vaihtoehtoisesti**  Voit tehdä sen mitä skripti tekee mutta manuaalisesti:

Luo tietokantakäyttäjä nimeltä `expressmysql` ja anna sille oikeudet painonhallinta_db -kantaan.

    CREATE USER 'expressmysql'@'%';
    CREATE DATABASE painonhallinta_db;
    GRANT ALL PRIVILEGES ON painonhallinta_db.* TO 'expressmysql'@'%' IDENTIFIED BY 'UomaWoo4';

Aja sen jälkeen misc-kansiossta SQL-skriptit `painonhallinta_db.sql`, `migration-1.sql` ja `migration-2.sql`.


SQL-skriptien ajaminen tapahtuu ainakin Bash- ja Zsh-komentotulkeissa seuraavasti:
```
mysql -u root -p < misc/skripti.sql
```
## Buildaaminen
Projektikansiossa asenna aluksi kaikki npm-riippuvuudet:
```
npm install
```
Tämän jälkeen voit käynnistää sovelluksen:
```
npm run api
```

## Käyttäjän luominen

Jotta sovellukseen voi kirjautua, pitää luoda käyttäjä. Se tapahtuu seuraavasti:

```
POST localhost:8081

{
  name: Pentti,
  "password": "asd123",
  "height": 187,
  "startingWeight": 100,
  "targetWeight": 80
}

```

## Rajapintakuvaus

| Metodi | Endpoint            | Body   | Kuvaus   |
| ------ | :-----------------: | -----: | -------: |
| GET    | /measures/:userId   |        |          |
| POST   |                     |        |          |
| PUT    |                     |        |          |
|        |                     |        |          |
|        |                     |        |          |
|        |                     |        |          |
|        |                     |        |          |
