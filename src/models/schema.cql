CREATE TABLE transactions (
    account_id TEXT,
    created_at TIMESTAMP,
    amount DECIMAL,
    description INT,
    kind BOOLEAN,
    PRIMARY KEY (account_id, created_at)
) WITH CLUSTERING ORDER BY (created_at ASC);

CREATE TABLE advertisements (
    created_at TIMEUUID,
    account_id TEXT,
    picture TEXT,
    link TEXT,
    expires TIMESTAMP,
    PRIMARY KEY (created_at)
);

CREATE TABLE messages (
    chat_id TEXT,
    message_id TIMEUUID,
    ipfs_content_id TEXT,
    PRIMARY KEY (chat_id, message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);

CREATE TABLE user_reputation_per_month (
    year INT,
    month INT,
    user_id TEXT,
    total_rp COUNTER,
    e5p COUNTER,
    p10f COUNTER,
    ptg COUNTER,
    ac COUNTER,
    PRIMARY KEY ((year, month), user_id)
);

CREATE TABLE user_reputation_all_time (
    user_id TEXT,
    total_rp COUNTER,
    e5p COUNTER,
    p10f COUNTER,
    ptg COUNTER,
    ac COUNTER,
    PRIMARY KEY (user_id)
);
