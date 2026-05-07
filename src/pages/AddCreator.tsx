import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/Card'
import getServerBaseUrl from '../../utils/get-base-url'

export default function AddCreator() {
    const navigate = useNavigate()

    const formRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    async function addCreator(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const formData = new FormData(formRef.current!)
            // console.log(formData)
            const origin = getServerBaseUrl()
            const result = await fetch(`${origin}/api/creators`, {
                method: "POST",
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
            // console.log(await result.json())
            if (!response) throw new Error("Response error")
            setLoading(false)
            navigate("/creators")
        } catch (error) {
            console.error(error)
            setError(true)
            setLoading(false)
        }
    }
    
    return (
        <main>
            <Card>
                <CardHeader>
                    <CardTitle>Add Content Creator</CardTitle>
                    <CardDescription>Enter content creator's information.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        ref={formRef}
                        onSubmit={addCreator}
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
                                id=""
                            />
                        </span>
                        <span className="FormField">
                            <label>Description</label>
                            <textarea
                                name="description"
                                id=""
                            />
                        </span>
                        <span className="FormField">
                            <label>Image</label>
                            <input
                                type="text"
                                name="imageUrl"
                                id=""
                            />
                        </span>

                        <span className="FormField">
                            <label>YouTube</label>
                            <input
                                type="text"
                                name="socials-youtube"
                                id=""
                                />
                            <label>Twitter</label>
                            <input
                                type="text"
                                name="socials-twitter"
                                id=""
                                />
                            <label>Instagram</label>
                            <input
                                type="text"
                                name="socials-instagram"
                                id=""
                            />
                        </span>

                        <span className="FormField FormField__submit">
                            <button type="submit" name="add" className="FormButton__add">{loading ? "Adding" : "Add"}</button>
                        </span>
                    </form>
                </CardContent>

                <CardFooter>
                    {error && !loading && <p>There was an error...</p>}
                </CardFooter>
            </Card>
        </main>
    )
}
