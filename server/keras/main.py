from keras import backend as K
from keras.models import Sequential, load_model
from keras.layers import Dense, LSTM, Dropout, TimeDistributed, Lambda
from keras.callbacks import ModelCheckpoint
import pandas as pd
from sklearn.model_selection import train_test_split


class JDAKeras():
    def __init__(self):
        self.regressor = Sequential()

    def add_layers(self, input, output):
        # Initialising the RNN
        self.regressor.add(LSTM(units=50,
                                activation='tanh',
                                input_shape=input,
                                return_sequences=True))
        self.regressor.add(Dropout(0.6))

        self.regressor.add(LSTM(units=50,
                                activation='tanh',
                                return_sequences=True))
        self.regressor.add(Dropout(0.6))

        self.regressor.add(LSTM(units=50,
                                activation='tanh',
                                return_sequences=True))
        self.regressor.add(Dropout(0.6))

        self.regressor.add(LSTM(units=50,
                                activation='tanh',
                                return_sequences=True))
        self.regressor.add(Dropout(0.6))

        self.regressor.add(LSTM(units=50,
                                activation='tanh',
                                return_sequences=True))
        self.regressor.add(Dropout(0.6))

        self.regressor.add(LSTM(units=50,
                                activation='tanh',
                                return_sequences=True))
        self.regressor.add(Dropout(0.6))

        self.regressor.add(LSTM(units=50,
                                activation='tanh'))
        self.regressor.add(Dropout(0.6))

        # Adding the output layer
        # self.regressor.add(Lambda(lambda x: x[:, -output:, :])) # less output size
        self.regressor.add(Dense(1))  # same size output

        print(self.regressor.summary())

    def optimizers(self):
        # Compiling the RNN
        self.regressor.compile(
            optimizer="adam", loss='mean_squared_error', metrics=["accuracy"])

    def train(self, X_train, y_train, validation_data, epochs=100, batch_size=5000, currency="EURUSD1"):
        # Check points
        filepath = currency + \
            "-weights-improvement-{epoch:02d}-{val_acc:.2f}.hdf5"
        checkpoint = ModelCheckpoint(filepath, monitor='val_acc', verbose=1,
                                     save_best_only=True, save_weights_only=False, period=1, mode='max')
        callbacks_list = [checkpoint]
        # Fitting the RNN to the Training set
        self.regressor.fit(X_train, y_train, epochs=epochs, batch_size=batch_size,
                           callbacks=callbacks_list, validation_data=validation_data)

    def save_model(self, name):
        self.regressor.save(f"{name}.h5")

    def load_model(self, path):
        self.regressor = load_model(path)

    def predict(self, X_test):
        return self.regressor.predict(X_test)


if __name__ == "__main__":
    df = pd.read_pickle("./preprocesed.pkl")
    X = df.drop(["sa_quantity"], axis=1)
    Y = df["sa_quantity"]
    x_train, x_test, y_train, y_test = train_test_split(
        X, Y, test_size=0.3, random_state=69)
