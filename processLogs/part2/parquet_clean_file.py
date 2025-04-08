import pandas as pd
from pandas import Timestamp


def check_timestamp(timestamp):
    if not isinstance(timestamp, Timestamp):
        return False

    if timestamp.year < 1970:
        return False
    if timestamp.month < 1 or timestamp.month > 12:
        return False
    if timestamp.day < 1 or timestamp.day > 31:
        return False
    if timestamp.hour < 0 or timestamp.hour > 23:
        return False
    if timestamp.minute < 0 or timestamp.minute > 59:
        return False

    return True


def clean_file(input_file):
    df = pd.read_parquet(input_file)
    processed_rows = []
    sorted_data = df.sort_values(by='timestamp')

    for index, row in sorted_data.iterrows():
        if check_timestamp(row['timestamp']) and isinstance(row['mean_value'], (int, float)):
            processed_rows.append(row)

    processed_df = pd.DataFrame(processed_rows).drop_duplicates()
    processed_df.to_parquet('filtered_data.parquet', index=False)
    return 'filtered_data.parquet'
