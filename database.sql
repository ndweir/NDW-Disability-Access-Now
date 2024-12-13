-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR(1000) NOT NULL,
    "role" INTEGER DEFAULT 1,
    "approved" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "questions" (
    "id" SERIAL PRIMARY KEY,                
    "question" VARCHAR(1000),                     
    "answer" VARCHAR(1000),                        
    "answered" BOOLEAN DEFAULT FALSE,       
    "unread" BOOLEAN DEFAULT TRUE,          
    "associated_article_url" VARCHAR(255),  
    "question_date" DATE,                   
    "flagged" BOOLEAN DEFAULT FALSE,    
    "user_id" INTEGER REFERENCES "user"(id) ON DELETE CASCADE 
);

CREATE TABLE "articles" (
    "id" SERIAL PRIMARY KEY,              
    "title" VARCHAR(255) NOT NULL,          
    "body" TEXT                            
);

CREATE TABLE "files" (
    "id" SERIAL PRIMARY KEY,               
    "filename" VARCHAR(255) NOT NULL,        
    "data" BYTEA                            
);

CREATE TABLE "savedFile" (
    "id" SERIAL PRIMARY KEY,               
    "file_id" INT REFERENCES "files" (id) ON DELETE CASCADE NOT NULL,      
    "user_id" INTEGER REFERENCES "user" (id) ON DELETE CASCADE
);

CREATE TABLE "savedArticle" (
    "id" SERIAL PRIMARY KEY,               
    "article_id" INT REFERENCES "articles" (id) ON DELETE CASCADE NOT NULL, 
    "user_id" INTEGER REFERENCES "user" (id) ON DELETE CASCADE
);

CREATE TABLE "articles_files" (
    "id" SERIAL PRIMARY KEY,
    "article_id" INTEGER REFERENCES "articles"("id") ON DELETE CASCADE,
    "file_id" INTEGER REFERENCES "files"("id") ON DELETE CASCADE
    );

CREATE TABLE "aboutUs" (
    "id" SERIAL PRIMARY KEY,               
    "title" VARCHAR(255),        -- title of the About Us page
    "founderText" TEXT,          -- content about the founder
    "devText" TEXT               -- content about the dev team
);

CREATE TABLE "bios" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100),         -- name of the person
	"bio" VARCHAR (500),          -- bio for the person (optional)
	"link" VARCHAR(100),          -- url link (like their linkedIn)
	"type" INTEGER                -- 1 = Rozalyn, 2 = Prime students
);

CREATE TABLE "pending" (
    "id" SERIAL PRIMARY KEY,               
    "body" VARCHAR(500),            -- content of the Pending Approval page
    "email" VARCHAR(200) NOT NULL   -- contact email for Pending Approval page
);

CREATE TABLE "home" (
    "id" SERIAL PRIMARY KEY,   
    "title" VARCHAR(200),        -- title of the Home page            
    "body" VARCHAR(1000),        -- content of the Home page
    "linkHeader" VARCHAR(200)    -- header for the quick links section
);

