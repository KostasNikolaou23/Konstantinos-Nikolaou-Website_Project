-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2025 at 01:33 PM
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
(1, 'This is the END', 'Watch movies TILL YOU DIE!', 100),
(2, 'Bond...James Bond', 'Watch 10 James Bond movies!', 10),
(3, 'Series Junkie', 'Watch 40 tv series!', 40),
(4, 'I AM BATMAN', 'Watch 25 superhero movies!', 25),
(5, 'Scared yet?', 'Watch 50 thriller/horror movies!', 50),
(6, 'Childish', 'Watch 20 kids shows/movies!', 20),
(7, 'Documentary nerd', 'Watch 15 documentaries!', 15),
(8, 'War Veteran', 'Watch 50 war movies!', 50),
(9, 'Adrenaline Rush', 'Watch 40 action movies!', 40),
(10, 'Wannabe detective', 'Watch 20 crime movies/series!', 20),
(11, 'The King', 'Reach 10 achievements', 10);

-- --------------------------------------------------------

--
-- Table structure for table `badges`
--

CREATE TABLE `badges` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `badges`
--

INSERT INTO `badges` (`id`, `name`, `description`) VALUES
(1, 'King of the hill', 'Reached 10 achievements');

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
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `user_id` int(30) NOT NULL,
  `type` enum('movie','tvseries') NOT NULL,
  `mvdb_id` varchar(32) NOT NULL,
  `rating` tinyint(3) UNSIGNED NOT NULL CHECK (`rating` between 1 and 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`user_id`, `type`, `mvdb_id`, `rating`) VALUES
(1, 'movie', '245891', 5);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `identifier` char(128) NOT NULL,
  `until` int(10) UNSIGNED NOT NULL,
  `userID` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`identifier`, `until`, `userID`) VALUES
('9LEteSgIZBcOFNjkg0v1opm93K9xL3mi9Q68ePJt93PgtsLa3eZj1DLO5iVnOgGvFrKAHuxgm00vKSwiAsvwElvZpQp6I6cErfTNi9iJeie5yikJDGmty65BJ2KKnZCk', 1747411245, 1),
('jlatZXvjQBSQjGrL4snxh44B8VNMfiKJHYzKExF3Zam4ZmpQVDA9xYR7XBc80d7aD1TBTTh7bnXxlbJ0aVJoiHGvxXUNXS3zb2tYnp0JXrllhI7xO6ugX6yZRXgDVKVe', 1747421180, 1),
('QVt2siHhDwhxtyFbv7FJ9EbDqcIJsOaLN8SjddRmvi99o6rm6TJQ1ZgL6qi4l8RvgbzE5GvrpjGlnfBwjKH9nNN8ovBEzHeMaFXMEfrG8MzoHnswb8a33vKmfTmldOxq', 1747484770, 1);

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
  `password` text NOT NULL,
  `joined` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `email`, `username`, `password`, `joined`) VALUES
(1, 'Roywatkins@gmail.com', 'BigRoy69', '12348970', '2025-05-13'),
(2, 'marypoppins@gmail.com', 'PoppinMaRy', 'password456', '2025-05-16'),
(3, 'tonyrichards@gmail.com', 'RichTony', 'utianiwah32', '2025-04-28'),
(4, 'gregwilson@yahoo.com', 'GregWillWin', 'password101', '2025-04-15'),
(5, 'samanthawhite@gmail.com', 'Sammy4632', 'ahdlof323', '2025-05-02'),
(6, 'georgepappas@gmail.com', 'PapaGeorge23', '115tpass', '2025-05-01'),
(7, 'JohnDoe@gmail.com', 'JohnnyD', 'hudawhi$#', '2025-05-15');

-- --------------------------------------------------------

--
-- Table structure for table `user_achievements`
--

CREATE TABLE `user_achievements` (
  `user_id` int(30) NOT NULL,
  `achievement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_achievements`
--

INSERT INTO `user_achievements` (`user_id`, `achievement_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(2, 1),
(2, 3),
(2, 4),
(2, 5),
(2, 8),
(2, 9),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(5, 1),
(5, 2),
(5, 6),
(6, 1),
(6, 2),
(6, 5),
(6, 6),
(6, 8),
(7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_badges`
--

CREATE TABLE `user_badges` (
  `user_id` int(11) NOT NULL,
  `badge_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_badges`
--

INSERT INTO `user_badges` (`user_id`, `badge_id`) VALUES
(1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `badges`
--
ALTER TABLE `badges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mylist`
--
ALTER TABLE `mylist`
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`user_id`,`type`,`mvdb_id`);

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
-- Indexes for table `user_achievements`
--
ALTER TABLE `user_achievements`
  ADD PRIMARY KEY (`user_id`,`achievement_id`),
  ADD KEY `achievement_id` (`achievement_id`);

--
-- Indexes for table `user_badges`
--
ALTER TABLE `user_badges`
  ADD PRIMARY KEY (`user_id`,`badge_id`),
  ADD KEY `fk_user_badges_badge_id` (`badge_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achievements`
--
ALTER TABLE `achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `badges`
--
ALTER TABLE `badges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mylist`
--
ALTER TABLE `mylist`
  ADD CONSTRAINT `mylist_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`);

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userid`);

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userid`) ON DELETE CASCADE;

--
-- Constraints for table `user_achievements`
--
ALTER TABLE `user_achievements`
  ADD CONSTRAINT `user_achievements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userid`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_achievements_ibfk_2` FOREIGN KEY (`achievement_id`) REFERENCES `achievements` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_badges`
--
ALTER TABLE `user_badges`
  ADD CONSTRAINT `fk_user_badges_badge_id` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_badges_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
