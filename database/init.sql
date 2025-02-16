CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    Marque VARCHAR(100),
    Modele_dossier VARCHAR(100),
    Modele_commercial VARCHAR(100),
    Designation_commerciale VARCHAR(100),
    CNIT VARCHAR(100),
    Type_Variante_Version VARCHAR(100),
    Carburant VARCHAR(50),
    Hybride VARCHAR(50),
    Puissance_administrative FLOAT,
    Puissance_maximale FLOAT,
    Boite_de_vitesse VARCHAR(50),
    Consommation_urbine FLOAT,
    Consommation_extra_urbaine FLOAT,
    Consommation_mixte FLOAT,
    CO2 FLOAT,
    CO_type_I FLOAT,
    HC FLOAT,
    NOx FLOAT,
    HC_NOx FLOAT,
    Particules FLOAT,
    Masse_vide_euro_min FLOAT,
    Masse_vide_euro_max FLOAT,
    Champ_v9 VARCHAR(100),
    Annee INT,
    Carrosserie VARCHAR(50),
    Gamme VARCHAR(50)
);

COPY cars(Marque, Modele_dossier, Modele_commercial, Designation_commerciale, CNIT, Type_Variante_Version, Carburant, Hybride, Puissance_administrative, Puissance_maximale, Boite_de_vitesse, Consommation_urbine, Consommation_extra_urbaine, Consommation_mixte, CO2, CO_type_I, HC, NOx, HC_NOx, Particules, Masse_vide_euro_min, Masse_vide_euro_max, Champ_v9, Annee, Carrosserie, Gamme)
FROM '/docker-entrypoint-initdb.d/vehicules-commercialises.csv' 
DELIMITER ',' CSV HEADER; 
 