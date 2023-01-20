package com.project.stockanalysis.controller;

import com.project.stockanalysis.entity.StockWrapper;
import com.project.stockanalysis.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import yahoofinance.Stock;

import java.io.IOException;
import java.math.BigDecimal;

@CrossOrigin("*")
@RestController
public class StockRestController {
    @Autowired
    private StockService stockService;

    @GetMapping("/stock/{symbol}")
    public StockWrapper getStock(@PathVariable String symbol) {
        return stockService.findStock(symbol);
    }

}
