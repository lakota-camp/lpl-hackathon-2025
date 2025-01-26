import boto3
import pandas as pd
import glob
import os

def get_docs(dataSourceId, jobExecutionId):
    documents = []
    try:
        json_pattern = os.path.join('kendra-ingestion','*.json')
        file_list = glob.glob(json_pattern)
        df = pd.DataFrame()
        for file in file_list:
            data = pd.read_json(file)
            df = df.append(data, ignore_index = True)
        #Randomize the indexes
        df = df.sample(frac=1).reset_index(drop=True)
        #Slice df to obtain 10 documents
        df = df.head(10)
    except:
       print("Documents file not found")  
    for index_label, row_series in df.iterrows():
        Text = df.at[index_label , 'Text']
        Title = df.at[index_label , 'Title']
        Url =  df.at[index_label , 'Url']
        CrawledDate = df.at[index_label , 'CrawledDate']
        docID =  df.at[index_label , 'docID']
        doc = {
            "Id": docID,
            "Blob": Text,
            "Title": Title,
            "Attributes": [
                {
                "Key": "_data_source_id",
                "Value": {
                    "StringValue": dataSourceId
                    }
                },
                {
                "Key": "_data_source_sync_job_execution_id",
                "Value": {
                    "StringValue": jobExecutionId
                    }
                },
                {
                "Key": "_source_uri",
                "Value": {
                    "StringValue": Url
                    }    
                },
                {
                "Key": "_created_at",
                "Value": {
                    "DateValue": CrawledDate
                    }    
                }
            ]
        }
        documents.append(doc)
    return documents
    
#Index ID
index_id = <YOUR-INDEX-ID>
#Datasource ID
data_source_id = <YOUR-DATASOURCE-ID>

kendra = boto3.client('kendra')

#Start a data source sync job
result = kendra.start_data_source_sync_job(
    Id = data_source_id,
    IndexId = index_id
    )

print("Start data source sync operation: ")
print(result)

#Obtain the job execution ID from the result
job_execution_id = result['ExecutionId']
print("Job execution ID: "+job_execution_id)

#Start ingesting documents
try:
    #Part of the workflow will require you to have a list with your documents ready
    #for ingestion
    docs = get_docs(data_source_id, job_execution_id)
    #batchput docs
    result = kendra.batch_put_document(
        IndexId = index_id,
        Documents = docs
        )
    print("Response from batch_put_document:")
    print(result)

#Stop data source sync job
finally:
    #Stop data source sync
    result = kendra.stop_data_source_sync_job(
        Id = data_source_id,
        IndexId = index_id
        )
    print("Stop data source sync operation:")
    print(result)