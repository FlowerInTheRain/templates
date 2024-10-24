package com.templates.persistence

import jakarta.persistence.*

@Entity
@Table(name = "users")
class MyKotlinEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_generator")
    @SequenceGenerator(name = "users_generator", sequenceName = "users_seq", allocationSize = 1)
    @Column(name = "id", updatable = false)
    var id: Long? = null

    @Column(name = "first_name", columnDefinition = "varchar(30)", nullable = false)
    var firstName: String? = null
    @Column(name = "last_name", columnDefinition = "varchar(30)", nullable = false)
    var lastName: String? = null
    @Column(name = "mail", columnDefinition = "varchar(90)", nullable = false, unique = true)
    var mail: String? = null
    @Column(name = "password", columnDefinition = "varchar(25)", nullable = false)
    var password: String? = null

    @Column(name = "reference", columnDefinition = "bpchar(32)", nullable = false, unique = true, updatable = false)
    var reference: String? = null
    @Column(name = "type", columnDefinition = "varchar(12)", nullable = false)
    var type: String? = null
    @Column(name = "phone_number", columnDefinition = "varchar(12)", unique = true, nullable = false)
    var phoneNumber: String? = null
}