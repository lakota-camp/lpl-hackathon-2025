import boto3
import random
import string
from datetime import datetime, timedelta, timezone
import json

client = boto3.client('cloudwatch', region_name='us-west-2')

def get_valid_id(length=8):
    # Generate an ID that starts with a lowercase letter
    first_char = random.choice(string.ascii_lowercase)
    remaining_chars = ''.join(random.choices(string.ascii_letters + string.digits, k=length - 1))
    return first_char + remaining_chars

random_id = get_valid_id()

# Set start and end time for metric data with timezone-aware datetime objects
end_time = datetime.now(timezone.utc)
start_time = end_time - timedelta(hours=24)  # Last 24 hours

response = client.get_metric_data(
    MetricDataQueries=[
        {
            "Id": random_id,
            "MetricStat": {
                "Metric": {
                    "Namespace": "AWS/EC2",
                    "MetricName": "CPUUtilization",
                    "Dimensions": [
                        {
                            "Name": "InstanceId",
                            "Value": "i-031735057d76073c6"
                        }
                    ]
                },
                "Period": 300,
                "Stat": "Average",
                "Unit": "Percent"
            }
        }
    ],
    StartTime=start_time,
    EndTime=end_time
)

print(json.dumps(response, indent=2, default=str))  