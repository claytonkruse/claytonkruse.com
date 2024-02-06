<script lang="ts">
    import '@picocss/pico';
</script>

<header class="container hero" title="Background by John Towner">
    <div class="profile-image" />
    <div class="name-line">
        <h1 class="name">Clayton Kruse</h1>
    </div>
</header>
<main id="main" class="container">
    <nav aria-label="breadcrumb">
        <ul>
            <li>
                <a href="https://linkedin.com/in/claytonckruse/">LinkedIn</a>
            </li>
            <li>
                <a href="https://medium.com/@claytonkruse">Medium</a>
            </li>
            <ul>
                <li><a href="https://github.com/claytonkruse">Github</a></li>
            </ul>
        </ul>
    </nav>
    <h1>Resume</h1>
    <section class="knowledgebase">
        <h2>Knowledgebase</h2>
        <section>
            <h3>Languages</h3>
            <ul>
                <li>C</li>
                <li>
                    Javascript
                    <ul>
                        <li>Typescript</li>
                        <li>
                            JSON
                            <ul>
                                <li>MongoDB</li>
                            </ul>
                        </li>
                        <li>
                            NodeJS
                            <ul>
                                <li>SvelteKit</li>
                                <li>ExpressJS</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>HTML</li>
                <li>
                    CSS
                    <ul>
                        <li>SASS</li>
                        <li>LESS</li>
                    </ul>
                </li>
                <li>Java</li>
                <li>
                    SQL
                    <ul>
                        <li>MySQL</li>
                        <li>SQLite</li>
                        <li>PosgreSQL</li>
                    </ul>
                </li>
            </ul>
        </section>
        <section>
            <h3>Operating Systems</h3>
            <ul>
                <li>
                    GNU/Linux
                    <ul>
                        <li>Debian</li>
                        <li>
                            <span
                                data-tooltip="The first Linux distribution I really learned."
                                data-placement="right">Arch Linux</span
                            >
                            <ul>
                                <li>
                                    <span
                                        data-tooltip="I have been daily driving EndeavourOS for a year now."
                                        data-placement="right">EndeavourOS</span
                                    >
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Windows</li>
            </ul>
        </section>
        <section>
            <h3>Editors</h3>
            <ul>
                <li>
                    Vi
                    <ul>
                        <li>
                            Vim
                            <ul><li>Neovim</li></ul>
                        </li>
                    </ul>
                </li>
                <li>
                    VSCode
                    <ul><li>VSCodium</li></ul>
                </li>
            </ul>
        </section>
        <section>
            <h3>Misc.</h3>
            <ul>
                <li>
                    <a
                        href="https://caddyserver.com"
                        data-tooltip="A http Server"
                        data-placement="right">Caddy</a
                    >
                </li>
            </ul>
        </section>
    </section>
</main>

<footer class="container">
    <small>
        <small
            >Header background by <a
                href="https://unsplash.com/photos/JgOeRuGD_Y4">John Towner</a
            >.</small
        ></small
    >
</footer>

<style lang="postcss">
    .hero {
        position: relative;
        height: 10rem;
        background-image: url(/john-towner-JgOeRuGD_Y4-unsplash.jpg);
        background-position: center;
        background-size: cover;

        display: flex;
        flex-flow: column;
        justify-content: flex-end;

        padding: 0.6rem 1rem;
    }

    footer {
        padding: 0.6rem 0;
    }

    .name-line {
        width: 100%;
    }

    .name {
        margin: 0;
        display: inline-block;
    }

    .profile-image {
        background-image: url("/naofumi.jpg");
        background-position: center;
        background-size: cover;

        border-radius: 50%;
        width: 5rem;
        height: 5rem;
    }

    #main {
        padding-top: 4rem;
    }
</style>
