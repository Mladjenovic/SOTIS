﻿USE [SotisDb]
GO
INSERT [dbo].[Users] ([Id], [Username], [Password], [Name], [Surname], [Role]) VALUES (N'551f56b1-9e01-477f-985c-06fd57c8bc01', N'profa', N'profa', N'profa', N'profic', 1)
INSERT [dbo].[Users] ([Id], [Username], [Password], [Name], [Surname], [Role]) VALUES (N'551f56b1-9e01-477f-985c-06fd57c8bc03', N'profa1', N'profa1', N'profa1', N'profic1', 1)
INSERT [dbo].[Users] ([Id], [Username], [Password], [Name], [Surname], [Role]) VALUES (N'560d2149-196c-426f-bca3-1abdd331bc61', N'admin1', N'admin1', N'admin1', N'adminic1', 0)
INSERT [dbo].[Users] ([Id], [Username], [Password], [Name], [Surname], [Role]) VALUES (N'560d2149-196c-426f-bca3-1abdd331bc6b', N'admin', N'admin', N'admin', N'adminic', 0)
INSERT [dbo].[Users] ([Id], [Username], [Password], [Name], [Surname], [Role]) VALUES (N'8e9f9077-0745-4adc-aa9a-ed8a995fd73b', N'stud', N'stud', N'student', N'studentic', 2)
INSERT [dbo].[Users] ([Id], [Username], [Password], [Name], [Surname], [Role]) VALUES (N'8e9f9077-0745-4adc-aa9a-ed8a995fd73e', N'stud2', N'stud2', N'student2', N'studentic2', 2)
INSERT [dbo].[Users] ([Id], [Username], [Password], [Name], [Surname], [Role]) VALUES (N'8e9f9077-0745-4adc-aa9a-ed8a995fd73r', N'stud1', N'stud1', N'student1', N'studentic1', 2)
GO
INSERT [dbo].[Subjects] ([Id], [Title], [Description], [MinimumPoints], [ProfessorId]) VALUES (N'6ac52c71-86fe-4c39-beb9-b7408804f2f3', N'subject', N'subject desc', 51, N'551f56b1-9e01-477f-985c-06fd57c8bc01')
INSERT [dbo].[Subjects] ([Id], [Title], [Description], [MinimumPoints], [ProfessorId]) VALUES (N'8c39ca7d-472e-4b8a-820d-bfcab1006fff', N'SOTIS', N'Course where students will learn about knowledge spaces', 51, N'551f56b1-9e01-477f-985c-06fd57c8bc01')
GO
INSERT [dbo].[SubjectParticipant] ([Id], [SubjectId], [UserId]) VALUES (N'063c19ee-936f-4788-8234-efaedfe7cc83', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3', N'8e9f9077-0745-4adc-aa9a-ed8a995fd73b')
INSERT [dbo].[SubjectParticipant] ([Id], [SubjectId], [UserId]) VALUES (N'1e14c9f8-1fc5-4ea9-abfb-77e5bb0512a2', N'8c39ca7d-472e-4b8a-820d-bfcab1006fff', N'8e9f9077-0745-4adc-aa9a-ed8a995fd73b')
INSERT [dbo].[SubjectParticipant] ([Id], [SubjectId], [UserId]) VALUES (N'ce8ede35-5ae6-4133-bd51-651e6d548a8e', N'8c39ca7d-472e-4b8a-820d-bfcab1006fff', N'8e9f9077-0745-4adc-aa9a-ed8a995fd73r')
INSERT [dbo].[SubjectParticipant] ([Id], [SubjectId], [UserId]) VALUES (N'd63a5c80-754b-4e8b-b1a9-cb7733e72f47', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3', N'8e9f9077-0745-4adc-aa9a-ed8a995fd73e')
INSERT [dbo].[SubjectParticipant] ([Id], [SubjectId], [UserId]) VALUES (N'e773aec8-5067-4b06-a888-c5f01eda4226', N'8c39ca7d-472e-4b8a-820d-bfcab1006fff', N'8e9f9077-0745-4adc-aa9a-ed8a995fd73e')
GO
INSERT [dbo].[Tests] ([Id], [Title], [Description], [MinimumPoints], [SubjectId]) VALUES (N'3d5ef0cd-f28d-4e0c-b5ac-0ffc2cf46563', N'test2', N'test desc', 20, N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')
INSERT [dbo].[Tests] ([Id], [Title], [Description], [MinimumPoints], [SubjectId]) VALUES (N'589c8a4e-0e47-47f6-bf3d-c25906a12f1b', N'Knowledge Spaces Theory', N'test theoretical knowledge of knowledge spaces', 100, N'8c39ca7d-472e-4b8a-820d-bfcab1006fff')
GO
INSERT [dbo].[TestResults] ([Id], [TestId], [StudentId], [DateTime], [Points]) VALUES (N'28ddf70e-215b-44f9-84bb-1b9809d358e0', N'589c8a4e-0e47-47f6-bf3d-c25906a12f1b', N'8e9f9077-0745-4adc-aa9a-ed8a995fd73b', CAST(N'2022-12-01T20:07:35.9998015' AS DateTime2), 90)
GO
INSERT [dbo].[KnowledgeSpaces] ([Id], [Name], [KnowledgeSpaceType], [SubjectId]) VALUES (N'52b0305d-72ce-4486-a0d7-948afc583c9b', NULL, 0, N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')
INSERT [dbo].[KnowledgeSpaces] ([Id], [Name], [KnowledgeSpaceType], [SubjectId]) VALUES (N'fe658025-2e20-450e-85a3-416807e3a95f', NULL, 0, N'8c39ca7d-472e-4b8a-820d-bfcab1006fff')
GO
INSERT [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'01a2820c-41a5-48e2-a762-89f492182fc3', N'Knowledge Space', N'8c39ca7d-472e-4b8a-820d-bfcab1006fff')
INSERT [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'0cbb808b-1f6e-4d6e-9fc1-c3143cf47d47', N'Probability', N'8c39ca7d-472e-4b8a-820d-bfcab1006fff')
INSERT [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'1787d9df-a159-4730-9a9e-2fa7876cf126', N'P1', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')
INSERT [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'1787d9df-a159-4730-9a9e-2fa7876cf127', N'P2', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')
INSERT [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'1787d9df-a159-4730-9a9e-2fa7876cf128', N'P3', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')
INSERT [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'1787d9df-a159-4730-9a9e-2fa7876cf129', N'P4', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')
INSERT [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'1787d9df-a159-4730-9a9e-2fa7876cf130', N'P5', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')
INSERT [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'1787d9df-a159-4730-9a9e-2fa7876cf131', N'P6', N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')
INSERT [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'2e2ba9ef-6929-4205-8d34-be214963ae14', N'Knowledge State', N'8c39ca7d-472e-4b8a-820d-bfcab1006fff')
INSERT [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'79aed794-9973-437f-afb9-30bb3d46aa9e', N'Surmise', N'8c39ca7d-472e-4b8a-820d-bfcab1006fff')
INSERT [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'91185226-42fa-4408-94e8-fb4403605972', N'Guided Testing', N'8c39ca7d-472e-4b8a-820d-bfcab1006fff')
INSERT [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'a2700c39-02ec-4281-a60a-4e516cf29e8b', N'Problem', N'8c39ca7d-472e-4b8a-820d-bfcab1006fff')
INSERT [dbo].[Problems] ([Id], [Name], [SubjectId]) VALUES (N'bd06f57e-fff6-4787-b5f4-3e6744119504', N'Markov Chains', N'8c39ca7d-472e-4b8a-820d-bfcab1006fff')
GO
INSERT [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'2101ec13-35c2-4d79-af08-3ca935fc2812', 240, 576, N'1787d9df-a159-4730-9a9e-2fa7876cf130', N'52b0305d-72ce-4486-a0d7-948afc583c9b')
INSERT [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'29d5d0a2-9530-449b-8c57-7e93a6fea08b', 208, 288, N'01a2820c-41a5-48e2-a762-89f492182fc3', N'fe658025-2e20-450e-85a3-416807e3a95f')
INSERT [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'2cc7f98f-99f0-427e-aeae-a565796b2b3d', 368, 32, N'a2700c39-02ec-4281-a60a-4e516cf29e8b', N'fe658025-2e20-450e-85a3-416807e3a95f')
INSERT [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'6d4452e4-d070-4a82-8980-e69b92b6039a', 528, 288, N'1787d9df-a159-4730-9a9e-2fa7876cf129', N'52b0305d-72ce-4486-a0d7-948afc583c9b')
INSERT [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'71c4d606-9514-41b4-bb52-2bebb71ccb4e', 224, 96, N'1787d9df-a159-4730-9a9e-2fa7876cf126', N'52b0305d-72ce-4486-a0d7-948afc583c9b')
INSERT [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'7c4122d1-f1a5-42f1-ae64-2a2bf60575f0', 640, 64, N'0cbb808b-1f6e-4d6e-9fc1-c3143cf47d47', N'fe658025-2e20-450e-85a3-416807e3a95f')
INSERT [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'8440719a-61ae-4f98-9f93-a4c6c21e95e5', 320, 464, N'2e2ba9ef-6929-4205-8d34-be214963ae14', N'fe658025-2e20-450e-85a3-416807e3a95f')
INSERT [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'ad8abc59-51d9-4f8f-b5e8-fd6161c3ec9d', 608, 192, N'bd06f57e-fff6-4787-b5f4-3e6744119504', N'fe658025-2e20-450e-85a3-416807e3a95f')
INSERT [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'b7d78172-6809-4482-84ad-f2346ce08cc2', 400, 416, N'1787d9df-a159-4730-9a9e-2fa7876cf131', N'52b0305d-72ce-4486-a0d7-948afc583c9b')
INSERT [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'c34dc525-c2d1-48c7-b5ab-49f6efb882eb', 464, 304, N'91185226-42fa-4408-94e8-fb4403605972', N'fe658025-2e20-450e-85a3-416807e3a95f')
INSERT [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'ee36e531-3327-47ed-aa73-72ba61f37098', 224, 160, N'79aed794-9973-437f-afb9-30bb3d46aa9e', N'fe658025-2e20-450e-85a3-416807e3a95f')
INSERT [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'f35251e8-7865-4350-a238-d36340830918', 480, 96, N'1787d9df-a159-4730-9a9e-2fa7876cf127', N'52b0305d-72ce-4486-a0d7-948afc583c9b')
INSERT [dbo].[NodeDetails] ([Id], [CoordinateX], [CoordinateY], [ProblemId], [KnowledgeSpaceId]) VALUES (N'f5db02b6-80a8-42c0-87e1-33350c8646d3', 240, 272, N'1787d9df-a159-4730-9a9e-2fa7876cf128', N'52b0305d-72ce-4486-a0d7-948afc583c9b')
GO
INSERT [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'00c78d75-8a3b-41c0-8751-c6e6059de065', N'fe658025-2e20-450e-85a3-416807e3a95f', N'91185226-42fa-4408-94e8-fb4403605972', N'2e2ba9ef-6929-4205-8d34-be214963ae14')
INSERT [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'5e5bdf8f-4437-459f-a90e-b9e1d3b0d24c', N'fe658025-2e20-450e-85a3-416807e3a95f', N'a2700c39-02ec-4281-a60a-4e516cf29e8b', N'91185226-42fa-4408-94e8-fb4403605972')
INSERT [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'85cf29e8-eb60-4815-a97f-08a47ba88f22', N'fe658025-2e20-450e-85a3-416807e3a95f', N'01a2820c-41a5-48e2-a762-89f492182fc3', N'2e2ba9ef-6929-4205-8d34-be214963ae14')
INSERT [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'9ce3544a-54b3-41aa-a150-5d6d3c020e64', N'fe658025-2e20-450e-85a3-416807e3a95f', N'0cbb808b-1f6e-4d6e-9fc1-c3143cf47d47', N'bd06f57e-fff6-4787-b5f4-3e6744119504')
INSERT [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'9f3e8c70-8297-4d46-87b7-84bc1870057d', N'fe658025-2e20-450e-85a3-416807e3a95f', N'79aed794-9973-437f-afb9-30bb3d46aa9e', N'01a2820c-41a5-48e2-a762-89f492182fc3')
INSERT [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'a21081bf-29b8-4733-95cf-2fe00d8637f4', N'52b0305d-72ce-4486-a0d7-948afc583c9b', N'1787d9df-a159-4730-9a9e-2fa7876cf128', N'1787d9df-a159-4730-9a9e-2fa7876cf131')
INSERT [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'a6ee0717-a8fe-4a00-be56-4f436bde3b7e', N'fe658025-2e20-450e-85a3-416807e3a95f', N'bd06f57e-fff6-4787-b5f4-3e6744119504', N'91185226-42fa-4408-94e8-fb4403605972')
INSERT [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'b72c25a5-7a80-4f6f-b2f1-7160b62a7c97', N'52b0305d-72ce-4486-a0d7-948afc583c9b', N'1787d9df-a159-4730-9a9e-2fa7876cf126', N'1787d9df-a159-4730-9a9e-2fa7876cf128')
INSERT [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'd1874a88-c353-4a4e-a027-2cee5704034b', N'fe658025-2e20-450e-85a3-416807e3a95f', N'a2700c39-02ec-4281-a60a-4e516cf29e8b', N'79aed794-9973-437f-afb9-30bb3d46aa9e')
INSERT [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'dd4244bf-7678-4159-8e90-a65b0de9e5a0', N'52b0305d-72ce-4486-a0d7-948afc583c9b', N'1787d9df-a159-4730-9a9e-2fa7876cf128', N'1787d9df-a159-4730-9a9e-2fa7876cf130')
INSERT [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'e0a88318-be1b-48d4-abd7-83e2a4b6f4c1', N'52b0305d-72ce-4486-a0d7-948afc583c9b', N'1787d9df-a159-4730-9a9e-2fa7876cf131', N'1787d9df-a159-4730-9a9e-2fa7876cf130')
INSERT [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'edf3bdbf-03b5-456f-ae7b-20d2aa02394e', N'52b0305d-72ce-4486-a0d7-948afc583c9b', N'1787d9df-a159-4730-9a9e-2fa7876cf127', N'1787d9df-a159-4730-9a9e-2fa7876cf129')
INSERT [dbo].[Surmises] ([Id], [KnowledgeSpaceId], [SourceProblemId], [DestinationProblemId]) VALUES (N'f8cdcdbf-4afa-48a5-9e0f-e89332d421ce', N'52b0305d-72ce-4486-a0d7-948afc583c9b', N'1787d9df-a159-4730-9a9e-2fa7876cf127', N'1787d9df-a159-4730-9a9e-2fa7876cf128')
GO
INSERT [dbo].[Sections] ([Id], [Name], [TestId]) VALUES (N'37877d91-c83f-49d3-a7fc-37d33c31d42c', N'section', N'3d5ef0cd-f28d-4e0c-b5ac-0ffc2cf46563')
INSERT [dbo].[Sections] ([Id], [Name], [TestId]) VALUES (N'6ccbeaa9-9dcf-4531-b14c-2f1463eb5619', N'Guided testing', N'589c8a4e-0e47-47f6-bf3d-c25906a12f1b')
INSERT [dbo].[Sections] ([Id], [Name], [TestId]) VALUES (N'b16e72ef-0c5b-436e-ac18-7650ab37d560', N'Knowledge state', N'589c8a4e-0e47-47f6-bf3d-c25906a12f1b')
INSERT [dbo].[Sections] ([Id], [Name], [TestId]) VALUES (N'fe1c6172-86a0-4857-bf2d-be5af34b4b84', N'Knowledge Space', N'589c8a4e-0e47-47f6-bf3d-c25906a12f1b')
GO
INSERT [dbo].[Questions] ([Id], [Text], [PointsPerQuestion], [SectionId], [ProblemId]) VALUES (N'0267a143-7e0e-4e10-ae61-5e7a62fc569a', N'Knowledge state is:', 10, N'b16e72ef-0c5b-436e-ac18-7650ab37d560', N'2e2ba9ef-6929-4205-8d34-be214963ae14')
INSERT [dbo].[Questions] ([Id], [Text], [PointsPerQuestion], [SectionId], [ProblemId]) VALUES (N'65439f68-dfd9-4420-95ad-5cbd56117a81', N'question', 2, N'37877d91-c83f-49d3-a7fc-37d33c31d42c', N'1787d9df-a159-4730-9a9e-2fa7876cf126')
INSERT [dbo].[Questions] ([Id], [Text], [PointsPerQuestion], [SectionId], [ProblemId]) VALUES (N'8a9fe3ae-1e62-463d-8f90-04fe2c543df5', N'Does answer on current question influence next question in guided testing?', 20, N'6ccbeaa9-9dcf-4531-b14c-2f1463eb5619', N'91185226-42fa-4408-94e8-fb4403605972')
INSERT [dbo].[Questions] ([Id], [Text], [PointsPerQuestion], [SectionId], [ProblemId]) VALUES (N'afc3c686-7c7b-404e-a364-bf6ad7058f57', N'What is Surmise?', 10, N'fe1c6172-86a0-4857-bf2d-be5af34b4b84', N'79aed794-9973-437f-afb9-30bb3d46aa9e')
INSERT [dbo].[Questions] ([Id], [Text], [PointsPerQuestion], [SectionId], [ProblemId]) VALUES (N'd1ceae36-c4fe-46e6-8bc7-0ab1a24bba57', N'Next state in markov chain is dependent on:', 20, N'6ccbeaa9-9dcf-4531-b14c-2f1463eb5619', N'bd06f57e-fff6-4787-b5f4-3e6744119504')
INSERT [dbo].[Questions] ([Id], [Text], [PointsPerQuestion], [SectionId], [ProblemId]) VALUES (N'dd767a14-52f6-4a63-ae27-12e6924a7868', N'Can Knowledge space be equal to single Problem', 10, N'fe1c6172-86a0-4857-bf2d-be5af34b4b84', N'01a2820c-41a5-48e2-a762-89f492182fc3')
INSERT [dbo].[Questions] ([Id], [Text], [PointsPerQuestion], [SectionId], [ProblemId]) VALUES (N'eb344119-82ab-4225-889e-5e41fdfa7f4d', N'How is probability measured?', 20, N'6ccbeaa9-9dcf-4531-b14c-2f1463eb5619', N'0cbb808b-1f6e-4d6e-9fc1-c3143cf47d47')
INSERT [dbo].[Questions] ([Id], [Text], [PointsPerQuestion], [SectionId], [ProblemId]) VALUES (N'fa624e84-89a1-4918-a3e2-7e27a5028605', N'What is the concept of Problem in the context of Knowledge Space?', 10, N'fe1c6172-86a0-4857-bf2d-be5af34b4b84', N'a2700c39-02ec-4281-a60a-4e516cf29e8b')
GO
INSERT [dbo].[CorrectlyAnsweredQuestions] ([Id], [QuestionId], [TestResultId]) VALUES (N'0e71d217-7cbf-4b5a-912d-b6e4acf39058', N'afc3c686-7c7b-404e-a364-bf6ad7058f57', N'28ddf70e-215b-44f9-84bb-1b9809d358e0')
INSERT [dbo].[CorrectlyAnsweredQuestions] ([Id], [QuestionId], [TestResultId]) VALUES (N'4224cab9-fdc9-4137-b7fe-d5158879fac4', N'0267a143-7e0e-4e10-ae61-5e7a62fc569a', N'28ddf70e-215b-44f9-84bb-1b9809d358e0')
INSERT [dbo].[CorrectlyAnsweredQuestions] ([Id], [QuestionId], [TestResultId]) VALUES (N'7d34fc58-67f1-4a29-9bbc-9727d6aacfab', N'8a9fe3ae-1e62-463d-8f90-04fe2c543df5', N'28ddf70e-215b-44f9-84bb-1b9809d358e0')
INSERT [dbo].[CorrectlyAnsweredQuestions] ([Id], [QuestionId], [TestResultId]) VALUES (N'8482e898-b771-482e-8892-650f5b8ae024', N'd1ceae36-c4fe-46e6-8bc7-0ab1a24bba57', N'28ddf70e-215b-44f9-84bb-1b9809d358e0')
INSERT [dbo].[CorrectlyAnsweredQuestions] ([Id], [QuestionId], [TestResultId]) VALUES (N'bbbb27e9-8f33-45d8-858f-d0000448ca2c', N'eb344119-82ab-4225-889e-5e41fdfa7f4d', N'28ddf70e-215b-44f9-84bb-1b9809d358e0')
INSERT [dbo].[CorrectlyAnsweredQuestions] ([Id], [QuestionId], [TestResultId]) VALUES (N'f3200ab7-1113-4500-9742-c130e744a510', N'fa624e84-89a1-4918-a3e2-7e27a5028605', N'28ddf70e-215b-44f9-84bb-1b9809d358e0')
GO
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'02e3894b-d26f-4c94-b653-19da09e77762', N'Problem is equal to Subject', 0, N'fa624e84-89a1-4918-a3e2-7e27a5028605')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'0de020b9-3705-4354-88eb-a2268a732891', N'Problem is equal to Domain', 1, N'fa624e84-89a1-4918-a3e2-7e27a5028605')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'3e692481-e368-43bf-83e4-d6780b63a8d8', N'no', 0, N'8a9fe3ae-1e62-463d-8f90-04fe2c543df5')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'402088d5-9a41-473d-baf7-e16e41cdf0ff', N'Surmise is same as Problem', 0, N'afc3c686-7c7b-404e-a364-bf6ad7058f57')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'40a0fb11-d4bc-4781-86fd-0fe2211ac3a4', N'all previous states', 0, N'd1ceae36-c4fe-46e6-8bc7-0ab1a24bba57')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'4b880902-3e20-48a4-ba54-e9c26adb3467', N'yes', 1, N'8a9fe3ae-1e62-463d-8f90-04fe2c543df5')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'566890db-28cf-4fa9-9fc5-9f798ef1f2d7', N'Surmise is assumption that one Problem is dependent on another Problem', 1, N'afc3c686-7c7b-404e-a364-bf6ad7058f57')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'625624ed-ae1b-4407-ac28-c4a97d4c1438', N'previous state only', 1, N'd1ceae36-c4fe-46e6-8bc7-0ab1a24bba57')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'68f611a5-43ff-4e56-a3f0-437984328816', N'not related to knowledge space', 0, N'0267a143-7e0e-4e10-ae61-5e7a62fc569a')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'8e20fae2-eba5-4784-b394-750f2bd19599', N'answer', 1, N'65439f68-dfd9-4420-95ad-5cbd56117a81')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'b230fc1e-0c2c-4f9a-8de3-4577c1225f57', N'answer1', 0, N'65439f68-dfd9-4420-95ad-5cbd56117a81')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'bfa8395c-f216-46ac-98d2-f2852dc92c5e', N'Yes', 1, N'dd767a14-52f6-4a63-ae27-12e6924a7868')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'c1815aba-783a-4aa8-b11d-340528b73ca9', N'With cm', 0, N'eb344119-82ab-4225-889e-5e41fdfa7f4d')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'd45367e6-7f9d-475e-8e44-3a56b02aa557', N'No', 0, N'dd767a14-52f6-4a63-ae27-12e6924a7868')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'fc1eb74d-9f4a-441c-8810-165dabdd97c2', N'With %', 1, N'eb344119-82ab-4225-889e-5e41fdfa7f4d')
INSERT [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'fe218990-7bb4-40b9-b49c-3a6d03c38405', N'Subgraph of knowledge space', 1, N'0267a143-7e0e-4e10-ae61-5e7a62fc569a')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20221115193908_Initial', N'5.0.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20221119100211_KnowledgeSpaceCascadeDelete', N'5.0.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20221120200513_AddProblemToQuestion', N'5.0.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20221201174558_AddCorrectlyAnsweredQuestionsTable', N'5.0.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20221201195656_UpdateForeignKeyConstraint', N'5.0.17')
GO
