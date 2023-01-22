package com.project.stockanalysis.controller;

import com.project.stockanalysis.entity.Prediction;
import com.project.stockanalysis.entity.StockRate;
import com.project.stockanalysis.entity.UserStock;
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
    public List<StockRate> getStockPrices(@RequestBody List<String> symbols) throws IOException {
        List<StockRate> res = new ArrayList<>();
        for ( String s : symbols) {
            StockRate x = new StockRate();
            x.setPrice(stockService.findStock(s).getQuote().getPrice());
            x.setCurrency(stockService.findStock(s).getCurrency());
            res.add(x);
            System.out.println(x);
        }
        return res;
    }

    @GetMapping("/predict/{symbol}")
    public List<Prediction> predictPrices (@PathVariable String symbol) throws IOException {
        return stockService.predictStockMarket(symbol);
    }

}
