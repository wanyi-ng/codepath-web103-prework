import express from "express"
import cors from "cors"
import { config } from "dotenv"
import { supabase } from "../src/client.js"

config({ path: "../.env"})

const app = express()

app.use(cors())
app.use(express.json())

app.post("/api/creators", async (req, res) => {
    // console.log("req.body: ", req.body)
    try {
        const { data, error } = await supabase
            .from("creators")
            .insert(req.body)
            .select()
        res.status(200).json({
            response: data,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        })
    }
})

app.get("/api/creators", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("creators")
            .select()
        // console.log(data)
        res.status(200).json({
            response: data,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        })
    }
})

app.get("/api/creators/:creatorId", async (req, res) => {
    const { creatorId } = req.params
    try {
        const { data, error } = await supabase
            .from("creators")
            .select("*")
            .eq("id", creatorId)
            .single()
        res.status(200).json({
            response: data,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        })
    }
})

app.put("/api/creators/:creatorId", async (req, res) => {
    const { creatorId } = req.params
    try {
        const { data, error } = await supabase
            .from("creators")
            .update(req.body)
            .match({ id: creatorId })
            .select()
        res.status(200).json({
            response: data,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        })
    }
})

app.delete("/api/creators/:creatorId", async (req, res) => {
    const { creatorId } = req.params
    try {
        const { data, error } = await supabase
            .from("creators")
            .delete()
            .match({ id: creatorId })
            .select()
        res.status(200).json({
            response: data,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        })
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
})