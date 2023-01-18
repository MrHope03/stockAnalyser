package com.project.stockanalysis.repository;

import com.project.stockanalysis.entity.UserAccount;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends MongoRepository<UserAccount,Long> {
    UserAccount findByname(String username);
}
