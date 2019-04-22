-- MySQL dump 10.13  Distrib 5.7.23, for Linux (x86_64)
--
-- Host: localhost    Database: rentallv171
-- ------------------------------------------------------
-- Server version	5.7.23-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AdminUser`
--

DROP TABLE IF EXISTS `AdminUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AdminUser` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailConfirmed` tinyint(1) DEFAULT '0',
  `isSuperAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminUser`
--

LOCK TABLES `AdminUser` WRITE;
/*!40000 ALTER TABLE `AdminUser` DISABLE KEYS */;
INSERT INTO `AdminUser` VALUES ('8b16c890-c205-11e6-a2c7-4195de507451','admin@radicalstart.com','$2a$08$SR.h58BFMCbcHbl3y9tvYe9UM.q1SMXh43M51po7FDXQrOcMpQxLy',1,1,'2016-12-14 13:59:34','2016-12-14 13:59:34');
/*!40000 ALTER TABLE `AdminUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Banner`
--

DROP TABLE IF EXISTS `Banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Banner`
--

LOCK TABLES `Banner` WRITE;
/*!40000 ALTER TABLE `Banner` DISABLE KEYS */;
INSERT INTO `Banner` VALUES (1,'Start Moving.','Book unique homes and experience a city like a local.',1,'2017-11-22 16:46:12','2017-08-19 11:38:31');
/*!40000 ALTER TABLE `Banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BedTypes`
--

DROP TABLE IF EXISTS `BedTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BedTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) DEFAULT NULL,
  `bedCount` int(11) DEFAULT NULL,
  `bedType` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BedTypes`
--

LOCK TABLES `BedTypes` WRITE;
/*!40000 ALTER TABLE `BedTypes` DISABLE KEYS */;
/*!40000 ALTER TABLE `BedTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cancellation`
--

DROP TABLE IF EXISTS `Cancellation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cancellation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `policyName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `policyContent` mediumtext COLLATE utf8mb4_unicode_ci,
  `priorDays` int(11) NOT NULL,
  `accommodationPriorCheckIn` float NOT NULL,
  `accommodationBeforeCheckIn` float NOT NULL,
  `accommodationDuringCheckIn` float NOT NULL,
  `guestFeePriorCheckIn` float NOT NULL,
  `guestFeeBeforeCheckIn` float NOT NULL,
  `guestFeeDuringCheckIn` float NOT NULL,
  `hostFeePriorCheckIn` float NOT NULL,
  `hostFeeBeforeCheckIn` float NOT NULL,
  `hostFeeDuringCheckIn` float NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cancellation`
--

LOCK TABLES `Cancellation` WRITE;
/*!40000 ALTER TABLE `Cancellation` DISABLE KEYS */;
INSERT INTO `Cancellation` VALUES (1,'Flexible','Cancel up to 24 hours before your trip and get a 100% refund plus service fees back.',1,100,100,100,100,100,0,100,100,100,1,'2017-06-09 22:43:35','2017-06-09 22:43:35'),(2,'Moderate','Cancel up to 5 days before your trip and get a full refund. Cancel within 5 days of the trip and get a 50% refund of the nightly rate, as well as a full refund of fees.',5,100,50,50,100,100,0,100,100,100,1,'2017-06-09 22:46:10','2017-06-09 22:46:10'),(3,'Strict','Cancel up to 7 days before your trip and get a 50% refund plus service fees back.',7,50,0,0,100,100,0,100,100,100,1,'2017-06-09 22:47:38','2017-06-09 22:47:38');
/*!40000 ALTER TABLE `Cancellation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CancellationDetails`
--

DROP TABLE IF EXISTS `CancellationDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CancellationDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reservationId` int(11) NOT NULL,
  `cancellationPolicy` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refundToGuest` float NOT NULL,
  `payoutToHost` float NOT NULL,
  `guestServiceFee` float NOT NULL,
  `hostServiceFee` float NOT NULL,
  `total` float NOT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cancelledBy` enum('host','guest') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `CancellationDetails_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CancellationDetails`
--

LOCK TABLES `CancellationDetails` WRITE;
/*!40000 ALTER TABLE `CancellationDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `CancellationDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Country`
--

DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `countryCode` varchar(255) NOT NULL,
  `countryName` varchar(255) NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime DEFAULT '2018-10-25 15:23:18',
  `updatedAt` datetime DEFAULT '2018-10-25 15:23:18',
  `dialCode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=242 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Country`
--

LOCK TABLES `Country` WRITE;
/*!40000 ALTER TABLE `Country` DISABLE KEYS */;
INSERT INTO `Country` VALUES (1,'DZ','Algeria',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+213'),(2,'AS','AmericanSamoa',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 684'),(3,'AF','Afghanistan',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+93'),(4,'AL','Albania',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+355'),(5,'AD','Andorra',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+376'),(6,'AO','Angola',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+244'),(7,'AI','Anguilla',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 264'),(8,'AQ','Antarctica',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+672'),(9,'AG','Antigua and Barbuda',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1268'),(10,'AR','Argentina',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+54'),(11,'AM','Armenia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+374'),(12,'AW','Aruba',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+297'),(13,'AU','Australia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+61'),(14,'AT','Austria',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+43'),(15,'AZ','Azerbaijan',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+994'),(16,'BS','Bahamas',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 242'),(17,'BH','Bahrain',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+973'),(18,'BD','Bangladesh',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+880'),(19,'BY','Belarus',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+375'),(20,'BB','Barbados',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 246'),(21,'BE','Belgium',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+32'),(22,'BZ','Belize',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+501'),(23,'BJ','Benin',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+229'),(24,'BM','Bermuda',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 441'),(25,'BT','Bhutan',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+975'),(26,'BO','Bolivia, Plurinational State of',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+591'),(27,'BA','Bosnia and Herzegovina',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+387'),(28,'BW','Botswana',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+267'),(29,'BR','Brazil',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+55'),(30,'IO','British Indian Ocean Territory',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+246'),(31,'BN','Brunei Darussalam',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+673'),(32,'BG','Bulgaria',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+359'),(33,'BF','Burkina Faso',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+226'),(34,'BI','Burundi',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+257'),(35,'KH','Cambodia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+855'),(36,'CM','Cameroon',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+237'),(37,'CA','Canada',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1'),(38,'CV','Cape Verde',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+238'),(39,'KY','Cayman Islands',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+ 345'),(40,'CF','Central African Republic',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+236'),(41,'TD','Chad',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+235'),(42,'CL','Chile',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+56'),(43,'CN','China',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+86'),(44,'CX','Christmas Island',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+61'),(45,'CC','Cocos (Keeling) Islands',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+61'),(46,'CO','Colombia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+57'),(47,'KM','Comoros',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+269'),(48,'CD','Congo, The Democratic Republic of the',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+243'),(49,'CG','Congo',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+242'),(50,'CK','Cook Islands',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+682'),(51,'CR','Costa Rica',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+506'),(52,'CI','Cote d\'Ivoire',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+225'),(53,'HR','Croatia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+385'),(54,'CU','Cuba',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+53'),(55,'CY','Cyprus',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+537'),(56,'CZ','Czech Republic',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+420'),(57,'DK','Denmark',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+45'),(58,'DJ','Djibouti',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+253'),(59,'DM','Dominica',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 767'),(60,'DO','Dominican Republic',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 849'),(61,'EC','Ecuador',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+593'),(62,'EG','Egypt',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+20'),(63,'SV','El Salvador',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+503'),(64,'GQ','Equatorial Guinea',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+240'),(65,'ER','Eritrea',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+291'),(66,'EE','Estonia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+372'),(67,'ET','Ethiopia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+251'),(68,'FK','Falkland Islands (Malvinas)',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+500'),(69,'FO','Faroe Islands',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+298'),(70,'FJ','Fiji',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+679'),(71,'FI','Finland',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+358'),(72,'FR','France',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+33'),(73,'GF','French Guiana',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+594'),(74,'PF','French Polynesia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+689'),(75,'GA','Gabon',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+241'),(76,'GM','Gambia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+220'),(77,'DE','Germany',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+49'),(78,'GE','Georgia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+995'),(79,'GH','Ghana',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+233'),(80,'GI','Gibraltar',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+350'),(81,'GR','Greece',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+30'),(82,'GL','Greenland',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+299'),(83,'GD','Grenada',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 473'),(84,'GP','Guadeloupe',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+590'),(85,'GU','Guam',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 671'),(86,'GT','Guatemala',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+502'),(87,'GG','Guernsey',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+44'),(88,'GN','Guinea',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+224'),(89,'GW','Guinea-Bissau',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+245'),(90,'GY','Guyana',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+595'),(91,'HT','Haiti',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+509'),(92,'VA','Holy See (Vatican City State)',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+379'),(93,'HN','Honduras',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+504'),(94,'HK','Hong Kong',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+852'),(95,'HU','Hungary',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+36'),(96,'IS','Iceland',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+354'),(97,'IN','India',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+91'),(98,'ID','Indonesia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+62'),(99,'IR','Iran, Islamic Republic of',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+98'),(100,'IQ','Iraq',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+964'),(101,'IE','Ireland',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+353'),(102,'IM','Isle of Man',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+44'),(103,'IL','Israel',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+972'),(104,'IT','Italy',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+39'),(105,'JM','Jamaica',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 876'),(106,'JP','Japan',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+81'),(107,'JE','Jersey',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+44'),(108,'JO','Jordan',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+962'),(109,'KZ','Kazakhstan',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+7 7'),(110,'KE','Kenya',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+254'),(111,'KI','Kiribati',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+686'),(112,'KP','Korea, Democratic People\'s Republic of',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+850'),(113,'KR','Korea, Republic of',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+82'),(114,'KW','Kuwait',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+965'),(115,'KG','Kyrgyzstan',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+996'),(116,'LA','Lao People\'s Democratic Republic',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+856'),(117,'LV','Latvia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+371'),(118,'LB','Lebanon',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+961'),(119,'LS','Lesotho',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+266'),(120,'LR','Liberia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+231'),(121,'LY','Libyan Arab Jamahiriya',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+218'),(122,'LI','Liechtenstein',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+423'),(123,'LT','Lithuania',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+370'),(124,'LU','Luxembourg',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+352'),(125,'MO','Macao',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+853'),(126,'MK','Macedonia, The Former Yugoslav Republic of',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+389'),(127,'MG','Madagascar',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+261'),(128,'MW','Malawi',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+265'),(129,'MY','Malaysia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+60'),(130,'MV','Maldives',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+960'),(131,'ML','Mali',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+223'),(132,'MT','Malta',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+356'),(133,'MH','Marshall Islands',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+692'),(134,'MQ','Martinique',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+596'),(135,'MR','Mauritania',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+222'),(136,'MU','Mauritius',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+230'),(137,'YT','Mayotte',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+262'),(138,'MX','Mexico',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+52'),(139,'FM','Micronesia, Federated States of',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+691'),(140,'MD','Moldova, Republic of',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+373'),(141,'MC','Monaco',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+377'),(142,'MN','Mongolia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+976'),(143,'ME','Montenegro',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+382'),(144,'MS','Montserrat',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1664'),(145,'MA','Morocco',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+212'),(146,'MZ','Mozambique',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+258'),(147,'MM','Myanmar',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+95'),(148,'NA','Namibia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+264'),(149,'NR','Nauru',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+674'),(150,'NP','Nepal',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+977'),(151,'NL','Netherlands',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+31'),(152,'AN','Netherlands Antilles',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+599'),(153,'NC','New Caledonia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+687'),(154,'NZ','New Zealand',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+64'),(155,'NI','Nicaragua',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+505'),(156,'NE','Niger',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+227'),(157,'NG','Nigeria',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+234'),(158,'NU','Niue',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+683'),(159,'NF','Norfolk Island',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+672'),(160,'MP','Northern Mariana Islands',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 670'),(161,'NO','Norway',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+47'),(162,'OM','Oman',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+968'),(163,'PK','Pakistan',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+92'),(164,'PW','Palau',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+680'),(165,'PS','Palestinian Territory, Occupied',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+970'),(166,'PA','Panama',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+507'),(167,'PG','Papua New Guinea',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+675'),(168,'PY','Paraguay',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+595'),(169,'PE','Peru',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+51'),(170,'PH','Philippines',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+63'),(171,'PN','Pitcairn',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+872'),(172,'PL','Poland',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+48'),(173,'PT','Portugal',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+351'),(174,'PR','Puerto Rico',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 939'),(175,'QA','Qatar',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+974'),(176,'RO','Romania',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+40'),(177,'RU','Russia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+7'),(178,'RW','Rwanda',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+250'),(179,'RE','Réunion',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+262'),(180,'BL','Saint Barthélemy',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+590'),(181,'SH','Saint Helena, Ascension and Tristan Da Cunha',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+290'),(182,'KN','Saint Kitts and Nevis',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 869'),(183,'LC','Saint Lucia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 758'),(184,'MF','Saint Martin',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+590'),(185,'PM','Saint Pierre and Miquelon',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+508'),(186,'VC','Saint Vincent and the Grenadines',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 784'),(187,'WS','Samoa',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+685'),(188,'SM','San Marino',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+378'),(189,'ST','Sao Tome and Principe',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+239'),(190,'SA','Saudi Arabia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+966'),(191,'SN','Senegal',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+221'),(192,'RS','Serbia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+381'),(193,'SC','Seychelles',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+248'),(194,'SL','Sierra Leone',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+232'),(195,'SG','Singapore',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+65'),(196,'SK','Slovakia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+421'),(197,'SI','Slovenia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+386'),(198,'SB','Solomon Islands',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+677'),(199,'SO','Somalia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+252'),(200,'ZA','South Africa',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+27'),(201,'GS','South Georgia and the South Sandwich Islands',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+500'),(202,'ES','Spain',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+34'),(203,'LK','Sri Lanka',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+94'),(204,'SD','Sudan',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+249'),(205,'SR','Suriname',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+597'),(206,'SJ','Svalbard and Jan Mayen',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+47'),(207,'SZ','Swaziland',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+268'),(208,'SE','Sweden',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+46'),(209,'CH','Switzerland',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+41'),(210,'SY','Syrian Arab Republic',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+963'),(211,'TW','Taiwan, Province of China',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+886'),(212,'TJ','Tajikistan',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+992'),(213,'TZ','Tanzania, United Republic of',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+255'),(214,'TL','Timor-Leste',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+670'),(215,'TH','Thailand',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+66'),(216,'TG','Togo',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+228'),(217,'TK','Tokelau',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+690'),(218,'TO','Tonga',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+676'),(219,'TT','Trinidad and Tobago',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 868'),(220,'TN','Tunisia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+216'),(221,'TR','Turkey',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+90'),(222,'TM','Turkmenistan',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+993'),(223,'TC','Turks and Caicos Islands',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 649'),(224,'TV','Tuvalu',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+688'),(225,'UG','Uganda',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+256'),(226,'UA','Ukraine',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+380'),(227,'AE','United Arab Emirates',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+971'),(228,'GB','United Kingdom',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+44'),(229,'US','United States',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1'),(230,'UY','Uruguay',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+598'),(231,'UZ','Uzbekistan',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+998'),(232,'VU','Vanuatu',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+678'),(233,'VE','Venezuela, Bolivarian Republic of',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+58'),(234,'VN','Viet Nam',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+84'),(235,'VG','Virgin Islands, British',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 284'),(236,'VI','Virgin Islands, U.S.',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+1 340'),(237,'WF','Wallis and Futuna',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+681'),(238,'YE','Yemen',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+967'),(239,'ZM','Zambia',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+260'),(240,'ZW','Zimbabwe',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+263'),(241,'AX','Åland Islands',1,'2018-10-25 15:23:18','2018-10-25 15:23:18','+358');
/*!40000 ALTER TABLE `Country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Currencies`
--

DROP TABLE IF EXISTS `Currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Currencies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `symbol` varchar(255) NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `isBaseCurrency` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isPayment` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Currencies`
--

LOCK TABLES `Currencies` WRITE;
/*!40000 ALTER TABLE `Currencies` DISABLE KEYS */;
INSERT INTO `Currencies` VALUES (1,'AUD',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',1),(2,'BGN',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',1),(3,'BRL',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',1),(4,'CAD',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(5,'CHF',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(6,'CNY',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(7,'CZK',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(8,'DKK',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(9,'EUR',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',1),(10,'GBP',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(11,'HKD',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(12,'HRK',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(13,'HUF',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(14,'IDR',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(15,'ILS',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(16,'INR',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(17,'JPY',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(18,'KRW',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(19,'MXN',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(20,'MYR',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(21,'NOK',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(22,'NZD',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(23,'PHP',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',1),(24,'PLN',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(25,'RON',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(26,'RUB',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',1),(27,'SEK',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0),(28,'SGD',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',1),(29,'THB',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',1),(30,'TRY',1,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',1),(31,'USD',1,1,'0000-00-00 00:00:00','2017-08-17 07:29:19',1),(32,'ZAR',0,0,'0000-00-00 00:00:00','2017-08-17 07:29:19',0);
/*!40000 ALTER TABLE `Currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CurrencyRates`
--

DROP TABLE IF EXISTS `CurrencyRates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CurrencyRates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currencyCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` float NOT NULL,
  `isBase` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CurrencyRates`
--

LOCK TABLES `CurrencyRates` WRITE;
/*!40000 ALTER TABLE `CurrencyRates` DISABLE KEYS */;
INSERT INTO `CurrencyRates` VALUES (1,'AUD',1.316,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(2,'BGN',1.6519,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(3,'BRL',3.2508,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(4,'CAD',1.2756,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(5,'CHF',0.98606,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(6,'CNY',6.622,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(7,'CZK',21.68,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(8,'DKK',6.286,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(9,'GBP',0.75938,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(10,'HKD',7.807,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(11,'HRK',6.3812,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(12,'HUF',263.61,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(13,'IDR',13535,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(14,'ILS',3.5344,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(15,'INR',65.215,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(16,'JPY',112.71,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(17,'KRW',1103.2,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(18,'MXN',19.163,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(19,'MYR',4.1701,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(20,'NOK',8.2356,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(21,'NZD',1.4481,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(22,'PHP',50.825,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(23,'PLN',3.5872,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(24,'RON',3.9148,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(25,'RUB',60.183,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(26,'SEK',8.423,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(27,'SGD',1.3558,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(28,'THB',33.02,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(29,'TRY',3.8834,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(30,'ZAR',14.376,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(31,'EUR',0.84459,0,'2017-11-16 08:28:30','2017-11-16 08:28:30'),(32,'USD',1,1,'2017-11-16 08:28:30','2017-11-16 08:28:30');
/*!40000 ALTER TABLE `CurrencyRates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DocumentVerification`
--

DROP TABLE IF EXISTS `DocumentVerification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DocumentVerification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `fileName` varchar(255) DEFAULT NULL,
  `fileType` varchar(255) DEFAULT NULL,
  `documentStatus` enum('pending','approved') DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocumentVerification`
--

LOCK TABLES `DocumentVerification` WRITE;
/*!40000 ALTER TABLE `DocumentVerification` DISABLE KEYS */;
/*!40000 ALTER TABLE `DocumentVerification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EmailToken`
--

DROP TABLE IF EXISTS `EmailToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EmailToken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `EmailToken_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EmailToken`
--

LOCK TABLES `EmailToken` WRITE;
/*!40000 ALTER TABLE `EmailToken` DISABLE KEYS */;
/*!40000 ALTER TABLE `EmailToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FooterBlock`
--

DROP TABLE IF EXISTS `FooterBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FooterBlock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title1` varchar(255) NOT NULL,
  `content1` text NOT NULL,
  `title2` varchar(255) NOT NULL,
  `content2` text NOT NULL,
  `title3` varchar(255) NOT NULL,
  `content3` text NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FooterBlock`
--

LOCK TABLES `FooterBlock` WRITE;
/*!40000 ALTER TABLE `FooterBlock` DISABLE KEYS */;
/*!40000 ALTER TABLE `FooterBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ForgotPassword`
--

DROP TABLE IF EXISTS `ForgotPassword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ForgotPassword` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `ForgotPassword_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ForgotPassword`
--

LOCK TABLES `ForgotPassword` WRITE;
/*!40000 ALTER TABLE `ForgotPassword` DISABLE KEYS */;
/*!40000 ALTER TABLE `ForgotPassword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ImageBanner`
--

DROP TABLE IF EXISTS `ImageBanner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ImageBanner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `buttonLabel` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ImageBanner`
--

LOCK TABLES `ImageBanner` WRITE;
/*!40000 ALTER TABLE `ImageBanner` DISABLE KEYS */;
INSERT INTO `ImageBanner` VALUES (1,'Hosting opens up a home of opportunity','Earn money sharing your extra space with travelers.','See What You Can Make','07f9d3695caa8d6b7e4176dd13778871.jpeg','0000-00-00 00:00:00','2017-08-19 11:39:11');
/*!40000 ALTER TABLE `ImageBanner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListBlockedDates`
--

DROP TABLE IF EXISTS `ListBlockedDates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListBlockedDates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `reservationId` int(11) DEFAULT NULL,
  `blockedDates` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `calendarId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `ListBlockedDates_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ListBlockedDates_ibfk_2` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListBlockedDates`
--

LOCK TABLES `ListBlockedDates` WRITE;
/*!40000 ALTER TABLE `ListBlockedDates` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListBlockedDates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListCalendar`
--

DROP TABLE IF EXISTS `ListCalendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListCalendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListCalendar_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListCalendar`
--

LOCK TABLES `ListCalendar` WRITE;
/*!40000 ALTER TABLE `ListCalendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListCalendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListPhotos`
--

DROP TABLE IF EXISTS `ListPhotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListPhotos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `isCover` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListPhotos_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListPhotos`
--

LOCK TABLES `ListPhotos` WRITE;
/*!40000 ALTER TABLE `ListPhotos` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListPhotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListSettings`
--

DROP TABLE IF EXISTS `ListSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListSettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeId` int(11) NOT NULL,
  `itemName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otherItemName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `minimum` int(11) DEFAULT NULL,
  `startValue` int(11) DEFAULT NULL,
  `endValue` int(11) DEFAULT NULL,
  `step` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isEnable` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `ListSettings_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `ListSettingsTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListSettings`
--

LOCK TABLES `ListSettings` WRITE;
/*!40000 ALTER TABLE `ListSettings` DISABLE KEYS */;
INSERT INTO `ListSettings` VALUES (5,3,'House',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:35','2017-01-09 07:46:35'),(6,3,'Apartment',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:42','2017-01-09 07:46:42'),(7,3,'Bed & Breakfast',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:49','2017-01-09 07:46:49'),(8,3,'Boutique hotel',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:57','2017-01-09 07:46:57'),(10,4,'1-5 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:49:23','2017-01-09 07:49:23'),(11,4,'6-25 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:49:35','2017-01-09 07:49:35'),(12,4,'25-50 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:49:42','2017-01-09 07:49:42'),(13,4,'100+ Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:49:55','2017-01-09 07:49:55'),(14,5,'bedroom','bedrooms',NULL,NULL,1,10,NULL,'1','2017-01-09 07:53:04','2017-01-09 07:53:04'),(15,6,'bed','beds',NULL,NULL,1,16,NULL,'1','2017-01-09 07:53:48','2017-01-09 07:53:48'),(16,7,'Single',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:59:47','2017-01-09 07:59:47'),(17,7,'Double',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:59:57','2017-01-09 07:59:57'),(18,7,'Queen',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:05','2017-01-09 08:00:05'),(19,7,'King',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:13','2017-01-09 08:00:13'),(20,7,'Bunk bed',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:20','2017-01-09 08:00:20'),(21,8,'bathroom','bathrooms',NULL,NULL,1,8,NULL,'1','2017-01-09 08:12:24','2017-01-09 08:27:30'),(22,9,'Private Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:16','2017-01-09 08:31:16'),(23,9,'Shared Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:28','2017-01-09 08:31:28'),(24,9,'Other',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:32','2017-01-09 08:31:32'),(25,10,'Towels, bed sheets, soap, and toilet paper',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:32','2017-01-09 08:43:32'),(26,10,'Wifi',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:42','2017-01-09 08:43:42'),(27,10,'Shampoo ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:51','2017-01-09 08:43:51'),(28,10,'Closet/drawers',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:00','2017-01-09 08:44:00'),(29,11,'Smoke detector',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:17','2017-01-09 08:44:17'),(30,11,'Carbon monoxide detector',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:25','2017-01-09 08:44:25'),(31,11,'First aid kit ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:33','2017-01-09 08:44:33'),(32,11,'Safety card',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:41','2017-01-09 08:44:41'),(33,12,'Kitchen',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:19','2017-01-09 09:05:19'),(34,12,'Laundry – washer ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:26','2017-01-09 09:05:26'),(35,12,'Laundry – dryer',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:33','2017-01-09 09:05:33'),(36,12,'Parking',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:40','2017-01-09 09:05:40'),(37,4,'150+ Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 10:27:16','2017-01-09 10:27:16'),(39,2,'guest','guests',NULL,NULL,1,16,NULL,'1','2017-01-09 10:51:56','2017-12-05 12:56:13'),(42,13,'Confirmed email','tests',NULL,NULL,10,10,NULL,'1','2017-01-11 11:21:37','2017-01-18 07:47:53'),(43,13,'Confirmed phone number',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 07:48:02','2017-01-18 07:48:02'),(45,13,'Payment information',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 07:48:16','2017-01-18 07:48:16'),(46,13,'Agree to your House Rules',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 08:02:20','2017-01-18 08:02:20'),(47,13,'Tell you their trip purpose',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 08:02:29','2017-01-18 08:02:29'),(48,14,'Suitable for children (2-12 years) ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:20','2017-01-18 10:00:20'),(49,14,'Suitable for infants (Under 2 years)',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:28','2017-01-18 10:00:28'),(50,14,'Suitable for pets',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:35','2017-01-18 10:00:35'),(51,14,'Smoking allowed ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:41','2017-01-18 10:00:41'),(52,14,'Events or parties allowed',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:56','2017-01-18 10:00:56'),(53,15,'Meet RentAll’s guest requirements',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:08','2017-01-18 11:01:08'),(54,15,'Agree to your house rules',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:16','2017-01-18 11:01:16'),(55,15,'Tell you their trip purpose',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:25','2017-01-18 11:01:25'),(56,15,'Let you know how many people are coming on the trip',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:03:00','2017-01-18 11:03:00'),(57,16,'Same day',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:26','2017-01-18 15:20:09'),(58,16,'1 day',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:43','2017-01-18 15:19:43'),(59,16,'2 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:48','2017-01-18 15:19:48'),(60,16,'3 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:58','2017-01-18 15:19:58'),(61,16,'7 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:20:03','2017-01-18 15:20:03'),(62,17,'Dates unavailable by default',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:01','2017-01-18 18:01:01'),(63,17,'Any time',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:16','2017-01-18 18:01:16'),(64,17,'3 months',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:22','2017-01-18 18:01:22'),(65,17,'6 months',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:29','2017-01-18 18:01:29'),(66,17,'1 year',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:42','2017-01-18 18:01:42'),(67,18,'night min','nights min',NULL,NULL,0,100,NULL,'1','2017-01-18 18:18:28','2017-03-24 11:37:40'),(68,19,'night max','nights max',NULL,NULL,0,100,NULL,'1','2017-01-18 18:19:00','2017-01-30 15:00:36'),(73,10,'Hair dryer',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-28 11:36:34','2017-07-28 14:45:50'),(74,1,'Entire Place',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-28 14:21:14','2017-08-03 12:09:48'),(76,1,'Private Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-30 04:24:13','2017-07-30 04:24:13'),(77,1,'Shared Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-30 04:24:18','2017-08-14 13:41:20');
/*!40000 ALTER TABLE `ListSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListSettingsTypes`
--

DROP TABLE IF EXISTS `ListSettingsTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListSettingsTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) NOT NULL,
  `fieldType` enum('stringType','numberType') DEFAULT 'stringType',
  `step` int(11) DEFAULT '1',
  `isEnable` varchar(255) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `typeLabel` varchar(255) DEFAULT NULL,
  `isMultiValue` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListSettingsTypes`
--

LOCK TABLES `ListSettingsTypes` WRITE;
/*!40000 ALTER TABLE `ListSettingsTypes` DISABLE KEYS */;
INSERT INTO `ListSettingsTypes` VALUES (1,'roomType','stringType',1,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Room Type',0),(2,'personCapacity','numberType',1,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Person Capacity',0),(3,'houseType','stringType',1,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','House Type',0),(4,'buildingSize','stringType',1,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Building Size',0),(5,'bedrooms','numberType',1,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Bed Rooms',0),(6,'beds','numberType',1,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Beds',0),(7,'bedType','stringType',1,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Bed Type',0),(8,'bathrooms','numberType',1,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Bathrooms',0),(9,'bathroomType','stringType',1,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Bathroom Type',0),(10,'essentialsAmenities','stringType',1,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Essential Amenities',1),(11,'safetyAmenities','stringType',1,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Safety Amenities',1),(12,'spaces','stringType',1,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Spaces',1),(13,'guestRequirements','stringType',3,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Guest Requirements',0),(14,'houseRules','stringType',3,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','House Rules',1),(15,'reviewGuestBook','stringType',3,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Review How Guests Book',0),(16,'bookingNoticeTime','stringType',3,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Booking Notice Time',0),(17,'maxDaysNotice','stringType',3,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Maximum Days Notice',0),(18,'minNight','numberType',3,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Minimum Nights',0),(19,'maxNight','numberType',3,'1','0000-00-00 00:00:00','0000-00-00 00:00:00','Maximum Nights',0);
/*!40000 ALTER TABLE `ListSettingsTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListViews`
--

DROP TABLE IF EXISTS `ListViews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListViews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListViews`
--

LOCK TABLES `ListViews` WRITE;
/*!40000 ALTER TABLE `ListViews` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListViews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Listing`
--

DROP TABLE IF EXISTS `Listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Listing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `houseType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `residenceType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bedrooms` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buildingSize` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bedType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `beds` int(11) DEFAULT NULL,
  `personCapacity` int(11) DEFAULT NULL,
  `bathrooms` float DEFAULT NULL,
  `bathroomType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buildingName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipcode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lng` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isMapTouched` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `coverPhoto` int(10) DEFAULT NULL,
  `bookingType` enum('request','instant') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'instant',
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `isReady` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Listing_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Listing`
--

LOCK TABLES `Listing` WRITE;
/*!40000 ALTER TABLE `Listing` DISABLE KEYS */;
/*!40000 ALTER TABLE `Listing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListingData`
--

DROP TABLE IF EXISTS `ListingData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListingData` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) DEFAULT NULL,
  `bookingNoticeTime` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `checkInStart` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Flexible',
  `checkInEnd` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Flexible',
  `minNight` int(11) DEFAULT NULL,
  `maxNight` int(11) DEFAULT NULL,
  `priceMode` tinyint(1) DEFAULT NULL,
  `basePrice` float DEFAULT NULL,
  `maxPrice` float DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hostingFrequency` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weeklyDiscount` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `monthlyDiscount` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `cleaningPrice` float DEFAULT NULL,
  `maxDaysNotice` enum('unavailable','3months','6months','9months','12months','available') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unavailable',
  `cancellationPolicy` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListingData_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListingData`
--

LOCK TABLES `ListingData` WRITE;
/*!40000 ALTER TABLE `ListingData` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListingData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentMethods`
--

DROP TABLE IF EXISTS `PaymentMethods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PaymentMethods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `processedIn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fees` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` mediumtext COLLATE utf8mb4_unicode_ci,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentType` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentMethods`
--

LOCK TABLES `PaymentMethods` WRITE;
/*!40000 ALTER TABLE `PaymentMethods` DISABLE KEYS */;
INSERT INTO `PaymentMethods` VALUES (1,'Paypal','3–4 hours','PayPal withdrawal fees','USD','Connect your existing PayPal account.',1,'2017-04-18 20:13:25','2017-04-18 20:13:25',1),(2,'Bank Account','5 to 7 business days','No fees','USD','Add you bank details',1,'2018-01-04 17:26:45','2018-01-04 17:26:45',2);
/*!40000 ALTER TABLE `PaymentMethods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentSettings`
--

DROP TABLE IF EXISTS `PaymentSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PaymentSettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paymentName` varchar(255) NOT NULL,
  `paymentStatus` enum('true','false') DEFAULT 'false',
  `paymentMode` enum('live','sandbox') DEFAULT 'sandbox',
  `email` varchar(255) DEFAULT NULL,
  `APIUserId` varchar(255) DEFAULT NULL,
  `APIPassword` varchar(255) DEFAULT NULL,
  `APISecret` varchar(255) DEFAULT NULL,
  `AppId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentSettings`
--

LOCK TABLES `PaymentSettings` WRITE;
/*!40000 ALTER TABLE `PaymentSettings` DISABLE KEYS */;
INSERT INTO `PaymentSettings` VALUES (1,'paypal','false','sandbox','admin@gmail.com','Hello User Id','Hello password','Hello Secret','Hello Id','0000-00-00 00:00:00','2017-02-24 11:29:31');
/*!40000 ALTER TABLE `PaymentSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payout`
--

DROP TABLE IF EXISTS `Payout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Payout` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `methodId` int(11) NOT NULL,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payEmail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address1` mediumtext COLLATE utf8mb4_unicode_ci,
  `address2` mediumtext COLLATE utf8mb4_unicode_ci,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipcode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `default` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `last4Digits` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Payout_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payout`
--

LOCK TABLES `Payout` WRITE;
/*!40000 ALTER TABLE `Payout` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recommend`
--

DROP TABLE IF EXISTS `Recommend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Recommend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recommend`
--

LOCK TABLES `Recommend` WRITE;
/*!40000 ALTER TABLE `Recommend` DISABLE KEYS */;
/*!40000 ALTER TABLE `Recommend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReportUser`
--

DROP TABLE IF EXISTS `ReportUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ReportUser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reporterId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `reportType` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReportUser`
--

LOCK TABLES `ReportUser` WRITE;
/*!40000 ALTER TABLE `ReportUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReportUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservation`
--

DROP TABLE IF EXISTS `Reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `hostId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guestId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checkIn` datetime NOT NULL,
  `checkOut` datetime NOT NULL,
  `guests` int(11) DEFAULT '1',
  `message` mediumtext COLLATE utf8mb4_unicode_ci,
  `basePrice` float NOT NULL,
  `cleaningPrice` float DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` float DEFAULT NULL,
  `discountType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guestServiceFee` float DEFAULT NULL,
  `hostServiceFee` float DEFAULT NULL,
  `total` float NOT NULL,
  `confirmationCode` int(11) DEFAULT NULL,
  `paymentState` enum('pending','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `payoutId` int(11) DEFAULT NULL,
  `reservationState` enum('pending','approved','declined','completed','cancelled','expired') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `paymentMethodId` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservation`
--

LOCK TABLES `Reservation` WRITE;
/*!40000 ALTER TABLE `Reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reservationId` int(11) NOT NULL,
  `listId` int(11) NOT NULL,
  `authorId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewContent` text COLLATE utf8mb4_unicode_ci,
  `rating` float NOT NULL,
  `privateFeedback` mediumtext COLLATE utf8mb4_unicode_ci,
  `parentId` int(11) DEFAULT '0',
  `automated` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Reviews_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviews`
--

LOCK TABLES `Reviews` WRITE;
/*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SearchSettings`
--

DROP TABLE IF EXISTS `SearchSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SearchSettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `minPrice` float NOT NULL,
  `maxPrice` float NOT NULL,
  `PriceRangecurrency` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SearchSettings`
--

LOCK TABLES `SearchSettings` WRITE;
/*!40000 ALTER TABLE `SearchSettings` DISABLE KEYS */;
INSERT INTO `SearchSettings` VALUES (1,10,10000,'USD','0000-00-00 00:00:00','2017-07-25 19:23:54');
/*!40000 ALTER TABLE `SearchSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `SequelizeMeta_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20180804061511-addUserBanStatus.js'),('20180804062523-addIsReadColumnInThreads.js'),('20180809095644-createBedTypeTable.js'),('20180919114144-addBanUserDefault.js'),('20180929101729-updateNulledBanUserStatus.js'),('20180929110523-addColumnsForSmsVerification.js'),('20180929112313-updateCountyListWithDialCodes.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ServiceFees`
--

DROP TABLE IF EXISTS `ServiceFees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ServiceFees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guestType` enum('fixed','percentage') COLLATE utf8mb4_unicode_ci NOT NULL,
  `guestValue` float NOT NULL,
  `hostType` enum('fixed','percentage') COLLATE utf8mb4_unicode_ci NOT NULL,
  `hostValue` float NOT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServiceFees`
--

LOCK TABLES `ServiceFees` WRITE;
/*!40000 ALTER TABLE `ServiceFees` DISABLE KEYS */;
INSERT INTO `ServiceFees` VALUES (1,'percentage',10,'percentage',3,'USD','2017-08-14 02:02:07','2017-08-14 02:02:07');
/*!40000 ALTER TABLE `ServiceFees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SiteSettings`
--

DROP TABLE IF EXISTS `SiteSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SiteSettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SiteSettings`
--

LOCK TABLES `SiteSettings` WRITE;
/*!40000 ALTER TABLE `SiteSettings` DISABLE KEYS */;
INSERT INTO `SiteSettings` VALUES (1,'Site Name','siteName','RentALL','site_settings','0000-00-00 00:00:00','2018-04-14 05:59:31'),(2,'Site Title','siteTitle','Airbnb Clone Script | Sharing Economy Script | Airbnb Clone - RentALL','site_settings','0000-00-00 00:00:00','2018-04-14 05:59:32'),(3,'Meta Keyword','metaKeyword','RentAll Script Meta Keyword','site_settings','0000-00-00 00:00:00','2016-12-16 17:39:53'),(4,'Meta Discription','metaDescription','RentALL is an Airbnb clone script that helps you start your Sharing Economy business. It gives your user better experience on desktop and mobile devices.','site_settings','0000-00-00 00:00:00','2018-04-14 05:59:32'),(10,'Facebook Link','facebookLink','https://www.facebook.com/radicalstartnow/','site_settings','0000-00-00 00:00:00','2018-04-14 05:59:32'),(11,'Twitter Link','twitterLink','https://twitter.com/radicalstartnow','site_settings','0000-00-00 00:00:00','2018-04-14 05:59:32'),(12,'Instagram Link','instagramLink','https://www.instagram.com/?hl=en','site_settings','0000-00-00 00:00:00','2018-04-14 05:59:32'),(64,'Logo Height','logoHeight','63','site_settings','2017-05-16 19:55:20','2018-04-14 05:59:32'),(65,'Logo Width','logoWidth','250','site_settings','2017-05-16 19:55:48','2018-04-14 05:59:32');
/*!40000 ALTER TABLE `SiteSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ThreadItems`
--

DROP TABLE IF EXISTS `ThreadItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ThreadItems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `threadId` int(11) NOT NULL,
  `sentBy` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` mediumtext COLLATE utf8mb4_unicode_ci,
  `isRead` tinyint(1) DEFAULT NULL,
  `type` enum('message','inquiry','preApproved','declined','approved','pending','cancelledByHost','cancelledByGuest','intantBooking','requestToBook','confirmed','expired','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'message',
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `personCapacity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `reservationId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `threadId` (`threadId`),
  CONSTRAINT `ThreadItems_ibfk_1` FOREIGN KEY (`threadId`) REFERENCES `Threads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ThreadItems`
--

LOCK TABLES `ThreadItems` WRITE;
/*!40000 ALTER TABLE `ThreadItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `ThreadItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Threads`
--

DROP TABLE IF EXISTS `Threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Threads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `host` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guest` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isRead` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `Threads_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Threads`
--

LOCK TABLES `Threads` WRITE;
/*!40000 ALTER TABLE `Threads` DISABLE KEYS */;
/*!40000 ALTER TABLE `Threads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transaction`
--

DROP TABLE IF EXISTS `Transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reservationId` int(11) NOT NULL,
  `payerEmail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payerId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiverEmail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiverId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transactionId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `total` float NOT NULL,
  `transactionFee` float DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ipn_track_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentType` enum('booking','cancellation','host') COLLATE utf8mb4_unicode_ci DEFAULT 'booking',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentMethodId` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `Transaction_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transaction`
--

LOCK TABLES `Transaction` WRITE;
/*!40000 ALTER TABLE `Transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `Transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TransactionHistory`
--

DROP TABLE IF EXISTS `TransactionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TransactionHistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reservationId` int(11) NOT NULL,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payoutId` int(11) NOT NULL,
  `payoutEmail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `fees` float DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `transactionId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMethodId` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `TransactionHistory_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TransactionHistory`
--

LOCK TABLES `TransactionHistory` WRITE;
/*!40000 ALTER TABLE `TransactionHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `TransactionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailConfirmed` tinyint(1) DEFAULT '0',
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userBanStatus` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAmenities`
--

DROP TABLE IF EXISTS `UserAmenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserAmenities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `amenitiesId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserAmenities_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAmenities`
--

LOCK TABLES `UserAmenities` WRITE;
/*!40000 ALTER TABLE `UserAmenities` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserAmenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserClaim`
--

DROP TABLE IF EXISTS `UserClaim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserClaim` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserClaim_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserClaim`
--

LOCK TABLES `UserClaim` WRITE;
/*!40000 ALTER TABLE `UserClaim` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserClaim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserHouseRules`
--

DROP TABLE IF EXISTS `UserHouseRules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserHouseRules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `houseRulesId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `houseRulesId` (`houseRulesId`),
  CONSTRAINT `UserHouseRules_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserHouseRules_ibfk_2` FOREIGN KEY (`houseRulesId`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserHouseRules`
--

LOCK TABLES `UserHouseRules` WRITE;
/*!40000 ALTER TABLE `UserHouseRules` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserHouseRules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserListingData`
--

DROP TABLE IF EXISTS `UserListingData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserListingData` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `settingsId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserListingData_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserListingData`
--

LOCK TABLES `UserListingData` WRITE;
/*!40000 ALTER TABLE `UserListingData` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserListingData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserListingSteps`
--

DROP TABLE IF EXISTS `UserListingSteps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserListingSteps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `step1` enum('inactive','active','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `step2` enum('inactive','active','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `step3` enum('inactive','active','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserListingSteps_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserListingSteps`
--

LOCK TABLES `UserListingSteps` WRITE;
/*!40000 ALTER TABLE `UserListingSteps` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserListingSteps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserLogin`
--

DROP TABLE IF EXISTS `UserLogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserLogin` (
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`name`,`key`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserLogin_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserLogin`
--

LOCK TABLES `UserLogin` WRITE;
/*!40000 ALTER TABLE `UserLogin` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserLogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserProfile`
--

DROP TABLE IF EXISTS `UserProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserProfile` (
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `profileId` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `displayName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateOfBirth` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneNumber` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferredLanguage` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferredCurrency` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info` mediumtext COLLATE utf8mb4_unicode_ci,
  `location` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `stripeCusId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` int(4) DEFAULT '1',
  `verificationCode` int(5) DEFAULT NULL,
  `countryCode` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `profileId` (`profileId`),
  UNIQUE KEY `UserProfile_profileId_unique` (`profileId`),
  CONSTRAINT `UserProfile_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserProfile`
--

LOCK TABLES `UserProfile` WRITE;
/*!40000 ALTER TABLE `UserProfile` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserSafetyAmenities`
--

DROP TABLE IF EXISTS `UserSafetyAmenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserSafetyAmenities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `safetyAmenitiesId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserSafetyAmenities_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSafetyAmenities`
--

LOCK TABLES `UserSafetyAmenities` WRITE;
/*!40000 ALTER TABLE `UserSafetyAmenities` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserSafetyAmenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserSpaces`
--

DROP TABLE IF EXISTS `UserSpaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserSpaces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `spacesId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `spacesId` (`spacesId`),
  CONSTRAINT `UserSpaces_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserSpaces_ibfk_2` FOREIGN KEY (`spacesId`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=316 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSpaces`
--

LOCK TABLES `UserSpaces` WRITE;
/*!40000 ALTER TABLE `UserSpaces` DISABLE KEYS */;
INSERT INTO `UserSpaces` VALUES (193,148,33,'2017-06-02 13:45:17','2017-06-02 13:45:17'),(194,148,34,'2017-06-02 13:45:17','2017-06-02 13:45:17'),(198,150,34,'2017-06-02 14:01:41','2017-06-02 14:01:41'),(199,150,35,'2017-06-02 14:01:41','2017-06-02 14:01:41'),(200,150,36,'2017-06-02 14:01:41','2017-06-02 14:01:41'),(204,152,34,'2017-06-02 14:13:17','2017-06-02 14:13:17'),(205,152,35,'2017-06-02 14:13:17','2017-06-02 14:13:17'),(206,152,36,'2017-06-02 14:13:17','2017-06-02 14:13:17'),(207,153,33,'2017-06-02 14:16:05','2017-06-02 14:16:05'),(208,153,36,'2017-06-02 14:16:05','2017-06-02 14:16:05'),(209,154,35,'2017-06-02 14:20:56','2017-06-02 14:20:56'),(210,154,36,'2017-06-02 14:20:56','2017-06-02 14:20:56'),(211,155,33,'2017-06-02 14:21:27','2017-06-02 14:21:27'),(212,155,34,'2017-06-02 14:21:27','2017-06-02 14:21:27'),(213,155,35,'2017-06-02 14:21:27','2017-06-02 14:21:27'),(214,155,36,'2017-06-02 14:21:27','2017-06-02 14:21:27'),(217,157,34,'2017-06-02 14:34:39','2017-06-02 14:34:39'),(218,157,35,'2017-06-02 14:34:39','2017-06-02 14:34:39'),(221,151,33,'2017-06-02 14:55:07','2017-06-02 14:55:07'),(222,151,34,'2017-06-02 14:55:07','2017-06-02 14:55:07'),(223,151,36,'2017-06-02 14:55:07','2017-06-02 14:55:07'),(224,158,35,'2017-06-02 15:07:32','2017-06-02 15:07:32'),(225,158,36,'2017-06-02 15:07:32','2017-06-02 15:07:32'),(226,159,36,'2017-06-02 15:14:19','2017-06-02 15:14:19'),(227,159,35,'2017-06-02 15:14:19','2017-06-02 15:14:19'),(228,159,34,'2017-06-02 15:14:19','2017-06-02 15:14:19'),(229,160,35,'2017-06-02 15:23:15','2017-06-02 15:23:15'),(230,160,36,'2017-06-02 15:23:15','2017-06-02 15:23:15'),(231,160,34,'2017-06-02 15:23:15','2017-06-02 15:23:15'),(232,160,33,'2017-06-02 15:23:15','2017-06-02 15:23:15'),(233,161,35,'2017-06-02 15:31:00','2017-06-02 15:31:00'),(234,161,34,'2017-06-02 15:31:00','2017-06-02 15:31:00'),(241,156,34,'2017-06-05 09:13:09','2017-06-05 09:13:09'),(242,156,33,'2017-06-05 09:13:09','2017-06-05 09:13:09'),(243,170,33,'2017-06-19 07:06:42','2017-06-19 07:06:42'),(244,170,34,'2017-06-19 07:06:42','2017-06-19 07:06:42'),(245,170,36,'2017-06-19 07:06:42','2017-06-19 07:06:42'),(246,170,35,'2017-06-19 07:06:42','2017-06-19 07:06:42'),(247,171,36,'2017-06-20 18:12:22','2017-06-20 18:12:22'),(248,171,35,'2017-06-20 18:12:22','2017-06-20 18:12:22'),(249,173,33,'2017-06-21 22:56:46','2017-06-21 22:56:46'),(250,173,34,'2017-06-21 22:56:46','2017-06-21 22:56:46'),(260,182,33,'2017-07-06 12:55:04','2017-07-06 12:55:04'),(261,182,34,'2017-07-06 12:55:04','2017-07-06 12:55:04'),(262,182,36,'2017-07-06 12:55:04','2017-07-06 12:55:04'),(263,188,33,'2017-07-12 17:47:56','2017-07-12 17:47:56'),(264,188,34,'2017-07-12 17:47:56','2017-07-12 17:47:56'),(265,188,35,'2017-07-12 17:47:56','2017-07-12 17:47:56'),(266,188,36,'2017-07-12 17:47:56','2017-07-12 17:47:56'),(273,194,33,'2017-07-17 16:09:17','2017-07-17 16:09:17'),(274,176,33,'2017-07-19 01:03:44','2017-07-19 01:03:44'),(275,176,34,'2017-07-19 01:03:44','2017-07-19 01:03:44'),(276,176,35,'2017-07-19 01:03:44','2017-07-19 01:03:44'),(277,176,36,'2017-07-19 01:03:44','2017-07-19 01:03:44'),(282,196,36,'2017-07-28 11:38:30','2017-07-28 11:38:30'),(283,198,36,'2017-07-28 14:51:19','2017-07-28 14:51:19'),(284,199,35,'2017-07-29 11:46:34','2017-07-29 11:46:34'),(285,199,36,'2017-07-29 11:46:34','2017-07-29 11:46:34'),(286,199,33,'2017-07-29 11:46:34','2017-07-29 11:46:34'),(287,199,34,'2017-07-29 11:46:34','2017-07-29 11:46:34'),(291,203,33,'2017-08-07 21:53:22','2017-08-07 21:53:22'),(292,203,36,'2017-08-07 21:53:22','2017-08-07 21:53:22'),(293,203,35,'2017-08-07 21:53:22','2017-08-07 21:53:22'),(294,204,33,'2017-08-08 11:30:50','2017-08-08 11:30:50'),(295,204,34,'2017-08-08 11:30:50','2017-08-08 11:30:50'),(296,204,35,'2017-08-08 11:30:50','2017-08-08 11:30:50'),(298,205,35,'2017-08-09 09:59:56','2017-08-09 09:59:56'),(309,149,34,'2017-08-29 18:15:22','2017-08-29 18:15:22'),(310,149,35,'2017-08-29 18:15:22','2017-08-29 18:15:22'),(311,149,33,'2017-08-29 18:15:22','2017-08-29 18:15:22'),(312,208,35,'2017-10-29 07:46:09','2017-10-29 07:46:09'),(313,209,34,'2017-10-29 10:06:51','2017-10-29 10:06:51'),(314,162,34,'2017-12-05 12:40:41','2017-12-05 12:40:41'),(315,162,35,'2017-12-05 12:40:41','2017-12-05 12:40:41');
/*!40000 ALTER TABLE `UserSpaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserVerifiedInfo`
--

DROP TABLE IF EXISTS `UserVerifiedInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserVerifiedInfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEmailConfirmed` tinyint(1) DEFAULT '0',
  `isFacebookConnected` tinyint(1) DEFAULT '0',
  `isGoogleConnected` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isIdVerification` tinyint(1) DEFAULT '0',
  `isPhoneVerified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserVerifiedInfo_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserVerifiedInfo`
--

LOCK TABLES `UserVerifiedInfo` WRITE;
/*!40000 ALTER TABLE `UserVerifiedInfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserVerifiedInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishList`
--

DROP TABLE IF EXISTS `WishList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WishList` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wishListGroupId` int(11) NOT NULL,
  `listId` int(11) NOT NULL,
  `userId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `wishListGroupId` (`wishListGroupId`),
  KEY `listId` (`listId`),
  CONSTRAINT `WishList_ibfk_1` FOREIGN KEY (`wishListGroupId`) REFERENCES `WishListGroup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `WishList_ibfk_2` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WishList`
--

LOCK TABLES `WishList` WRITE;
/*!40000 ALTER TABLE `WishList` DISABLE KEYS */;
/*!40000 ALTER TABLE `WishList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishListGroup`
--

DROP TABLE IF EXISTS `WishListGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WishListGroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `userId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `isPublic` int(11) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WishListGroup`
--

LOCK TABLES `WishListGroup` WRITE;
/*!40000 ALTER TABLE `WishListGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `WishListGroup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-25 21:38:57
