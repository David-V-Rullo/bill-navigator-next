from urllib.parse import urljoin
from cdg_client import CDGClient

import requests
import json

# Provided CDGClient class and its associated constants and helper classes here...

# Initialize the client with your API key
API_KEY = "zu669iEwEJ3XSM9ncafOgtqEAMh5jcCoKF0nK88h"
client = CDGClient(api_key=API_KEY)


def fetch_all_members():
    all_members = []
    offset = 0
    limit = 250  # Max allowed

    while True:
        endpoint = f"member?offset={offset}&limit={limit}&format=json"
        data, status_code = client.get(endpoint)

        if status_code != 200:
            print(
                f"Error: Received status code {status_code}. Stopping fetch operation.")
            break

        if 'members' in data:
            all_members.extend(data['members'])

        # Check if we have reached the end of the paginated results
        if len(data['members']) < limit:
            break

        offset += limit

    return all_members


def write_to_file(data):
    with open('members_data.json', 'w') as file:
        json.dump(data, file)


if __name__ == "__main__":
    members_data = fetch_all_members()
    write_to_file(members_data)
    print("Data saved to 'members_data.json'")
