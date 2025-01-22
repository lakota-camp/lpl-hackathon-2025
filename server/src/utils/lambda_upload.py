import os
import zipfile
import boto3

lambda_client = boto3.client('lambda', region_name='us-west-1')
# Update this with the ARN of the role created
LAMBDA_ROLE_ARN = "<INSERT_LAMBDA_ROLE_ARN>"

def zip_lambda_function(directory, output_zip):
    """Zips the contents of a directory."""
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, _, files in os.walk(directory):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, start=directory)
                zf.write(file_path, arcname)

def get_handler_name(directory):
    """Finds the main Python file in the directory and returns the handler name."""
    for file in os.listdir(directory):
        if file.endswith('.py'):
            # Assume the function inside each file is named `lambda_handler`
            return f"{file[:-3]}.lambda_handler"  # Remove the .py extension
    return None

def create_lambda(function_name, zip_file_path, handler_name='lambda_function.lambda_handler'):
    """Updates a Lambda function with the contents of a zip file."""
    with open(zip_file_path, 'rb') as zip_file:
        try:
            response = lambda_client.create_function(
                FunctionName=function_name,
                Runtime='python3.9',
                Role=LAMBDA_ROLE_ARN,
                Handler=handler_name,
                Code={'ZipFile': zip_file.read()},
                Timeout=30,
                MemorySize=128,
                Publish=True
            )
            print(f"{response['LastModified']}: Lambda function {function_name} created successfully.")
        except lambda_client.exceptions.ResourceConflictException:
            print(f"Lambda function {function_name} already exists.")
        except Exception as e:
            print(f"Error creating Lambda function {function_name}: {e}")
    print(f"Successfully uploaded all lambda functions.")
        
    
def main():
    # Dir with lambda functions
    lambda_dir = '<INSERT_PATH_TO_LAMBDA_FUNCTIONS>'
    
    # Loop through each subdirectory
    for function_name in os.listdir(lambda_dir):
        function_path = os.path.join(lambda_dir, function_name)
        if os.path.isdir(function_path):
            handler_name = get_handler_name(function_path)
            if not handler_name:
                print(f"Could not find handler for {function_name}. Skipping...")
                continue
            zip_file_path = f'{function_name}.zip'
            print(f"Zipping {function_name}...")
            zip_lambda_function(function_path, zip_file_path)
            print(f"Uploading {function_name}...")
            create_lambda(function_name, zip_file_path, handler_name)
            os.remove(zip_file_path)

if __name__ == '__main__':
    main()
            
            
        
        
        
        
        