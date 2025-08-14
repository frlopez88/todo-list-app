import React from 'react'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({
  region: import.meta.env.VITE_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_SECRET_KEY
  }
})

const ddb = DynamoDBDocumentClient.from(client)

const TABLE_NAME = "Todo"

export const FormTask = () => {

  const formData = {
    id: 0,
    Text: "",
    IsCompleted: false
  }


  const submitHandler = async () => {

    event.preventDefault();

    try {

      const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: formData
      })

      console.log(formData)

      const result = await ddb.send(command)
      window.location.reload()

    } catch (err) {

      console.log(err)

    }


  }

  const textHanlder = () => {

    formData.Text = event.target.value

  }

  const idHanlder = () => {

    formData.id = event.target.value

  }

  const completeHanlder = () => {

    const value = event.target.value
    if (value === 1) {
      formData.IsCompleted = true
    } else {
      formData.IsCompleted = false
    }


  }


  return (
    <>
      <form onSubmit={submitHandler} >

        <label >Id </label>
        <input onChange={idHanlder} name="id" type='number' />

        <label >Task: </label>
        <input onChange={textHanlder} name="Text" type='text' />

        <label >Completed</label>
        <select name="IsComplete" onChange={completeHanlder} >
          <option value={1} >True</option>
          <option value={0} >False</option>
        </select>
        <button>Send Data </button>
      </form>
    </>
  )
}
