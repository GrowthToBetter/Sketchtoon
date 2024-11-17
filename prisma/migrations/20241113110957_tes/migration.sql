-- CreateTable
CREATE TABLE `User` (
    `user_id` CHAR(36) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `photo_profile` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `clasess` ENUM('X', 'XI', 'XII') NULL,
    `title` ENUM('TATA_BUSANA', 'TATA_BOGA', 'PERHOTELAN', 'KECANTIKAN', 'GURU_NORMADA') NULL,
    `detail` INTEGER NULL,
    `absent` VARCHAR(191) NULL,
    `Phone` VARCHAR(191) NULL,
    `role` ENUM('GURU', 'ADMIN', 'SUPERADMIN', 'VALIDATOR', 'DELETE') NOT NULL DEFAULT 'GURU',
    `status` ENUM('NOTGRADUATE', 'GRADUATE') NOT NULL DEFAULT 'NOTGRADUATE',
    `gender` ENUM('Male', 'Female') NULL DEFAULT 'Male',
    `Sugestion` VARCHAR(191) NULL,
    `ClassNumber` VARCHAR(191) NULL,
    `SchoolOrigin` VARCHAR(191) NULL,
    `validatorId` VARCHAR(191) NULL,
    `generation` VARCHAR(191) NULL,
    `cover` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fileWork` (
    `file_id` CHAR(36) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `mimetype` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `userClasses` ENUM('X', 'XI', 'XII') NOT NULL,
    `status` ENUM('PENDING', 'VERIFIED', 'DENIED') NOT NULL DEFAULT 'PENDING',
    `userId` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `coverFile` VARCHAR(191) NULL,
    `permisionId` VARCHAR(191) NULL,
    `genre` VARCHAR(191) NOT NULL,
    `Like` INTEGER NOT NULL DEFAULT 0,
    `views` INTEGER NOT NULL DEFAULT 0,
    `userRole` ENUM('GURU', 'ADMIN', 'SUPERADMIN', 'VALIDATOR', 'DELETE') NOT NULL DEFAULT 'GURU',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SchoolOrigin` (
    `school_id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`school_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `comment_id` CHAR(36) NOT NULL,
    `Text` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `genre_id` CHAR(36) NOT NULL,
    `Genre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`genre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAuth` (
    `userauth_id` CHAR(36) NOT NULL,
    `password` VARCHAR(191) NULL,
    `last_login` DATETIME(3) NULL,
    `userEmail` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserAuth_userEmail_key`(`userEmail`),
    PRIMARY KEY (`userauth_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_task_validator` (
    `A` CHAR(36) NOT NULL,
    `B` CHAR(36) NOT NULL,

    UNIQUE INDEX `_task_validator_AB_unique`(`A`, `B`),
    INDEX `_task_validator_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_comment_file` (
    `A` CHAR(36) NOT NULL,
    `B` CHAR(36) NOT NULL,

    UNIQUE INDEX `_comment_file_AB_unique`(`A`, `B`),
    INDEX `_comment_file_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_validatorId_fkey` FOREIGN KEY (`validatorId`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fileWork` ADD CONSTRAINT `fileWork_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAuth` ADD CONSTRAINT `UserAuth_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_task_validator` ADD CONSTRAINT `_task_validator_A_fkey` FOREIGN KEY (`A`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_task_validator` ADD CONSTRAINT `_task_validator_B_fkey` FOREIGN KEY (`B`) REFERENCES `fileWork`(`file_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_comment_file` ADD CONSTRAINT `_comment_file_A_fkey` FOREIGN KEY (`A`) REFERENCES `comment`(`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_comment_file` ADD CONSTRAINT `_comment_file_B_fkey` FOREIGN KEY (`B`) REFERENCES `fileWork`(`file_id`) ON DELETE CASCADE ON UPDATE CASCADE;
