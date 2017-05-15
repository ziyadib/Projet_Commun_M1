-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mar 05 Avril 2016 à 14:33
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `revisator`
--

-- --------------------------------------------------------

--
-- Structure de la table `compte`
--

CREATE TABLE IF NOT EXISTS `compte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `date_naissance` date DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `Type_idType` int(11) NOT NULL,
  `Etablissement_idEtablissement` int(11) NOT NULL,
  `Niveau_etude_idNiveau_etude` int(11) NOT NULL,
  `facebookid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Compte_Type1_idx` (`Type_idType`),
  KEY `fk_Compte_Etablissement1_idx` (`Etablissement_idEtablissement`),
  KEY `fk_Compte_Niveau_etude1_idx` (`Niveau_etude_idNiveau_etude`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Contenu de la table `compte`
--

INSERT INTO `compte` (`id`, `username`, `nom`, `prenom`, `date_naissance`, `password`, `Type_idType`, `Etablissement_idEtablissement`, `Niveau_etude_idNiveau_etude`, `facebookid`) VALUES
(3, 'langloiy', 'Langlois', 'Yan', '2016-03-17', 'nEqy5N99', 1, 1, 3, NULL),
(4, 'ziyadb', 'Ziyadi', 'Bader', '1994-07-15', 'd6RnMg29', 1, 1, 3, NULL),
(5, 'boutouik', 'Boutouil', 'Karim', '1994-10-29', 'BLq8z93z', 1, 1, 3, NULL),
(6, 'roubinowitv', 'Roubinowitz', 'Victor', '1993-03-11', '7qrW68dN', 1, 1, 3, NULL),
(7, 'ror', 'Roy', 'Remi', '1995-03-24', '7vDf6c9C', 1, 1, 3, NULL),
(9, 'breda', 'Breda', 'Laurent', '0000-00-00', '62auXQ8j', 2, 1, 5, NULL),
(10, 'admin', 'Administrateur', 'Administrateur', '0000-00-00', 'wrC825Xg', 3, 1, 8, NULL),
(13, 'test', 'test', 'test', NULL, '$2a$10$RW8ruudvoTsPGmxAWo4zPO/WW07ty2pdLuBCEJCTjkcOEJzPq1eRm', 1, 1, 1, NULL),
(14, 'Yan Langlois', 'test', 'test', NULL, '', 1, 1, 1, '564057853752831'),
(15, 'yan.langlois@univ-paris1.fr', 'test', 'test', NULL, '$2a$10$Zt0UOOc3wSlFXhmtPrBreOTotgDta1jYxV19.nvnP3YJR40s2b3tG', 1, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `demande_amis`
--

CREATE TABLE IF NOT EXISTS `demande_amis` (
  `idListe_Amis` int(11) NOT NULL,
  `estOk` tinyint(1) DEFAULT NULL,
  `Compte_id` int(11) NOT NULL,
  `Compte_id1` int(11) NOT NULL,
  PRIMARY KEY (`idListe_Amis`),
  KEY `fk_Demande_Amis_Compte1_idx` (`Compte_id`),
  KEY `fk_Demande_Amis_Compte2_idx` (`Compte_id1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `domaine`
--

CREATE TABLE IF NOT EXISTS `domaine` (
  `idDomaine` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  PRIMARY KEY (`idDomaine`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `domaine`
--

INSERT INTO `domaine` (`idDomaine`, `nom`) VALUES
(1, 'Informatique');

-- --------------------------------------------------------

--
-- Structure de la table `etablissement`
--

CREATE TABLE IF NOT EXISTS `etablissement` (
  `idEtablissement` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `ville` varchar(45) NOT NULL,
  PRIMARY KEY (`idEtablissement`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Contenu de la table `etablissement`
--

INSERT INTO `etablissement` (`idEtablissement`, `nom`, `ville`) VALUES
(1, 'Université Paris I Panthéon-Sorbonne', 'Paris'),
(2, 'Université Paris V Descartes', 'Paris'),
(3, 'Université Lille I', 'Lille'),
(4, 'Université Savoie Mont Blanc', 'Chambéry'),
(5, 'Université Parix X Nanterre', 'Nanterre'),
(6, 'Université Jean Moulin Lyon III', 'Lyon'),
(7, 'Université d''Aix-Marseille', 'Marseille'),
(8, 'Université de Bourgogne', 'Dijon'),
(9, 'Université de Bordeaux', 'Bordeaux'),
(10, 'Université de Toulouse', 'Toulouse');

-- --------------------------------------------------------

--
-- Structure de la table `matiere`
--

CREATE TABLE IF NOT EXISTS `matiere` (
  `idMatiere` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `Domaine_idDomaine` int(11) NOT NULL,
  PRIMARY KEY (`idMatiere`),
  KEY `fk_Matiere_Domaine1_idx` (`Domaine_idDomaine`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Contenu de la table `matiere`
--

INSERT INTO `matiere` (`idMatiere`, `nom`, `Domaine_idDomaine`) VALUES
(1, 'Architecture des SGBD', 1),
(2, 'Algorithmique Avancée', 1),
(3, 'Technologies du Web', 1),
(4, 'Développement d''IHM', 1),
(5, 'Conduite des projets informatique', 1),
(6, 'Techniques de Tests et Validation du logiciel', 1),
(7, 'Mathématiques pour l''informatique', 1),
(9, 'Bases de la RO et de l''Optimisation', 1),
(11, 'Sécurité des SI', 1),
(12, 'Programmation OO', 1),
(13, 'Architecture orientée objet', 1),
(14, 'Introduction aux BDD', 1),
(15, 'Statistiques', 1);

-- --------------------------------------------------------

--
-- Structure de la table `niveau_etude`
--

CREATE TABLE IF NOT EXISTS `niveau_etude` (
  `idNiveau_etude` int(11) NOT NULL AUTO_INCREMENT,
  `niveau` varchar(45) NOT NULL,
  PRIMARY KEY (`idNiveau_etude`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Contenu de la table `niveau_etude`
--

INSERT INTO `niveau_etude` (`idNiveau_etude`, `niveau`) VALUES
(1, 'BAC +1'),
(2, 'BAC +2'),
(3, 'BAC +3'),
(4, 'BAC +4'),
(5, 'BAC +5'),
(6, 'BAC +6'),
(7, 'BAC +7'),
(8, 'BAC +8');

-- --------------------------------------------------------

--
-- Structure de la table `niveau_etude_has_etablissement`
--

CREATE TABLE IF NOT EXISTS `niveau_etude_has_etablissement` (
  `Niveau_etude_idNiveau_etude` int(11) NOT NULL,
  `Etablissement_idEtablissement` int(11) NOT NULL,
  PRIMARY KEY (`Niveau_etude_idNiveau_etude`,`Etablissement_idEtablissement`),
  KEY `fk_Niveau_etude_has_Etablissement_Etablissement1_idx` (`Etablissement_idEtablissement`),
  KEY `fk_Niveau_etude_has_Etablissement_Niveau_etude1_idx` (`Niveau_etude_idNiveau_etude`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `niveau_etude_has_etablissement`
--

INSERT INTO `niveau_etude_has_etablissement` (`Niveau_etude_idNiveau_etude`, `Etablissement_idEtablissement`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1);

-- --------------------------------------------------------

--
-- Structure de la table `proposition`
--

CREATE TABLE IF NOT EXISTS `proposition` (
  `idProposition` int(11) NOT NULL AUTO_INCREMENT,
  `proposition` longtext,
  `estValide` tinyint(1) DEFAULT NULL,
  `Question_idQuestion` int(11) NOT NULL,
  PRIMARY KEY (`idProposition`),
  KEY `fk_Proposition_Question1_idx` (`Question_idQuestion`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=110 ;

--
-- Contenu de la table `proposition`
--

INSERT INTO `proposition` (`idProposition`, `proposition`, `estValide`, `Question_idQuestion`) VALUES
(1, 'Ch1 . Ch2 . Ch3', 0, 1),
(2, 'Ch1 & Ch2 & Ch3', 0, 1),
(3, 'CONCAT(Ch1, ch2, Ch3)', 1, 1),
(4, 'Ch1 + Ch2 + Ch3', 0, 1),
(5, 'est prise en compte avec COUNT() et GROUP BY', 0, 2),
(6, 'n''est pas cumulée dans les COUNT() mais est regroupée avec GROUP BY', 1, 2),
(7, 'n''est prise en compte ni avec COUNT() ni avec GROUP BY', 0, 2),
(8, 'est cumulée dans les COUNT() mais n''est pas prise en compte avec GROUP BY', 0, 2),
(9, 'Jointure', 1, 3),
(10, 'JointVenture', 0, 3),
(11, 'Jonction', 0, 3),
(12, 'Juxtaposition', 0, 3),
(13, '3', 0, 4),
(14, '1', 0, 4),
(15, '2', 0, 4),
(16, 'une erreur', 1, 4),
(17, 'une erreur', 0, 5),
(18, '2', 0, 5),
(19, '4', 0, 5),
(20, '1', 0, 5),
(21, '3', 1, 5),
(22, 'trier les chaines en ordre croissant', 0, 6),
(23, 'supprimer les espaces en début et fin', 1, 6),
(24, 'concaténer deux chaines', 0, 6),
(25, 'extraire une sous-chaine d''une autre', 0, 6),
(26, 'à rien', 0, 7),
(27, 'faciliter les extractions de données', 1, 7),
(28, 'éviter la duplication des informations', 0, 7),
(29, 'accélérer les extractions de données', 0, 7),
(30, 'renvoie les enregistrements 10 à 14', 0, 8),
(31, ' renvoie les enregistrements 6 à 15', 1, 8),
(32, 'renvoie les enregistrements 5 à 14', 0, 8),
(33, 'renvoie les enregistrements 6 à 10', 0, 8),
(34, 'renvoie les enregistrements 11 à 15', 0, 8),
(35, 'A doit apparaitre au moins 3 fois', 1, 9),
(36, 'A doit apparaitre 3 fois et suivi d''une virgule "AAA,"', 0, 9),
(37, 'A doit apparaitre 3 fois "AAA"', 0, 9),
(38, 'on doit obtenir "A,A,A,"', 0, 9),
(39, 'A exclus', 0, 10),
(40, '1 ou plusieurs A', 0, 10),
(41, 'A suivi de n''importe quoi', 0, 10),
(42, '0 ou plusieurs A', 1, 10),
(43, 'contient "lapin" mais pas "chat"', 0, 11),
(44, 'commence par "lapin" et termine par "chat"', 0, 11),
(45, 'contient "lapin" et "chat"', 0, 11),
(46, ' contient "lapin" ou "chat"', 1, 11),
(47, 's', 0, 12),
(48, 'i', 0, 12),
(49, '^', 1, 12),
(50, '$', 0, 12),
(51, '%', 0, 12),
(52, 'DISTINCT(LibProd)', 0, 13),
(53, 'GROUP(LibProd)', 0, 13),
(54, 'HAVING UNIQUE LibProd', 0, 13),
(55, 'GROUP BY LibProd', 1, 13),
(56, 'lire le contenu d''un fichier et le retourner en tant que table de données', 0, 14),
(57, 'lire le contenu d''un fichier et le retourner en tant que chaine', 1, 14),
(58, 'cette fonction n''existe pas en MySQL', 0, 14),
(59, 'charger et appliquer un fichier de paramètres .INI', 0, 14),
(60, 'OPTIMIZE TABLE tbl_name', 1, 15),
(61, 'UPDATE TABLE tbl_name', 0, 15),
(62, 'DEFRAG TABLE tbl_name', 0, 15),
(63, 'ALTER TABLE tbl_name ENGINE=INNODB', 1, 15),
(64, 'ALTER TABLE tbl_name FORCE', 1, 15),
(65, 'REORDER TABLE tbl_name', 0, 15),
(66, 'mysqlcheck -u username -p --auto-repair --optimize --all-databases', 1, 15),
(67, '1980', 0, 16),
(68, '1985', 0, 16),
(69, '1995', 1, 16),
(70, '1990', 0, 16),
(71, 'TABLE.MYD', 1, 17),
(72, 'TABLE.MDB', 0, 17),
(73, 'TABLE.DAT', 0, 17),
(74, 'TABLE.FRM', 0, 17),
(75, 'TABLE.MYI', 0, 18),
(76, 'TABLE.FRM', 1, 18),
(77, 'TABLE.MYS', 0, 18),
(78, 'TABLE.DEF', 0, 18),
(79, 'TABLE.MYI', 1, 19),
(80, 'TABLE.FRM', 0, 19),
(81, 'TABLE.IND', 0, 19),
(82, 'TABLE.IDX', 0, 19),
(83, 'à amener de mauvaises bases de données à l''enfer', 0, 20),
(84, 'démarrer et arrêter une base de données MySQL', 0, 20),
(85, 'démarrer et arrêter le serveur MySQL', 1, 20),
(86, 'torturer les mauvais administrateurs de base de données', 0, 20),
(87, 'gérer le serveur MySQL', 0, 20),
(88, 'créer un script shell avec la commande "mysqld» et ses options. Ensuite, exécuter le script pour démarrer le serveur', 1, 21),
(89, 'créer un service de système de Windows avec la commande "mysqld» et ses options. Et exécuter le service', 0, 21),
(90, 'entrer "mysqld" avec des options de commande dans une fenêtre de commande', 1, 21),
(91, 'double-clic sur le nom du fichier, mysqld.exe dans les ordinateurs Windows', 1, 21),
(92, 'SELECT * FROM <NOM DE LA TABLE>', 1, 22),
(93, 'DELETE FROM <NOM DE LA TABLE>', 0, 22),
(94, 'READ FROM <NOM DE LA TABLE>', 0, 22),
(95, 'DROP TABLE <NOM DE LA TABLE>', 0, 22),
(96, 'DROP TABLE <NOM DE LA TABLE>', 1, 23),
(97, 'DELETE TABLE <NOM DE LA TABLE>', 0, 23),
(98, 'Vrai', 1, 24),
(99, 'Faux', 0, 24),
(100, 'Vrai', 1, 25),
(101, 'Faux', 0, 25),
(102, 'Vrai', 1, 26),
(103, 'Faux', 0, 26),
(104, 'Vrai', 0, 27),
(105, 'Faux', 1, 27),
(106, 'Vrai', 1, 28),
(107, 'Faux', 0, 28),
(108, 'Vrai', 0, 29),
(109, 'Faux', 1, 29);

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

CREATE TABLE IF NOT EXISTS `question` (
  `idQuestion` int(11) NOT NULL AUTO_INCREMENT,
  `nom` longtext NOT NULL,
  `Quizz_idQuizz` int(11) NOT NULL,
  PRIMARY KEY (`idQuestion`),
  KEY `fk_Question_Quizz1_idx` (`Quizz_idQuizz`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=30 ;

--
-- Contenu de la table `question`
--

INSERT INTO `question` (`idQuestion`, `nom`, `Quizz_idQuizz`) VALUES
(1, 'Comment concaténer 3 chaines de caractères ?', 1),
(2, 'La valeur NULL :', 1),
(3, 'Comment s''appelle l''opération de liaison de données permettent d''interroger plusieurs tables MySQL à la fois ?', 1),
(4, 'SELECT ELEMENT(2, "a", "b", "c" )  retourne :', 1),
(5, 'SELECT FIELD( "c", "a", "b", "c") retourne :', 1),
(6, 'TRIM() appliquée à des chaines de caractères est utile pour :', 1),
(7, 'A quoi cela sert-il de relier plusieurs tables entre elles ?', 1),
(8, 'Que fait :  SELECT * FROM MaTable  LIMIT 5, 10; ?', 1),
(9, 'Dans une expression régulière A{3,} signifie :', 1),
(10, 'Dans une expression régulière A* signifie :', 1),
(11, 'WHERE Chaine1 REGEXP "lapin|chat" retourne les lignes où Chaine1 :', 1),
(12, 'Quel code indique le début d''un champ dans une expression régulière ?', 1),
(13, 'Quelle clause utiliser pour effectuer des sous-totaux par produits librés (LibProd) ?', 1),
(14, 'LOAD_FILE(file_name) permet de :', 1),
(15, 'Pour défragmenter une table en MySQL on peut utiliser :', 2),
(16, 'La toute première version de MySQL est apparue en', 3),
(17, 'Dans quel fichier sont stockées les données d''une table ?', 3),
(18, 'Dans quel fichier est stockée la structure de la table ?', 3),
(19, 'Dans quel fichier est stocké l''indexe d''une table ?', 3),
(20, '"mysqld" est le démon du MySQL qui fonctionne en arrière-plan et qui sert à', 3),
(21, 'Pour démarrer MySQL démon, mysqld, il faut faire', 3),
(22, 'Comment lire les données d''une table :', 4),
(23, 'Comment supprimer une table :', 4),
(24, 'Un ABR peut être équilibré ?', 5),
(25, 'Un ABR a deux fils au maximum ?', 5),
(26, 'Est-ce que ça marche ?', 6),
(27, 'Test', 6),
(28, 'test', 7),
(29, 'Test 2', 7);

-- --------------------------------------------------------

--
-- Structure de la table `quizz`
--

CREATE TABLE IF NOT EXISTS `quizz` (
  `idQuizz` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `Compte_idCompte` int(11) NOT NULL,
  `Matiere_idMatiere` int(11) NOT NULL,
  `Niveau_etude_idNiveau_etude` int(11) NOT NULL,
  PRIMARY KEY (`idQuizz`),
  KEY `fk_Quizz_Compte1_idx` (`Compte_idCompte`),
  KEY `fk_Quizz_Matiere1_idx` (`Matiere_idMatiere`),
  KEY `fk_Quizz_Niveau_etude1_idx` (`Niveau_etude_idNiveau_etude`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `quizz`
--

INSERT INTO `quizz` (`idQuizz`, `nom`, `Compte_idCompte`, `Matiere_idMatiere`, `Niveau_etude_idNiveau_etude`) VALUES
(1, 'Apprendre à manipuler une BDD', 9, 1, 3),
(2, 'Apprendre à optimiser les requêtes SQL', 9, 1, 3),
(3, 'Apprendre à installer une base de données', 9, 1, 3),
(4, 'Les requêtes', 9, 14, 3),
(5, 'ABR', 9, 2, 3),
(6, 'Jolie IHM', 9, 4, 3),
(7, 'Test test', 9, 11, 3);

-- --------------------------------------------------------

--
-- Structure de la table `resultat`
--

CREATE TABLE IF NOT EXISTS `resultat` (
  `idResultat` int(11) NOT NULL AUTO_INCREMENT,
  `nbQuestionBonne` int(11) NOT NULL,
  `nbQuestionTotal` int(11) NOT NULL,
  `Compte_idCompte` int(11) NOT NULL,
  `Quizz_idQuizz` int(11) NOT NULL,
  PRIMARY KEY (`idResultat`),
  KEY `fk_Resultat_Compte1_idx` (`Compte_idCompte`),
  KEY `fk_Resultat_Quizz1_idx` (`Quizz_idQuizz`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Contenu de la table `resultat`
--

INSERT INTO `resultat` (`idResultat`, `nbQuestionBonne`, `nbQuestionTotal`, `Compte_idCompte`, `Quizz_idQuizz`) VALUES
(1, 12, 14, 3, 1),
(2, 1, 1, 3, 2),
(3, 4, 6, 3, 3),
(4, 2, 6, 3, 3),
(5, 0, 1, 3, 2),
(6, 7, 14, 3, 1),
(7, 14, 14, 3, 1),
(8, 5, 6, 3, 3),
(9, 3, 14, 3, 1),
(10, 3, 14, 3, 1),
(11, 2, 2, 3, 4),
(12, 1, 2, 3, 5),
(13, 1, 2, 3, 6),
(14, 0, 14, 3, 1),
(15, 0, 1, 3, 2),
(16, 2, 2, 3, 7),
(17, 2, 2, 3, 4),
(18, 2, 2, 3, 7),
(19, 1, 2, 3, 5),
(20, 0, 2, 3, 4),
(21, 1, 14, 3, 1),
(22, 1, 2, 3, 4);

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

CREATE TABLE IF NOT EXISTS `type` (
  `idType` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idType`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `type`
--

INSERT INTO `type` (`idType`, `nom`) VALUES
(1, 'Etudiant'),
(2, 'Professeur'),
(3, 'Administrateur');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `compte`
--
ALTER TABLE `compte`
  ADD CONSTRAINT `fk_Compte_Etablissement1` FOREIGN KEY (`Etablissement_idEtablissement`) REFERENCES `etablissement` (`idEtablissement`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Compte_Niveau_etude1` FOREIGN KEY (`Niveau_etude_idNiveau_etude`) REFERENCES `niveau_etude` (`idNiveau_etude`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Compte_Type1` FOREIGN KEY (`Type_idType`) REFERENCES `type` (`idType`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `demande_amis`
--
ALTER TABLE `demande_amis`
  ADD CONSTRAINT `fk_Demande_Amis_Compte1` FOREIGN KEY (`Compte_id`) REFERENCES `compte` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Demande_Amis_Compte2` FOREIGN KEY (`Compte_id1`) REFERENCES `compte` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `matiere`
--
ALTER TABLE `matiere`
  ADD CONSTRAINT `fk_Matiere_Domaine1` FOREIGN KEY (`Domaine_idDomaine`) REFERENCES `domaine` (`idDomaine`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `niveau_etude_has_etablissement`
--
ALTER TABLE `niveau_etude_has_etablissement`
  ADD CONSTRAINT `fk_Niveau_etude_has_Etablissement_Etablissement1` FOREIGN KEY (`Etablissement_idEtablissement`) REFERENCES `etablissement` (`idEtablissement`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Niveau_etude_has_Etablissement_Niveau_etude1` FOREIGN KEY (`Niveau_etude_idNiveau_etude`) REFERENCES `niveau_etude` (`idNiveau_etude`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `proposition`
--
ALTER TABLE `proposition`
  ADD CONSTRAINT `fk_Proposition_Question1` FOREIGN KEY (`Question_idQuestion`) REFERENCES `question` (`idQuestion`) ON DELETE CASCADE;

--
-- Contraintes pour la table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `fk_Question_Quizz1` FOREIGN KEY (`Quizz_idQuizz`) REFERENCES `quizz` (`idQuizz`) ON DELETE CASCADE;

--
-- Contraintes pour la table `quizz`
--
ALTER TABLE `quizz`
  ADD CONSTRAINT `fk_Quizz_Compte1` FOREIGN KEY (`Compte_idCompte`) REFERENCES `compte` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Quizz_Matiere1` FOREIGN KEY (`Matiere_idMatiere`) REFERENCES `matiere` (`idMatiere`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Quizz_Niveau_etude1` FOREIGN KEY (`Niveau_etude_idNiveau_etude`) REFERENCES `niveau_etude` (`idNiveau_etude`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `resultat`
--
ALTER TABLE `resultat`
  ADD CONSTRAINT `fk_Resultat_Compte1` FOREIGN KEY (`Compte_idCompte`) REFERENCES `compte` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Resultat_Quizz1` FOREIGN KEY (`Quizz_idQuizz`) REFERENCES `quizz` (`idQuizz`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
