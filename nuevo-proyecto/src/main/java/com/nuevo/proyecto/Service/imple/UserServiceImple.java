package com.nuevo.proyecto.Service.imple;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nuevo.proyecto.Model.Rol;
import com.nuevo.proyecto.Model.UserEntity;
import com.nuevo.proyecto.Repository.UserRepository;
import com.nuevo.proyecto.Service.RolService;
import com.nuevo.proyecto.Service.UserService;
import com.nuevo.proyecto.dto.JwtResponseDto;
import com.nuevo.proyecto.dto.LoginDto;
import com.nuevo.proyecto.dto.RegisterDto;
import com.nuevo.proyecto.dto.UserDto;
import com.nuevo.proyecto.exceptions.ConflictException;
import com.nuevo.proyecto.exceptions.JwtAuthenticationException;
import com.nuevo.proyecto.exceptions.NotFoundException;
import com.nuevo.proyecto.security.JwtGenerator;

@Service
public class UserServiceImple implements UserService{
    
     @Autowired
    private UserRepository userRepository;
    @Autowired
    private RolService rolService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtGenerator jwtGenerator;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto register(RegisterDto registerDto) {
        if (userRepository.existsByEmail(registerDto.getEmail())){
            throw new ConflictException("El usuario existe!");
        }
        UserEntity user = new UserEntity();
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setEmail(registerDto.getEmail());

        Rol rol = rolService.findByname("USER").orElseThrow(()-> new NotFoundException("Rol no encontrado!"));
        Set<Rol> roles = new HashSet<>();
        roles.add(rol);
        user.setRoles(roles);
        userRepository.save(user);

        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setEmail(user.getEmail());
        userDto.setRoles(user.getRoles());
        return userDto;
    }
    @Override
    public JwtResponseDto login(LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtGenerator.generateToken(authentication);
            return new JwtResponseDto(token);
        } catch (AuthenticationException e) {
            throw new JwtAuthenticationException("Credenciales inválidas");
        }
    }

    @Override
    public UserDto getLoguedUser(HttpHeaders headers) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = ((User) authentication.getPrincipal()).getUsername();

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(()-> new NotFoundException("Usuario no encontrado"));
        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setUsername(user.getUsername());
        userDto.setRoles(user.getRoles());
        return userDto;
    }
}
