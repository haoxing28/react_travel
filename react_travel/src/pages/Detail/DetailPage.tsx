import React from "react";
import { useParams } from 'react-router-dom'

export const DetailPage : React.FC = () => {
    const params = useParams()
    return <h1>DetailPage, id: {params.touristRouteId}</h1>
}