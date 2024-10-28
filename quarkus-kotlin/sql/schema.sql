create table if not exists users (
                                     account_verified boolean DEFAULT false not null,
                                     id bigint not null,
                                     verification_code_timestamp TIMESTAMP,
                                     type varchar(10) not null,
                                     first_name varchar(30) not null,
                                     last_name varchar(30) not null,
                                     mail varchar(90) not null,
                                     password varchar(150) not null,
                                     phone_number varchar(10) not null,
                                     profile_pic_url varchar(200),
                                     reference bpchar(32) not null,
                                     verification_code bpchar(6),
                                     constraint user_pk
                                         primary key (id, type),
                                     constraint uq_user_mail
                                         unique (mail, type),
                                     constraint uq_user_phone
                                         unique (phone_number, type),
                                     constraint uq_user_reference
                                         unique (reference, type)
) partition by LIST (type);


create table if not exists clients
    partition of users
        FOR VALUES IN ('CLIENT');
create table if not exists admins
    partition of users
        FOR VALUES IN ('ADMIN');


CREATE SEQUENCE users_seq
    START 1
    INCREMENT 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;