import pandas as pd


def split_file(input_file, num_lines):
    count_files = 1
    df = pd.read_excel(input_file, header=None)

    lines = df.iloc[:, 0].dropna().astype(str).tolist()
    print("----start-----")
    # Split and save into multiple files
    for i in range(0, len(lines), num_lines):
        output_file = f"file{count_files}.txt"
        with open(output_file, "w") as outfile:
            outfile.writelines("\n".join(lines[i:i + num_lines]))
        print("finished file number", count_files)
        count_files += 1
