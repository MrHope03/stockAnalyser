package com.project.stockanalysis.service;

import com.project.stockanalysis.entity.UserAccount;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface UserService {
    UserAccount addUser(UserAccount user);

    List<UserAccount> getAllUsers();

    UserAccount getUserById(Long id);

    UserAccount getUserByName(String name);
}
