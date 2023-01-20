package com.project.stockanalysis.controller;

import com.project.stockanalysis.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import yahoofinance.Stock;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
public class StockRestController {
    @Autowired
    private StockService stockService;

    @GetMapping("/stock/{symbol}")
    public Stock getStock(@PathVariable String symbol) throws IOException {
        return stockService.findStockGraph(symbol);
    }

    @PostMapping("/price")
    public List<BigDecimal> getStockPrices(@RequestBody List<String> symbols) throws IOException {
        List<BigDecimal> res = new ArrayList<>();
        for ( String s : symbols) {
            res.add(stockService.findStock(s).getQuote().getPrice());
            System.out.println(s);
        }
        return res;
    }

}
