package com.cf.tn1983.user.mapper;

import com.cf.tn1983.user.User;
import com.cf.tn1983.user.dto.request.CreateUserRequest;
import com.cf.tn1983.user.dto.request.UpdateUserRequest;
import com.cf.tn1983.user.dto.response.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

/** Maps user API DTOs to and from the User entity. */
@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(CreateUserRequest request);

    UserResponse toResponse(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    // @Mapping(target = "customer", ignore = true)
    void updateUser(UpdateUserRequest request, @MappingTarget User user);
}