CREATE DATABASE `project4`;

CREATE TABLE `bill` (
    bill_id BIGINT NOT NULL,
    bill_code VARCHAR(255),
    change_amount NUMERIC(15, 0),
    coupon INTEGER,
    created_at DATE,
    customer_pay NUMERIC(15, 0),
    notes VARCHAR(255),
    order_status INTEGER,
    payment_method INTEGER,
    sell_date DATE,
    total_money NUMERIC(15, 0),
    total_origin_price NUMERIC(15, 0),
    total_price NUMERIC(15, 0),
    total_quantity INTEGER,
    store_id BIGINT,
    PRIMARY KEY (bill_id)
) ENGINE=INNODB;

CREATE TABLE `category` (
    category_id BIGINT NOT NULL,
    category_name VARCHAR(255),
    created_date DATE,
    status INTEGER,
    store_code INTEGER,
    store_id BIGINT,
    PRIMARY KEY (category_id)
) ENGINE=INNODB;
CREATE TABLE `category_sequence` (
    next_val BIGINT
) ENGINE=INNODB;
    
insert into `category_sequence` values (1);

CREATE TABLE `detail_bill` (
    detail_bill_id BIGINT NOT NULL,
    discount INTEGER,
    price NUMERIC(15, 0),
    product_id BIGINT,
    quantity INTEGER,
    bill_id BIGINT,
    PRIMARY KEY (detail_bill_id)
) ENGINE=INNODB;
    
CREATE TABLE `detail_bill_sequence` (
    next_val BIGINT
) ENGINE=INNODB;

insert into `detail_bill_sequence` values (1);

CREATE TABLE `orders_sequence` (
    next_val BIGINT
) ENGINE=INNODB;

insert into `orders_sequence` values (1);

CREATE TABLE `product` (
    product_id BIGINT NOT NULL,
    created_at DATE,
    prd_origin_price NUMERIC(15, 0),
    prd_sell_price NUMERIC(15, 0),
    prd_status INTEGER,
    product_cd VARCHAR(255),
    product_name VARCHAR(255),
    product_sls INTEGER,
    category_id BIGINT,
    store_id BIGINT,
    PRIMARY KEY (product_id)
) ENGINE=INNODB;

CREATE TABLE `product_sequence` (
    next_val BIGINT
) ENGINE=INNODB;

insert into `product_sequence` values (1);

CREATE TABLE `store` (
    store_id BIGINT NOT NULL,
    store_name VARCHAR(255),
    PRIMARY KEY (store_id)
) ENGINE=INNODB;

CREATE TABLE `store_sequence` (
    next_val BIGINT
) ENGINE=INNODB;

insert into `store_sequence` values (1);

CREATE TABLE `user` (
    user_id BIGINT NOT NULL,
    created_at DATE,
    display_name VARCHAR(255),
    email VARCHAR(255),
    logined DATE,
    password VARCHAR(255),
    token_login VARCHAR(255),
    updated_at DATE,
    user_name VARCHAR(255),
    user_status VARCHAR(255),
    store_id BIGINT,
    PRIMARY KEY (user_id)
) ENGINE=INNODB;
 
CREATE TABLE `user_sequence` (
    next_val BIGINT
) ENGINE=INNODB;
 
insert into `user_sequence` values (1);
 
alter table `bill`
       add constraint FKj414nnlhhlgjk7lo8f7braaft 
       foreign key (store_id) 
       references store (store_id);
 
alter table `category`
       add constraint FKqdaotwkf5g9vmdox82ttt50i5 
       foreign key (store_id) 
       references store (store_id);
 
alter table `detail_bill` 
       add constraint FK91s4y56xq11tom7alvbn51iuj 
       foreign key (bill_id) 
       references bill (bill_id);
 
alter table `product` 
       add constraint FK1mtsbur82frn64de7balymq9s 
       foreign key (category_id) 
       references category (category_id);
 
alter table `product` 
       add constraint FKjlfidudl1gwqem0flrlomvlcl 
       foreign key (store_id) 
       references store (store_id);

alter table `user` 
       add constraint FK1k3x2kt9pxcmon8jhquv31qe4 
       foreign key (store_id) 
       references store (store_id);