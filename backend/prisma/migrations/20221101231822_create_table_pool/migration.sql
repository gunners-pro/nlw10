BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Pool] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [code] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Pool_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Pool_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Pool_code_key] UNIQUE NONCLUSTERED ([code])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
