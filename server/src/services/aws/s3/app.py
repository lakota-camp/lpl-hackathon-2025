import boto3

client = boto3.client('s3', region_name='us-west-2')
x = 0  
while x < 100:  
    response = client.list_buckets()
    for bucket in response.get('Buckets', []):
        print(f"- {bucket['Name']}")
    x += 1  # Increment x to eventually break the loop