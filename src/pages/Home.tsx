export default function Home() {
    return (
        <main>
            <div className="Home__container">

                <h1>Spotlight Creators</h1>
                
                <div className="Home__links">
                    <a
                        href="/creators"
                        className="Home__link"
                    >
                        <p>View Content Creators</p>
                    </a>
                    <a
                        href="/creators/add"
                        className="Home__link"
                    >
                        <p>Add Content Creator</p>
                    </a>
                </div>
            </div>
        </main>
    )
}