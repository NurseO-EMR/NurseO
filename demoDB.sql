-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jul 07, 2024 at 01:08 AM
-- Server version: 11.4.2-MariaDB-ubu2404
-- PHP Version: 8.2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `NurseO`
--
CREATE DATABASE IF NOT EXISTS `NurseO` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci;
USE `NurseO`;

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `ResetDB`$$
CREATE DEFINER=`root`@`%` PROCEDURE `ResetDB` ()  DETERMINISTIC BEGIN  
   -- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jul 06, 2024 at 06:43 PM
-- Server version: 10.6.17-MariaDB-1:10.6.17+maria~ubu2004
-- PHP Version: 8.2.17

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT ;
 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS ;
 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION ;
 SET NAMES utf8mb4 ;

--
-- Database: `NurseO`
--
CREATE DATABASE IF NOT EXISTS `NurseO` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `Account`
--

DROP TABLE IF EXISTS `Account`;
CREATE TABLE `Account` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `provider` varchar(191) NOT NULL,
  `providerAccountId` varchar(191) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `expires_at` int(11) DEFAULT NULL,
  `token_type` varchar(191) DEFAULT NULL,
  `scope` varchar(191) DEFAULT NULL,
  `id_token` text DEFAULT NULL,
  `session_state` varchar(191) DEFAULT NULL,
  `refresh_token_expires_in` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Allergy`
--

DROP TABLE IF EXISTS `Allergy`;
CREATE TABLE `Allergy` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `reaction` varchar(191) NOT NULL,
  `patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Course`
--

DROP TABLE IF EXISTS `Course`;
CREATE TABLE `Course` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Course_Location_Information`
--

DROP TABLE IF EXISTS `Course_Location_Information`;
CREATE TABLE `Course_Location_Information` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Custom_Order`
--

DROP TABLE IF EXISTS `Custom_Order`;
CREATE TABLE `Custom_Order` (
  `id` int(11) NOT NULL,
  `order_kind` varchar(191) NOT NULL,
  `order_type` varchar(191) NOT NULL,
  `time` varchar(191) DEFAULT NULL,
  `order_text` text NOT NULL,
  `patient_id` int(11) NOT NULL,
  `order_index` int(11) NOT NULL DEFAULT -1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Flag`
--

DROP TABLE IF EXISTS `Flag`;
CREATE TABLE `Flag` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `reason` varchar(191) NOT NULL,
  `patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Immunization`
--

DROP TABLE IF EXISTS `Immunization`;
CREATE TABLE `Immunization` (
  `id` int(11) NOT NULL,
  `immunization` varchar(191) NOT NULL,
  `patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Location`
--

DROP TABLE IF EXISTS `Location`;
CREATE TABLE `Location` (
  `id` int(11) NOT NULL,
  `building` varchar(191) NOT NULL,
  `station` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Mar_Record`
--

DROP TABLE IF EXISTS `Mar_Record`;
CREATE TABLE `Mar_Record` (
  `id` int(11) NOT NULL,
  `med_order_id` int(11) NOT NULL,
  `dose` varchar(191) DEFAULT NULL,
  `hour` int(11) NOT NULL,
  `minute` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Medical_History`
--

DROP TABLE IF EXISTS `Medical_History`;
CREATE TABLE `Medical_History` (
  `id` int(11) NOT NULL,
  `date` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `notes` varchar(191) NOT NULL,
  `patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Medication`
--

DROP TABLE IF EXISTS `Medication`;
CREATE TABLE `Medication` (
  `id` int(11) NOT NULL,
  `brand_name` varchar(191) NOT NULL,
  `generic_name` varchar(191) NOT NULL,
  `narcoti_count_needed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Medication_Location_Information`
--

DROP TABLE IF EXISTS `Medication_Location_Information`;
CREATE TABLE `Medication_Location_Information` (
  `id` int(11) NOT NULL,
  `med_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `drawer` varchar(191) NOT NULL,
  `slot` varchar(191) NOT NULL,
  `barcode` varchar(191) NOT NULL,
  `dose` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Med_Order`
--

DROP TABLE IF EXISTS `Med_Order`;
CREATE TABLE `Med_Order` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `med_id` int(11) NOT NULL,
  `concentration` varchar(191) NOT NULL,
  `route` varchar(191) NOT NULL,
  `frequency` varchar(191) NOT NULL,
  `routine` varchar(191) NOT NULL,
  `prn_note` varchar(191) DEFAULT NULL,
  `notes` varchar(191) NOT NULL,
  `order_kind` varchar(191) NOT NULL,
  `order_type` varchar(191) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `hold_reason` varchar(191) DEFAULT NULL,
  `time` varchar(191) DEFAULT NULL,
  `order_index` int(11) NOT NULL DEFAULT -1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Note`
--

DROP TABLE IF EXISTS `Note`;
CREATE TABLE `Note` (
  `id` int(11) NOT NULL,
  `date` varchar(191) NOT NULL,
  `note` varchar(191) NOT NULL,
  `report_name` varchar(191) NOT NULL,
  `report_type` varchar(191) NOT NULL,
  `patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Patient`
--

DROP TABLE IF EXISTS `Patient`;
CREATE TABLE `Patient` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `dob` varchar(191) NOT NULL,
  `age` varchar(191) NOT NULL,
  `gender` varchar(191) NOT NULL,
  `height` varchar(191) NOT NULL,
  `weight` varchar(191) NOT NULL,
  `studentUID` varchar(191) DEFAULT NULL,
  `lab_doc_url` varchar(191) DEFAULT NULL,
  `imaging_url` varchar(191) DEFAULT NULL,
  `diagnosis` varchar(191) DEFAULT NULL,
  `course_id` int(11) NOT NULL,
  `template` tinyint(1) NOT NULL,
  `patient_bar_code` varchar(191) NOT NULL,
  `time_hour` int(11) NOT NULL,
  `time_minute` int(11) NOT NULL,
  `student_id` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Report_Field`
--

DROP TABLE IF EXISTS `Report_Field`;
CREATE TABLE `Report_Field` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `field_type` varchar(191) NOT NULL,
  `add_second_field` tinyint(1) NOT NULL DEFAULT 0,
  `report_set_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Report_Field`
--

INSERT INTO `Report_Field` (`id`, `name`, `field_type`, `add_second_field`, `report_set_id`) VALUES
(19, 'Temp', 'number', 0, 18),
(20, 'HR2', 'number', 0, 18),
(21, 'BP - Laying', 'text', 0, 18),
(22, 'BP - Sitting', 'text', 0, 18),
(23, 'BP - Standing', 'text', 0, 18),
(24, 'RR', 'number', 0, 18),
(25, 'O2 Sat (%)', 'number', 0, 18),
(26, 'Oxygen/Air', 'options', 0, 18),
(27, 'LPM', 'options', 0, 18),
(28, 'Pain', 'T/F', 0, 18),
(29, 'Pain_Level', 'options', 0, 28),
(30, 'Description', 'options', 0, 28),
(31, 'Location Resp', 'options', 0, 28),
(32, 'Duration', 'options', 0, 28),
(34, 'Intake', 'text', 0, 33),
(35, 'Output', 'text', 0, 33),
(37, 'Sensory Perception', 'options', 0, 36),
(38, 'Moisture', 'options', 0, 36),
(39, 'Activity', 'options', 0, 36),
(40, 'Mobility', 'options', 0, 36),
(41, 'Nutrition', 'options', 0, 36),
(42, 'Friction & Shear', 'options', 0, 36),
(43, 'Braden Scale Total', 'options', 0, 36),
(44, 'Skin Color', 'options', 0, 36),
(45, 'Skin Temperature', 'options', 0, 36),
(46, 'Skin Moister', 'options', 0, 36),
(47, 'Skin Turgor', 'options', 0, 36),
(48, 'Mucous Membranes', 'checkbox', 0, 36),
(49, 'pressure ulcer stage', 'options', 0, 36),
(51, 'Respiratory Pattern', 'options', 0, 50),
(52, 'Right Breath Sounds', 'options', 0, 50),
(53, 'Left Breath Sounds', 'options', 0, 50),
(54, 'Cough', 'options', 0, 50),
(55, 'Secretion Description', 'text', 0, 50),
(56, 'Incentive Spirometry', 'options', 0, 50),
(57, 'Volume', 'text', 0, 50),
(58, 'Work of Breathing', 'options', 0, 50),
(59, 'Suction Route', 'options', 0, 50),
(60, 'Suction Device', 'options', 0, 50),
(61, 'Suction Size (fr)', 'number', 0, 50),
(63, 'IV Access', 'options', 0, 62),
(64, 'Location', 'text', 0, 62),
(65, 'IV Catheter Size (guage)', 'number', 0, 62),
(66, 'Site Assessment', 'options', 0, 62),
(67, 'IV Status', 'options', 0, 62),
(69, 'HR1', 'options', 0, 68),
(70, 'Telemetry', 'options', 0, 68),
(71, 'Heart Sounds', 'options', 0, 68),
(72, 'Apical Pulse', 'options', 0, 68),
(73, 'Radial Pulse', 'options', 1, 68),
(74, 'Temporal Pulse', 'options', 1, 68),
(75, 'Carotid Pulse', 'options', 1, 68),
(76, 'Brachial Pulse', 'options', 1, 68),
(77, 'Femoral Pulse', 'options', 1, 68),
(78, 'Popliteal Pulse', 'options', 1, 68),
(79, 'Posterior tibial Pulse', 'options', 1, 68),
(80, 'Dorsalis pedis Pulse', 'options', 1, 68),
(81, 'Edema', 'options', 0, 68),
(82, 'Edema location', 'text', 0, 68),
(83, 'Perfusion Color', 'options', 0, 68),
(84, 'Perfusion/Capillary Refill', 'options', 0, 68),
(85, 'Skin Temperature', 'options', 0, 68),
(87, 'Abdomen', 'options', 0, 86),
(88, 'Comments', 'text', 0, 86),
(89, 'Bowel Sounds', 'options', 0, 86),
(90, 'Last BM', 'text', 0, 86),
(91, 'Tube Type', 'checkbox', 0, 86),
(92, 'Tube Status', 'options', 0, 86),
(93, 'Drainage', 'text', 0, 86),
(94, 'Stoma', 'options', 0, 86),
(95, 'Ostomy Type(s)', 'options', 0, 86),
(96, 'Location', 'text', 0, 86),
(97, 'Other GI Symptoms', 'options', 0, 86),
(99, 'Urinary Pattern', 'options', 0, 98),
(100, 'Urinary devices', 'checkbox', 0, 98),
(101, 'Urine', 'checkbox', 0, 98),
(102, 'Color', 'text', 0, 98),
(103, 'Catheter size', 'text', 0, 98),
(105, 'Oriented', 'checkbox', 0, 104),
(106, 'Mental', 'checkbox', 0, 104),
(107, 'Eye opening', 'options', 0, 104),
(108, 'Best Verbal Response', 'options', 0, 104),
(109, 'Best Motor Response', 'options', 0, 104),
(110, 'Speech', 'checkbox', 0, 104),
(111, 'Seizure Precautions', 'options', 0, 104),
(112, 'Right pupil size (mm)', 'number', 0, 104),
(113, 'Right pupil Reaction', 'options', 0, 104),
(114, 'Left pupil size (mm)', 'number', 0, 104),
(115, 'Left pupil Reaction', 'options', 0, 104),
(116, 'PERRLA', 'checkbox', 0, 104),
(118, 'Height (in)', 'number', 0, 117),
(119, 'Weight (kg)', 'number', 0, 117),
(120, 'Head Circle (cm)', 'number', 0, 117),
(122, 'Head', 'options', 0, 121),
(123, 'Eyes', 'options', 0, 121),
(124, 'Ears', 'options', 0, 121),
(125, 'Nose', 'options', 0, 121),
(126, 'Throat', 'options', 0, 121),
(128, 'Weight Bearing', 'checkbox', 0, 127),
(129, 'ROM', 'checkbox', 0, 127),
(131, 'Wound Location', 'text', 0, 130),
(132, 'Wound Type', 'text', 0, 130),
(133, 'Wound Length (cm)', 'number', 0, 130),
(134, 'Wound Width (cm)', 'number', 0, 130),
(135, 'Wound Depth (cm)', 'number', 0, 130),
(136, 'Wound drainage appearance', 'text', 0, 130),
(137, 'Wound tunneling(cm)', 'number', 0, 130),
(138, 'Wound Undermining(cm)', 'number', 0, 130),
(139, 'Wound drainage amount', 'text', 0, 130),
(140, 'Wound Pressure', 'options', 0, 130);

-- --------------------------------------------------------

--
-- Table structure for table `Report_Label`
--

DROP TABLE IF EXISTS `Report_Label`;
CREATE TABLE `Report_Label` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `report_field_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Report_Label`
--

INSERT INTO `Report_Label` (`id`, `name`, `report_field_id`) VALUES
(1211, 'Upper', 52),
(1212, 'Lateral', 52),
(1213, 'Lower', 52),
(1214, 'Upper', 53),
(1215, 'Lateral', 53),
(1216, 'Lower', 53),
(1217, 'Left', 73),
(1218, 'Right', 73),
(1219, 'Left', 74),
(1220, 'Right', 74),
(1221, 'Left', 75),
(1222, 'Right', 75),
(1223, 'Left', 76),
(1224, 'Right', 76),
(1225, 'Left', 77),
(1226, 'Right', 77),
(1227, 'Left', 78),
(1228, 'Right', 78),
(1229, 'Left', 79),
(1230, 'Right', 79),
(1231, 'Left', 80),
(1232, 'Right', 80);

-- --------------------------------------------------------

--
-- Table structure for table `Report_Option`
--

DROP TABLE IF EXISTS `Report_Option`;
CREATE TABLE `Report_Option` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `report_field_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Report_Option`
--

INSERT INTO `Report_Option` (`id`, `name`, `report_field_id`) VALUES
(22496, 'Room Air', 26),
(22497, 'Nasal Cannula', 26),
(22498, 'Simple Mask', 26),
(22499, 'Blow By Non-rebreather', 26),
(22500, 'Ventilator', 26),
(22501, 'High Flow Nasal Cannula', 26),
(22502, 'N/A', 27),
(22503, '1/4', 27),
(22504, '1/2', 27),
(22505, '3/4', 27),
(22506, '1', 27),
(22507, '1 1/2', 27),
(22508, '2', 27),
(22509, '3', 27),
(22510, '4', 27),
(22511, '5', 27),
(22512, '6', 27),
(22513, '7', 27),
(22514, '8', 27),
(22515, '9', 27),
(22516, '10', 27),
(22517, '0', 29),
(22518, '1', 29),
(22519, '2', 29),
(22520, '3', 29),
(22521, '4', 29),
(22522, '5', 29),
(22523, '6', 29),
(22524, '7', 29),
(22525, '8', 29),
(22526, '9', 29),
(22527, '10', 29),
(22528, 'aching', 30),
(22529, 'burning', 30),
(22530, 'cramping', 30),
(22531, 'crushing', 30),
(22532, 'dull', 30),
(22533, 'exhausting', 30),
(22534, 'pressure', 30),
(22535, 'radiating', 30),
(22536, 'sharp', 30),
(22537, 'shooting', 30),
(22538, 'splitting', 30),
(22539, 'tingling', 30),
(22540, 'throbbing', 30),
(22541, 'tender to touch', 30),
(22542, 'RUE', 31),
(22543, 'LUE', 31),
(22544, 'LLE', 31),
(22545, 'RLE', 31),
(22546, 'abdomen', 31),
(22547, 'neck', 31),
(22548, 'lt flank', 31),
(22549, 'chest', 31),
(22550, 'head', 31),
(22551, 'incisional', 31),
(22552, 'rt flank', 31),
(22553, 'back', 31),
(22554, 'perineum', 31),
(22555, 'phantom', 31),
(22556, 'Left Hip', 31),
(22557, 'Right Hip', 31),
(22558, 'Coccyx', 31),
(22559, 'continuous', 32),
(22560, 'cont. with burst of increase pain', 32),
(22561, 'intermittent', 32),
(22562, 'no pain', 32),
(22563, 'other see Nursing Notes', 32),
(22564, '1- Completely Limited', 37),
(22565, '2- Very Limited', 37),
(22566, '3- Slightly Limited', 37),
(22567, '4- No Impairment', 37),
(22568, '1- Constantly Moist', 38),
(22569, '2- Very Moist', 38),
(22570, '3- Occasionally Moist', 38),
(22571, '4- Rarely Moist', 38),
(22572, '1- Bedfast', 39),
(22573, '2- Chairfast', 39),
(22574, '3- Walks Occasionally', 39),
(22575, '4- Walks Frequently', 39),
(22576, '1- Completely Immobile', 40),
(22577, '2- Very Limited', 40),
(22578, '3- Slightly Limited', 40),
(22579, '4- No Limitation', 40),
(22580, '1- Very Poor', 41),
(22581, '2- Probably Inadequate', 41),
(22582, '3- Adequate', 41),
(22583, '4- Excellent', 41),
(22584, '1- Problem', 42),
(22585, '2- Potential Problem', 42),
(22586, '3- No Apparent Problem', 42),
(22587, '≤ 9 = Very High Risk', 43),
(22588, '10-12 = High Risk', 43),
(22589, '13-14 = Moderate risk', 43),
(22590, '15-18 = Mild Risk', 43),
(22591, '19-23 = Minimal Risk', 43),
(22592, 'Normal Color', 44),
(22593, 'Flushed', 44),
(22594, 'Flushed', 44),
(22595, 'Jaundiced', 44),
(22596, 'Pale', 44),
(22597, 'Cyanotic', 44),
(22598, 'Mottled', 44),
(22599, 'Ashen', 44),
(22600, 'Other', 44),
(22601, 'Warm', 45),
(22602, 'Hot', 45),
(22603, 'Cool', 45),
(22604, 'Dry', 46),
(22605, 'Moist', 46),
(22606, 'Diaphoretic', 46),
(22607, 'tenting', 47),
(22608, 'non tenting', 47),
(22609, 'Intact', 48),
(22610, 'Pink', 48),
(22611, 'Moist', 48),
(22612, 'Dry', 48),
(22613, 'Other', 48),
(22614, '1', 49),
(22615, '2', 49),
(22616, '3', 49),
(22617, '4', 49),
(22618, 'regular', 51),
(22619, 'tachypnea', 51),
(22620, 'bradypnea', 51),
(22621, 'shallow', 51),
(22622, 'agonal', 51),
(22623, 'kussmaul', 51),
(22624, 'apneic', 51),
(22625, 'Clear', 52),
(22626, 'Diminished', 52),
(22627, 'Crackles', 52),
(22628, 'Coarse', 52),
(22629, 'Inspiratory Wheezes', 52),
(22630, 'Expiratory Wheezes', 52),
(22631, 'Rhonchi', 52),
(22632, 'Absent', 52),
(22633, 'Inspiratory Stridor', 52),
(22634, 'Expiratory Stridor', 52),
(22635, 'Clear', 53),
(22636, 'Diminished', 53),
(22637, 'Crackles', 53),
(22638, 'Coarse', 53),
(22639, 'Inspiratory Wheezes', 53),
(22640, 'Expiratory Wheezes', 53),
(22641, 'Rhonchi', 53),
(22642, 'Absent', 53),
(22643, 'Inspiratory Stridor', 53),
(22644, 'Expiratory Stridor', 53),
(22645, 'Non-Prod', 54),
(22646, 'Prod', 54),
(22647, 'Yes', 56),
(22648, 'No', 56),
(22649, 'easy', 58),
(22650, 'labored', 58),
(22651, 'head bobbing', 58),
(22652, 'nasal flaring', 58),
(22653, 'grunting', 58),
(22654, 'retractions', 58),
(22655, 'N/A', 59),
(22656, 'nasal', 59),
(22657, 'NT', 59),
(22658, 'NP', 59),
(22659, 'OP', 59),
(22660, 'Tracheal', 59),
(22661, 'ETT', 59),
(22662, 'BBG', 60),
(22663, 'Little Sucker', 60),
(22664, 'Catheter', 60),
(22665, 'Yankeur', 60),
(22666, 'peripheral', 63),
(22667, 'central', 63),
(22668, 'WDL', 66),
(22669, 'reddened', 66),
(22670, 'infiltrated', 66),
(22671, 'painful', 66),
(22672, 'leaking', 66),
(22673, 'bleeding', 66),
(22674, 'continuous infusion', 67),
(22675, 'intermittent use', 67),
(22676, 'saline lock', 67),
(22677, 'hep lock', 67),
(22678, 'Tachycardic', 69),
(22679, 'Bradycardic', 69),
(22680, 'Paced', 69),
(22681, 'Absent', 69),
(22682, 'Irregular', 69),
(22683, 'Regular', 69),
(22684, 'No tele', 70),
(22685, 'NSR', 70),
(22686, 'Sinus bradycardia', 70),
(22687, 'Sinus Tachycardia', 70),
(22688, 'Atrial fibrillation', 70),
(22689, 'Atrial Flutter', 70),
(22690, 'Supraventricular tachycardia', 70),
(22691, 'Ventricular fibrillation', 70),
(22692, 'Ventricular tachycardia', 70),
(22693, 'PVC', 70),
(22694, 'Asystole', 70),
(22695, '1st Degree AV Block', 70),
(22696, '2nd Degree AV Block Type I', 70),
(22697, '2nd Degree AV Block Type II', 70),
(22698, '3rd Degree AV Block', 70),
(22699, 'WDL', 71),
(22700, 'Murmur', 71),
(22701, 'Friction rub', 71),
(22702, 'Gallop', 71),
(22703, 'Absent', 72),
(22704, 'Bounding', 72),
(22705, 'Doppler', 72),
(22706, 'Thready', 72),
(22707, 'Weak', 72),
(22708, 'Strong', 72),
(22709, 'Absent', 73),
(22710, 'Bounding', 73),
(22711, 'Doppler', 73),
(22712, 'Thready', 73),
(22713, 'Weak', 73),
(22714, 'Strong', 73),
(22715, 'Absent', 74),
(22716, 'Bounding', 74),
(22717, 'Doppler', 74),
(22718, 'Thready', 74),
(22719, 'Weak', 74),
(22720, 'Strong', 74),
(22721, 'Absent', 75),
(22722, 'Bounding', 75),
(22723, 'Doppler', 75),
(22724, 'Thready', 75),
(22725, 'Weak', 75),
(22726, 'Strong', 75),
(22727, 'Absent', 76),
(22728, 'Bounding', 76),
(22729, 'Doppler', 76),
(22730, 'Thready', 76),
(22731, 'Weak', 76),
(22732, 'Strong', 76),
(22733, 'Absent', 77),
(22734, 'Bounding', 77),
(22735, 'Doppler', 77),
(22736, 'Thready', 77),
(22737, 'Weak', 77),
(22738, 'Strong', 77),
(22739, 'Absent', 78),
(22740, 'Bounding', 78),
(22741, 'Doppler', 78),
(22742, 'Thready', 78),
(22743, 'Weak', 78),
(22744, 'Strong', 78),
(22745, 'Absent', 79),
(22746, 'Bounding', 79),
(22747, 'Doppler', 79),
(22748, 'Thready', 79),
(22749, 'Weak', 79),
(22750, 'Strong', 79),
(22751, 'Absent', 80),
(22752, 'Bounding', 80),
(22753, 'Doppler', 80),
(22754, 'Thready', 80),
(22755, 'Weak', 80),
(22756, 'Strong', 80),
(22757, 'No edema', 81),
(22758, 'Generalized edema', 81),
(22759, 'Non-pitting edema', 81),
(22760, 'Gallop', 81),
(22761, '+1 pitting', 81),
(22762, '+2 pitting', 81),
(22763, '+3 pitting', 81),
(22764, 'circumoral cyanosis', 83),
(22765, 'cyanotic', 83),
(22766, 'dusky', 83),
(22767, 'flushed', 83),
(22768, 'grey', 83),
(22769, 'mottled', 83),
(22770, 'pale', 83),
(22771, '<1 second', 84),
(22772, '1 sec', 84),
(22773, '2 sec', 84),
(22774, '3 sec', 84),
(22775, '4 sec', 84),
(22776, '>4 sec', 84),
(22777, 'warm', 85),
(22778, 'cool', 85),
(22779, 'cold', 85),
(22780, 'diaphoretic', 85),
(22781, 'clammy', 85),
(22782, 'hot', 85),
(22783, 'Soft', 87),
(22784, 'Firm', 87),
(22785, 'Hard', 87),
(22786, 'Distended', 87),
(22787, 'Tender', 87),
(22788, 'Guarded', 87),
(22789, 'active', 89),
(22790, 'Hyperactive', 89),
(22791, 'Hypoactive', 89),
(22792, 'Absent', 89),
(22793, 'NG', 91),
(22794, 'PEG', 91),
(22795, 'GT', 91),
(22796, 'JT', 91),
(22797, 'continuous feeds', 92),
(22798, 'bolus feeds', 92),
(22799, 'clamped', 92),
(22800, 'continuous suction', 92),
(22801, 'intermittent suction', 92),
(22802, 'Pink', 94),
(22803, 'Red', 94),
(22804, 'Gray', 94),
(22805, 'Necrotic', 94),
(22806, 'Moist', 94),
(22807, 'Dry', 94),
(22808, 'Bleeding', 94),
(22809, 'Other', 94),
(22810, 'colostomy', 95),
(22811, 'ileostomy', 95),
(22812, 'Nause', 97),
(22813, 'Vomiting', 97),
(22814, 'Diarrhea', 97),
(22815, 'Constipation', 97),
(22816, 'WDL', 99),
(22817, 'Incontinent', 99),
(22818, 'Anuric', 99),
(22819, 'Bed Pan', 100),
(22820, 'Urinal', 100),
(22821, 'Suprabubic Catheter', 100),
(22822, 'Bedside Commode', 100),
(22823, 'Condom Catheter', 100),
(22824, 'Brief/Diaper', 100),
(22825, 'Urostomy', 100),
(22826, 'Purewick ', 100),
(22827, 'Indwelling foley Catheter', 100),
(22828, 'Clear', 101),
(22829, 'Cloudy', 101),
(22830, 'Sediment', 101),
(22831, 'Hematuria', 101),
(22832, 'Dark', 101),
(22833, 'Foul Odor', 101),
(22834, 'Person', 105),
(22835, 'Place', 105),
(22836, 'Time', 105),
(22837, 'situation', 105),
(22838, 'Calm', 106),
(22839, 'Agitated', 106),
(22840, 'Confused', 106),
(22841, 'Fearful', 106),
(22842, 'Combative', 106),
(22843, 'Withdrawn', 106),
(22844, 'Alert', 106),
(22845, 'Lethargic', 106),
(22846, 'Cooperative', 106),
(22847, 'Drowsy', 106),
(22848, 'Anxious', 106),
(22849, 'Obtunded', 106),
(22850, 'Spontaneous (4)', 107),
(22851, 'To voice (3)', 107),
(22852, 'To Pain (2)', 107),
(22853, 'None (1)', 107),
(22854, 'Oriented (5)', 108),
(22855, 'Confused (4)', 108),
(22856, 'Inappropriate words (3)', 108),
(22857, 'Incomprehensible sounds (2)', 108),
(22858, 'None (1)', 108),
(22859, 'Obeys (6)', 109),
(22860, 'Localizes pain (5)', 109),
(22861, 'Withdraws (4)', 109),
(22862, 'Abnormal flexion (3)', 109),
(22863, 'Abnormal extension (2)', 109),
(22864, 'None (1)', 109),
(22865, 'Clear', 110),
(22866, 'Garbled', 110),
(22867, 'Slurred', 110),
(22868, 'Aphasic', 110),
(22869, 'Yes', 111),
(22870, 'NA', 111),
(22871, 'Brisk', 113),
(22872, 'Sluggish', 113),
(22873, 'Fixed', 113),
(22874, 'Brisk', 115),
(22875, 'Sluggish', 115),
(22876, 'Fixed', 115),
(22877, 'P', 116),
(22878, 'E', 116),
(22879, 'R', 116),
(22880, 'R', 116),
(22881, 'L', 116),
(22882, 'A', 116),
(22883, 'WDL', 122),
(22884, 'Abnormal (X)', 122),
(22885, 'WDL', 123),
(22886, 'Abnormal (X)', 123),
(22887, 'WDL', 124),
(22888, 'Abnormal (X)', 124),
(22889, 'WDL', 125),
(22890, 'Abnormal (X)', 125),
(22891, 'WDL', 126),
(22892, 'Abnormal (X)', 126),
(22893, 'Full', 128),
(22894, 'Partial', 128),
(22895, 'Full', 129),
(22896, 'Limited', 129),
(22897, 'Numbness', 129),
(22898, 'Tingling', 129),
(22899, 'Weakness', 129),
(22900, 'Paralysis', 129),
(22901, 'I', 140),
(22902, 'II', 140),
(22903, 'III', 140),
(22904, 'IV', 140);

-- --------------------------------------------------------

--
-- Table structure for table `Report_Set`
--

DROP TABLE IF EXISTS `Report_Set`;
CREATE TABLE `Report_Set` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `image_url` varchar(191) DEFAULT NULL,
  `report_type` varchar(191) NOT NULL,
  `image_alt` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Report_Set`
--

INSERT INTO `Report_Set` (`id`, `name`, `image_url`, `report_type`, `image_alt`) VALUES
(18, 'Initial Vitals', NULL, 'studentVitalsReport', NULL),
(28, 'Pain', '/FACES_English_Black.jpg', 'studentVitalsReport', 'pain scale from 0 to 10'),
(33, 'I/O Record', NULL, 'studentIOReport', NULL),
(36, 'Skin', NULL, 'studentAssessmentReport', NULL),
(50, 'Respiratory', NULL, 'studentAssessmentReport', NULL),
(62, 'IV Assessment', NULL, 'studentAssessmentReport', NULL),
(68, 'Cardiovascular', NULL, 'studentAssessmentReport', NULL),
(86, 'Gastrointestinal', NULL, 'studentAssessmentReport', NULL),
(98, 'Genitourinary', NULL, 'studentAssessmentReport', NULL),
(104, 'Neurological/Psychosocial', NULL, 'studentAssessmentReport', NULL),
(117, 'Measurements', NULL, 'studentVitalsReport', NULL),
(121, 'HEENT', NULL, 'studentAssessmentReport', NULL),
(127, 'Musculoskeletal', NULL, 'studentAssessmentReport', NULL),
(130, 'Wounds', NULL, 'studentAssessmentReport', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
CREATE TABLE `Session` (
  `id` varchar(191) NOT NULL,
  `sessionToken` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Social_History`
--

DROP TABLE IF EXISTS `Social_History`;
CREATE TABLE `Social_History` (
  `id` int(11) NOT NULL,
  `history` varchar(191) NOT NULL,
  `patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Student_Report`
--

DROP TABLE IF EXISTS `Student_Report`;
CREATE TABLE `Student_Report` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `set_name` varchar(191) NOT NULL,
  `field_name` varchar(191) NOT NULL,
  `time` varchar(191) NOT NULL,
  `value` varchar(191) NOT NULL,
  `date` varchar(191) NOT NULL,
  `report_type` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `role` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `VerificationToken`
--

DROP TABLE IF EXISTS `VerificationToken`;
CREATE TABLE `VerificationToken` (
  `identifier` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Account`
--
ALTER TABLE `Account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`,`providerAccountId`),
  ADD KEY `Account_userId_fkey` (`userId`);

--
-- Indexes for table `Allergy`
--
ALTER TABLE `Allergy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Allergy_patient_id_fkey` (`patient_id`);

--
-- Indexes for table `Course`
--
ALTER TABLE `Course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Course_Location_Information`
--
ALTER TABLE `Course_Location_Information`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Course_Location_Information_course_id_fkey` (`course_id`),
  ADD KEY `Course_Location_Information_location_id_fkey` (`location_id`);

--
-- Indexes for table `Custom_Order`
--
ALTER TABLE `Custom_Order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Custom_Order_patient_id_fkey` (`patient_id`);

--
-- Indexes for table `Flag`
--
ALTER TABLE `Flag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Flag_patient_id_fkey` (`patient_id`);

--
-- Indexes for table `Immunization`
--
ALTER TABLE `Immunization`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Immunization_patient_id_fkey` (`patient_id`);

--
-- Indexes for table `Location`
--
ALTER TABLE `Location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Mar_Record`
--
ALTER TABLE `Mar_Record`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Mar_Record_med_order_id_fkey` (`med_order_id`);

--
-- Indexes for table `Medical_History`
--
ALTER TABLE `Medical_History`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Medical_History_patient_id_fkey` (`patient_id`);

--
-- Indexes for table `Medication`
--
ALTER TABLE `Medication`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Medication_generic_name_key` (`generic_name`);

--
-- Indexes for table `Medication_Location_Information`
--
ALTER TABLE `Medication_Location_Information`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Medication_Location_Information_med_id_fkey` (`med_id`),
  ADD KEY `Medication_Location_Information_location_id_fkey` (`location_id`);

--
-- Indexes for table `Med_Order`
--
ALTER TABLE `Med_Order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Med_Order_patient_id_fkey` (`patient_id`),
  ADD KEY `Med_Order_med_id_fkey` (`med_id`);

--
-- Indexes for table `Note`
--
ALTER TABLE `Note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Note_patient_id_fkey` (`patient_id`);

--
-- Indexes for table `Patient`
--
ALTER TABLE `Patient`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Patient_course_id_fkey` (`course_id`),
  ADD KEY `Patient_studentUID_fkey` (`studentUID`);

--
-- Indexes for table `Report_Field`
--
ALTER TABLE `Report_Field`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Report_Field_report_set_id_fkey` (`report_set_id`);

--
-- Indexes for table `Report_Label`
--
ALTER TABLE `Report_Label`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Report_Label_report_field_id_fkey` (`report_field_id`);

--
-- Indexes for table `Report_Option`
--
ALTER TABLE `Report_Option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Report_Option_report_field_id_fkey` (`report_field_id`);

--
-- Indexes for table `Report_Set`
--
ALTER TABLE `Report_Set`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Session`
--
ALTER TABLE `Session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  ADD KEY `Session_userId_fkey` (`userId`);

--
-- Indexes for table `Social_History`
--
ALTER TABLE `Social_History`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Social_History_patient_id_fkey` (`patient_id`);

--
-- Indexes for table `Student_Report`
--
ALTER TABLE `Student_Report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Student_Report_patient_id_fkey` (`patient_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `VerificationToken`
--
ALTER TABLE `VerificationToken`
  ADD UNIQUE KEY `VerificationToken_token_key` (`token`),
  ADD UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`,`token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Allergy`
--
ALTER TABLE `Allergy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Course`
--
ALTER TABLE `Course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Course_Location_Information`
--
ALTER TABLE `Course_Location_Information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Custom_Order`
--
ALTER TABLE `Custom_Order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Flag`
--
ALTER TABLE `Flag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Immunization`
--
ALTER TABLE `Immunization`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Location`
--
ALTER TABLE `Location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Mar_Record`
--
ALTER TABLE `Mar_Record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Medical_History`
--
ALTER TABLE `Medical_History`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Medication`
--
ALTER TABLE `Medication`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Medication_Location_Information`
--
ALTER TABLE `Medication_Location_Information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Med_Order`
--
ALTER TABLE `Med_Order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Note`
--
ALTER TABLE `Note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Patient`
--
ALTER TABLE `Patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Report_Field`
--
ALTER TABLE `Report_Field`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT for table `Report_Label`
--
ALTER TABLE `Report_Label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1233;

--
-- AUTO_INCREMENT for table `Report_Option`
--
ALTER TABLE `Report_Option`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22905;

--
-- AUTO_INCREMENT for table `Report_Set`
--
ALTER TABLE `Report_Set`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `Social_History`
--
ALTER TABLE `Social_History`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Student_Report`
--
ALTER TABLE `Student_Report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Account`
--
ALTER TABLE `Account`
  ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Allergy`
--
ALTER TABLE `Allergy`
  ADD CONSTRAINT `Allergy_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Course_Location_Information`
--
ALTER TABLE `Course_Location_Information`
  ADD CONSTRAINT `Course_Location_Information_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Course_Location_Information_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Custom_Order`
--
ALTER TABLE `Custom_Order`
  ADD CONSTRAINT `Custom_Order_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Flag`
--
ALTER TABLE `Flag`
  ADD CONSTRAINT `Flag_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Immunization`
--
ALTER TABLE `Immunization`
  ADD CONSTRAINT `Immunization_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Mar_Record`
--
ALTER TABLE `Mar_Record`
  ADD CONSTRAINT `Mar_Record_med_order_id_fkey` FOREIGN KEY (`med_order_id`) REFERENCES `Med_Order` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Medical_History`
--
ALTER TABLE `Medical_History`
  ADD CONSTRAINT `Medical_History_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Medication_Location_Information`
--
ALTER TABLE `Medication_Location_Information`
  ADD CONSTRAINT `Medication_Location_Information_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Medication_Location_Information_med_id_fkey` FOREIGN KEY (`med_id`) REFERENCES `Medication` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Med_Order`
--
ALTER TABLE `Med_Order`
  ADD CONSTRAINT `Med_Order_med_id_fkey` FOREIGN KEY (`med_id`) REFERENCES `Medication` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Med_Order_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Note`
--
ALTER TABLE `Note`
  ADD CONSTRAINT `Note_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Patient`
--
ALTER TABLE `Patient`
  ADD CONSTRAINT `Patient_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Patient_studentUID_fkey` FOREIGN KEY (`studentUID`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Report_Field`
--
ALTER TABLE `Report_Field`
  ADD CONSTRAINT `Report_Field_report_set_id_fkey` FOREIGN KEY (`report_set_id`) REFERENCES `Report_Set` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Report_Label`
--
ALTER TABLE `Report_Label`
  ADD CONSTRAINT `Report_Label_report_field_id_fkey` FOREIGN KEY (`report_field_id`) REFERENCES `Report_Field` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Report_Option`
--
ALTER TABLE `Report_Option`
  ADD CONSTRAINT `Report_Option_report_field_id_fkey` FOREIGN KEY (`report_field_id`) REFERENCES `Report_Field` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Session`
--
ALTER TABLE `Session`
  ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Social_History`
--
ALTER TABLE `Social_History`
  ADD CONSTRAINT `Social_History_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Student_Report`
--
ALTER TABLE `Student_Report`
  ADD CONSTRAINT `Student_Report_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`id`) ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT ;
 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS ;
 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION ;




INSERT INTO `Medication` (`id`, `brand_name`, `generic_name`, `narcoti_count_needed`) VALUES
(1, '', 'glucose tablets', 0),
(2, 'Celestone', 'betamethasone', 0),
(3, 'Humulin R ', 'insulin regular', 0),
(4, 'D10 NS + 40 KCl', '10% dextrose in 0.9% sodium chloride with 40 mEq potassium chloride', 0),
(5, 'Ciprodex', 'Ciprofloxacin / Dexamethasone', 0),
(6, 'Lopressor', 'metoprolol', 0),
(7, '', '50% Dextrose', 0),
(8, 'Percocet', 'oxycodone / acetaminophen', 0),
(9, ' ', '5% dextrose in 0.9% sodium chloride', 0),
(10, '', 'prenatal multivitamin', 0),
(11, '', 'morphine sulfate ', 0),
(12, '', 'multivitamin', 0),
(13, 'Augmentin', 'amoxicillin / clavulanate potassium ', 0),
(14, 'Buspar', 'buspirone', 0),
(15, '', '5% dextrose in 0.45% sodium chloride with 20 mEq potassium chloride', 0),
(16, 'Lantus', 'insulin glargine', 0),
(17, 'Bicitra', 'sodium citrate / citric acid', 0),
(18, 'Nitrostat', 'nitroglycerin', 0),
(19, 'Normal Saline3', '0.9% sodium chlorid', 1),
(20, '1/2 NS', '0.45% sodium chloride ', 0),
(21, 'Ortho Tri-Cyclen', 'ethinyl estradiol and norgestimate', 0),
(22, 'Dermoplast', 'benzocaine / menthol topical spray', 0),
(23, 'Narcan', 'naloxone hydrochloride', 0),
(24, 'Zyprexa', 'olanzapine', 0),
(25, ' D5 1/2NS', '5% dextrose in 0.45% sodium chloride', 0),
(26, 'Motrin', 'ibuprofen', 0),
(27, 'Serevent Diskus', 'salmeterol', 0),
(28, '', '5% dextrose', 0),
(29, 'Pitocin', 'oxytocin', 0),
(30, 'Diastat ', 'diazepam', 0),
(31, 'Colace', 'docusate sodium', 0),
(32, '', '10% dextrose', 0),
(33, 'NPH', 'insulin isophane', 0),
(34, 'Reglan', 'metodopramide', 0),
(35, ' Cogentin', 'benztropine', 0),
(36, '', 'Nitr Derm', 0),
(37, 'Prozac', 'fluoxetine', 0),
(38, 'Humalog', 'insulin lispro', 0),
(39, 'Versed', 'midazolam', 0),
(40, 'Erythromycin', 'erythromycin base/sulfisoxazole', 0),
(41, '', 'sennosides-docusate sodium', 0),
(42, '', 'magnesium sulfate', 0),
(43, 'Rocephin', 'ceftriaxone', 0),
(44, 'Pepcid', 'famotidine', 0),
(45, '', 'albuterol sulfate', 0),
(46, 'Benadryl', 'diphenhydramine', 0),
(47, '', 'melatonin', 0),
(48, 'Lasix', 'furosemide', 0),
(49, 'Amoxil', 'amoxillin', 0),
(50, 'Lactated Ringers', 'LR', 0),
(51, 'Aspirin', 'acetylsalicylic acid', 0),
(52, 'Synthroid', 'levothyroxine', 0),
(53, 'Bicillin', 'penicillin G ', 0),
(54, 'Zofran', 'ondansetron', 0),
(55, 'Glucagen', 'glucagon', 0),
(56, 'NS + 40 KCl', '0.9% sodium chloride with 40 mEq potassium chloride', 0),
(57, 'Suboxone', 'buprenorphine', 0),
(58, 'Desyrel', 'trazodone', 0),
(59, 'K-Dur', 'potassium chloride', 0),
(60, 'Banana Bag', '100 mg Thiamine, 1 mg Folic Acid, Low Dose Multivitamin, 3 grams Magnesium Sulfate', 0),
(61, '', 'thiamine HCL', 0),
(62, '', 'sodium citrate', 0),
(63, 'Lovenox', 'enoxaparin sodium ', 0),
(64, 'Methergin', 'methylergonovine maleate', 0),
(65, 'Humulin R in Normal Saline ', 'insulin regular in 0.9% sodium chloride', 0),
(66, 'Coumadin', 'warfarin', 0),
(67, '', 'Calcium Gluconate', 0),
(68, 'Nubain', 'nalbuphine hydrochloride', 0),
(69, 'Cytotec', 'misoprostol ', 0),
(70, 'Ativan', 'lorazepam', 0),
(71, 'Tylenol', 'acetaminophen', 0),
(72, 'Ancef', 'cefazolin sodium ', 0);

INSERT INTO `Location` (`id`, `building`, `station`) VALUES
(1, "Demo Building", "Demo Station");

INSERT INTO `Course` (`id`, `name`) VALUES
(1, "Demo Course");

INSERT INTO `Course_Location_Information` (`id`, `course_id`, `location_id`) VALUES
(1, 1, 1);

INSERT INTO `Medication_Location_Information` (`id`, `med_id`, `location_id`, `drawer`, `slot`, `barcode`, `dose`, `type`) VALUES
(1, 1, 1, 'J6', 'Slot 6', '378871', '-', '-'),
(2, 2, 1, 'F6', 'Slot 4', '607677', '-', '-'),
(3, 3, 1, 'R3', 'Slot 9', '828165', '-', '-'),
(4, 4, 1, 'O9', 'Slot 6', '805781', '-', '-'),
(5, 5, 1, 'N4', 'Slot 4', '616899', '-', '-'),
(6, 6, 1, 'M6', 'Slot 5', '509855', '-', '-'),
(7, 7, 1, 'Z4', 'Slot 0', '952226', '-', '-'),
(8, 8, 1, 'Q8', 'Slot 2', '922708', '-', '-'),
(9, 9, 1, 'K7', 'Slot 5', '382142', '-', '-'),
(10, 10, 1, 'P2', 'Slot 0', '665609', '-', '-'),
(11, 11, 1, 'Z6', 'Slot 4', '451641', '-', '-'),
(12, 12, 1, 'A4', 'Slot 4', '821764', '-', '-'),
(13, 13, 1, 'F4', 'Slot 5', '430611', '-', '-'),
(14, 14, 1, 'W1', 'Slot 5', '735108', '-', '-'),
(15, 15, 1, 'Q5', 'Slot 4', '840741', '-', '-'),
(16, 16, 1, 'F3', 'Slot 8', '140515', '-', '-'),
(17, 17, 1, 'M5', 'Slot 6', '786868', '-', '-'),
(18, 18, 1, 'A2', 'Slot 7', '297253', '-', '-'),
(19, 19, 1, 'C2', 'Slot 9', '861928', '-', '-'),
(20, 20, 1, 'G3', 'Slot 3', '546262', '-', '-'),
(21, 21, 1, 'M5', 'Slot 2', '833235', '-', '-'),
(22, 22, 1, 'I9', 'Slot 9', '768677', '-', '-'),
(23, 23, 1, 'L4', 'Slot 3', '363328', '-', '-'),
(24, 24, 1, 'X5', 'Slot 3', '386261', '-', '-'),
(25, 25, 1, 'T1', 'Slot 1', '958201', '-', '-'),
(26, 26, 1, 'L1', 'Slot 3', '574210', '-', '-'),
(27, 27, 1, 'Y8', 'Slot 1', '311288', '-', '-'),
(28, 28, 1, 'S3', 'Slot 0', '758342', '-', '-'),
(29, 29, 1, 'A2', 'Slot 3', '534105', '-', '-'),
(30, 30, 1, 'F3', 'Slot 3', '410477', '-', '-'),
(31, 31, 1, 'D2', 'Slot 3', '162939', '-', '-'),
(32, 32, 1, 'E4', 'Slot 0', '708719', '-', '-'),
(33, 33, 1, 'K3', 'Slot 1', '632746', '-', '-'),
(34, 34, 1, 'Q2', 'Slot 0', '281089', '-', '-'),
(35, 35, 1, 'W7', 'Slot 5', '243520', '-', '-'),
(36, 36, 1, 'W9', 'Slot 1', '478254', '-', '-'),
(37, 37, 1, 'C9', 'Slot 0', '652654', '-', '-'),
(38, 38, 1, 'H8', 'Slot 2', '835357', '-', '-'),
(39, 39, 1, 'U2', 'Slot 0', '369682', '-', '-'),
(40, 40, 1, 'J8', 'Slot 5', '785150', '-', '-'),
(41, 41, 1, 'P1', 'Slot 6', '770868', '-', '-'),
(42, 42, 1, 'N1', 'Slot 0', '389867', '-', '-'),
(43, 43, 1, 'R3', 'Slot 5', '158403', '-', '-'),
(44, 44, 1, 'N6', 'Slot 5', '357357', '-', '-'),
(45, 45, 1, 'P7', 'Slot 7', '976024', '-', '-'),
(46, 46, 1, 'R2', 'Slot 2', '241881', '-', '-'),
(47, 47, 1, 'P1', 'Slot 9', '411848', '-', '-'),
(48, 48, 1, 'J4', 'Slot 1', '608870', '-', '-'),
(49, 49, 1, 'V9', 'Slot 9', '836997', '-', '-'),
(50, 50, 1, 'Y8', 'Slot 3', '612057', '-', '-'),
(51, 51, 1, 'H8', 'Slot 3', '579875', '-', '-'),
(52, 52, 1, 'N2', 'Slot 4', '503270', '-', '-'),
(53, 53, 1, 'D9', 'Slot 4', '243050', '-', '-'),
(54, 54, 1, 'Q8', 'Slot 1', '391412', '-', '-'),
(55, 55, 1, 'K4', 'Slot 7', '995381', '-', '-'),
(56, 56, 1, 'L6', 'Slot 7', '427650', '-', '-'),
(57, 57, 1, 'W5', 'Slot 2', '509719', '-', '-'),
(58, 58, 1, 'R9', 'Slot 4', '144061', '-', '-'),
(59, 59, 1, 'V9', 'Slot 3', '189587', '-', '-'),
(60, 60, 1, 'R0', 'Slot 8', '699357', '-', '-'),
(61, 61, 1, 'N8', 'Slot 9', '337243', '-', '-'),
(62, 62, 1, 'E1', 'Slot 8', '836615', '-', '-'),
(63, 63, 1, 'Y4', 'Slot 8', '865985', '-', '-'),
(64, 64, 1, 'G8', 'Slot 9', '424392', '-', '-'),
(65, 65, 1, 'G4', 'Slot 3', '173862', '-', '-'),
(66, 66, 1, 'X4', 'Slot 4', '242062', '-', '-'),
(67, 67, 1, 'D5', 'Slot 3', '942880', '-', '-'),
(68, 68, 1, 'L4', 'Slot 1', '792648', '-', '-'),
(69, 69, 1, 'H8', 'Slot 0', '787416', '-', '-'),
(70, 70, 1, 'K2', 'Slot 7', '315446', '-', '-'),
(71, 71, 1, 'Q6', 'Slot 0', '229270', '-', '-'),
(72, 72, 1, 'M9', 'Slot 3', '190313', '-', '-');

INSERT INTO `Patient` (`id`, `name`, `dob`, `age`, `gender`, `height`, `weight`, `studentUID`, `lab_doc_url`, `imaging_url`, `diagnosis`, `course_id`, `template`, `patient_bar_code`, `time_hour`, `time_minute`, `student_id`) VALUES
(2, 'John Smith', '1985-04-14', '39 Years old', 'male', '5\' 11\"', '180 lbs', NULL, '', '', '', 1, 1, '10', 12, 0, NULL),
(3, 'John Smith', '1985-04-14', '39 Years old', 'male', '5\' 11\"', '180 lbs', NULL, '', '', '', 1, 0, '10', 12, 0, 'wefwe4fwefwe');

INSERT INTO `Allergy` (`id`, `name`, `reaction`, `patient_id`) VALUES
(2, 'penicillin', 'rash', 2),
(3, 'pollen', 'rash', 2),
(4, 'penicillin', 'rash', 3),
(5, 'pollen', 'rash', 3);

INSERT INTO `Custom_Order` (`id`, `order_kind`, `order_type`, `time`, `order_text`, `patient_id`, `order_index`) VALUES
(1, 'custom', 'Admission', '', '<p>Admit to Medical-Surgical Unit</p>', 2, 0),
(2, 'custom', 'Admission', '', '<p>Continuous oximetry</p>', 2, 1),
(3, 'custom', 'Admission', '', '<p>Vital signs every 2 hours</p>', 2, 2),
(4, 'custom', 'Admission', '', '<p>Strict Intake/Output (I/O)</p>', 2, 3),
(5, 'custom', 'Admission', '', '<p>Heart Healthy, Moderate Carb Diet</p><p><br></p>', 2, 4),
(6, 'custom', 'Admission', '', '<p>Admit to Medical-Surgical Unit</p>', 3, 0),
(7, 'custom', 'Admission', '', '<p>Continuous oximetry</p>', 3, 1),
(8, 'custom', 'Admission', '', '<p>Vital signs every 2 hours</p>', 3, 2),
(9, 'custom', 'Admission', '', '<p>Strict Intake/Output (I/O)</p>', 3, 3),
(10, 'custom', 'Admission', '', '<p>Heart Healthy, Moderate Carb Diet</p><p><br></p>', 3, 4);


INSERT INTO `Medical_History` (`id`, `date`, `title`, `notes`, `patient_id`) VALUES
(1, '2019-01-20', 'Mild hypertension', 'well-managed with lifestyle changes (diet and exercise)', 2),
(2, '2019-01-20', 'Mild hypertension', 'well-managed with lifestyle changes (diet and exercise)', 3);


INSERT INTO `Med_Order` (`id`, `patient_id`, `med_id`, `concentration`, `route`, `frequency`, `routine`, `prn_note`, `notes`, `order_kind`, `order_type`, `completed`, `hold_reason`, `time`, `order_index`) VALUES
(1, 2, 12, '20 mg', 'PO', 'once', 'Scheduled', '', '', 'med', 'Admission', 0, NULL, '', 0),
(2, 3, 12, '20 mg', 'PO', 'once', 'Scheduled', '', '', 'med', 'Admission', 0, NULL, '', 0);


INSERT INTO `Mar_Record` (`id`, `med_order_id`, `dose`, `hour`, `minute`) VALUES
(1, 1, '20 mg', 8, 0),
(2, 2, '20 mg', 8, 0);

INSERT INTO `Social_History` (`id`, `history`, `patient_id`) VALUES
(1, 'Office worker', 2),
(2, 'Non-smoker', 2),
(3, 'occasional exercise (jogs 2-3 times a week)', 2),
(4, ' no alcohol consumption', 2),
(5, 'Office worker', 3),
(6, 'Non-smoker', 3),
(7, 'occasional exercise (jogs 2-3 times a week)', 3),
(8, ' no alcohol consumption', 3);

INSERT INTO `Student_Report` (`id`, `patient_id`, `set_name`, `field_name`, `time`, `value`, `date`, `report_type`) VALUES
(13, 2, 'Initial Vitals', 'ewdewwqdwq', 'Today', '12', '', 'studentVitalsReport'),
(14, 2, 'Initial Vitals', 'ewdewwqdwq', 'Yesterday', '12', '', 'studentVitalsReport'),
(15, 2, 'Initial Vitals', 'BP - Sitting', 'Today', '122', '', 'studentVitalsReport'),
(16, 2, 'Initial Vitals', 'BP - Sitting', 'Yesterday', 'dwqddqw', '', 'studentVitalsReport'),
(17, 3, 'Initial Vitals', 'ewdewwqdwq', 'Today', '12', '', 'studentVitalsReport'),
(18, 3, 'Initial Vitals', 'ewdewwqdwq', 'Yesterday', '12', '', 'studentVitalsReport'),
(19, 3, 'Initial Vitals', 'BP - Sitting', 'Today', '122', '', 'studentVitalsReport'),
(20, 3, 'Initial Vitals', 'BP - Sitting', 'Yesterday', 'dwqddqw', '', 'studentVitalsReport');

COMMIT;

END$$

DELIMITER ;

DELIMITER $$
--
-- Events
--
-- DROP EVENT IF EXISTS `ResetDB`$$
-- CREATE DEFINER=`root`@`%` EVENT `ResetDB` ON SCHEDULE EVERY 1 DAY STARTS '2024-07-06 00:00:00' ON COMPLETION PRESERVE ENABLE DO CALL `ResetDB`()$$

DELIMITER ;
COMMIT;

CALL `ResetDB`();


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
