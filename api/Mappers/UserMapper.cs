using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.User;
using api.Models;

namespace api.Mappers
{
    public static class UserMapper
    {
        public static UserDto ToUserDto(this User userModel)
        {
            return new UserDto
            {
                UserId = userModel.UserId,
                Username = userModel.Username,
                Email = userModel.Email,
                RegistrationDate = userModel.RegistrationDate,
            };
        }

        public static User ToUserFromCreateDto(this CreateUserRequestDto userDto)
        {
            return new User
            {
                Username = userDto.Username,
                Email = userDto.Email,
            };
        }
    }
}