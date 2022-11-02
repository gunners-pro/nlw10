BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Pool] ADD [ownerId] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[Participant] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [poolId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Participant_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Participant_userId_poolId_key] UNIQUE NONCLUSTERED ([userId],[poolId])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [avatarUrl] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Game] (
    [id] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL,
    [firstTeamCountryCode] NVARCHAR(1000) NOT NULL,
    [secondTeamCountryCode] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Game_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Guess] (
    [id] NVARCHAR(1000) NOT NULL,
    [firstTeamPoints] INT NOT NULL,
    [secondTeamPoints] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Guess_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [gameId] NVARCHAR(1000) NOT NULL,
    [participantId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Guess_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Pool] ADD CONSTRAINT [Pool_ownerId_fkey] FOREIGN KEY ([ownerId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Participant] ADD CONSTRAINT [Participant_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Participant] ADD CONSTRAINT [Participant_poolId_fkey] FOREIGN KEY ([poolId]) REFERENCES [dbo].[Pool]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Guess] ADD CONSTRAINT [Guess_participantId_fkey] FOREIGN KEY ([participantId]) REFERENCES [dbo].[Participant]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Guess] ADD CONSTRAINT [Guess_gameId_fkey] FOREIGN KEY ([gameId]) REFERENCES [dbo].[Game]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
