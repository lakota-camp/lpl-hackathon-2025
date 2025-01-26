import boto3

client = boto3.client('cloudtrail', region_name='us-west-2')

def fetch_cloudtrail_events():
    response = client.lookup_events(
        LookupAttributes=[
            {
                'AttributeKey': 'EventName',
                'AttributeValue': 'RunInstances'
            }
        ]
    )
    return response