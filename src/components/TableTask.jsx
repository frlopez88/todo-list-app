import React, { useEffect, useState } from 'react'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand , DeleteCommand } from '@aws-sdk/lib-dynamodb'
import { useNavigate } from 'react-router-dom'

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

    const navigate  = useNavigate()

    const showEdit = (item)=>{

        
        navigate(`/editTask/${item.id}/${item.Text}/${item.IsCompleted}`)

    }

    const deleteHandler = async (id)=> {

        try {

            const command = new DeleteCommand({
               TableName :  TABLE_NAME, 
               Key : {id},
            })

            const result = await ddb.send(command)
            getTask()

        }catch(err){
            console.log(err)
        }

    }

    useEffect(() => {
        getTask()
    }, [])

    return (
        <>
            <table  className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-blue-100 text-gray-800'>
                    <tr>
                        <th>Id</th>
                        <th>Text</th>
                        <th>Complete</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                   {
                    info.map( (item)=>(
                        <tr  className='text-center' key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.Text}</td>
                            <td>{ item.IsCompleted ? "True" : "False" }</td>
                            <td> <button className='bg-yellow-400 min-w-full rounded' onClick={
                                ()=> showEdit(item)
                            } >Edit</button> </td>
                            <td> <button className='bg-red-400 min-w-full rounded' onClick={
                                ()=> deleteHandler(item.id)
                            } >Delete</button> </td>
                        </tr>
                    ))
                   }
                </tbody>
            </table>
        </>
    )
}
