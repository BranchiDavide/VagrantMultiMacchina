-- Data for testing the web app
INSERT INTO Users (username, password, createdAt, updatedAt) VALUES 
('john_doe', '$2b$10$cKxHwGu5QmCYqM8KlNs8r.11Y1br1MpPjT8VvQwUk8Qdh3OMxNeG.', NOW(), NOW()),  -- password123
('jane_doe', '$2b$10$HVaL3A1HnlzIv6pWbmgeHuvF6dxfkjOjtU0w3Dk8NdzwXIa9DziJG', NOW(), NOW()),  -- password456
('sam_smith', '$2b$10$OoabWLZ0OYoIUOl8rqTq/OZt.ziqdzSA3qX9KsnEb/FvLIGGboSQC', NOW(), NOW());  -- password789

INSERT INTO Posts (title, content, categoryId, authorId, createdAt, updatedAt) VALUES 
('The Rise of AI in Technology', 'Artificial Intelligence is transforming the tech industry...', 1, 1, NOW(), NOW()),
('10 Ways to Improve Your Life', 'Here are 10 simple ways to improve your lifestyle...', 5, 2, NOW(), NOW()),
('Financial Tips for 2024', 'Managing your finances effectively is crucial in 2024...', 3, 3, NOW(), NOW());

INSERT INTO Comments (content, postId, authorId, createdAt, updatedAt) VALUES 
('Great insights! AI is truly the future.', 1, 2, NOW(), NOW()),
('Thanks for the tips! I feel more motivated.', 2, 3, NOW(), NOW()),
('This is really helpful. Starting my business soon!', 3, 1, NOW(), NOW());