import json
import boto3

def lambda_handler(event, context):
    print("Event: ", json.dumps(event))
    
    # Create an SNS client
    sns_client = boto3.client('sns', region_name='us-east-1')
    
    # Extract email from the incoming request
    try:
        body = json.loads(event['body']) if 'body' in event else event
        email = body.get('email')
        title = body.get('title')
    except Exception as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Invalid request format'})
        }
    
    if not email:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Email address is required'})
        }

    # Replace with your SNS topic ARN
    topic_arn = 'arn:aws:sns:us-east-1:633448752051:email-sns'
    
    # Subscribe the email to the topic
    try:
        sns_client.subscribe(
            TopicArn=topic_arn,
            Protocol='email',
            Endpoint=email
        )

        # Publish a message to the topic
        sns_client.publish(
        TopicArn=topic_arn,
        Subject='You got a comment on your post',
        Message='People wants to know more about the post "{}". Checkout the comment section of your post'.format(title)
    )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Email sent successfully'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
