import React, { useEffect, useState } from 'react'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({
    region: import.meta.env.VITE_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_SECRET_KEY
    }
})

const ddb = DynamoDBDocumentClient.from(client)

const TABLE_NAME = "Todo"

export const TableTask = () => {

    const [info, setInfo] = useState([])

    const getTask = async () => {

        try {

            const command = new ScanCommand({
                TableName: TABLE_NAME
            })

            
            const result = await ddb.send(command)
            const { Items } = result
            setInfo(Items)

        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getTask()
    }, [])

    return (
        <>
            <table style={{ margin: "10%", border: "solid" }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Text</th>
                        <th>Complete</th>
                    </tr>
                </thead>
                <tbody>
                   {
                    info.map( (item)=>(
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.Text}</td>
                            <td>{ item.IsComplete ? "True" : "False" }</td>
                        </tr>
                    ))
                   }
                </tbody>
            </table>
        </>
    )
}
