import React from 'react'
import { useParams } from 'react-router-dom'
import { FormTask } from '../components/FormTask'


export const EditPage = () => {

    const { id, Text, IsCompleted } = useParams()

    const task = {
        id, Text, IsCompleted
    }


    return (
        <>
            <h1>Edit Task</h1>
            <FormTask task={ task }  />
        </>

    )
}
