-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2025 at 02:56 PM
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
(1, '[{\"mvdbID\":\"862\",\"status\":\"to_watch\",\"added\":\"2025-05-17\",\"watched_status\":0},{\"mvdbID\":1241436,\"status\":\"to_watch\",\"added\":\"2025-05-17\",\"watched_status\":0},{\"mvdbID\":1100988,\"status\":\"to_watch\",\"added\":\"2025-05-17\",\"watched_status\":0},{\"mvdbID\":1197306,\"status\":\"to_watch\",\"added\":\"2025-05-17\",\"watched_status\":0},{\"mvdbID\":950387,\"status\":\"to_watch\",\"added\":\"2025-05-17\",\"watched_status\":0},{\"mvdbID\":575265,\"status\":\"to_watch\",\"added\":\"2025-05-18\",\"watched_status\":0}]', '[{\"mvdbID\":67890,\"type\":\"series\",\"status\":\"To Watch\",\"added\":\"2023-01-01\"},{\"mvdbID\":13945,\"status\":\"to_watch\",\"added\":\"2025-05-17\",\"watched_status\":0}]'),
(6, '[{\"mvdbID\":324544,\"status\":\"to_watch\",\"added\":\"2025-05-17\",\"watched_status\":0},{\"mvdbID\":986056,\"status\":\"to_watch\",\"added\":\"2025-05-17\",\"watched_status\":0}]', '[{\"mvdbID\":100088,\"status\":\"to_watch\",\"added\":\"2025-05-17\",\"watched_status\":0},{\"mvdbID\":79744,\"status\":\"to_watch\",\"added\":\"2025-05-17\",\"watched_status\":0}]');

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
(1, 'movie', '1104845', 5),
(1, 'movie', '245891', 5),
(1, 'movie', '324544', 4),
(1, 'movie', '447273', 1),
(1, 'movie', '862', 3),
(1, 'movie', '950387', 3),
(1, 'movie', '986056', 3);

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
('bUsNPFfcHbIZMjErfFCOkauZ6n2IGwucWoMnFQ0lF2NTzwb818vv6ju1Czw2EHG0aKREZIjOpk6rkdplD1rOkfnJcTlr2W4wqczapfP1xgV3Gk23QbxeY9HpZs3GAvt6', 1747503604, 6),
('HHVaItshNXja27QnoZREmQf08ieFFwBDz1nTFCUmepJPeU6gITHpRcqjGjGtfnHIqUD6JLyU9prWMf3bxEJArWTpC9daKTBGg74GxCeDWkcGfLtNDAJVa5K1RTzP2pl4', 1747591551, 1),
('jlatZXvjQBSQjGrL4snxh44B8VNMfiKJHYzKExF3Zam4ZmpQVDA9xYR7XBc80d7aD1TBTTh7bnXxlbJ0aVJoiHGvxXUNXS3zb2tYnp0JXrllhI7xO6ugX6yZRXgDVKVe', 1747421180, 1),
('MTueC4V4txvl401VjWo4SKq2vKf8YeJJfXyTrVsMRzKsBr70G4U09ot1H4A6QQ10YpE0I7VqvkgLbb7Tc8MPMAq5yJFFxLNRMwdc2vmErRbDNJqUuAD0WxI2YkDVSE19', 1747491574, 1),
('NdleEdPU7U4CP3WKP4EWedFcPDGM0XC8lcUEfcitTcxD5f8ylPaUXdujREg5AtiTKGdGFhyEzy1K3TliRZpDoO5FHPhYx69YlRBSRiPYLcdFrMZAiAxvKAfiKB0hkzaW', 1747576141, 1),
('QVt2siHhDwhxtyFbv7FJ9EbDqcIJsOaLN8SjddRmvi99o6rm6TJQ1ZgL6qi4l8RvgbzE5GvrpjGlnfBwjKH9nNN8ovBEzHeMaFXMEfrG8MzoHnswb8a33vKmfTmldOxq', 1747484770, 1),
('zg4YJocNbt66Mt8BKCmb9XvTvP8pAK7gSzOreZnD7v9OwjB0jsjBKprUANLj61aNBs5AFADKxqgLSO2FTtZeknXmRrnkek4ep1Z9B2iUIw6G0l0sbF73ajHjfzNC6YRN', 1747502498, 1);

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

CREATE TABLE `statistics` (
  `user_id` int(11) NOT NULL,
  `movie_clicks` int(11) DEFAULT 0,
  `tv_series_clicks` int(11) DEFAULT 0,
  `kids_clicks` int(11) DEFAULT 0,
  `documentary_clicks` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `statistics`
--

INSERT INTO `statistics` (`user_id`, `movie_clicks`, `tv_series_clicks`, `kids_clicks`, `documentary_clicks`) VALUES
(0, 8, 8, 6, 4),
(1, 7, 8, 4, 3),
(5, 2, 0, 0, 1);

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
(0, 'sysadmin@web.local', 'sysgovernor', '1ab8038772d0abf103545ba59f72215de09afbed95b60701c48fd86bb210ae31', '1990-01-01'),
(1, 'Roywatkins@gmail.com', 'BigRoy69', 'ab14b8306d0189ebe210e0c3a5bfbe841d9e8665a092faffb5e61d48b0bd505c', '2025-05-13'),
(2, 'marypoppins@gmail.com', 'PoppinMaRy', '4a2a9bfa01405c2e84fb49b72b48511794384dc498c5b31f0e42554eb88e5519', '2025-05-16'),
(3, 'tonyrichards@gmail.com', 'RichTony', '291284ac28198095ab1268084a1880fea7b3ecbd8fd8d94dd2cff4bb33c51d78', '2025-04-28'),
(4, 'gregwilson@yahoo.com', 'GregWillWin', '9d46b073bb393f3a7ddd339f055be35f28ee517a88782b05f78a1ec532960ce8', '2025-04-15'),
(5, 'samanthawhite@gmail.com', 'Sammy4632', '073463b4efd246bc52f1e0246084281fde361763136cfe9a9a863fdd1176c646', '2025-05-02'),
(6, 'georgepappas@gmail.com', 'PapaGeorge23', '44244465f8f4d34d1222c5ecb537d72e3ba919c183cc009fc38b37be6d15b984', '2025-05-01'),
(7, 'JohnDoe@gmail.com', 'JohnnyD', '35d74a8abc1aca01dae0e34e5e5c1905d33c71722285b4a5dde041f0d066eede', '2025-05-15');

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
-- Indexes for table `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`user_id`);

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
  MODIFY `userid` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
-- Constraints for table `statistics`
--
ALTER TABLE `statistics`
  ADD CONSTRAINT `statistics_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

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
