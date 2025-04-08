import pandas as pd

def split_file(input_file, num_lines):
    count_files = 1
    df = pd.read_parquet(input_file)

    # Ensure we're working with the original DataFrame structure
    print("----start-----")

    # Split and save into multiple Parquet files
    for i in range(0, len(df), num_lines):
        # Slice the DataFrame for the current chunk (keeping all columns)
        chunk_df = df.iloc[i:i + num_lines]

        # Define the output file name
        output_file = f"file{count_files}.parquet"

        # Save the chunk as a Parquet file with all columns
        chunk_df.to_parquet(output_file, index=False)

        print(f"finished file number {count_files}")
        count_files += 1

    print("----end-----")
