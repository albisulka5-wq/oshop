-- Create a new database called 'DatabaseName'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT name
        FROM sys.databases
        WHERE name = N'DatabaseName'
)
CREATE DATABASE DBalbi
GO

-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('SchemaName.TableName', 'U') IS NOT NULL
DROP TABLE SchemaName.TableName
GO
-- Create the table in the specified schema
CREATE TABLE SchemaName_TableName
(
    Id INT NOT NULL PRIMARY KEY, -- primary key column
    Emer [NVARCHAR](50) NOT NULL,
    Mbiember [NVARCHAR](50) NOT NULL
    -- specify more columns here
);
-- Insert rows into table 'TableName'
INSERT INTO SchemaName_TableName
( -- columns to insert data into
 [Id], [Emri], [Mbiember]
)
VALUES
( -- first row: values for the columns in the list above
 1, Albion, Sulka
),
( -- second row: values for the columns in the list above
 2, Fatir, Fradai
),
(  
    3, Ben, Bob
),
-- add more rows here
GO
GO
SELECT * FROM SchemaName_TableName; 

SELECT Emer as Emri from SchemaName_TableName;
alter table SchemaName_TableName rename COLUMN  Emer to Emri;
exec sp_rename 'SchemaName_TableName.Emer','Emri','column';
exec sp_rename 'SchemaName_TableName', 'personel_tabel'; 
SELECT * from personel_tabel;
