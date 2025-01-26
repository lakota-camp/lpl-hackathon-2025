import boto3
from datetime import datetime, timedelta, timezone
import json

client = boto3.client('ce', region_name='us-west-2')

def get_cost_data():
    # Set start and end time for cost data with timezone-aware datetime objects
    end_time = datetime.now(timezone.utc)
    start_time = end_time - timedelta(days=365)  # Last 30 days

    response = client.get_cost_and_usage(
        TimePeriod={
            'Start': start_time.strftime('%Y-%m-%d'),
            'End': end_time.strftime('%Y-%m-%d')
        },
        Granularity='DAILY',
        Metrics=['UnblendedCost'], # BlendedCost, UnblendedCost, AmortizedCost, NetAmortizedCost, NetUnblendedCost, UsageQuantity
        GroupBy=[{
            'Type': 'DIMENSION',
            'Key': 'SERVICE'
        }]
    )
    
    cost_data = response['ResultsByTime']
    return cost_data

if __name__ == '__main__':
    cost_data = get_cost_data()
    for data in cost_data:
        print(json.dumps(data, indent=4, default=str))
        