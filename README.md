# Lose!t
Painonhallintasovellus

## Tietokannan asennus

### Täysin automatisoitu luksusasennus
Mikäli sinulla on docker asennettuna, voit käyttää hyväksesi projektiin lisättyä Docker-skriptiä. Dockerin saat asennettua useimmissa Linux-jakeluissa suoraan paketinhallinnasta. Esim Ubuntu / Debian:
```
sudo apt install docker
```
Tämän jälkeen kloonaa tämä git-repo, siirry projektin sisältävään kansioon, ja aja seuraavat skriptit:
```
./mariadb-docker.sh install
./mariadb-docker.sh start
./mariadb-docker.sh setup
```
Ensimmäinen näistä asentaa Mariadb:n Docker-ympäristöön, toinen käynnistää MariaDB:n ja kolmas taas konfiguroi tietokannan valmiiksi sovellusta varten. Siirry kohtaan buildaaminen.

### Asennus käsipelissä vanhan liiton ihmisille
Luo tietokantakäyttäjä nimeltä `expressmysql` ja anna sille oikeudet painonhallinta_db -kantaan.

    CREATE USER 'expressmysql'@'%';
    CREATE DATABASE painonhallinta_db;
    GRANT ALL PRIVILEGES ON painonhallinta_db.* TO 'expressmysql'@'%' IDENTIFIED BY 'UomaWoo4';

Aja sen jälkeen misc-kansiossta SQL-skriptit `painonhallinta_db.sql`, `migration-1.sql` ja `migration-2.sql`.

**Vaihtoehtoisesti** voit vain ajaa misc-kansiosta skriptin `painonhallintasovellus.sql`, joka luo tietokantakäyttäjän, tietokannan, antaa oikeudet ynnä muuta.

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

## Rajapintakuvaus
