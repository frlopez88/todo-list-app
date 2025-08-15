import React, { useState, useEffect } from 'react'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
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

export const FormTask = ({ task }) => {

  const [formData, setFormData] = useState({
    id: "",
    Text: "",
    IsCompleted: false
  })


  const navigate = useNavigate()


  const submitHandler = async () => {

    event.preventDefault();

    try {

      const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: formData
      })

      console.log(formData)

      const result = await ddb.send(command)

      if (task){
        navigate("/")
      }else{
        window.location.reload()
      }

    } catch (err) {

      console.log(err)

    }


  }

  const textHanlder = () => {

    const temp = {
      id: formData.id,
      Text: formData.Text,
      IsCompleted: formData.IsCompleted
    }

    temp.Text = event.target.value

    setFormData(temp)

  }

  const idHanlder = () => {

    const temp = {
      id: formData.id,
      Text: formData.Text,
      IsCompleted: formData.IsCompleted
    }

    temp.id = event.target.value

    setFormData(temp)


  }

  const completeHanlder = () => {

    const temp = {
      id: formData.id,
      Text: formData.Text,
      IsCompleted: formData.IsCompleted
    }


    const value = event.target.value

    if (value == 1) {
      temp.IsCompleted = true
    } else {
      temp.IsCompleted = false
    }

    setFormData(temp)

  }

  useEffect(() => {
    if (task) {
      setFormData(task)
    }
  }, [])


  return (
    <>
      <form className='m-10' onSubmit={submitHandler} >

        <div>
          <label >Id </label>
          <input value={formData.id} onChange={idHanlder} name="id" type='number' className='min-w-full bg-white text-black' />
        </div>

        <div>
          <label >Task: </label>
          <input value={formData.Text} onChange={textHanlder} name="Text" type='text' className='min-w-full bg-white text-black' />
        </div>

        <div>
          <label >Completed</label>
          <select  className='min-w-full text-black bg-white' name="IsComplete" onChange={completeHanlder} >
            <option value={-1} >Select Option</option>
            <option value={1} >True</option>
            <option value={0} >False</option>
          </select>
        </div>
        <button className='mt-5 min-w-full bg-blue-300' >Send Data </button>
      </form>
    </>
  )
}
