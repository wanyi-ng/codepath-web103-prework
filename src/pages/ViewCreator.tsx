import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import getServerBaseUrl from  '../../utils/get-base-url'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/Card'

export default function ViewCreator() {
    const { creatorId } = useParams()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [creator, setCreator] = useState(null)
    
    async function getData() {
        try {
            setLoading(true)
            const origin = getServerBaseUrl()
            const result = await fetch(`${origin}/api/creators/${creatorId}`)
            const { response } = await result.json()
            // console.log(response.url)
            if (!response) throw new Error("Response error")
            setCreator(response)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [creatorId])
  
    return (
        <main>
            <>
                {loading && !error && <p>Loading...</p>}
                {error && !loading && <p>There was an error...</p>}
                {!loading && !error && (
                    <div>
                        {creator !== null && (
                            <Card key={creator.id} className="Creator__card">
                                <CardHeader>
                                    <CardTitle>{creator.name}</CardTitle>
                                    <CardDescription>{creator.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="Creator__card-content">
                                    <img
                                        src={`https://${creator.imageUrl}`}
                                        alt={creator.name}
                                    />
                                    <ul>
                                        {creator.url.map((item, i) => {
                                            const platform = Object.keys(item)
                                            const handle = Object.values(item)
                                            const platformCapitalized = String(platform).charAt(0).toUpperCase() + String(platform).slice(1)
                                            return (
                                                // TODO: link to social platform
                                                <li key={i}>
                                                    {`${platformCapitalized}: ${handle}`}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <a href={`/creators/${creator.id}/edit`}>Edit</a>
                                </CardFooter>
                            </Card>
                        )}
                    </div>
                )}
            </>
        </main>
  )
}
