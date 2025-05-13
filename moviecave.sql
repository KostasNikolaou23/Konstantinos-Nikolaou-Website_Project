-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2025 at 06:23 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moviecave`
--

-- --------------------------------------------------------

--
-- Table structure for table `achievements`
--

CREATE TABLE `achievements` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `goal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `achievements`
--

INSERT INTO `achievements` (`id`, `name`, `description`, `goal`) VALUES
(1, 'Ma name Jeff', 'watch movies TILL YOU DIE!', 800),
(2, 'Ma name Bond', 'Watch 20 James Bond movies', 20),
(3, 'Hello?!?!', 'Watch 10 horror movies', 10),
(4, 'I AM BATMAN', 'Watch 25 superhero movies', 25),
(5, 'Lorem ipsum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 100);

-- --------------------------------------------------------

--
-- Table structure for table `mylist`
--

CREATE TABLE `mylist` (
  `userid` int(11) DEFAULT NULL,
  `movies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`movies`)),
  `tvseries` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tvseries`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mylist`
--

INSERT INTO `mylist` (`userid`, `movies`, `tvseries`) VALUES
(1, '[\r\n        {\"mvdbID\": \"931349-ash\", \"type\": \"movie\", \"added\": \"2023-01-01\"},\r\n        {\"mvdbID\": 54321, \"type\": \"movie\", \"added\": \"2023-01-01\"},\r\n        {\"mvdbID\": 13579, \"type\": \"movie\", \"added\": \"2023-01-01\"}\r\n    ]', '[\r\n        {\"mvdbID\": 67890, \"type\": \"series\", \"status\": \"To Watch\", \"added\": \"2023-01-01\"}\r\n    ]');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `identifier` char(128) NOT NULL,
  `until` int(10) UNSIGNED NOT NULL,
  `userID` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `track`
--

CREATE TABLE `track` (
  `id` text NOT NULL,
  `type` tinytext NOT NULL DEFAULT 'movie',
  `progress` int(11) DEFAULT NULL,
  `tvseason` int(11) DEFAULT NULL,
  `tvepisode` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `track`
--

INSERT INTO `track` (`id`, `type`, `progress`, `tvseason`, `tvepisode`) VALUES
('931349-ash', 'movie', 100, NULL, NULL),
('67890', 'tvseries', 0, 1, 1),
('54321', 'movie', 70, NULL, NULL),
('12345', 'tvseries', 30, 2, 5),
('13579', 'movie', 15, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(30) NOT NULL,
  `email` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `email`, `username`, `password`) VALUES
(1, 'user1@example.com', 'user1', 'password123'),
(2, 'user2@example.com', 'user2', 'password456'),
(3, 'user3@example.com', 'user3', 'password789'),
(4, 'user4@example.com', 'user4', 'password101'),
(5, 'user5@example.com', 'user5', 'password202'),

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mylist`
--
ALTER TABLE `mylist`
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`identifier`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achievements`
--
ALTER TABLE `achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mylist`
--
ALTER TABLE `mylist`
  ADD CONSTRAINT `mylist_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`);

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userid`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
