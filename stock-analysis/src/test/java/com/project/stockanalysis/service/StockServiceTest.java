package com.project.stockanalysis.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
class StockServiceTest {
    @Autowired
    private StockService  stockService;

    @Test
    void invoke() throws IOException {
        StockWrapper stock = stockService.findStock("UU.L");
        System.out.println(stock);
        BigDecimal price = stockService.findPrice(stock);
        System.out.println(price);
        BigDecimal change = stockService.findLastChangePercent(stock);
        System.out.println(change);
        BigDecimal mean = stockService.findChangeFrom200MeanPercent(stock);
        System.out.println(mean);
    }

    @Test
    void multiple() throws InterruptedException, IOException {
        List<StockWrapper> stocks = stockService.findStocks(Arrays.asList("AMZN","GOOG"));
        findPrices(stocks);
        Thread.sleep(1600);

//        StockWrapper aa = stockService.findStock("AA.L");
//        stocks.add(aa);

//        System.out.println(stockService.findPrice(aa));
        findPrices(stocks);

    }

    private void findPrices(List<StockWrapper> stocks) {
        stocks.forEach(stock -> {
            try {
                System.out.println(stockService.findPrice(stock));
            }catch (IOException e) {
                System.out.println("err");
            }
        });
    }
}