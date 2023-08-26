export const PROGRAM_TABLE = {
    TABLE_NAME : "programs",
    ID : "lp_id",
    NAME : "lp_name",
    CURRENCY : "currency",
    DESCRIPTION : "description",
    ID_FORMAT : "id_format",
    PROCESSING_TIME : "processing_time",
    ENROLLMENT_LINK : "enroll_link",
    TERMS_N_CONDS_LINK : "tac_link",
    VALUE : "value",
    UNSENT_TRANSACTIONS : "unsent_transactions",
} as const

export const TRANSACTIONS_TABLE = {
    TABLE_NAME : "transactions",
    ID : "transac_id",
    SOURCE_LOYALTY_PROGRAM_ID : "source_lp_id",
    TARGET_LOYALTY_PROGRAM_ID : "target_lp_id",
    TARGET_MEMBER_ID : "target_member_id",
    SOURCE_MEMBER_ID : "source_member_id",
    FIRST_NAME : "first_name",
    LAST_NAME : "last_name",
    TRANSACTION_DATA : "transac_data",
    AMOUNT : "amount",
    PHONE_NUMBER : "phone",
    EMAIL_ADDRESS : "email",
    STATUS : "status",
} as const

export const USER_TABLE = {
    TABLE_NAME : "users",
    TRANSACTION_LIST : "transac_list",
    MEMBER_ID : "source_member_id",
    SOURCE_LOYALTY_PROGRAM_ID : "lp_id",
    PHONE_NUMBER : "phone",
    EMAIL_ADDRESS : "email",
} as const

export const TEST_TABLES = {
    TRANSACTIONS : "transactions_test",
    PROGRAMS : "programs_test",
    USERS : "users_test"
} as const