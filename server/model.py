import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import RandomOverSampler
import pickle
import os

class FakeAccountModel:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, max_depth=10, min_samples_split=10, 
                                            min_samples_leaf=5, class_weight="balanced", random_state=42)
        self.scaler = StandardScaler()
    
    def clean_data(self, df):
        column_mapping = {
            'profile pic': 'profile_pic',
            'nums/length username': 'ratio_numlen_username',
            'fullname words': 'len_fullname',
            'nums/length fullname': 'ratio_numlen_fullname',
            'name==username': 'sim_name_username',
            'description length': 'len_desc',
            'external URL': 'extern_url',
            'private': 'private',
            '#posts': 'num_posts',
            '#followers': 'num_followers',
            '#follows': 'num_following',
            'fake': 'fake'
        }
        
        df = df.rename(columns=column_mapping)
        df = df.drop_duplicates()
        return df
    
    def train(self, train_df, test_df):
        train_df = self.clean_data(train_df)
        test_df = self.clean_data(test_df)

        feature_columns = ['profile_pic', 'ratio_numlen_username', 'len_fullname', 'ratio_numlen_fullname',
                           'sim_name_username', 'len_desc', 'extern_url', 'private', 'num_posts',
                           'num_followers', 'num_following']

        X_train = train_df[feature_columns]
        y_train = train_df['fake']
        
        X_test = test_df[feature_columns]
        y_test = test_df['fake']

        # Handling imbalance using RandomOverSampler
        oversampler = RandomOverSampler(random_state=42)
        X_train, y_train = oversampler.fit_resample(X_train, y_train)

        # Standardizing the features
        X_train = self.scaler.fit_transform(X_train)
        X_test = self.scaler.transform(X_test)

        # Training the model
        self.model.fit(X_train, y_train)

        # Save the trained model and scaler
        with open('model.pkl', 'wb') as f:
            pickle.dump(self.model, f)
        with open('scaler.pkl', 'wb') as f:
            pickle.dump(self.scaler, f)

        # Model evaluation on test dataset
        y_pred = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        print(f"Model Accuracy on Test Data: {accuracy:.4f}")
        print("Classification Report:\n", classification_report(y_test, y_pred))

        return accuracy  

if __name__ == "__main__":
    train_df = pd.read_csv("D:/cpp/latest_project/backend/datasets/train_data.csv")
    test_df = pd.read_csv("D:/cpp/latest_project/backend/datasets/test_data.csv")

    model = FakeAccountModel()
    accuracy = model.train(train_df, test_df)
    print(f"Final Model Accuracy Score: {accuracy:.4f}")
