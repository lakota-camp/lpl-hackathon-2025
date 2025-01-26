import boto3
import json
import logging
from botocore.exceptions import ClientError

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = boto3.client('bedrock-runtime', region_name='us-west-2')
inference_profile_arn = "arn:aws:bedrock:us-west-2:176019552193:inference-profile/us.amazon.nova-lite-v1:0"

model_id = 'us.amazon.nova-lite-v1:0'

# Define the prompt for the model.
prompt = "How can I use the Amazon Bedrock service to integrate with a dashboard to provide real-time insights?"
message_list = [{"role": "user", "content": [{"text": prompt}]}]

body = json.dumps({
    # "prompt": prompt,
    # "max_tokens": 1000,
    # "temperature": 0.75,
    # "p": 0.01,
    # "k": 0,
    "messages": message_list
})

try:
    # Invoke the model with the request.
    response = client.invoke_model(
        modelId=model_id,
        body=body,
        contentType="application/json",
        accept="application/json"
    )

except (ClientError, Exception) as e:
    print(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
    exit(1)

# Decode the response body.
response_body = json.loads(response.get('body').read())

# Extract and print the response text.
print(response_body["output"]["message"]["content"][0]["text"])
