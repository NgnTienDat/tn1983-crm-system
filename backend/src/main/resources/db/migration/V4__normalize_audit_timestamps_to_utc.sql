-- Existing LocalDateTime values were written in the application timezone.
-- Interpret those values as Asia/Ho_Chi_Minh before storing them as UTC instants.

ALTER TABLE users
    ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE
        USING created_at AT TIME ZONE 'Asia/Ho_Chi_Minh',
    ALTER COLUMN updated_at TYPE TIMESTAMP WITH TIME ZONE
        USING updated_at AT TIME ZONE 'Asia/Ho_Chi_Minh';

ALTER TABLE customers
    ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE
        USING created_at AT TIME ZONE 'Asia/Ho_Chi_Minh',
    ALTER COLUMN updated_at TYPE TIMESTAMP WITH TIME ZONE
        USING updated_at AT TIME ZONE 'Asia/Ho_Chi_Minh';

ALTER TABLE products
    ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE
        USING created_at AT TIME ZONE 'Asia/Ho_Chi_Minh',
    ALTER COLUMN updated_at TYPE TIMESTAMP WITH TIME ZONE
        USING updated_at AT TIME ZONE 'Asia/Ho_Chi_Minh';

ALTER TABLE blacklisted_tokens
    ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE
        USING created_at AT TIME ZONE 'Asia/Ho_Chi_Minh',
    ALTER COLUMN updated_at TYPE TIMESTAMP WITH TIME ZONE
        USING updated_at AT TIME ZONE 'Asia/Ho_Chi_Minh';

ALTER TABLE refresh_tokens
    ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE
        USING created_at AT TIME ZONE 'Asia/Ho_Chi_Minh',
    ALTER COLUMN updated_at TYPE TIMESTAMP WITH TIME ZONE
        USING updated_at AT TIME ZONE 'Asia/Ho_Chi_Minh';

ALTER TABLE orders
    ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE
        USING created_at AT TIME ZONE 'Asia/Ho_Chi_Minh',
    ALTER COLUMN updated_at TYPE TIMESTAMP WITH TIME ZONE
        USING updated_at AT TIME ZONE 'Asia/Ho_Chi_Minh';

ALTER TABLE order_items
    ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE
        USING created_at AT TIME ZONE 'Asia/Ho_Chi_Minh',
    ALTER COLUMN updated_at TYPE TIMESTAMP WITH TIME ZONE
        USING updated_at AT TIME ZONE 'Asia/Ho_Chi_Minh';

ALTER TABLE order_status_histories
    ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE
        USING created_at AT TIME ZONE 'Asia/Ho_Chi_Minh',
    ALTER COLUMN updated_at TYPE TIMESTAMP WITH TIME ZONE
        USING updated_at AT TIME ZONE 'Asia/Ho_Chi_Minh',
    ALTER COLUMN changed_at TYPE TIMESTAMP WITH TIME ZONE
        USING changed_at AT TIME ZONE 'Asia/Ho_Chi_Minh';
