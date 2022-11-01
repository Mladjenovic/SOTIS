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

INSERT INTO [dbo].[Tests] ([Id], [Title], [Description], [MinimumPoints], [SubjectId]) VALUES (N'3d5ef0cd-f28d-4e0c-b5ac-0ffc2cf46563', N'test2', N'test desc', 20, N'6ac52c71-86fe-4c39-beb9-b7408804f2f3')

INSERT INTO [dbo].[Sections] ([Id], [Name], [TestId]) VALUES (N'37877d91-c83f-49d3-a7fc-37d33c31d42c', N'section', N'3d5ef0cd-f28d-4e0c-b5ac-0ffc2cf46563')

INSERT INTO [dbo].[Questions] ([Id], [Text], [PointsPerQuestion], [SectionId]) VALUES (N'65439f68-dfd9-4420-95ad-5cbd56117a81', N'question', 2, N'37877d91-c83f-49d3-a7fc-37d33c31d42c')

INSERT INTO [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'8e20fae2-eba5-4784-b394-750f2bd19599', N'answer', 1, N'65439f68-dfd9-4420-95ad-5cbd56117a81')
INSERT INTO [dbo].[ProfessorAnswers] ([Id], [Text], [IsCorrect], [QuestionId]) VALUES (N'b230fc1e-0c2c-4f9a-8de3-4577c1225f57', N'answer1', 0, N'65439f68-dfd9-4420-95ad-5cbd56117a81')

