package com.project.stockanalysis.service;

import com.project.stockanalysis.entity.StockWrapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yahoofinance.YahooFinance;
import yahoofinance.histquotes.Interval;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@AllArgsConstructor
@Service
public class StockService {
    public StockWrapper findStock(String symbol) {
        try {
            Calendar from = Calendar.getInstance();
            Calendar to = Calendar.getInstance();
            from.add(Calendar.YEAR, -5); // from 5 years ago
            return new StockWrapper(YahooFinance.get(symbol,from, to, Interval.DAILY));
        } catch (IOException e) {
            System.out.println("Error" + e.getMessage());
        }
        return null;
    }
}
