-- Insert admin user with email 'admin' and a hashed password for 'admin'
-- Password 'admin' hashed using bcrypt: $2b$10$C8Y6Z9.f3mubGZ8l8tNp.Oe.T.1VaW6F5//F88/6p2.W5v6yL9Nl6
INSERT INTO users (email, password_hash, name) 
SELECT 'admin', '$2b$10$C8Y6Z9.f3mubGZ8l8tNp.Oe.T.1VaW6F5//F88/6p2.W5v6yL9Nl6', 'Admin'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin');