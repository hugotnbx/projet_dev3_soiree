CREATE TABLE client (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    numero_telephone VARCHAR(20),
    
);

CREATE TABLE event(
    id int PRIMARY KEY,
    nom varchar(50) NOT NULL,
    date DATE NOT NULL,
    heure TIMe NOT NULL,
    lieu VARCHAR(100) NOT NULL
);

create table event_client(
    id_event int FOREIGN KEY REFERENCES event(id), 
    id_client int FOREIGN KEY REFERENCES client(id), 
    PRIMARY KEY(id_event, id_client)
);