# getStudent Serverless App - Lab 


## Resources:
- Backend System
1. DynamoDB
2. Lambda
3. API Gateway

- Front end Static Content
1. Simple Storage Servicee (S3)
2. CloudFront (CDN)
3. Route 53 - Domain
4. Certificate Manager (ACM)

## Step 1 - Create DynamoDB Table
- Tablename = studentData
- Primary key = studentid (String)
- Allow defualt settings and Create

## Step 2 - Create Lambda Function getStudent Data.
- Create an IAM role for Lambda with access to DynamoDB & CloudWatch
- Lambda name = getStudent or anyname.
- Select the existing role and create.
- Paste the python code from getStudent file.
- Deploy Lambda
- Test -> give name and run test and the response will be null.

## Step 3 - Create Lambda Function postStudent Data.
- Lambda name = postStudent or anyname.
- Select the existing role and create.
- Paste the python code from postStudent file.
- Deploy Lambda
- Test -> Paste below keys and values and run test then check data on DynamoDB.
```
{
    "studentid": "123",
    "name": "John Doe",
    "class": "10th Grade",
    "age": 15
}
```

## Step 4 - Create API Gateway
- Rest API
- Name = Anyname
- API endpoint type = Edge-optimize
- Create
  
### create Method
- On the API Resource -> click: create method and create 2 mothods.
- 1st method: Get -> select the getStudent Lambda
- 2nd method: Post -> select the putStudent Lambda
- You can test the getStudent Method to see the Data in DynamoDb
- Just click on test and run.

### Create Stage
- Create a Stage called Prod,
- Deploy the Stage.
- On Resources -> Enable CORS
- Select: Get & Post
- Save
- Copy the Stage endpoint and replace the API endpoint on the js file.

## Step 5 - Create S3 Bucket
- Store html code files
- Store script.js file for the API integration

## Step 6 - Create CloudFront
- On CloudFront:
- Origin: s3 URL
- Origin Access: Origin access control settings (recommended)
- Origin Access Control: click: Create Control Setting (default) => save.
- Bucket Policy: After you create CloudFront it will give you a policy, copy and paste on s3.
- Http to https
- WAF: click - Do not enable security protections.
- Certificate     	= Optional only if you need to use domain.
- Alternate domain name  = Add item: www.example.com
- Default root object  = here write the name of your main (index.html) file
- Create: while it's creating copy the policy at the top and paste on Bucket permission.

## Step 7 - Configure A record (if using doamin name)
- On Route 53 Hosted zones.
- Create an A record 
- Select Alias and search for the configured CDN
- Save.

## - Step 8 - Access 
- Copy CDN domain or your configured Route 53 domain and browse it. 
- Insert data and also press get data.
