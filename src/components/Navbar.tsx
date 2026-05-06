import React from 'react'

export default function Navbar() {
    return (
        <nav className="Navbar">
            <a href="/" className="Navbar__logo">Spotlight Creators</a>
            <ul>
                <li>
                    <a href="/creators">Creators</a>
                </li>
                <li>
                    <a href="/creators/add">Add</a>
                </li>
            </ul>
        </nav>
    )
}
