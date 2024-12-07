CREATE TABLE
    users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname VARCHAR(250),
        username VARCHAR(250),
        email VARCHAR(250),
        password VARCHAR(250)
    )
SELECT
    *
FROM
    users;

-- INSERT INTO
--     users (id, fullname, username, email, password)
-- VALUES
--     (
--         1,
--         'Ashok David',
--         'ashok',
--         'ashok@gmail.com',
--         '123456'
--     );
-- Removing table
-- DROP TABLE users;
-- Retrieve data from table
-- SELECT * FROM users;
-- delete specific row
-- DELETE from users WHERE email = "";
-- Posts
CREATE TABLE
    post (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        caption TEXT,
        image_url TEXT,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
SELECT
    *
FROM
    post;

SELECT
    name
FROM
    sqlite_master;

PRAGMA TABLE_INFO (post);

DROP TABLE post;

-- ------------------------ FOLLOWERS ---------------------------------------
CREATE TABLE
    follow (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        follower_id INTEGER NOT NULL,
        following_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (follower_id) REFERENCES user (id) ON DELETE CASCADE,
        FOREIGN KEY (following_id) REFERENCES user (id) ON DELETE CASCADE UNIQUE (follower_id, following_id)
    )
DROP TABLE follow;

SELECT
    *
FROM
    follow;

SELECT
    T.id,
    T.created_at,
    T.image_url,
    T.caption
FROM
    (
        post
        JOIN follow ON post.user_id = follow.following_id
    ) AS T
WHERE
    T.follower_id = 3;

SELECT
    *
FROM
    (
        post
        JOIN follow ON post.user_id = follow.following_id
    ) AS T
    JOIN users ON T.user_id = users.id
WHERE
    follow.follower_id = 1;

SELECT
    *
FROM
    follow;

---------------------- COMMENTS ---------------------------------------
CREATE TABLE
    comment (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        post_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE
    );

CREATE TABLE
    comment (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        post_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT (DATETIME ('now', 'localtime')),
        updated_at DATETIME DEFAULT (DATETIME ('now', 'localtime')),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE
    );

SELECT
    *
FROM
    sqlite_master
WHERE
    type = 'table';

-- DROP TABLE comment;
SELECT
    *
FROM
    comment;

SELECT
    *
FROM
    comment
    JOIN users ON comment.user_id = users.id;

CREATE TABLE
    likes (
        id INTEGER NOT NULL PRIMARY KEY,
        user_id INTEGER,
        post_id INTEGER,
        created_at DATETIME DEFAULT (DATETIME ('now', 'localtime')),
        UNIQUE (post_id, user_id),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE
    )

INSERT INTO
    likes (user_id, post_id)
VALUES (2, 3);
SELECT COUNT(*) AS likes_count FROM likes WHERE user_id = 2;
SELECT * FROM likes;
