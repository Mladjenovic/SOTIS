INSERT INTO [dbo].[Users] ([Id], [Username], [Password], [Name], [Surname], [Role]) VALUES (N'560d2149-196c-426f-bca3-1abdd331bc6b', N'admin', N'admin', N'admin', N'adminic', 0)
INSERT INTO [dbo].[Users] ([Id], [Username], [Password], [Name], [Surname], [Role]) VALUES (N'560d2149-196c-426f-bca3-1abdd331bc61', N'admin1', N'admin1', N'admin1', N'adminic1', 0)
INSERT INTO [dbo].[Users] ([Id], [Username], [Password], [Name], [Surname], [Role]) VALUES (N'551f56b1-9e01-477f-985c-06fd57c8bc01', N'profa', N'profa', N'profa', N'profic', 1)
INSERT INTO [dbo].[Users] ([Id], [Username], [Password], [Name], [Surname], [Role]) VALUES (N'551f56b1-9e01-477f-985c-06fd57c8bc03', N'profa1', N'profa1', N'profa1', N'profic1', 1)
INSERT INTO [dbo].[Users] ([Id], [Username], [Password], [Name], [Surname], [Role]) VALUES (N'8e9f9077-0745-4adc-aa9a-ed8a995fd73b', N'stud', N'stud', N'student', N'studentic', 2)
INSERT INTO [dbo].[Users] ([Id], [Username], [Password], [Name], [Surname], [Role]) VALUES (N'8e9f9077-0745-4adc-aa9a-ed8a995fd73r', N'stud1', N'stud1', N'student1', N'studentic1', 2)
INSERT INTO [dbo].[Users] ([Id], [Username], [Password], [Name], [Surname], [Role]) VALUES (N'8e9f9077-0745-4adc-aa9a-ed8a995fd73e', N'stud2', N'stud2', N'student2', N'studentic2', 2)

INSERT INTO [dbo].[Subjects] ([Id], [Title], [Description], [MinimumPoints], [ProfessorId]) VALUES (N'6ac52c71-86fe-4c39-beb9-b7408804f2f3', N'subject', N'subject desc', 51, N'551f56b1-9e01-477f-985c-06fd57c8bc01')

INSERT INTO [dbo].[SubjectParticipant] ([Id], [SubjectId], [UserId]) VALUES (N'063c19ee-936f-4788-8234-efaedfe7cc83', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3', N'8e9f9077-0745-4adc-aa9a-ed8a995fd73b')
INSERT INTO [dbo].[SubjectParticipant] ([Id], [SubjectId], [UserId]) VALUES (N'd63a5c80-754b-4e8b-b1a9-cb7733e72f47', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3', N'8e9f9077-0745-4adc-aa9a-ed8a995fd73e')

INSERT INTO [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'1787d9df-a159-4730-9a9e-2fa7876cf126', N'P1', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')
INSERT INTO [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'1787d9df-a159-4730-9a9e-2fa7876cf127', N'P2', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')
INSERT INTO [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'1787d9df-a159-4730-9a9e-2fa7876cf128', N'P3', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')
INSERT INTO [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'1787d9df-a159-4730-9a9e-2fa7876cf129', N'P4', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')
INSERT INTO [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'1787d9df-a159-4730-9a9e-2fa7876cf130', N'P5', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')
INSERT INTO [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'1787d9df-a159-4730-9a9e-2fa7876cf131', N'P6', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')

INSERT INTO [dbo].[Tests] ([Id], [Title], [Description], [MinimumPoints], [SubjectId]) VALUES (N'3d5ef0cd-f28d-4e0c-b5ac-0ffc2cf46563', N'test2', N'test desc', 20, N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')

INSERT INTO [dbo].[Sections] ([Id], [Name], [TestId]) VALUES (N'37877d91-c83f-49d3-a7fc-37d33c31d42c', N'section', N'3d5ef0cd-f28d-4e0c-b5ac-0ffc2cf46563')

INSERT INTO [dbo].[Questions] ([Id], [Text], [PointsPerQuestion], [SectionId], [ProblemId]) VALUES (N'65439f68-dfd9-4420-95ad-5cbd56117a81', N'question', 2, N'37877d91-c83f-49d3-a7fc-37d33c31d42c', N'1787d9df-a159-4730-9a9e-2fa7876cf126')

INSERT INTO [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'8e20fae2-eba5-4784-b394-750f2bd19599', N'answer', 1, N'65439f68-dfd9-4420-95ad-5cbd56117a81')
INSERT INTO [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'b230fc1e-0c2c-4f9a-8de3-4577c1225f57', N'answer1', 0, N'65439f68-dfd9-4420-95ad-5cbd56117a81')

INSERT INTO [dbo].[KnowledgeSpaces] ([Id], [Name], [KnowledgeSpaceType], [SubjectId]) VALUES (N'52b0305d-72ce-4486-a0d7-948afc583c9b', null, 0, N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')
INSERT INTO [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'2101ec13-35c2-4d79-af08-3ca935fc2812', 240, 576, N'1787d9df-a159-4730-9a9e-2fa7876cf130', N'52b0305d-72ce-4486-a0d7-948afc583c9b')
INSERT INTO [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'6d4452e4-d070-4a82-8980-e69b92b6039a', 528, 288, N'1787d9df-a159-4730-9a9e-2fa7876cf129', N'52b0305d-72ce-4486-a0d7-948afc583c9b')
INSERT INTO [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'71c4d606-9514-41b4-bb52-2bebb71ccb4e', 224, 96, N'1787d9df-a159-4730-9a9e-2fa7876cf126', N'52b0305d-72ce-4486-a0d7-948afc583c9b')
INSERT INTO [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'b7d78172-6809-4482-84ad-f2346ce08cc2', 400, 416, N'1787d9df-a159-4730-9a9e-2fa7876cf131', N'52b0305d-72ce-4486-a0d7-948afc583c9b')
INSERT INTO [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'f35251e8-7865-4350-a238-d36340830918', 480, 96, N'1787d9df-a159-4730-9a9e-2fa7876cf127', N'52b0305d-72ce-4486-a0d7-948afc583c9b')
INSERT INTO [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'f5db02b6-80a8-42c0-87e1-33350c8646d3', 240, 272, N'1787d9df-a159-4730-9a9e-2fa7876cf128', N'52b0305d-72ce-4486-a0d7-948afc583c9b')
INSERT INTO [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'a21081bf-29b8-4733-95cf-2fe00d8637f4', N'52b0305d-72ce-4486-a0d7-948afc583c9b', N'1787d9df-a159-4730-9a9e-2fa7876cf128', N'1787d9df-a159-4730-9a9e-2fa7876cf131')
INSERT INTO [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'b72c25a5-7a80-4f6f-b2f1-7160b62a7c97', N'52b0305d-72ce-4486-a0d7-948afc583c9b', N'1787d9df-a159-4730-9a9e-2fa7876cf126', N'1787d9df-a159-4730-9a9e-2fa7876cf128')
INSERT INTO [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'dd4244bf-7678-4159-8e90-a65b0de9e5a0', N'52b0305d-72ce-4486-a0d7-948afc583c9b', N'1787d9df-a159-4730-9a9e-2fa7876cf128', N'1787d9df-a159-4730-9a9e-2fa7876cf130')
INSERT INTO [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'e0a88318-be1b-48d4-abd7-83e2a4b6f4c1', N'52b0305d-72ce-4486-a0d7-948afc583c9b', N'1787d9df-a159-4730-9a9e-2fa7876cf131', N'1787d9df-a159-4730-9a9e-2fa7876cf130')
INSERT INTO [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'edf3bdbf-03b5-456f-ae7b-20d2aa02394e', N'52b0305d-72ce-4486-a0d7-948afc583c9b', N'1787d9df-a159-4730-9a9e-2fa7876cf127', N'1787d9df-a159-4730-9a9e-2fa7876cf129')
INSERT INTO [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'f8cdcdbf-4afa-48a5-9e0f-e89332d421ce', N'52b0305d-72ce-4486-a0d7-948afc583c9b', N'1787d9df-a159-4730-9a9e-2fa7876cf127', N'1787d9df-a159-4730-9a9e-2fa7876cf128')

