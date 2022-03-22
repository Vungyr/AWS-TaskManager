const AWS = require('aws-sdk');

const deleteTask = async (event) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient()
    const {id} = event.pathParameters

    await dynamoDb.delete ({
        TableName: 'TaskTable',
        key: {id}
    }).promise()

    return{
        status: 200,
        body: {
            message: 'Task deleted successfully'
        }
    }
}

module.exports = {deleteTask}