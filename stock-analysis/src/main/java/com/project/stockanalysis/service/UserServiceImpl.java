package com.project.stockanalysis.service;


import com.project.stockanalysis.entity.UserAccount;
import com.project.stockanalysis.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo repo;

    @Override
    public UserAccount addUser(UserAccount user) {
        user.setId(UUID.randomUUID().toString().split("-")[0]);
        return repo.save(user);
    }

    @Override
    public List<UserAccount> getAllUsers() {
        return repo.findAll();
    }

    @Override
    public UserAccount getUserById(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public UserAccount getUserByName(String name) {
        return repo.findByname(name);
    }
}
