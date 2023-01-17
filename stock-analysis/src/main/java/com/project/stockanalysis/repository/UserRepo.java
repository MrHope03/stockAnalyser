package com.project.stockanalysis.repository;

import com.project.stockanalysis.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository <UserAccount,Long> {
    UserAccount findByusername (String username);
}
