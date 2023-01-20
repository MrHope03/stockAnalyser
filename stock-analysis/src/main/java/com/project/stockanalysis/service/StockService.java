package com.project.stockanalysis.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import yahoofinance.Stock;
import yahoofinance.YahooFinance;
import yahoofinance.histquotes.Interval;

import java.io.IOException;
import java.util.Calendar;


@AllArgsConstructor
@Service
public class StockService {
    public Stock findStockGraph(String symbol) throws IOException {
            Calendar from = Calendar.getInstance();
            Calendar to = Calendar.getInstance();
            from.add(Calendar.YEAR, -5); // from 5 years ago
            return YahooFinance.get(symbol,from, to, Interval.DAILY);
    }

    public Stock findStock(String s) throws IOException {
        return YahooFinance.get(s);
    }
}
