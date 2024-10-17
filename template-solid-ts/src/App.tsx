import {createSignal} from 'solid-js'
import './App.css'
import Navbar from "./render/Navbar.tsx"
import {Box, createTheme, ThemeProvider} from "@suid/material";
import Alerts from "./render/Alerts.tsx"
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
    const [isAlertOpen, setIsAlertOpen] = createSignal(false)
    const [alertType, setAlertType] = createSignal("success")
    const [alertMessage, setAlertMessage] = createSignal("ouaiouai")

    const updateTheme = () => {
        console.log(themeName() === 'light')

        console.log(themeName())
        if (themeName() === 'light') {
            setThemeName(`dark`)
            setUsedTheme(darkTheme)
            setAlertMessage("On mange?")

            setAlertType("warning")
            setIsAlertOpen(true)
        } else {
            setIsAlertOpen(true)
            setAlertMessage("On baise?")
            setAlertType("success")

            setThemeName("light")
            setUsedTheme(lightTheme);
        }
    }

    return (
        <>
            <Box class={themeName() === 'light' ? "global" : "global-dark"} sx={{ flexGrow: 1 }}>
                <Alerts message={alertMessage} type={alertType} opened={isAlertOpen} setIsAlertOpen={setIsAlertOpen}></Alerts>
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
