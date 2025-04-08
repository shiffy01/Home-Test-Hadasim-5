import pandas as pd

from part2.clean_file import clean_file
from part2.split_file import split_file


def calculate_avgs(input_file):
    df = pd.read_excel(input_file)
    processed_rows = []

    i = 0

    while i < len(df):

        timedate = df.iloc[i]['timestamp']
        count = 0
        sum = 0
        while i < len(df) and timedate.date() == df.iloc[i]['timestamp'].date() and timedate.hour == df.iloc[i][
            'timestamp'].hour:
            sum = sum + float(df.iloc[i]['value'])
            count = count + 1
            i = i + 1
        updated_timestamp = timedate.replace(minute=0, second=0)
        processed_rows.append({'start time': updated_timestamp, 'average': sum / count})

    return processed_rows


def main(input_file):
    filtered = clean_file(input_file)
    print("done filtering")
    # rows=calculate_avgs(filtered)

    # added section of splitting into smaller parts first:
    ###
    split_file(filtered)
    print("done splitting")
    rows = []
    for i in range(30):
        new_rows = calculate_avgs(f"file{i + 1}.xlsx")
        rows.extend(new_rows)
        print("done file", i + 1)
    ###

    processed_df = pd.DataFrame(rows)
    processed_df.to_excel('averages_file.xlsx', index=False)


main("time_series.xlsx")
