package com.project.stockanalysis.service;

import com.project.stockanalysis.entity.Prediction;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yahoofinance.Stock;
import yahoofinance.YahooFinance;
import yahoofinance.histquotes.HistoricalQuote;
import yahoofinance.histquotes.Interval;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;


@AllArgsConstructor
@Service
public class StockService {
    @Autowired
    MarkovService markovService;

    public Stock findStockGraph(String symbol) throws IOException {
            Calendar from = Calendar.getInstance();
            Calendar to = Calendar.getInstance();
            from.add(Calendar.YEAR, -5); // from 5 years ago
            return YahooFinance.get(symbol,from, to, Interval.DAILY);
    }

    public Stock findStock(String s) throws IOException {
        return YahooFinance.get(s);
    }
    public List<Prediction> predictStockMarket(String symbol) throws IOException {
        Calendar from = Calendar.getInstance();
        Calendar to = Calendar.getInstance();
        from.add(Calendar.MONTH, -6);
        List<HistoricalQuote> history = YahooFinance.get(symbol,from, to, Interval.DAILY).getHistory();
        long histLen = history.size();
        BigDecimal avgChange;
        BigDecimal sumChange = new BigDecimal(0);
        for (int i = 0; i < histLen - 1; i++){
            HistoricalQuote h1 = history.get(i);
            HistoricalQuote h2 = history.get(i + 1);
            sumChange = sumChange.add(h1.getClose().subtract(h2.getClose()).abs().divide(h1.getClose(),RoundingMode.CEILING).multiply(new BigDecimal(100)));
        }
        avgChange = sumChange.divide(new BigDecimal(histLen), RoundingMode.CEILING);
        long [][] transitionCounts = new long[5][5];
        int prevState = classifyDifference(history.get(1).getClose().subtract(history.get(0).getClose()),avgChange);
        for (int i = 1; i < histLen - 1; i++) {
            HistoricalQuote h1 = history.get(i);
            HistoricalQuote h2 = history.get(i + 1);
            int currState = classifyDifference(h2.getClose().subtract(h1.getClose()).divide(h1.getClose(),RoundingMode.CEILING).multiply(new BigDecimal(100)),avgChange);
            transitionCounts[prevState][currState]++;
            prevState = currState;
        }
        double [][] transitionMatrix = new double[5][5];
        for (int i = 0; i < transitionCounts.length; i++){
            int sum = 0;
            for (int j = 0; j < transitionCounts[i].length; j++){
                sum += transitionCounts[i][j];
            }
            for (int k = 0; k < transitionCounts[i].length; k++){
                if (sum != 0){
                    transitionMatrix[i][k] = (double)(transitionCounts[i][k]) / sum;
                }
                else{
                    transitionMatrix[i][k] = 0;
                }
            }
        }
        markovService.setTransitionMatrix(transitionMatrix);
        markovService.setAverageChange(avgChange);
        markovService.setTransitionCounts(transitionCounts);
        markovService.setHlen(histLen);
        markovService.setSumChange(sumChange);

        List<Prediction> predictions = new ArrayList<>();
        for (int i = 1; i < 5; i++) {
            Prediction p = new Prediction("Prediction " + i , markovService.predict(14, history.get((int) (histLen - 1)).getClose()));
            predictions.add(p);
        }
        return predictions;
    }

    public int classifyDifference(BigDecimal diff, BigDecimal avgDiff){
        if (diff.compareTo(new BigDecimal(0)) == 0){
            return 4;
        }
        boolean b = diff.compareTo(new BigDecimal(0)) > 0;
        if (diff.abs().compareTo(avgDiff) > 0){
            if (b){
                return 1;
            }
            return 3;
        }
        else{
            if (b){
                return 0;
            }
            return 2;
        }
    }

}
