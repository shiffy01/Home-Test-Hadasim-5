from part1.split_files import split_file


def count(file_name):
    dict = {}

    with open(file_name, "r") as infile:
        for line in infile:
            error = line.split("Error:")[1].strip()
            if error in dict:
                dict[error] = dict[error] + 1
            else:
                dict[error] = 1

    return dict


def combine_counts(dict1, dict2):
    for key in dict2:
        if key in dict1:
            dict1[key] = dict1[key] + dict2[key]
        else:
            dict1[key] = dict2[key]
    return dict1


def main(n):
    split_file("logs.txt.xlsx", 10000)
    main_dict = {}
    for i in range(10):
        new_dict = count(f"file{i + 1}.txt")
        main_dict = combine_counts(main_dict, new_dict)
    sorted_dict = dict(sorted(main_dict.items(), key=lambda item: item[1], reverse=True))
    with open("results.txt", "w", encoding="utf-8") as f:
        for key, value in list(sorted_dict.items())[:n]:
            f.write(f"{key}: {value}\n")


main(5)
