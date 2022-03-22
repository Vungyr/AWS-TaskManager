const AWS = requires('aws-sdk');

const updateTask = async (event) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters
    const { done, title, description} = JSON.parse(event.body)

    await dynamoDb.update({
        TableName: 'TaskTable',
        key: {id},
        UpdateExpression: 'set done = :done, title = :title, description = :description',
        ExpressionAttributesValues: {
            ":done": done,
            ":title": title, 
            ":description": description
        },
        ReturnValues: 'ALL_NEW'
    }).promise()

    return{
        status: 200,
        body: JSON.stringify({
            message: 'Task updated successfully'
        })
    }

}

module.exports = {
    updateTask
}