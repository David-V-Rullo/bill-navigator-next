import json


def format_json_file(input_file, output_file):
    with open(input_file, 'r') as f:
        data = json.load(f)

    with open(output_file, 'w') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


if __name__ == "__main__":
    input_filepath = './members_data.json'
    output_filepath = './formatted_members_data.json'
    format_json_file(input_filepath, output_filepath)
    print(f"Formatted JSON saved to {output_filepath}")
