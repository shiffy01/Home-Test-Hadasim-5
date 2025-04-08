import pandas as pd

def split_file(input_file):
    df = pd.read_excel(input_file)

    print("----start-----")
    i = 0

    while i < len(df):
        day = df.iloc[i]['timestamp'].day
        processed_rows = []

        while i < len(df) and df.iloc[i]['timestamp'].day == day:
            processed_rows.append(df.iloc[i])
            i += 1

        processed_df = pd.DataFrame(processed_rows)
        output_file = f"file{day}.xlsx"
        processed_df.to_excel(output_file, index=False, engine='openpyxl')
        print(f"Finished file number {day}")

    print("----end-----")
