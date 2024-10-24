package com.templates.application.mappers

import com.templates.application.dto.requests.CreateUserRequest
import com.templates.application.dto.responses.CreateUserResponse
import com.templates.domain.models.commands.users.CreateUserCommand
import com.templates.domain.models.users.UserCreationInformations
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.MappingConstants

@Mapper(componentModel = MappingConstants.ComponentModel.JAKARTA)
interface UsersDtoMappers {
    @Mapping(target = "reference", ignore = true)
    @Mapping(target = "type", ignore = true)
    fun fromCreationRequest(createUserRequest: CreateUserRequest):CreateUserCommand

    fun toCreationResponse(userCreationInformations: UserCreationInformations):CreateUserResponse
}