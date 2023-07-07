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

CREATE TABLE user_reputation_per_month (
    year INT,
    month INT,
    user_id TEXT,
    reputation INT,
    reputation_details MAP<TEXT, INT>,
    PRIMARY KEY ((year, month), user_id)
);

CREATE TABLE user_reputation_all_time (
    user_id TEXT,
    reputation INT,
    reputation_details MAP<TEXT, INT>,
    PRIMARY KEY (user_id)
);
