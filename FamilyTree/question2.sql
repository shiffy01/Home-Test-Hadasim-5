-- part 1
CREATE TABLE person (
    Person_Id INT PRIMARY KEY,
    Personal_Name VARCHAR(50), 
    Family_name VARCHAR(50),
    Gender ENUM('male', 'female'),
    Father_Id INT,
    Mother_Id INT, 
    Spouse_Id INT
);
INSERT INTO person (Person_Id, Personal_Name, Family_name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES
(1, 'Shiffy', 'Scheiner', 'female', 2, 3, NULL),
(2, 'Zev', 'Scheiner', 'male', NULL, NULL, 3),
(3, 'Estie', 'Scheiner', 'female', NULL, NULL, 2),
(4, 'Binyamin', 'Scheiner', 'male', 2, 3, NULL),
(5, 'Chana', 'Scheiner', 'female', 2, 3, NULL),
(6, 'Peretz', 'Scheiner', 'male', 2, 3, NULL);
SELECT * FROM person;

CREATE TABLE family_tree (
    Person_Id INT,
    Relative_Id INT,
    Connection_Type ENUM('father', 'mother', 'brother', 'sister', 'son', 'daughter', 'husband', 'wife'),
    PRIMARY KEY (Person_Id, Relative_Id)
);
INSERT INTO family_tree (Person_Id, Relative_Id, Connection_Type)
VALUES
(1, 3, 'mother'),
(1, 4, 'brother'),
(1, 5, 'sister'),
(2, 3, 'wife'),
(2, 1, 'daughter'),
(2, 6, 'son'),
(3, 5, 'daughter'),
(3, 4, 'son'),
(3, 6, 'son'),
(4, 2, 'father'),
(4, 6, 'brother'),
(4, 1, 'sister'),
(5, 2, 'father'),
(5, 6, 'brother'),
(5, 4, 'brother'),
(6, 3, 'mother'),
(6, 4, 'brother'),
(6, 1, 'sister');
SELECT * FROM family_tree;

-- part 2

INSERT INTO family_tree (Person_Id, Relative_Id, Connection_Type)
SELECT f1.Relative_Id, f1.Person_Id, 
       CASE 
           WHEN f1.Connection_Type = 'wife' THEN 'husband'
           WHEN f1.Connection_Type = 'husband' THEN 'wife'
       END AS Connection_Type
FROM family_tree f1
WHERE f1.Connection_Type IN ('wife', 'husband')
  AND NOT EXISTS (
      SELECT 1
      FROM family_tree f2
      WHERE f2.Person_Id = f1.Relative_Id
        AND f2.Relative_Id = f1.Person_Id
        AND f2.Connection_Type = 
            CASE 
                WHEN f1.Connection_Type = 'wife' THEN 'husband'
                WHEN f1.Connection_Type = 'husband' THEN 'wife'
            END
  );




INSERT INTO family_tree (Person_Id, Relative_Id, Connection_Type)
SELECT f1.Relative_Id, f1.Person_Id, 
       CASE 
           WHEN f1.Connection_Type = 'sister' AND p1.Gender = 'female' THEN 'sister'
           WHEN f1.Connection_Type = 'sister' AND p1.Gender = 'male' THEN 'brother'
           WHEN f1.Connection_Type = 'brother' AND p1.Gender = 'male' THEN 'brother'
           WHEN f1.Connection_Type = 'brother' AND p1.Gender = 'female' THEN 'sister'
       END AS Connection_Type
FROM family_tree f1
JOIN person p1 ON f1.Person_Id = p1.Person_Id
WHERE f1.Connection_Type IN ('sister', 'brother')
  AND NOT EXISTS (
      SELECT 1
      FROM family_tree f2
      WHERE f2.Person_Id = f1.Relative_Id
        AND f2.Relative_Id = f1.Person_Id
        AND f2.Connection_Type = 
            CASE 
                WHEN f1.Connection_Type = 'sister' AND p1.Gender = 'female' THEN 'sister'
                WHEN f1.Connection_Type = 'sister' AND p1.Gender = 'male' THEN 'brother'
                WHEN f1.Connection_Type = 'brother' AND p1.Gender = 'male' THEN 'brother'
                WHEN f1.Connection_Type = 'brother' AND p1.Gender = 'female' THEN 'sister'
            END
  );

INSERT INTO family_tree (Person_Id, Relative_Id, Connection_Type)
SELECT f1.Relative_Id, f1.Person_Id, 
       CASE 
           WHEN f1.Connection_Type = 'mother' AND p1.Gender = 'female' THEN 'daughter'
           WHEN f1.Connection_Type = 'mother' AND p1.Gender = 'male' THEN 'son'
           WHEN f1.Connection_Type = 'father' AND p1.Gender = 'male' THEN 'son'
           WHEN f1.Connection_Type = 'father' AND p1.Gender = 'female' THEN 'daughter'
           WHEN f1.Connection_Type = 'son' AND p1.Gender = 'female' THEN 'mother'
           WHEN f1.Connection_Type = 'son' AND p1.Gender = 'male' THEN 'father'
           WHEN f1.Connection_Type = 'daughter' AND p1.Gender = 'male' THEN 'father'
           WHEN f1.Connection_Type = 'daughter' AND p1.Gender = 'female' THEN 'mother'
       END AS Connection_Type
FROM family_tree f1
JOIN person p1 ON f1.Person_Id = p1.Person_Id
WHERE f1.Connection_Type IN ('mother', 'father', 'daughter', 'son')
  AND NOT EXISTS (
      SELECT 1
      FROM family_tree f2
      WHERE f2.Person_Id = f1.Relative_Id
        AND f2.Relative_Id = f1.Person_Id
        AND f2.Connection_Type = 
            CASE 
                WHEN f1.Connection_Type = 'mother' AND p1.Gender = 'female' THEN 'daughter'
			    WHEN f1.Connection_Type = 'mother' AND p1.Gender = 'male' THEN 'son'
			    WHEN f1.Connection_Type = 'father' AND p1.Gender = 'male' THEN 'son'
			    WHEN f1.Connection_Type = 'father' AND p1.Gender = 'female' THEN 'daughter'
			    WHEN f1.Connection_Type = 'son' AND p1.Gender = 'female' THEN 'mother'
			    WHEN f1.Connection_Type = 'son' AND p1.Gender = 'male' THEN 'father'
			    WHEN f1.Connection_Type = 'daughter' AND p1.Gender = 'male' THEN 'father'
			    WHEN f1.Connection_Type = 'daughter' AND p1.Gender = 'female' THEN 'mother'
            END
  );
