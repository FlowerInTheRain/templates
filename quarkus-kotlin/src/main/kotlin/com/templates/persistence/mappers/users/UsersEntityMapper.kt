package com.templates.persistence.mappers.users

import com.templates.domain.models.commands.users.CreateUserCommand
import com.templates.domain.models.users.User
import com.templates.persistence.entities.UsersEntity
import org.mapstruct.Mapper
import org.mapstruct.MappingConstants

@Mapper(componentModel = MappingConstants.ComponentModel.JAKARTA)
interface UsersEntityMapper {
    fun fromCreateUserToEntity(createUserCommand: CreateUserCommand): UsersEntity

    fun fromEntityToUser(usersEntity: UsersEntity): User

}