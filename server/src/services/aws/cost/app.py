import boto3
from datetime import datetime, timedelta, timezone
import json

client = boto3.client('ce', region_name='us-west-2')

def get_cost_data():
    # Set start and end time for cost data with timezone-aware datetime objects
    end_time = datetime.now(timezone.utc)
    start_time = end_time - timedelta(days=30)  # Last 30 days

    response = client.get_cost_and_usage(
        TimePeriod={
            'Start': start_time.strftime('%Y-%m-%d'),
            'End': end_time.strftime('%Y-%m-%d')
        },
        Granularity='DAILY',  # Use DAILY granularity here
        Metrics=['UnblendedCost'],
        GroupBy=[{
            'Type': 'DIMENSION',
            'Key': 'SERVICE'
        }]
    )
    
    cost_data = response.get('ResultsByTime', [])
    return cost_data

def get_cost_data_with_resources(
    start_time: datetime, 
    end_time: datetime, 
    granularity: str = 'DAILY', 
    metrics: list = ['UnblendedCost'], 
    group_by: list = [{'Type': 'DIMENSION', 'Key': 'SERVICE'}],
    filter_condition: dict = None  # Add a filter condition
):
    if granularity == 'HOURLY' and (end_time - start_time).days > 14:
        raise ValueError("For hourly granularity, the maximum date range is 14 days.")

    if filter_condition is None:
        filter_condition = {
            "Dimensions": {
                "Key": "LINKED_ACCOUNT",
                "Values": ["123456789012"]  # Replace with your linked account ID(s)
            }
        }

    response = client.get_cost_and_usage_with_resources(
        TimePeriod={
            'Start': start_time.strftime('%Y-%m-%d'),
            'End': end_time.strftime('%Y-%m-%d')
        },
        Granularity=granularity,
        Metrics=metrics,
        GroupBy=group_by,
        Filter=filter_condition  # Provide the required filter
    )
    
    cost_data = response.get('ResultsByTime', [])
    return cost_data

if __name__ == '__main__':
    end_time = datetime.now(timezone.utc)
    start_time = end_time - timedelta(days=30)  # Adjust based on granularity
    
    try:
        # Get DAILY cost data
        cost_data = get_cost_data()
        print("Cost Data:")
        print(json.dumps(cost_data, indent=4, default=str)) 
        
        # Example filter and reduced date range for HOURLY data
        filter_condition = {
            "Dimensions": {
                "Key": "SERVICE",
                "Values": ["Amazon Elastic Compute Cloud - Compute"]  # Replace with a valid service
            }
        }
        
        # Use a shorter date range for HOURLY granularity
        hourly_end_time = datetime.now(timezone.utc)
        hourly_start_time = hourly_end_time - timedelta(days=14)  # Max 14 days for HOURLY

        cost_data_with_resources = get_cost_data_with_resources(
            start_time=hourly_start_time, 
            end_time=hourly_end_time, 
            granularity='HOURLY',  # Specify HOURLY granularity
            filter_condition=filter_condition
        )
        print("\nCost Data with Resources (HOURLY):")
        print(json.dumps(cost_data_with_resources, indent=4, default=str)) 

    except ValueError as ve:
        print(f"ValueError: {ve}")
    except Exception as e:
        print(f"Error: {e}")