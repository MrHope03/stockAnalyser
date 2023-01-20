package com.project.stockanalysis.controller;

import com.project.stockanalysis.entity.UserAccount;
import com.project.stockanalysis.entity.UserStock;
import com.project.stockanalysis.service.UserService;
import jakarta.validation.Valid;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import yahoofinance.Stock;

import java.util.List;

@CrossOrigin("*")
@RestController
public class UserRestController {
    @Autowired
    private UserService userService;

    @GetMapping ("/")
    public String greetings () {
        return "<h1>Hello</h1>";
    }

    @PostMapping ("/u")
    public UserAccount createNewUser(@Valid @RequestBody UserAccount user){
        return userService.addUser(user);
    }

    @GetMapping ("/u")
    public List<UserAccount> getUsersList(){
        return userService.getAllUsers();
    }

    @GetMapping ("/u/{name}")
    public UserAccount getUserByUsername (@PathVariable("name") String name) {
        return userService.getUserByName(name);
    }

    @PutMapping("/u/{name}")
    public UserAccount updateUserStocks (@PathVariable("name") String name, @RequestBody UserStock stock) {
        return userService.addStocks(name,stock);
    }

    @PutMapping("/u/edit/{name}")
    public UserAccount updateBalanceStocks (@PathVariable("name") String name, @RequestBody UserAccount acc) {
        return userService.updateUserAccount(name,acc);
    }
}
