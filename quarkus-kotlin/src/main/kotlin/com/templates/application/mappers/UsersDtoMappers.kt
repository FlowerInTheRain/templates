package com.templates.application.mappers

import com.templates.application.dto.requests.UserCreationRequest
import com.templates.domain.models.commands.users.CreateUserCommand
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.MappingConstants

@Mapper(componentModel = MappingConstants.ComponentModel.JAKARTA)
interface UsersDtoMappers {
    @Mapping(target = "reference", ignore = true)
    @Mapping(target = "type", ignore = true)
    fun fromCreationRequest(userCreationRequest: UserCreationRequest):CreateUserCommand
}