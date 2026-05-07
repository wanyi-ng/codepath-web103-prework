import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/Card'
import getServerBaseUrl from '../../utils/get-base-url'

export default function ShowCreators() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [creators, setCreators] = useState([])

    async function getData() {
        try {
            setLoading(true)
            const origin = getServerBaseUrl()
            const result = await fetch(`${origin}/api/creators`)
            const { response } = await result.json()
            // console.log("response: ", response)
            if (!response) throw new Error("Response error")
            setCreators(response)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    
    return (
        <main>
            <>
                {loading && !error && <p>Loading...</p>}
                {error && !loading && <p>There was an error...</p>}
                {!loading && !error && (
                    <div className="Creators__cards">
                        {creators.length > 0 && creators.map((creator) => (
                            <Card key={creator.id} className="Creators__card">
                                <CardHeader>
                                    <CardTitle className="Creators__card-title">{creator.name}</CardTitle>
                                    {/* <CardDescription className="Creators__card-description">{creator.description}</CardDescription> */}
                                </CardHeader>
                                <CardContent className="Creators__card-content">
                                    <img
                                        src={`https://${creator.imageUrl}`}
                                        alt={creator.name}
                                    />
                                </CardContent>
                                <CardFooter className="Creators__card-footer">
                                    <a href={`/creators/${creator.id}`}>
                                        View
                                    </a>
                                </CardFooter>
                            </Card>
                        ))}
                        {creators.length === 0 && (
                            <a href="/creators/add">
                                Add a Content Creator
                            </a>
                        )}
                    </div>
                )}
            </>
        </main>
    )
}