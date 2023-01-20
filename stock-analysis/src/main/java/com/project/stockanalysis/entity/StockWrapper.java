package com.project.stockanalysis.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.With;
import yahoofinance.Stock;

import java.time.Clock;
import java.time.LocalDateTime;

@Getter
@With
@AllArgsConstructor
public class StockWrapper {
    private final Stock stock;
    private final LocalDateTime lastAccessed;

    public StockWrapper(Stock stock) {
        this.stock = stock;
        this.lastAccessed = LocalDateTime.now(Clock.systemDefaultZone());
    }
}
