CREATE TABLE transactions (
    account_id TEXT,
    created_at TIMESTAMP,
    amount DECIMAL,
    description INT,
    kind BOOLEAN,
    PRIMARY KEY (account_id, created_at)
) WITH CLUSTERING ORDER BY (created_at ASC);