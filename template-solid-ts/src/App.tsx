import {createSignal} from 'solid-js'
import './App.css'
import Navbar from "./render/Navbar.tsx"
import {Box, createTheme, ThemeProvider} from "@suid/material";

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        colorSchemes: {
            dark: true,
        },
    });
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
        colorSchemes: {
            dark: false,
        },
    });
    const [usedTheme, setUsedTheme] = createSignal(lightTheme);
    const [themeName, setThemeName] = createSignal('light');

    const updateTheme = () => {
        console.log(themeName() === 'light')

        console.log(themeName())
        if (themeName() === 'light') {
            setThemeName(`dark`)
            setUsedTheme(darkTheme)
        } else {
            setThemeName("light")
            setUsedTheme(lightTheme);
        }
    }

    return (
        <>
            <Box class={themeName() === 'light' ? "global" : "global-dark"}>
                <ThemeProvider theme={usedTheme}>
                    <Navbar/>
                    <h1>Vite + Solid</h1>
                    <div class="card">
                        <button onClick={() => updateTheme()}>

                            LOOOOOOOOL
                        </button>
                        <p>
                            Edit <code>src/App.tsx</code> and save to test HMR
                        </p>
                    </div>
                    <p class="read-the-docs">
                        Click on the Vite and Solid logos to learn more
                    </p>

                </ThemeProvider>
            </Box>
        </>
    )
}

export default App
