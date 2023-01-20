package com.project.stockanalysis.service;

import com.project.stockanalysis.entity.UserAccount;
import com.project.stockanalysis.entity.UserStock;

import java.util.List;

public interface UserService {
    UserAccount addUser(UserAccount user);

    List<UserAccount> getAllUsers();

    UserAccount getUserById(Long id);

    UserAccount getUserByName(String name);

    UserAccount addStocks (String name, UserStock stock);

    UserAccount updateUserAccount(String name, UserAccount acc);
}
