import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import json

def describeCategoricalColumn(data, column):
    print(column.upper(), end=": ")
    counts = data[column].value_counts()
    print(len(counts))
    plt.title(column.upper())
    plt.xlabel('Categories')
    plt.ylabel('Appearances')
    values = list(counts)
    names = list(counts.index.values)
    plt.bar(names, values)

    plt.show()

def boxPlotColumn(data, column):
    plt.title(column)
    plt.boxplot(data[column])

    q1 = data[[column]].quantile(.25)
    q3 = data[[column]].quantile(.75)
    iqr = q3 - q1

    outliers = ((data[[column]] < (q1 - 1.5 * iqr)) | (data[[column]] > (q3 + 1.5 * iqr))).sum()[0]
    print(column.upper())
    print(f'Outliers: {outliers}/{len(data[column])} = {outliers/len(data[column])}')

    plt.show()

def makeColumConfig(dataPath):
    data = pd.read_csv(dataPath, nrows=5999999)
    names = data.columns
    json_data = {}
    for name in names:
        ans = input(f'What is the column "{name}" data type?\n\t1 Categorical\n\t2 Numerical\n\t3 Date\n')
        if ans == "1":
            json_data[name] = "Categorical"
        elif ans == "2":
            json_data[name] = "Numerical"
        elif ans == "3":
            json_data[name] = "Date"
        else:
            print("WARNING: OPTION NOT AVAILABLE\nCOLUMN IGNORED IN CONFIGURATION")
            json_data[name] = "Ignore"
    with open('columns.json', 'w') as outfile:
        json.dump(json_data, outfile)

def countNan(data,column):
    print(column.upper())
    nans = data[column].isna().sum()
    print(f'Nans: {nans}/{len(data[column])} = {nans/len(data[column])}')

dataPath = "input_data_train.csv"
data = pd.read_csv(dataPath, nrows=99999)
data["price"] = data["price"].fillna(0)
data["event"] = data["event"].fillna("none")

categorical = ["product", "event", "location"]
numerical = ["sa_quantity", "temp_mean", "temp_max", "temp_min", "sunshine_quant", "price"]
for category in categorical:
    describeCategoricalColumn(data, category)

for numeric in numerical:
    boxPlotColumn(data, numeric)

for col in categorical+numerical:
    countNan(data, col)