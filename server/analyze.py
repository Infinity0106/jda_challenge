# %%
# importaciones para trabajar
# %matplotlib inline
from sklearn.decomposition import PCA
from sklearn.preprocessing import OneHotEncoder
import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
import json

# %%
# funcin para encontrar rows con valores vacios


def display_nan(df):
    print(df[df.isna().any(axis=1)].head())


def num_categories(df, column):
    values = df[column].unique()
    return len(values)


# %%
# importacion de datos
df = pd.read_csv("./server/input_data_train.csv")
print(df.head())
# train
# location,product,date,sa_quantity,temp_mean,temp_max,temp_min,sunshine_quant,event,price
# sa_quantity is deleated
# pred
# location,product,date,temp_mean,temp_max,temp_min,sunshine_quant,event,price

# %%
# extract important information

# df = df[["location", "product", "date", "temp_mean",
#         "sunshine_quant", "event", "price", "sa_quantity"]]

# %%
# fill NAN of  columns aplicable
df[["price"]] = df[["price"]].fillna(0)
print(df.head())

# %%
# sort by date
df['date'] = pd.to_datetime(df['date'])
df = df.sort_values(by='date', ascending=True)


# %%
# remove last elements with nan in temparature and sunshine_quant
df[["sunshine_quant"]] = df[["sunshine_quant"]].fillna(0)
# df[["temp_mean"]] = df[["temp_mean"]].fillna(-100)
# %%
# Fill NaN with none string
df["event"] = df["event"].fillna("none")
# %%
new_tmp = df[["date", "location", "product",
              "temp_mean", "sunshine_quant", "price"]]
output = df[["sa_quantity"]]
display_nan(new_tmp)

# %%
plt.plot(new_tmp['date'], output['sa_quantity'])
plt.xticks(rotation='vertical')

# %%
plt.plot(new_tmp['date'], df['location'])
plt.xticks(rotation='vertical')

# %%
plt.plot(new_tmp['date'], df['product'])
plt.xticks(rotation='vertical')

# %%
plt.plot(new_tmp['date'], df['temp_mean'])
plt.xticks(rotation='vertical')

# %%
plt.plot(new_tmp['date'], df['sunshine_quant'])
plt.xticks(rotation='vertical')

# %%
plt.plot(new_tmp['date'], df['price'])
plt.xticks(rotation='vertical')


# %%
num_categories(new_tmp, "product")
# %%

num_categories(new_tmp, "location")

# %%
num_categories(df, "event")

# %%
# load everything
with open('./server/columns.json') as f:
    config = json.load(f)

# %%


def validate_key(df, config):
    columns_types = {
        "Numerical": [],
        "Categorical": [],
        "Date": []
    }
    for key, value in config.items():
        try:
            if value != "Ignore":
                df[key]
                columns_types[value].append(key)
        except:
            print(f"key not existent {key}")
    return columns_types


info = validate_key(df, config)

# %%
all_encoders = {}


def crate_categorical(df, info):
    for key in info["Categorical"]:
        encoder = OneHotEncoder(categories='auto')
        df[key] = encoder.fit_transform([df[key]])
        all_encoders[key] = encoder

#crate_categorical(df, info)

# %%


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

    outliers = ((data[[column]] < (q1 - 1.5 * iqr)) |
                (data[[column]] > (q3 + 1.5 * iqr))).sum()[0]
    print(column.upper())
    print(
        f'Outliers: {outliers}/{len(data[column])} = {outliers/len(data[column])}')

    plt.show()


def makeColumConfig(dataPath):
    data = pd.read_csv(dataPath)
    names = data.columns
    json_data = {}
    for name in names:
        ans = input(
            f'What is the column "{name}" data type?\n\t1 Categorical\n\t2 Numerical\n\t3 Date\n')
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


def countNan(data, column):
    print(column.upper())
    nans = data[column].isna().sum()
    print(f'Nans: {nans}/{len(data[column])} = {nans/len(data[column])}')


data = df
categorical = ["product", "event", "location"]
numerical = ["sa_quantity", "temp_mean", "temp_max",
             "temp_min", "sunshine_quant", "price"]
# for category in categorical:
#    describeCategoricalColumn(data, category)

for numeric in numerical:
    boxPlotColumn(data, numeric)

for col in categorical+numerical:
    countNan(data, col)

# %%
