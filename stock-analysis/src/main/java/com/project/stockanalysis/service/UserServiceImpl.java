package com.project.stockanalysis.service;


import com.project.stockanalysis.entity.UserAccount;
import com.project.stockanalysis.entity.UserStock;
import com.project.stockanalysis.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    @Override
    public UserAccount addStocks(String name, UserStock stock) {
        UserAccount acc = repo.findByname(name);
        List<UserStock> lst;
        if (acc.getBalance() - (stock.getPrice() * stock.getQuantity()) < 0) return acc;
        acc.setBalance(acc.getBalance() - (stock.getPrice() * stock.getQuantity()));
        if (acc.getUserStocks() == null) {
           lst = new ArrayList<>();
           lst.add(stock);
        } else {
            lst = acc.getUserStocks();
            boolean flag = false;
            int i = 0;
            for (UserStock s : lst) {
                if (s.getSymbol().equals(stock.getSymbol())) {
                    flag = true;
                    s.setQuantity(s.getQuantity() + stock.getQuantity());
                    if (s.getQuantity() > 0)
                        s.setPrice(stock.getPrice());
                    else  {
                        break;
                    }
                }
                i++;
            }
            if (flag && i < lst.size()) {
                lst.remove(i);
            }
            if (!flag) {
                lst.add(stock);
            }
        }
        acc.setUserStocks(lst);
        return repo.save(acc);
    }

    @Override
    public UserAccount updateUserAccount(String name, UserAccount acc) {
        return  repo.save(acc);
    }
}
