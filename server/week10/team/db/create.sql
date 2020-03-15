CREATE TABLE week10_team_person 
(
    id serial PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    dob varchar(255) NOT NULL
);

CREATE TABLE week10_team_parentchild
(
    id serial PRIMARY KEY,
    parent_id integer NOT NULL,
    child_id integer NOT NULL
);

ALTER TABLE week10_team_parentchild ADD CONSTRAINT week10_team_parentchild_fk0 FOREIGN KEY (parent_id) REFERENCES week10_team_person(id);
ALTER TABLE week10_team_parentchild ADD CONSTRAINT week10_team_parentchild_fk1 FOREIGN KEY (child_id) REFERENCES week10_team_person(id);