-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 19, 2023 at 07:03 PM
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
  `state` varchar(20) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
('109CS20001', '1'),
('109CS20002', '1'),
('109CS20003', '1'),
('109CS20004', '1'),
('109CS20005', '1');

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
('20AU01T', '109CSAM', '1', 'CS'),
('20CS01P', '109CSSWM', '1', 'CS'),
('20CS11T', '109CSNS', '1', 'CS');

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
('Environment Sustainibility OR Sports', '20AU01T', '1'),
('Engineering Mathematics', '20C01T', '1'),
('IT Skills', '20CS01P', '1'),
('Fundamentals of Computers', '20CS11T', '1'),
('Multimedia And Animation', '20CS21P', '2'),
('Python Programming', '20CS31P', '3'),
('Computer Hardware Maintenance and Administration', '20CS32P', '3'),
('Computer Networks', '20CS33P', '3'),
('Database System Concepts and \r\nPL/SQL', '20CS34P', '3'),
('Data structures with Python', '20CS41P', '4'),
('Operating System and Administration', '20CS42P', '4'),
('Object Oriented Programming and Design with Java', '20CS43P', '4'),
('Software Engineering principles and practices', '20CS44P', '4'),
('Indian Constitution', '20CS45T', '4'),
('Artificial Intelligence and Machine Learning', '20CS51I', '5'),
('Full Stack Development', '20CS52I', '5'),
(' Cloud Computing', '20CS53I', '5'),
('Cyber Security', '20CS54I', '5'),
('Fundamentals of Electrical & Electronics Engineeri', '20EC01P', '1'),
('Communication Skills', '20EG01P', '2'),
('Entrepreneurship and Start up', '20ET51I', '5'),
('Kannada', '20KA21P', '2'),
('Kannada Sahitya', '20KA31T ', '3'),
('Computer Aided Engineering Graphics', '20ME02P', '2'),
('Project Management Skills', '20PM01T', '2'),
('Statistics And Analytics', '20SC02P', '2'),
('Research Methodology', '2ORM53T', '5'),
('Applied Mathematics', '2OSC51T', '5'),
('Applied Science', '2OSC52T', '5'),
('Technical Writing', '2OTW54P', '5');

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
('109CS20001', 'Arun Kumar', '9184567891', 'dhfggfdhfdg@gmail.com', 'qwerty123@', 'STUDENT', 'CS'),
('109CS20002', 'Ubaid Patel', '9148749147', 'fakeuser595@gmail.com', 'qwerty123@', 'STUDENT', 'CS'),
('109CS20003', 'Sharan gouda patil', '9148740001', 'sdaafsfdsaafaf@gmail.com', 'qwerty123@', 'STUDENT', 'CS'),
('109CS20004', 'Ayub Ali', '7204479261', 'dssdhjfdddjjdjdjd@jjajja.com', 'qwerty123@', 'STUDENT', 'CS'),
('109CS20005', 'Sufiyan Khan', '9148700999', 'hjgjhhjfdfdt595@gmail.com', 'qwerty123@', 'STUDENT', 'CS'),
('109CSAM', 'Ameena Mam', '9148645678', 'ssahjsjgsagsa@dj.com', 'qwerty123@', 'FACULTY', 'CS'),
('109CSNS', 'Nagraj Sir', '9148711111', 'ssshgsgtfsjjs@gmail.com', 'qwerty123@', 'FACULTY', 'CS'),
('109CSSUM', 'Sunanda Devi mam', '9148645679', 'ssahjsjgsagqqsa@dj.com', 'qwerty123@', 'HOD', 'CS'),
('109CSSWM', 'Swapna Mam', '9148709989', 'hjgjhhjfdfdaat595@gmail.com', 'qwerty123@', 'FACULTY', 'CS');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`subject`,`teacher`,`student`,`date`);

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
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`regno`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
