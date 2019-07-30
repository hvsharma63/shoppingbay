-- MySQL dump 10.13  Distrib 8.0.17, for Linux (x86_64)
--
-- Host: localhost    Database: sb_dev
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Carts`
--

DROP TABLE IF EXISTS `Carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` bigint(20) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`),
  CONSTRAINT `Carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `Carts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Carts`
--

LOCK TABLES `Carts` WRITE;
/*!40000 ALTER TABLE `Carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `Carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `imagePath` varchar(255) DEFAULT NULL,
  `description` text,
  `createdAt` date NOT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (4,'Chappal','undefined','lorem ipsum 11','2019-07-18','2019-07-19'),(7,'Something IDK','assets/categoryImages/categoryImage-1563515979783','asdfasdfasdf','2019-07-19',NULL),(11,'asdf12333','http://localhost:3500/assets/categoryImages/categoryImage-1563516458946.jpg','asdddddddddd','2019-07-19',NULL),(13,'ddd','undefined','ss54545','2019-07-22','2019-07-22'),(14,'Winter Shirtsd','undefined','lorem ipsumlorem ipsumlorem ipsumlorem ipsum','2019-07-22','2019-07-22'),(15,'asdfasdfd','http://localhost:3500/assets/categoryImages/categoryImage-1563772830043.jpg','asdfadsfasdfasdfasdfasdfasdf','2019-07-22',NULL),(16,'sadfasdfddd1','http://localhost:3500/assets/categoryImages/categoryImage-1563776000849.jpg','asdfasdfasdfsddddfffffffffffffffff','2019-07-22',NULL),(17,'something','http://localhost:3500/assets/categoryImages/categoryImage-1563797777728.png','sosmsseeeeeeeeeeeeeeeeeeeeeeeeee','2019-07-22',NULL);
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Deals`
--

DROP TABLE IF EXISTS `Deals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Deals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `discount` double DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `Deals_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Deals`
--

LOCK TABLES `Deals` WRITE;
/*!40000 ALTER TABLE `Deals` DISABLE KEYS */;
INSERT INTO `Deals` VALUES (5,7,4000,'2019-07-11','2019-07-18','2019-07-22','2019-07-22','NoShave November Clothes + Shoes');
/*!40000 ALTER TABLE `Deals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderProducts`
--

DROP TABLE IF EXISTS `OrderProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderProducts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `OrderProducts_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `Orders` (`id`),
  CONSTRAINT `OrderProducts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderProducts`
--

LOCK TABLES `OrderProducts` WRITE;
/*!40000 ALTER TABLE `OrderProducts` DISABLE KEYS */;
INSERT INTO `OrderProducts` VALUES (1,2,1,'2019-07-19',NULL,4),(2,2,3,'2019-07-19',NULL,3);
/*!40000 ALTER TABLE `OrderProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `deliveryAddress` text,
  `subTotalPrice` double DEFAULT NULL,
  `tax` double DEFAULT NULL,
  `finalAmount` double DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES (2,1,'solution analyst 101 102 103',1500,18,1770,'2019-07-19',NULL);
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductImages`
--

DROP TABLE IF EXISTS `ProductImages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductImages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `imagePath` int(11) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `ProductImages_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductImages`
--

LOCK TABLES `ProductImages` WRITE;
/*!40000 ALTER TABLE `ProductImages` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductImages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductRatings`
--

DROP TABLE IF EXISTS `ProductRatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductRatings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`),
  CONSTRAINT `ProductRatings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `ProductRatings_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductRatings`
--

LOCK TABLES `ProductRatings` WRITE;
/*!40000 ALTER TABLE `ProductRatings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductRatings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `price` double DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `imagePath` varchar(255) DEFAULT NULL,
  `views` int(11) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `stock` bigint(20) DEFAULT NULL,
  `stockAvailability` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,4,'Expedita velit volup','Labore sed recusanda',88.88,'8457351315','C:fakepath889210.png',NULL,'2019-07-18',NULL,84848444,1),(3,11,'Sed enim veniam eum','Omnis dicta vel et p',8455.55,'54818217','undefined',NULL,'2019-07-19','2019-07-22',5454,1),(4,4,'Something','asdfasdfasdfasdfasdfasdfasdfasdf',555555,'457845321','http://localhost:3500/assets/productImages/productImage-1563779788641.jpg',NULL,'2019-07-22','2019-07-22',5540,1),(5,11,'Error delectus eu s','Hic aut maiores cons',455454,'454545','undefined',NULL,'2019-07-22','2019-07-22',454554,0),(6,7,'Vega Helmet','\nasdfasdfasdfasdfddddddddddddd',85555,'878721','http://localhost:3500/assets/productImages/productImage-1563792846171.png',NULL,'2019-07-22','2019-07-22',88,1),(7,11,'Vimal Suits','loasdfasdfasd',455752,'5844211444','http://localhost:3500/assets/productImages/productImage-1563796101787.png',NULL,'2019-07-22',NULL,85741,0),(8,14,'Et fugiat minim pro','Assumenda corporis n',4533,'4545454','http://localhost:3500/assets/productImages/productImage-1563796232987.png',NULL,'2019-07-22','2019-07-22',4545545,0),(9,15,'Nemo quo optio reru','Quo illum quod atqu',455712,'454545','http://localhost:3500/assets/productImages/productImage-1563798268420.png',NULL,'2019-07-22','2019-07-22',547755,0);
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20190711175014-create-user.js'),('20190712052851-create-category.js'),('20190712063035-create-product.js'),('20190712070631-create-order.js'),('20190712072311-create-order-product.js'),('20190712073005-create-product-image.js'),('20190712080307-create-product-rating.js'),('20190712081401-create-user-wishlist.js'),('20190712082904-create-deal.js'),('20190712084740-create-cart.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserWishlists`
--

DROP TABLE IF EXISTS `UserWishlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserWishlists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`),
  CONSTRAINT `UserWishlists_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `UserWishlists_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserWishlists`
--

LOCK TABLES `UserWishlists` WRITE;
/*!40000 ALTER TABLE `UserWishlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserWishlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `contact` bigint(20) DEFAULT NULL,
  `resetToken` varchar(255) DEFAULT NULL,
  `role` enum('admin','user') NOT NULL,
  `shippingAddress` text,
  `deliveryAddress` text,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'HV','Sharma','hvsharma63@gmail.com','$2b$10$g1/DwRJ6zBJGcfLabbe9hOR74x18WuFLbuUl60Uk97cjOO39PQOfK','2017-08-12','some address',8734868674,NULL,'admin',NULL,NULL,NULL),(2,'HV','Sharma','hvsharma653@gmail.com','$2b$10$t8rtq5ZcIhDJVjc18H/6MOjLqZPqdIPRaFvXFT7.rqESUO7VsL03K','2017-08-12','some address',8734868674,NULL,'user',NULL,NULL,NULL),(3,'HV','Sharma','hvsharma65223@gmail.com','$2b$10$.xpG2QgwXOLWo31WaROszuxe9P46if6zY3wZdIe5uZ4vEq.QXkp3C','2017-08-12','some address',8734868674,NULL,'admin',NULL,NULL,NULL),(4,'Jimit','Raval','jim@rav.com','$2b$10$brkuWsBe9MN8TrUjTZkbuuHKx8VvmyI.hQ8V95MSb0u1bVz/4A8Oa','1997-11-19','undefined',8456712384,NULL,'user',NULL,NULL,'2019-07-19 00:00:00');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-30 18:15:27
