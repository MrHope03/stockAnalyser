package com.project.stockanalysis.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class UserAccount {
    @Id
    private String id;

    @NotBlank
    private String name;
    @Email
    private String email;
    @NotBlank
    private String password;
    private String image;
    private String providerType;
    private Double balance;
    private List<UserStock> userStocks;

    public UserAccount() {
        this.balance = (double) 0;
        this.userStocks = new ArrayList<>();
    }
}
