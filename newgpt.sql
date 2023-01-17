-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2023 at 02:45 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `newgpt`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `subject` varchar(20) NOT NULL,
  `teacher` varchar(20) NOT NULL,
  `student` varchar(20) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`subject`, `teacher`, `student`, `date`) VALUES
('20CS21M', '109NS', '109CS20058', '0000-00-00 00:00:00'),
('20CS11T', '109NS', '109CS20058', '2022-12-10 11:18:00');

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `name` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`name`) VALUES
('CIVIL'),
('CS'),
('EC'),
('EE'),
('IS'),
('ME');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `regno` varchar(20) NOT NULL,
  `sem` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`regno`, `sem`) VALUES
('109CS20058', '5'),
('109CS20060', '4');

-- --------------------------------------------------------

--
-- Table structure for table `subjectalloted`
--

CREATE TABLE `subjectalloted` (
  `sub` varchar(20) NOT NULL,
  `teacher` varchar(20) NOT NULL,
  `sem` varchar(1) NOT NULL,
  `branch` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subjectalloted`
--

INSERT INTO `subjectalloted` (`sub`, `teacher`, `sem`, `branch`) VALUES
('20CS112T', '109CS20058', '1', 'CS'),
('20CS112T', '109CS20060', '1', 'CS'),
('20CS11T', '109CS20058', '1', 'CS'),
('20CS11T', '109CS20060', '1', 'CS'),
('20CS21M', '109CS20060', '2', 'CS');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `name` varchar(50) NOT NULL,
  `code` varchar(20) NOT NULL,
  `sem` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`name`, `code`, `sem`) VALUES
('UBAID PATEL', '20CS112T', '1'),
('FUNDAMENTALS OF COMPUTER', '20CS11T', '1'),
('ENGENEERING MATHEMATICS', '20CS21M', '2');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` varchar(20) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `mobile` varchar(13) NOT NULL,
  `email` varchar(60) NOT NULL,
  `user_password` varchar(20) NOT NULL,
  `user_role` varchar(20) NOT NULL,
  `branch` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `fullname`, `mobile`, `email`, `user_password`, `user_role`, `branch`) VALUES
('109CS20058', 'UBAID PATEL', '9148749147', 'FAKEUSER595@GMAIL.COM', 'qwerty123@', 'faculty', 'CS'),
('109CS20060', 'AYUB ALI', '9148749147', 'AYUBALI123@GMAIL.COM', 'qwerty123@', 'FACULTY', 'CS'),
('109NS', 'NAGRAJ SIR', '9184567891', 'AGDADAJDAHGY@HGSS.CHD', 'qwerty123@', 'HOD', 'CS'),
('B', 'BJB', '', '', '', '', ''),
('JBJ', 'BJB', 'JB', 'J', 'BJ', 'BJ', 'BJ'),
('KN4259', 'Ubaid Patel', '09148749147', 'fakeuser595@gmail.com', 'ubaid123@', 'STUDENT', 'CS'),
('KN4259jssss', 'UBAID', '7204479261', 'akbarpatelkua@gmail.com', 'ubaid123@', 'faculty', 'CS'),
('KN4259jssssdsdfssdf', 'V A MOHAMMED AYUB', '7204479261', 'ayubali200412@gmail.com', 'admin', 'STUDENT', 'ME'),
('KN4259jsssss', 'V A MOHAMMED AYUB', '7204479261', 'ayubali200412@gmail.com', 'ubaid123@', 'STUDENT', 'ME'),
('KN4259tttt', 'UBAID', '7204479261', 'akbarpatelkua@gmail.com', 'ubaid123@', 'STUDENT', 'CS'),
('KNdssfdfd', 'V A MOHAMMED AYUB', '7204479261', 'ayubali200412@gmail.com', 'ubaid123@', 'STUDENT', 'CS');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD KEY `subject froiegn` (`subject`),
  ADD KEY `student foriegn` (`student`),
  ADD KEY `teacher froiegn` (`teacher`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD KEY `regno` (`regno`);

--
-- Indexes for table `subjectalloted`
--
ALTER TABLE `subjectalloted`
  ADD PRIMARY KEY (`sub`,`teacher`,`sem`,`branch`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `student foriegn` FOREIGN KEY (`student`) REFERENCES `users` (`userid`),
  ADD CONSTRAINT `subject froiegn` FOREIGN KEY (`subject`) REFERENCES `subjects` (`code`),
  ADD CONSTRAINT `teacher froiegn` FOREIGN KEY (`teacher`) REFERENCES `users` (`userid`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`regno`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subjectalloted`
--
ALTER TABLE `subjectalloted`
  ADD CONSTRAINT `subjectalloted_ibfk_1` FOREIGN KEY (`teacher`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subjectalloted_ibfk_2` FOREIGN KEY (`sub`) REFERENCES `subjects` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
