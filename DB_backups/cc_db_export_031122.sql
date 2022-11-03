-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: conscious_coding
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cohorts`
--

DROP TABLE IF EXISTS `cohorts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cohorts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `start_date` date NOT NULL DEFAULT curdate(),
  `zoom_link` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cohorts`
--

LOCK TABLES `cohorts` WRITE;
/*!40000 ALTER TABLE `cohorts` DISABLE KEYS */;
INSERT INTO `cohorts` VALUES (6,'Cohort 1','0000-00-00',NULL),(7,'Cohort 2','2022-09-02',NULL),(8,'test','2022-09-28','https://www.w3schools.com/sql/sql_alter.asp');
/*!40000 ALTER TABLE `cohorts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_types`
--

DROP TABLE IF EXISTS `game_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_types`
--

LOCK TABLES `game_types` WRITE;
/*!40000 ALTER TABLE `game_types` DISABLE KEYS */;
INSERT INTO `game_types` VALUES (1,'Pathways');
/*!40000 ALTER TABLE `game_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `number_rounds` int(11) DEFAULT NULL,
  `number_moves` int(11) DEFAULT NULL,
  `number_seconds` int(11) DEFAULT NULL,
  `points_toggle` int(11) DEFAULT NULL,
  `points_endpoint` int(11) DEFAULT NULL,
  `game_type` int(11) NOT NULL,
  `cohort_id` int(11) NOT NULL,
  `map_id` int(11) NOT NULL,
  `number_steals` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_gameCohort` (`cohort_id`),
  CONSTRAINT `fk_gameCohort` FOREIGN KEY (`cohort_id`) REFERENCES `cohorts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (83,'asdasd',2,10,20,1,20,1,7,1,6),(85,'Test2',3,10,20,1,5,1,6,1,6),(86,'Test8',3,5,20,1,1,1,6,1,6),(87,'test11',3,2,20,1,1,1,6,1,6),(88,'test10',3,15,20,1,1,1,6,1,6),(89,'test555',3,20,20,1,1,1,6,1,6),(90,'test11',4,20,50,1,2,1,6,1,6),(91,'flickerTest',2,50,1000,1,2,1,6,3,7),(95,'CreateGameTest',2,2,10,1,5,1,6,1,5);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maps`
--

DROP TABLE IF EXISTS `maps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(90) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`)),
  `cohort_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maps`
--

LOCK TABLES `maps` WRITE;
/*!40000 ALTER TABLE `maps` DISABLE KEYS */;
INSERT INTO `maps` VALUES (1,'test','{\"name\":\"flickerTest3\",\"tiles\":[\"StartPoint\",\"VerticalToggle\",\"VerticalToggle\",\"VerticalToggle\",\"VerticalToggle\"],\"positions\":[{\"x\":-8,\"y\":1,\"z\":0},{\"x\":-7,\"y\":1,\"z\":0},{\"x\":-6,\"y\":1,\"z\":0},{\"x\":-5,\"y\":1,\"z\":0},{\"x\":-4,\"y\":1,\"z\":0}]}',6),(2,'cohortTest2','{\"name\":\"flickerTest3\",\"tiles\":[\"StartPoint\",\"VerticalToggle\",\"HorizontalToggle\",\"HorizontalToggle\",\"VerticalToggle\",\"VerticalToggle\",\"VerticalToggle\",\"HorizontalToggle\",\"HorizontalToggle\",\"VerticalToggle\",\"HorizontalToggle\",\"VerticalToggle\",\"VerticalToggle\",\"HorizontalToggle\",\"HorizontalToggle\",\"HorizontalToggle\",\"VerticalToggle\",\"VerticalToggle\",\"HorizontalToggle\",\"VerticalToggle\",\"HorizontalToggle\",\"VerticalToggle\"],\"positions\":[{\"x\":-8,\"y\":1,\"z\":0},{\"x\":-7,\"y\":1,\"z\":0},{\"x\":-6,\"y\":1,\"z\":0},{\"x\":-5,\"y\":1,\"z\":0},{\"x\":-4,\"y\":-4,\"z\":0},{\"x\":-4,\"y\":-2,\"z\":0},{\"x\":-4,\"y\":0,\"z\":0},{\"x\":-4,\"y\":1,\"z\":0},{\"x\":-3,\"y\":1,\"z\":0},{\"x\":-3,\"y\":2,\"z\":0},{\"x\":-2,\"y\":1,\"z\":0},{\"x\":-1,\"y\":-1,\"z\":0},{\"x\":-1,\"y\":0,\"z\":0},{\"x\":-1,\"y\":1,\"z\":0},{\"x\":0,\"y\":1,\"z\":0},{\"x\":1,\"y\":1,\"z\":0},{\"x\":1,\"y\":2,\"z\":0},{\"x\":1,\"y\":3,\"z\":0},{\"x\":2,\"y\":1,\"z\":0},{\"x\":3,\"y\":0,\"z\":0},{\"x\":3,\"y\":1,\"z\":0},{\"x\":4,\"y\":1,\"z\":0}]}',6),(3,'cohortTest','{\"name\":\"endPointTest\",\"tiles\":[\"StartPoint\",\"VerticalToggle\",\"VerticalToggle\",\"VerticalToggle\",\"VerticalToggle\",\"VerticalToggle\",\"VerticalToggle\",\"EndPoint\"],\"positions\":[{\"x\":-7,\"y\":1,\"z\":0},{\"x\":-6,\"y\":1,\"z\":0},{\"x\":-5,\"y\":1,\"z\":0},{\"x\":-4,\"y\":1,\"z\":0},{\"x\":-3,\"y\":1,\"z\":0},{\"x\":-2,\"y\":1,\"z\":0},{\"x\":-1,\"y\":1,\"z\":0},{\"x\":0,\"y\":1,\"z\":0}]}',21194880);
/*!40000 ALTER TABLE `maps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` text DEFAULT NULL,
  `name` varchar(90) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `cohort_id` int(11) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `login_link` text DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `admin_link` text DEFAULT NULL,
  `admin_code` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_userCohort` (`cohort_id`),
  CONSTRAINT `fk_userCohort` FOREIGN KEY (`cohort_id`) REFERENCES `cohorts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (44,'jonathanssssssssssssssdyason@hotmail.com','asdasdsssstttfgh','2022-08-26',7,0,'http://localhost:3000/games/pathways?nick_name=asdasdsssstttfgh&team=Red&rounds=2&moves=10&seconds=20&toggle_points=1&endpoint_points=20',NULL,'',''),(45,'jonathandyason@hotmail.com','asdsssssssssssss','2022-09-02',7,NULL,'http://localhost:3000/games/pathways?nick_name=asdsssssssssssss&team=Yellow&rounds=2&moves=10&seconds=20&toggle_points=1&endpoint_points=20',NULL,NULL,NULL),(46,'jonathandyason@hotmail.com','tttasdddddaa','2022-09-11',7,1,'http://localhost:3000/games/pathways?nick_name=tttasdddddaa&team=Blue&rounds=2&moves=10&seconds=20&toggle_points=1&endpoint_points=20',NULL,'http://localhost:3000/login?99ca7b05-8953-41d3-971e-413eca366a72','99ca7b05-8953-41d3-971e-413eca366a72'),(47,'jonathandyason@hotmail.com','gfhfghfghasdasdasdasd','2022-09-01',7,1,'http://localhost:3000/games/pathways?nick_name=gfhfghfghasdasdasdasd&team=Blue&rounds=2&moves=10&seconds=20&toggle_points=1&endpoint_points=20',NULL,'http://localhost:3000/login?a7d4d4d3-1916-4dba-bc1b-500af3b2ab3e','a7d4d4d3-1916-4dba-bc1b-500af3b2ab3e'),(57,'jonathanasdasdasddyason@hotmail.com','ghgffghassdfasdasdasdasd','2022-08-27',7,0,'http://localhost:3000/games/pathways?nick_name=ghgffghassdfasdasdasdasd&team=Yellow&rounds=2&moves=10&seconds=20&toggle_points=1&endpoint_points=20','password','',''),(58,'jonathandyasadasdasdadsasdadsson@hotmail.com','Test Adminddddasdasdasdasdasdasdasdasd','2022-08-31',6,1,NULL,NULL,'http://localhost:3000/login?57231070-3d45-4e00-a094-5f5099f39949','57231070-3d45-4e00-a094-5f5099f39949'),(59,'jonathandyason@hotmail.com','Test Student','2022-09-02',6,1,'http://localhost:3000/games/pathways?nick_name=Test Student&team=Blue&rounds=2&moves=20&seconds=25&toggle_points=1&endpoint_points=2&steals=6&map=%7B%22name%22:%22TestMap2%22,%22tiles%22:%5B%22StartPoint%22,%22StartPoint%22,%22VerticalToggle%22,%22VerticalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22VerticalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22VerticalToggle%22,%22StartPoint%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22StartPoint%22,%22VerticalToggle%22,%22VerticalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22VerticalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22VerticalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22EndPoint%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22,%22EndPoint%22,%22VerticalToggle%22,%22VerticalToggle%22,%22HorizontalToggle%22,%22EndPoint%22,%22HorizontalToggle%22,%22HorizontalToggle%22,%22VerticalToggle%22%5D,%22positions%22:%5B%7B%22x%22:-9,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:-9,%22y%22:2,%22z%22:0%7D,%7B%22x%22:-8,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:-8,%22y%22:0,%22z%22:0%7D,%7B%22x%22:-8,%22y%22:2,%22z%22:0%7D,%7B%22x%22:-8,%22y%22:3,%22z%22:0%7D,%7B%22x%22:-8,%22y%22:4,%22z%22:0%7D,%7B%22x%22:-7,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:-7,%22y%22:2,%22z%22:0%7D,%7B%22x%22:-6,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:-6,%22y%22:-1,%22z%22:0%7D,%7B%22x%22:-6,%22y%22:0,%22z%22:0%7D,%7B%22x%22:-6,%22y%22:1,%22z%22:0%7D,%7B%22x%22:-6,%22y%22:2,%22z%22:0%7D,%7B%22x%22:-6,%22y%22:3,%22z%22:0%7D,%7B%22x%22:-6,%22y%22:4,%22z%22:0%7D,%7B%22x%22:-5,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:-5,%22y%22:2,%22z%22:0%7D,%7B%22x%22:-4,%22y%22:-6,%22z%22:0%7D,%7B%22x%22:-4,%22y%22:-5,%22z%22:0%7D,%7B%22x%22:-4,%22y%22:-4,%22z%22:0%7D,%7B%22x%22:-4,%22y%22:-3,%22z%22:0%7D,%7B%22x%22:-4,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:-4,%22y%22:-1,%22z%22:0%7D,%7B%22x%22:-4,%22y%22:0,%22z%22:0%7D,%7B%22x%22:-4,%22y%22:1,%22z%22:0%7D,%7B%22x%22:-4,%22y%22:2,%22z%22:0%7D,%7B%22x%22:-4,%22y%22:4,%22z%22:0%7D,%7B%22x%22:-3,%22y%22:-6,%22z%22:0%7D,%7B%22x%22:-3,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:-3,%22y%22:2,%22z%22:0%7D,%7B%22x%22:-3,%22y%22:3,%22z%22:0%7D,%7B%22x%22:-2,%22y%22:-6,%22z%22:0%7D,%7B%22x%22:-2,%22y%22:-4,%22z%22:0%7D,%7B%22x%22:-2,%22y%22:-3,%22z%22:0%7D,%7B%22x%22:-2,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:-2,%22y%22:-1,%22z%22:0%7D,%7B%22x%22:-2,%22y%22:0,%22z%22:0%7D,%7B%22x%22:-2,%22y%22:1,%22z%22:0%7D,%7B%22x%22:-2,%22y%22:2,%22z%22:0%7D,%7B%22x%22:-1,%22y%22:-8,%22z%22:0%7D,%7B%22x%22:-1,%22y%22:-6,%22z%22:0%7D,%7B%22x%22:-1,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:-1,%22y%22:2,%22z%22:0%7D,%7B%22x%22:-1,%22y%22:3,%22z%22:0%7D,%7B%22x%22:0,%22y%22:-6,%22z%22:0%7D,%7B%22x%22:0,%22y%22:-4,%22z%22:0%7D,%7B%22x%22:0,%22y%22:-3,%22z%22:0%7D,%7B%22x%22:0,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:0,%22y%22:-1,%22z%22:0%7D,%7B%22x%22:0,%22y%22:0,%22z%22:0%7D,%7B%22x%22:0,%22y%22:1,%22z%22:0%7D,%7B%22x%22:0,%22y%22:2,%22z%22:0%7D,%7B%22x%22:1,%22y%22:-8,%22z%22:0%7D,%7B%22x%22:1,%22y%22:-6,%22z%22:0%7D,%7B%22x%22:1,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:1,%22y%22:2,%22z%22:0%7D,%7B%22x%22:1,%22y%22:3,%22z%22:0%7D,%7B%22x%22:2,%22y%22:-6,%22z%22:0%7D,%7B%22x%22:2,%22y%22:-4,%22z%22:0%7D,%7B%22x%22:2,%22y%22:-3,%22z%22:0%7D,%7B%22x%22:2,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:2,%22y%22:-1,%22z%22:0%7D,%7B%22x%22:2,%22y%22:0,%22z%22:0%7D,%7B%22x%22:2,%22y%22:1,%22z%22:0%7D,%7B%22x%22:2,%22y%22:2,%22z%22:0%7D,%7B%22x%22:3,%22y%22:-8,%22z%22:0%7D,%7B%22x%22:3,%22y%22:-7,%22z%22:0%7D,%7B%22x%22:3,%22y%22:-6,%22z%22:0%7D,%7B%22x%22:3,%22y%22:-5,%22z%22:0%7D,%7B%22x%22:3,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:3,%22y%22:2,%22z%22:0%7D,%7B%22x%22:3,%22y%22:3,%22z%22:0%7D,%7B%22x%22:4,%22y%22:-4,%22z%22:0%7D,%7B%22x%22:4,%22y%22:-3,%22z%22:0%7D,%7B%22x%22:4,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:4,%22y%22:-1,%22z%22:0%7D,%7B%22x%22:4,%22y%22:0,%22z%22:0%7D,%7B%22x%22:4,%22y%22:1,%22z%22:0%7D,%7B%22x%22:4,%22y%22:2,%22z%22:0%7D,%7B%22x%22:4,%22y%22:4,%22z%22:0%7D,%7B%22x%22:5,%22y%22:-2,%22z%22:0%7D,%7B%22x%22:5,%22y%22:2,%22z%22:0%7D,%7B%22x%22:5,%22y%22:3,%22z%22:0%7D,%7B%22x%22:6,%22y%22:-1,%22z%22:0%7D,%7B%22x%22:6,%22y%22:0,%22z%22:0%7D,%7B%22x%22:6,%22y%22:1,%22z%22:0%7D,%7B%22x%22:6,%22y%22:2,%22z%22:0%7D%5D%7D',NULL,NULL,NULL),(60,'jonathandyason@hotmail.com','asdasddasdasd','2022-09-06',6,1,'http://localhost:3000/games/pathways?nick_name=asdasddasdasd&team=Yellow&game_id=93',NULL,NULL,NULL),(61,'jonathandyason@hotmail.com','asd','2022-09-23',6,1,'http://localhost:3000/games/pathways?nick_name=asd&team=Blue&game_id=91&room_name=RoomC6G91R9kb1j',NULL,'http://localhost:3000/login?919454d6-95c5-4ef8-acb1-9ff6dc8efe61','919454d6-95c5-4ef8-acb1-9ff6dc8efe61');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-03 11:37:40
