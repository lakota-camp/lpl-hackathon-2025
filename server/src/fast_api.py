from typing import Union, List
from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel
import boto3
from botocore.exceptions import ClientError
import uuid

'''
Example boilerplate code for a FastAPI CRUD application logic with DynamoDB
We can configure this code to use the DynamoDB client to interact with a database or make API calls to other services.
'''

app = FastAPI()

# Demo API Key for API access
API_KEY = "123456"

def verify_api_key(authorization: str = Header(...)):
    if authorization != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API Key")

# DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
table = dynamodb.Table('fast-api-crud-demo')

# Data Model
class Item(BaseModel):
    id: str = None
    task: str
    description: str
    completed: bool = False

# Hello World default route
@app.get("/")
async def read_root():
    return {"Hello": "From FastAPI"}

# Create an item
@app.post("/tasks", response_model=Item)
def create_item(item: Item):
    if not item.id:
        item.id = str(uuid.uuid4())
    try:
        table.put_item(Item=item.model_dump())
    except ClientError as e:
        raise HTTPException(status_code=500, detail=f"Failed to create item: {e}")
    return item

# Get all items
@app.get("/tasks", response_model=List[Item], dependencies=[Depends(verify_api_key)])
def get_items():
    try:
        response = table.scan()
        items = response.get("Items", [])
    except ClientError as e:
        raise HTTPException(status_code=500, detail=f"Failed to get items: {e}")
    return items

# Get an item by ID
@app.get("/tasks/{item_id}", response_model=Item, dependencies=[Depends(verify_api_key)])
def get_item(item_id: str):
    try:
        response = table.get_item(Key={'id': item_id})
        item = response.get('Item')
    except ClientError as e:
        raise HTTPException(status_code=500, detail=f"Failed to get item: {e}")
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# Update an item by ID
@app.put("/tasks/{item_id}", response_model=Item, dependencies=[Depends(verify_api_key)])
def update_item(item_id: str, item: Item):
    try:
        table.update_item(
            Key={'id': item_id},
            UpdateExpression='SET name = :name, description = :description',
            ExpressionAttributeValues={
                ':name': item.name,
                ':description': item.description
            },
            ReturnValues='ALL_NEW'
        )
    except ClientError as e:
        raise HTTPException(status_code=500, detail=f"Failed to update item: {e}")
    return update_item

# Delete an item by ID
@app.delete("/tasks/{item_id}", dependencies=[Depends(verify_api_key)])
def delete_item(item_id: str):
    try:
        table.delete_item(Key={'id': item_id})
    except ClientError as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete item: {e}")
    return {"id": item_id, "deleted": True, "message": "Item deleted successfully"}