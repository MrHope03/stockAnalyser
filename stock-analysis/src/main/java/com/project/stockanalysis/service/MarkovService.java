package com.project.stockanalysis.service;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Service
public class MarkovService {
    private double[][] transitionMatrix;
    BigDecimal averageChange;
    BigDecimal sumChange;
    long hlen;
    long [][] transitionCounts;

    public List<BigDecimal> predict(int days, BigDecimal startingPrice){
        List<BigDecimal> predictions = new ArrayList<>();
        int begin = (int)(Math.random() * 5);
        predictions.add(startingPrice);
        predictions.add(makeStep(startingPrice, begin).setScale(2,RoundingMode.CEILING));
        int currentState;
        int pastState = begin;
        for (int i = 1; i < days; i++, pastState = currentState){
            currentState = makeSelection(pastState);
            predictions.add(makeStep(predictions.get(i - 1), currentState).setScale(2,RoundingMode.CEILING));
        }
        return predictions;
    }

    public int makeSelection(int currState) {
        double[] values = transitionMatrix[currState];
        double[] rouletteWheel = new double[5];
        rouletteWheel[0] = values[0];
        for (int i = 1; i < values.length; i++){
            rouletteWheel[i] = rouletteWheel[i-1] + values[i];
        }
        double choice = Math.random();
        int selection = 0;
        for (; selection < values.length - 1; selection++){
            if (choice <= rouletteWheel[selection]){
                break;
            }
        }
        return selection;
    }

    private BigDecimal makeStep(BigDecimal currPrice, int transition){
        BigDecimal multiplier = new BigDecimal(0);
        if (transition == 0){
            multiplier = averageChange.multiply(BigDecimal.valueOf(Math.random()));
        }
        else if (transition == 1){
            multiplier = averageChange.add(averageChange.multiply(BigDecimal.valueOf(Math.random())));
        }
        else if (transition == 2){
            multiplier = averageChange.multiply(BigDecimal.valueOf(Math.random())).multiply(new BigDecimal(-1));
        }
        else if (transition == 3){
            multiplier = averageChange.add(averageChange.multiply(BigDecimal.valueOf(Math.random()))).multiply(new BigDecimal(-1));
        }
        return currPrice.multiply(multiplier.divide(BigDecimal.valueOf(100),RoundingMode.CEILING).add(new BigDecimal(1)));
    }
}
