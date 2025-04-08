import pandas as pd
from part2.parquet_clean_file import clean_file
from part2.parquet_split_file import split_file


def calculate_avgs(input_file):
    df = pd.read_parquet(input_file)
    df['timestamp'] = pd.to_datetime(df['timestamp'])

    processed_rows = []
    i = 0

    while i < len(df):
        timedate = df.iloc[i]['timestamp']
        count = 0
        total = 0

        while i < len(df) and timedate.date() == df.iloc[i]['timestamp'].date() and timedate.day == df.iloc[i]['timestamp'].day:
            total += float(df.iloc[i]['mean_value'])
            count += 1
            i += 1

        updated_timestamp = timedate.replace(hour=0)
        processed_rows.append({'day': updated_timestamp, 'average': total / count})

    return processed_rows


def main(input_file):
    filtered = clean_file(input_file)
    print("done filtering")

    split_file(filtered, 87)
    print("done splitting")

    rows = []
    for i in range(8):
            new_rows = calculate_avgs(f"file{i + 1}.parquet")
            rows.extend(new_rows)
            print("done file", i + 1)

    processed_df = pd.DataFrame(rows)
    processed_df.to_parquet('averages_file.parquet', index=False)

main("time_series.parquet")
