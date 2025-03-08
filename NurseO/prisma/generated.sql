-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    `refresh_token_expires_in` INTEGER NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider` ASC, `providerAccountId` ASC),
    INDEX `Account_userId_fkey`(`userId` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Allergy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `reaction` VARCHAR(191) NOT NULL,
    `patient_id` INTEGER NOT NULL,

    INDEX `Allergy_patient_id_fkey`(`patient_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course_Location_Information` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `location_id` INTEGER NOT NULL,

    INDEX `Course_Location_Information_course_id_fkey`(`course_id` ASC),
    INDEX `Course_Location_Information_location_id_fkey`(`location_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Custom_Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_kind` VARCHAR(191) NOT NULL,
    `order_type` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NULL,
    `order_text` TEXT NOT NULL,
    `patient_id` INTEGER NOT NULL,
    `order_index` INTEGER NOT NULL DEFAULT -1,

    INDEX `Custom_Order_patient_id_fkey`(`patient_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Flag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `patient_id` INTEGER NOT NULL,

    INDEX `Flag_patient_id_fkey`(`patient_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Immunization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `immunization` VARCHAR(191) NOT NULL,
    `patient_id` INTEGER NOT NULL,

    INDEX `Immunization_patient_id_fkey`(`patient_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `building` VARCHAR(191) NOT NULL,
    `station` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mar_Record` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `med_order_id` INTEGER NOT NULL,
    `dose` VARCHAR(191) NULL,
    `hour` INTEGER NOT NULL,
    `minute` INTEGER NOT NULL,

    INDEX `Mar_Record_med_order_id_fkey`(`med_order_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Med_Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `med_id` INTEGER NOT NULL,
    `concentration` VARCHAR(191) NOT NULL,
    `route` VARCHAR(191) NOT NULL,
    `frequency` VARCHAR(191) NOT NULL,
    `routine` VARCHAR(191) NOT NULL,
    `prn_note` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NOT NULL,
    `order_kind` VARCHAR(191) NOT NULL,
    `order_type` VARCHAR(191) NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `hold_reason` VARCHAR(191) NULL,
    `time` VARCHAR(191) NULL,
    `order_index` INTEGER NOT NULL DEFAULT -1,

    INDEX `Med_Order_med_id_fkey`(`med_id` ASC),
    INDEX `Med_Order_patient_id_fkey`(`patient_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medical_History` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NOT NULL,
    `patient_id` INTEGER NOT NULL,

    INDEX `Medical_History_patient_id_fkey`(`patient_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand_name` VARCHAR(191) NOT NULL,
    `generic_name` VARCHAR(191) NOT NULL,
    `narcoti_count_needed` BOOLEAN NOT NULL,

    UNIQUE INDEX `Medication_generic_name_key`(`generic_name` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medication_Location_Information` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `med_id` INTEGER NOT NULL,
    `location_id` INTEGER NOT NULL,
    `drawer` VARCHAR(191) NOT NULL,
    `slot` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NOT NULL,
    `dose` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    INDEX `Medication_Location_Information_location_id_fkey`(`location_id` ASC),
    INDEX `Medication_Location_Information_med_id_fkey`(`med_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NOT NULL,
    `patient_id` INTEGER NOT NULL,

    INDEX `Note_patient_id_fkey`(`patient_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `dob` VARCHAR(191) NOT NULL,
    `age` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `height` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NOT NULL,
    `studentUID` VARCHAR(191) NULL,
    `lab_doc_url` VARCHAR(191) NULL,
    `imaging_url` VARCHAR(191) NULL,
    `diagnosis` VARCHAR(191) NULL,
    `course_id` INTEGER NOT NULL,
    `template` BOOLEAN NOT NULL,
    `patient_bar_code` VARCHAR(191) NOT NULL,
    `time_hour` INTEGER NOT NULL,
    `time_minute` INTEGER NOT NULL,
    `student_id` VARCHAR(191) NULL,
    `chief_complaint` VARCHAR(191) NULL,

    INDEX `Patient_course_id_fkey`(`course_id` ASC),
    INDEX `Patient_studentUID_fkey`(`studentUID` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report_Field` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `field_type` VARCHAR(191) NOT NULL,
    `add_second_field` BOOLEAN NOT NULL DEFAULT false,
    `report_set_id` INTEGER NOT NULL,

    INDEX `Report_Field_report_set_id_fkey`(`report_set_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report_Label` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `report_field_id` INTEGER NOT NULL,

    INDEX `Report_Label_report_field_id_fkey`(`report_field_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report_Option` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `report_field_id` INTEGER NOT NULL,

    INDEX `Report_Option_report_field_id_fkey`(`report_field_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report_Set` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NULL,
    `report_type` VARCHAR(191) NOT NULL,
    `image_alt` VARCHAR(191) NULL,

    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken` ASC),
    INDEX `Session_userId_fkey`(`userId` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Social_History` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `history` VARCHAR(191) NOT NULL,
    `patient_id` INTEGER NOT NULL,

    INDEX `Social_History_patient_id_fkey`(`patient_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student_Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `set_name` VARCHAR(191) NOT NULL,
    `field_name` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `report_type` VARCHAR(191) NOT NULL,

    INDEX `Student_Report_patient_id_fkey`(`patient_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `role` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier` ASC, `token` ASC),
    UNIQUE INDEX `VerificationToken_token_key`(`token` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Allergy` ADD CONSTRAINT `Allergy_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course_Location_Information` ADD CONSTRAINT `Course_Location_Information_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course_Location_Information` ADD CONSTRAINT `Course_Location_Information_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Custom_Order` ADD CONSTRAINT `Custom_Order_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Flag` ADD CONSTRAINT `Flag_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Immunization` ADD CONSTRAINT `Immunization_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mar_Record` ADD CONSTRAINT `Mar_Record_med_order_id_fkey` FOREIGN KEY (`med_order_id`) REFERENCES `Med_Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Med_Order` ADD CONSTRAINT `Med_Order_med_id_fkey` FOREIGN KEY (`med_id`) REFERENCES `Medication`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Med_Order` ADD CONSTRAINT `Med_Order_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medical_History` ADD CONSTRAINT `Medical_History_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medication_Location_Information` ADD CONSTRAINT `Medication_Location_Information_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medication_Location_Information` ADD CONSTRAINT `Medication_Location_Information_med_id_fkey` FOREIGN KEY (`med_id`) REFERENCES `Medication`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_studentUID_fkey` FOREIGN KEY (`studentUID`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report_Field` ADD CONSTRAINT `Report_Field_report_set_id_fkey` FOREIGN KEY (`report_set_id`) REFERENCES `Report_Set`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report_Label` ADD CONSTRAINT `Report_Label_report_field_id_fkey` FOREIGN KEY (`report_field_id`) REFERENCES `Report_Field`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report_Option` ADD CONSTRAINT `Report_Option_report_field_id_fkey` FOREIGN KEY (`report_field_id`) REFERENCES `Report_Field`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Social_History` ADD CONSTRAINT `Social_History_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student_Report` ADD CONSTRAINT `Student_Report_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

