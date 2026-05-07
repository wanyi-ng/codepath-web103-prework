import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/Card'
import getServerBaseUrl from '../../utils/get-base-url'

export default function EditCreator() {
    const { creatorId } = useParams()
    const navigate = useNavigate()

    const formRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [creator, setCreator] = useState(null)
    
    async function getData() {
        try {
            setLoading(true)
            const origin = getServerBaseUrl()
            const result = await fetch(`${origin}/api/creators/${creatorId}`)
            const { response } = await result.json()
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
    
    async function updateCreator() {
        try {
            setLoading(true)
            const formData = new FormData(formRef.current!)
            // console.log(formData)
            const origin = getServerBaseUrl()
            const result = await fetch(`${origin}/api/creators/${creatorId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.get("name"),
                    description: formData.get("description"),
                    imageUrl: formData.get("imageUrl"),
                    url: [
                        { "youtube": formData.get("socials-youtube") },
                        { "twitter": formData.get("socials-twitter") },
                        { "instagram": formData.get("socials-instagram") },
                    ],
                }),
            })
            const { response } = await result.json()
            if (!response) throw new Error("Response error")
            // await getData() // use await getData() if want to stay on current page
            setLoading(false)
            navigate(`/creators/${creatorId}`) // remove navigate if don't want to be redirected
        } catch (error) {
            console.error(error)
            setError(true)
            setLoading(false)
        }
    }

    async function deleteCreator() {
        try {
            setLoading(true)
            const origin = getServerBaseUrl()
            const result = await fetch(`${origin}/api/creators/${creatorId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const { response } = await result.json()
            if (!response) throw new Error("Response error")
            setLoading(false)
            navigate(`/creators`)
        } catch (error) {
            console.error(error)
            setError(true)
            setLoading(false)
        }
    }
    
    async function handleSubmit(e) {
        e.preventDefault()
        // console.log("event: ", e.nativeEvent.submitter.name)
        switch(e.nativeEvent.submitter.name) {
            case "save":
                await updateCreator()
                break
            case "delete":
                await deleteCreator()
                break
            default:
                break
        }
    }
  
    return (
        <main>
            <>
                {loading && !error && <p>Loading...</p>}
                {error && !loading && <p>There was an error...</p>}
                {!loading && !error && (
                    <div>
                        {creator !== null && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Edit Content Creator</CardTitle>
                                    <CardDescription>Update content creator's information.</CardDescription>
                                </CardHeader>
            
                                <CardContent>
                                    <form
                                        ref={formRef}
                                        onSubmit={handleSubmit}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "12px",
                                        }}
                                        className="Form"
                                    >
                                        <span className="FormField">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                defaultValue={creator.name}
                                                id=""
                                            />
                                        </span>
                                        <span className="FormField">
                                            <label>Description</label>
                                            <textarea
                                                name="description"
                                                defaultValue={creator.description}
                                                id=""
                                            />
                                        </span>
                                        <span className="FormField">
                                            <label>Image</label>
                                            <input
                                                type="text"
                                                name="imageUrl"
                                                defaultValue={creator.imageUrl}
                                                id=""
                                            />
                                        </span>
                                        <span className="FormField">
                                            <label>{Object.keys(creator.url[0])}</label>
                                            <input
                                                type="text"
                                                name="socials-youtube"
                                                defaultValue={Object.values(creator.url[0])}
                                                id=""
                                                />
                                            <label>{Object.keys(creator.url[1])}</label>
                                            <input
                                                type="text"
                                                name="socials-twitter"
                                                defaultValue={Object.values(creator.url[1])}
                                                id=""
                                                />
                                            <label>{Object.keys(creator.url[2])}</label>
                                            <input
                                                type="text"
                                                name="socials-instagram"
                                                defaultValue={Object.values(creator.url[2])}
                                                id=""
                                            />
                                        </span>


                                        <span className="FormField FormField__submit">
                                            <button type="submit" name="save" className="FormButton__save">Save</button>
                                            <button type="submit" name="delete" className="FormButton__delete">Delete</button>
                                        </span>
                                    </form>
                                </CardContent>
            
                                <CardFooter>
                                </CardFooter>
                            </Card>
                        )}
                    </div>
                )}
            </>
        </main>
    )
}
